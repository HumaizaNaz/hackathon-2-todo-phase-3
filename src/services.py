from src.models import Task
from typing import Dict, List, Optional

class TaskService:
    """
    A service class for handling task-related business logic.
    """
    def __init__(self):
        """Initializes the TaskService with an in-memory task storage."""
        self._tasks: Dict[int, Task] = {}
        self._next_id: int = 1

    def create_task(self, title: str, description: str) -> Task:
        """
        Creates a new task and adds it to the storage.
        """
        task = Task(id=self._next_id, title=title, description=description)
        self._tasks[self._next_id] = task
        self._next_id += 1
        return task

    def get_all_tasks(self) -> List[Task]:
        """
        Retrieves all tasks.
        """
        return list(self._tasks.values())

    def get_task(self, task_id: int) -> Optional[Task]:
        """
        Retrieves a single task by its ID.
        """
        return self._tasks.get(task_id)

    def update_task(self, task_id: int, title: str, description: str) -> Optional[Task]:
        """
        Updates an existing task.
        """
        task = self.get_task(task_id)
        if task:
            if title:
                task.title = title
            if description:
                task.description = description
            return task
        return None

    def delete_task(self, task_id: int) -> bool:
        """
        Deletes a task.
        """
        if task_id in self._tasks:
            del self._tasks[task_id]
            return True
        return False

    def toggle_task_completion(self, task_id: int) -> Optional[Task]:
        """
        Toggles the completion status of a task.
        """
        task = self.get_task(task_id)
        if task:
            task.completed = not task.completed
            return task
        return None