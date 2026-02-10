# tools.py
from mcp.server.fastmcp import FastMCP
import httpx
import os
from typing import Optional, List, Dict, Any

BASE_URL = os.getenv("BACKEND_URL", "http://localhost:8000")
BACKEND_URL = f"{BASE_URL}/api"

# Helper function to create headers with optional token
def get_headers(token: Optional[str] = None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers

async def _get_task_by_title(session_token: str, title: str) -> Optional[int]:
    """Helper to find a task ID by its title."""
    tasks = await get_tasks(session_token)
    matching_tasks = [task for task in tasks if task.get("title", "").lower() == title.lower()]
    
    if len(matching_tasks) == 1:
        return matching_tasks[0]["id"]
    elif len(matching_tasks) > 1:
        # For now, return the first one. A more robust solution might ask for clarification.
        return matching_tasks[0]["id"]
    return None

# Define FastMCP tools
async def get_tasks(session_token: str) -> List[Dict[str, Any]]:
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{BACKEND_URL}/tasks/", headers=get_headers(session_token))
        resp.raise_for_status()
        return resp.json()

async def create_task(session_token: str, title: str, description: Optional[str] = None) -> Dict[str, Any]:
    payload = {"title": title}
    if description:
        payload["description"] = description
    async with httpx.AsyncClient() as client:
        resp = await client.post(f"{BACKEND_URL}/tasks/", json=payload, headers=get_headers(session_token))
        resp.raise_for_status()
        return resp.json()

async def update_task(
    session_token: str,
    task_id: Optional[int] = None,
    task_title: Optional[str] = None,
    title: Optional[str] = None,
    status: Optional[str] = None,
    description: Optional[str] = None,
    append_description: Optional[str] = None
) -> Dict[str, Any]:
    # Resolve task_id if task_title is provided
    if task_id is None and task_title is not None:
        resolved_task_id = await _get_task_by_title(session_token, task_title)
        if resolved_task_id is None:
            raise ValueError(f"No task found with title: {task_title}")
        task_id = resolved_task_id
    elif task_id is None:
        raise ValueError("Either task_id or task_title must be provided.")
    
    payload = {}
    if title is not None:
        payload["title"] = title
    if status is not None:
        payload["completed"] = status.lower() in ['completed', 'done', 'finished']  # Convert status to boolean for backend
    
    if append_description is not None:
        # Fetch current task to get existing description
        async with httpx.AsyncClient() as client:
            current_task_resp = await client.get(f"{BACKEND_URL}/tasks/{task_id}", headers=get_headers(session_token))
            current_task_resp.raise_for_status()
            current_task = current_task_resp.json()
            
            existing_description = current_task.get("description", "")
            new_description = f"{existing_description}\n{append_description}".strip()
            payload["description"] = new_description
    elif description is not None:
        payload["description"] = description

    async with httpx.AsyncClient() as client:
        resp = await client.put(f"{BACKEND_URL}/tasks/{task_id}", json=payload, headers=get_headers(session_token))
        resp.raise_for_status()
        return resp.json()

async def delete_task(session_token: str, task_id: int) -> Dict[str, Any]:
    async with httpx.AsyncClient() as client:
        resp = await client.delete(f"{BACKEND_URL}/tasks/{task_id}", headers=get_headers(session_token))
        resp.raise_for_status()
        return resp.json()


# Import the Tool class and define the get_tools function
from mcp.types import Tool

def get_tools():
    """Return list of MCP tools"""
    return [
        Tool(
            name="get_tasks",
            description="List all tasks for a user",
            inputSchema={
                "type": "object",
                "properties": {
                    "session_token": {"type": "string", "description": "The session token for authentication"}
                },
                "required": ["session_token"]
            }
        ),
        Tool(
            name="create_task",
            description="Add a new task to the user's task list",
            inputSchema={
                "type": "object",
                "properties": {
                    "session_token": {"type": "string", "description": "The session token for authentication"},
                    "title": {"type": "string", "description": "The title of the task"},
                    "description": {"type": "string", "description": "Optional description of the task"}
                },
                "required": ["session_token", "title"]
            }
        ),
        Tool(
            name="update_task",
            description="Update a task by ID or title",
            inputSchema={
                "type": "object",
                "properties": {
                    "session_token": {"type": "string", "description": "The session token for authentication"},
                    "task_id": {"type": "integer", "description": "The ID of the task to update (optional if task_title is provided)"},
                    "task_title": {"type": "string", "description": "The title of the task to update (optional if task_id is provided)"},
                    "title": {"type": "string", "description": "New title for the task (optional)"},
                    "status": {"type": "string", "description": "New status for the task (optional, e.g., 'completed', 'pending')"},
                    "description": {"type": "string", "description": "New description for the task (optional)"},
                    "append_description": {"type": "string", "description": "Content to append to the existing description (optional)"}
                },
                "required": ["session_token"],
                "anyOf": [{"required": ["task_id"]}, {"required": ["task_title"]}]
            }
        ),
        Tool(
            name="delete_task",
            description="Delete a task",
            inputSchema={
                "type": "object",
                "properties": {
                    "session_token": {"type": "string", "description": "The session token for authentication"},
                    "task_id": {"type": "integer", "description": "The ID of the task to delete"}
                },
                "required": ["session_token", "task_id"]
            }
        )
    ]
