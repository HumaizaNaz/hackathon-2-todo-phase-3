"""
stdio_main.py
This file runs the original MCP server that works with stdio
"""
import asyncio
from mcp.server import Server
from tools import get_tasks, create_task, update_task, delete_task

# Initialize the server
server = Server(
    name="task-management-mcp",
    version="1.0.0",
)

# Register tools using the proper MCP protocol
server.tools.register(
    name="get_tasks",
    description="List all tasks for a user",
    handler=get_tasks,
    arguments={
        "type": "object",
        "properties": {
            "session_token": {"type": "string", "description": "The session token for authentication"}
        },
        "required": ["session_token"]
    }
)

server.tools.register(
    name="create_task",
    description="Add a new task to the user's task list",
    handler=create_task,
    arguments={
        "type": "object",
        "properties": {
            "session_token": {"type": "string", "description": "The session token for authentication"},
            "title": {"type": "string", "description": "The title of the task"},
            "description": {"type": "string", "description": "Optional description of the task"}
        },
        "required": ["session_token", "title"]
    }
)

server.tools.register(
    name="update_task",
    description="Update a task",
    handler=update_task,
    arguments={
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
)

server.tools.register(
    name="delete_task",
    description="Delete a task",
    handler=delete_task,
    arguments={
        "type": "object",
        "properties": {
            "session_token": {"type": "string", "description": "The session token for authentication"},
            "task_id": {"type": "integer", "description": "The ID of the task to delete"}
        },
        "required": ["session_token", "task_id"]
    }
)

if __name__ == "__main__":
    print("Starting MCP Server as stdio server...")
    asyncio.run(server.run_stdio())