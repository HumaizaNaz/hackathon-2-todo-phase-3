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
    task_id: int,
    title: Optional[str] = None,
    status: Optional[str] = None,
    description: Optional[str] = None
) -> Dict[str, Any]:
    payload = {}
    if title is not None:
        payload["title"] = title
    if status is not None:
        payload["completed"] = status.lower() in ['completed', 'done', 'finished']  # Convert status to boolean for backend
    if description is not None:
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
            description="Update a task",
            inputSchema={
                "type": "object",
                "properties": {
                    "session_token": {"type": "string", "description": "The session token for authentication"},
                    "task_id": {"type": "integer", "description": "The ID of the task to update"},
                    "title": {"type": "string", "description": "New title for the task (optional)"},
                    "status": {"type": "string", "description": "New status for the task (optional)"},
                    "description": {"type": "string", "description": "New description for the task (optional)"}
                },
                "required": ["session_token", "task_id"]
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
