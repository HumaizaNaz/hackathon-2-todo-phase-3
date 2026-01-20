"""
List Tasks Skill for AI Agent
Handles listing tasks for a user
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

class ListTasksSkill:
    def __init__(self):
        self.name = "list_tasks"
        self.description = "List all tasks for a user"

    async def execute(self, user_id: str) -> str:
        """
        Execute the list tasks skill

        Args:
            user_id: The ID of the user whose tasks to list

        Returns:
            List of tasks or error message
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{BACKEND_BASE_URL}/api/{user_id}/tasks",
                    headers=get_headers()
                )

                if response.status_code == 200:
                    data = response.json()
                    tasks = data.get("tasks", [])

                    if not tasks:
                        return "You have no tasks."

                    task_list = []
                    for i, task in enumerate(tasks, 1):
                        status = "✓" if task.get("completed", False) else "○"
                        task_list.append(f"{i}. [{status}] {task.get('title', 'Untitled')}")

                    return "Your tasks:\n" + "\n".join(task_list)
                else:
                    return f"Failed to list tasks: {response.text}"
        except Exception as e:
            return f"Error listing tasks: {str(e)}"