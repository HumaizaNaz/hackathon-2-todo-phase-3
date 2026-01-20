"""
Simple HTTP-based MCP Server for Task Management
This provides HTTP endpoints that mimic MCP functionality for the AI agent
"""
import asyncio
from typing import Dict, Any, List
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

@app.post("/call_tool")
async def call_tool(request: ToolCallRequest):
    """Endpoint to call tools via HTTP for compatibility with AI agent"""
    tool_name = request.tool_name
    parameters = request.parameters

    try:
        async with httpx.AsyncClient() as client:
            if tool_name == "get_tasks":
                session_token = parameters.get("session_token", "")
                response = await client.get(
                    f"{BACKEND_BASE_URL}/api/tasks/",
                    headers=get_headers(session_token)
                )
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
                session_token = parameters.get("session_token", "")
                payload = {
                    "title": parameters["title"],
                    "description": parameters.get("description", "")
                }
                response = await client.post(
                    f"{BACKEND_BASE_URL}/api/tasks/",
                    json=payload,
                    headers=get_headers(session_token)
                )
                if response.status_code in [200, 201]:
                    task_data = response.json()
                    result = f"Added task: {task_data.get('title', parameters['title'])}"
                else:
                    result = f"Failed to add task: {response.text}"
            
            elif tool_name == "update_task":
                session_token = parameters.get("session_token", "")
                task_id = parameters["task_id"]
                
                payload = {}
                if "title" in parameters and parameters["title"] is not None:
                    payload["title"] = parameters["title"]
                if "description" in parameters and parameters["description"] is not None:
                    payload["description"] = parameters["description"]
                if "status" in parameters and parameters["status"] is not None:
                    # Convert status to completed boolean if needed
                    if parameters["status"] in ["completed", "done", "finished"]:
                        payload["completed"] = True
                    elif parameters["status"] in ["pending", "not completed", "incomplete"]:
                        payload["completed"] = False
                
                if not payload:
                    return {"result": "No updates provided.", "success": False}
                
                response = await client.put(
                    f"{BACKEND_BASE_URL}/api/tasks/{task_id}",
                    json=payload,
                    headers=get_headers(session_token)
                )
                if response.status_code == 200:
                    result = "Task updated successfully."
                else:
                    result = f"Failed to update task: {response.text}"
            
            elif tool_name == "delete_task":
                session_token = parameters.get("session_token", "")
                task_id = parameters["task_id"]
                
                response = await client.delete(
                    f"{BACKEND_BASE_URL}/api/tasks/{task_id}",
                    headers=get_headers(session_token)
                )
                if response.status_code == 200:
                    result = "Task deleted successfully."
                else:
                    result = f"Failed to delete task: {response.text}"
            
            else:
                result = f"Unknown tool: {tool_name}"
        
        return {"result": result, "success": True}
    
    except Exception as e:
        return {"result": f"Error executing tool: {str(e)}", "success": False}

@app.get("/")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "HTTP-based MCP Server"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8003)