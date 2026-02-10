"""
Simple HTTP-based MCP Server for Task Management
This provides HTTP endpoints that mimic MCP functionality for the AI agent
"""
import asyncio
import traceback
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import os

app = FastAPI(title="HTTP-based MCP Server for Task Management")

# Configuration
BACKEND_BASE_URL = os.getenv("BACKEND_BASE_URL", "http://localhost:8000")

class ToolCallRequest(BaseModel):
    tool_name: str
    parameters: Dict[str, Any]

class ToolCallResponse(BaseModel):
    result: Any
    success: bool

# Helper function to create headers with optional token
def get_headers(token: str = None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers

async def _get_task_id_by_title(session_token: str, task_title: str) -> Optional[int]:
    """Helper to find a task ID by its title by calling the backend."""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"{BACKEND_BASE_URL}/api/tasks/",
                headers=get_headers(session_token)
            )
            response.raise_for_status()
            tasks = response.json()
            
            matching_tasks = [task for task in tasks if task.get("title", "").lower() == task_title.lower()]
            
            if len(matching_tasks) == 1:
                return matching_tasks[0]["id"]
            elif len(matching_tasks) > 1:
                # If multiple tasks match, return the first one for now.
                # A more robust solution might ask for clarification from the user.
                return matching_tasks[0]["id"]
            return None
        except (httpx.RequestError, httpx.HTTPStatusError) as e:
            print(f"Error fetching tasks by title from backend: {type(e).__name__}: {e}")
            return None


@app.post("/call_tool")
async def call_tool(request: ToolCallRequest):
    """Endpoint to call tools via HTTP for compatibility with AI agent"""
    tool_name = request.tool_name
    parameters = request.parameters

    print(f"MCP: Received tool call for {tool_name} with params: {parameters}")

    try:
        session_token = parameters.get("session_token", "")
        print(f"MCP: session_token received: {'[PRESENT]' if session_token else '[MISSING]'}")

        async with httpx.AsyncClient() as client:
            if tool_name == "get_tasks":
                url = f"{BACKEND_BASE_URL}/api/tasks/"
                headers = get_headers(session_token)
                print(f"MCP: Calling backend GET {url} with headers: {headers}")
                response = await client.get(url, headers=headers)
                print(f"MCP: Backend GET response - Status: {response.status_code}, Text: {response.text}")

                if response.status_code == 200:
                    tasks = response.json()
                    if not tasks:
                        return {"result": "No tasks found.", "success": True}
                    
                    task_list = []
                    for i, task in enumerate(tasks, 1):
                        completed = task.get('completed', False)
                        title = task.get('title', 'Untitled')
                        status = "✓" if completed else "○"
                        task_list.append(f"{i}. [{status}] {title}")
                    result = "Your tasks:\n" + "\n".join(task_list)
                else:
                    result = f"Failed to list tasks: {response.text}"
            
            elif tool_name == "create_task":
                payload = {
                    "title": parameters["title"],
                    "description": parameters.get("description", "")
                }
                url = f"{BACKEND_BASE_URL}/api/tasks/"
                headers = get_headers(session_token)
                print(f"MCP: Calling backend POST {url} with payload: {payload} and headers: {headers}")
                response = await client.post(url, json=payload, headers=headers)
                print(f"MCP: Backend POST response - Status: {response.status_code}, Text: {response.text}")

                if response.status_code in [200, 201]:
                    task_data = response.json()
                    result = f"Added task: {task_data.get('title', parameters['title'])}"
                else:
                    result = f"Failed to add task: {response.text}"
            
            elif tool_name == "update_task":
                task_id = parameters.get("task_id")
                task_title = parameters.get("task_title")

                if task_id is None and task_title is not None:
                    # _get_task_id_by_title will also log its backend call
                    task_id = await _get_task_id_by_title(session_token, task_title)
                    if task_id is None:
                        return {"result": f"No task found with title: '{task_title}'.", "success": False}
                elif task_id is None:
                    return {"result": "Either task_id or task_title must be provided for update.", "success": False}

                payload = {}
                if "title" in parameters and parameters["title"] is not None:
                    payload["title"] = parameters["title"]
                
                if "status" in parameters and parameters["status"] is not None:
                    if parameters["status"] in ["completed", "done", "finished"]:
                        payload["completed"] = True
                    elif parameters["status"] in ["pending", "not completed", "incomplete"]:
                        payload["completed"] = False
                
                append_description = parameters.get("append_description")
                if append_description is not None:
                    # Fetch current task to get existing description
                    current_task_url = f"{BACKEND_BASE_URL}/api/tasks/{task_id}"
                    headers = get_headers(session_token)
                    print(f"MCP: Calling backend GET {current_task_url} for existing description with headers: {headers}")
                    current_task_resp = await client.get(current_task_url, headers=headers)
                    print(f"MCP: Backend GET response - Status: {current_task_resp.status_code}, Text: {current_task_resp.text}")

                    current_task_resp.raise_for_status()
                    current_task = current_task_resp.json()
                    existing_description = current_task.get("description", "")
                    new_description = f"{existing_description}\n{append_description}".strip()
                    payload["description"] = new_description
                elif "description" in parameters and parameters["description"] is not None:
                    payload["description"] = parameters["description"]
                
                if not payload:
                    return {"result": "No updates provided.", "success": False}
                
                url = f"{BACKEND_BASE_URL}/api/tasks/{task_id}"
                headers = get_headers(session_token)
                print(f"MCP: Calling backend PUT {url} with payload: {payload} and headers: {headers}")
                try:
                    response = await client.put(url, json=payload, headers=headers)
                    print(f"MCP: Backend PUT response - Status: {response.status_code}, Text: {response.text}")
                except Exception as put_error:
                    print(f"MCP: PUT request failed with {type(put_error).__name__}: {put_error}")
                    print(f"MCP: PUT traceback:\n{traceback.format_exc()}")
                    return {"result": f"Failed to update task: {type(put_error).__name__}: {put_error}", "success": False}

                if response.status_code == 200:
                    result = "Task updated successfully."
                else:
                    result = f"Failed to update task (status {response.status_code}): {response.text}"
            
            elif tool_name == "delete_task":
                task_id = parameters.get("task_id")
                task_title = parameters.get("task_title")

                if task_id is None and task_title is not None:
                    task_id = await _get_task_id_by_title(session_token, task_title)
                    if task_id is None:
                        return {"result": f"No task found with title: '{task_title}'.", "success": False}
                elif task_id is None:
                    return {"result": "Either task_id or task_title must be provided for deletion.", "success": False}

                url = f"{BACKEND_BASE_URL}/api/tasks/{task_id}"
                headers = get_headers(session_token)
                print(f"MCP: Calling backend DELETE {url} with headers: {headers}")
                response = await client.delete(url, headers=headers)
                print(f"MCP: Backend DELETE response - Status: {response.status_code}, Text: {response.text}")

                if response.status_code == 200:
                    result = "Task deleted successfully."
                else:
                    result = f"Failed to delete task: {response.text}"
            
            else:
                result = f"Unknown tool: {tool_name}"
        
        return {"result": result, "success": True}
    
    except Exception as e:
        error_msg = f"{type(e).__name__}: {e}"
        print(f"MCP: Error in call_tool - {error_msg}")
        print(f"MCP: Traceback:\n{traceback.format_exc()}")
        return {"result": f"Error executing tool: {error_msg}", "success": False}

@app.get("/")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "HTTP-based MCP Server"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8003)