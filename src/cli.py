from src.services import TaskService
from src.models import Task
from typing import List

class CLI:
    """
    Command-line interface for the Todo application.
    """
    def __init__(self):
        """Initializes the CLI with a TaskService instance."""
        self._task_service = TaskService()

    def _display_menu(self):
        """Displays the main menu."""
        print("\n--- Todo App ---")
        print("1. Add a new task")
        print("2. View all tasks")
        print("3. Update a task")
        print("4. Delete a task")
        print("5. Mark a task as complete/incomplete")
        print("6. Exit")
        print("----------------")

    def _add_task(self):
        """Handles adding a new task."""
        title = input("Enter task title: ")
        if not title:
            print("Error: Title cannot be empty.")
            return
        description = input("Enter task description (optional): ")
        task = self._task_service.create_task(title, description)
        print(f"Task '{task.title}' created with ID {task.id}.")

    def _view_tasks(self):
        """Handles viewing all tasks."""
        tasks: List[Task] = self._task_service.get_all_tasks()
        if not tasks:
            print("No tasks found.")
            return
        print("\n--- All Tasks ---")
        for task in tasks:
            status = "[X]" if task.completed else "[ ]"
            print(f"{status} ID: {task.id}, Title: {task.title}, Description: {task.description}")
        print("-----------------")

    def _update_task(self):
        """Handles updating a task."""
        try:
            task_id_str = input("Enter the ID of the task to update: ")
            if not task_id_str.isdigit():
                print("Error: Invalid ID. Please enter a number.")
                return
            task_id = int(task_id_str)
            task = self._task_service.get_task(task_id)
            if not task:
                print("Error: Task not found.")
                return
            
            print(f"Updating Task ID: {task.id}")
            new_title = input(f"Enter new title (current: '{task.title}'): ")
            new_description = input(f"Enter new description (current: '{task.description}'): ")

            # Only update if new values are provided
            title_to_update = new_title if new_title else task.title
            description_to_update = new_description if new_description else task.description

            updated_task = self._task_service.update_task(task_id, title_to_update, description_to_update)
            if updated_task:
                print(f"Task {task_id} updated successfully.")
        except ValueError:
            print("Error: Invalid ID. Please enter a number.")

    def _delete_task(self):
        """Handles deleting a task."""
        try:
            task_id_str = input("Enter the ID of the task to delete: ")
            if not task_id_str.isdigit():
                print("Error: Invalid ID. Please enter a number.")
                return
            task_id = int(task_id_str)
            if self._task_service.delete_task(task_id):
                print(f"Task {task_id} deleted successfully.")
            else:
                print("Error: Task not found.")
        except ValueError:
            print("Error: Invalid ID. Please enter a number.")

    def _toggle_task_completion(self):
        """Handles toggling a task's completion status."""
        try:
            task_id_str = input("Enter the ID of the task to toggle: ")
            if not task_id_str.isdigit():
                print("Error: Invalid ID. Please enter a number.")
                return
            task_id = int(task_id_str)
            task = self._task_service.toggle_task_completion(task_id)
            if task:
                status = "complete" if task.completed else "incomplete"
                print(f"Task {task_id} marked as {status}.")
            else:
                print("Error: Task not found.")
        except ValueError:
            print("Error: Invalid ID. Please enter a number.")

    def run(self):
        """Runs the main loop of the CLI."""
        while True:
            self._display_menu()
            choice = input("Enter your choice (1-6): ")
            if choice == "1":
                self._add_task()
            elif choice == "2":
                self._view_tasks()
            elif choice == "3":
                self._update_task()
            elif choice == "4":
                self._delete_task()
            elif choice == "5":
                self._toggle_task_completion()
            elif choice == "6":
                print("Exiting...")
                break
            else:
                print("Error: Invalid choice. Please enter a number between 1 and 6.")
