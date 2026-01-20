"""
Delete Task Skill for AI Agent
Handles deleting tasks
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

class DeleteTaskSkill:
    def __init__(self):
        self.name = "delete_task"
        self.description = "Delete a task"

    async def execute(self, task_id: str, user_id: str) -> str:
        """
        Execute the delete task skill

        Args:
            task_id: The ID of the task to delete
            user_id: The ID of the user deleting the task

        Returns:
            Result of the operation
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.delete(
                    f"{BACKEND_BASE_URL}/api/{user_id}/tasks/{task_id}",
                    headers=get_headers()
                )

                if response.status_code == 200:
                    return "Task deleted successfully."
                else:
                    return f"Failed to delete task: {response.text}"
        except Exception as e:
            return f"Error deleting task: {str(e)}"