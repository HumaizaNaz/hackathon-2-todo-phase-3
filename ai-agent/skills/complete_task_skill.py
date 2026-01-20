"""
Complete Task Skill for AI Agent
Handles marking tasks as completed
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

class CompleteTaskSkill:
    def __init__(self):
        self.name = "complete_task"
        self.description = "Mark a task as completed"

    async def execute(self, task_id: str, user_id: str) -> str:
        """
        Execute the complete task skill

        Args:
            task_id: The ID of the task to complete
            user_id: The ID of the user completing the task

        Returns:
            Result of the operation
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.patch(
                    f"{BACKEND_BASE_URL}/api/{user_id}/tasks/{task_id}",
                    json={"completed": True},
                    headers=get_headers()
                )

                if response.status_code == 200:
                    return "Task marked as completed successfully."
                else:
                    return f"Failed to complete task: {response.text}"
        except Exception as e:
            return f"Error completing task: {str(e)}"