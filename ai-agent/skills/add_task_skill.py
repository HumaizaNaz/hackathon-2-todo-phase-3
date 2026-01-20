"""
Add Task Skill for AI Agent
Handles adding new tasks based on natural language input
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

class AddTaskSkill:
    def __init__(self):
        self.name = "add_task"
        self.description = "Add a new task to the user's task list"

    async def execute(self, title: str, description: str = "", user_id: str = "") -> str:
        """
        Execute the add task skill

        Args:
            title: The title of the task to add
            description: Optional description of the task
            user_id: The ID of the user adding the task

        Returns:
            Result of the operation
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{BACKEND_BASE_URL}/api/{user_id}/tasks",
                    json={"title": title, "description": description},
                    headers=get_headers()
                )

                if response.status_code in [200, 201]:
                    task_data = response.json()
                    return f"Successfully added task: '{task_data.get('title', title)}'"
                else:
                    return f"Failed to add task: {response.text}"
        except Exception as e:
            return f"Error adding task: {str(e)}"