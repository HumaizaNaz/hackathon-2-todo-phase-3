"""
Update Task Skill for AI Agent
Handles updating task details
"""
import httpx
import os
from typing import Dict, Any, Optional

BACKEND_BASE_URL = os.getenv("BACKEND_BASE_URL", "http://localhost:8000")
TOKEN = os.getenv("BACKEND_TOKEN")

def get_headers():
    headers = {"Content-Type": "application/json"}
    if TOKEN:
        headers["Authorization"] = f"Bearer {TOKEN}"
    return headers

class UpdateTaskSkill:
    def __init__(self):
        self.name = "update_task"
        self.description = "Update a task"

    async def execute(self, task_id: str, title: str = None, description: str = None, completed: bool = None, user_id: str = "") -> str:
        """
        Execute the update task skill

        Args:
            task_id: The ID of the task to update
            title: New title for the task (optional)
            description: New description for the task (optional)
            completed: New completion status (optional)
            user_id: The ID of the user updating the task

        Returns:
            Result of the operation
        """
        try:
            update_data = {}
            if title is not None:
                update_data["title"] = title
            if description is not None:
                update_data["description"] = description
            if completed is not None:
                update_data["completed"] = completed

            if not update_data:
                return "No updates provided."

            async with httpx.AsyncClient() as client:
                response = await client.patch(
                    f"{BACKEND_BASE_URL}/api/{user_id}/tasks/{task_id}",
                    json=update_data,
                    headers=get_headers()
                )

                if response.status_code == 200:
                    return "Task updated successfully."
                else:
                    return f"Failed to update task: {response.text}"
        except Exception as e:
            return f"Error updating task: {str(e)}"