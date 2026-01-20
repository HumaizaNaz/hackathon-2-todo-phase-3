import pytest
from src.models import Task
from src.services import TaskService

@pytest.fixture
def task_service():
    """Fixture to create a new TaskService for each test."""
    # The service needs to be reset for each test to have a clean state.
    # A simple way to do this is to re-import it or re-initialize the global TASKS dictionary.
    # For this implementation, we will assume the TaskService constructor handles this reset.
    return TaskService()

def test_create_task(task_service):
    """Test creating a new task."""
    task = task_service.create_task("Test Title", "Test Description")
    assert task.id == 1
    assert task.title == "Test Title"
    assert task.description == "Test Description"
    assert not task.completed
    assert task_service.get_task(1) == task

def test_get_all_tasks(task_service):
    """Test getting all tasks."""
    task1 = task_service.create_task("Test 1", "Desc 1")
    task2 = task_service.create_task("Test 2", "Desc 2")
    tasks = task_service.get_all_tasks()
    assert len(tasks) == 2
    assert task1 in tasks
    assert task2 in tasks

def test_get_task_not_found(task_service):
    """Test getting a task that does not exist."""
    assert task_service.get_task(999) is None

def test_update_task(task_service):
    """Test updating a task."""
    task = task_service.create_task("Old Title", "Old Desc")
    updated_task = task_service.update_task(task.id, "New Title", "New Desc")
    assert updated_task is not None
    assert updated_task.title == "New Title"
    assert updated_task.description == "New Desc"
    retrieved_task = task_service.get_task(task.id)
    assert retrieved_task is not None
    assert retrieved_task.title == "New Title"

def test_update_task_not_found(task_service):
    """Test updating a task that does not exist."""
    updated_task = task_service.update_task(999, "New Title", "New Desc")
    assert updated_task is None

def test_delete_task(task_service):
    """Test deleting a task."""
    task = task_service.create_task("To Be Deleted", "Delete me")
    result = task_service.delete_task(task.id)
    assert result is True
    assert task_service.get_task(task.id) is None

def test_delete_task_not_found(task_service):
    """Test deleting a task that does not exist."""
    result = task_service.delete_task(999)
    assert result is False

def test_toggle_completion(task_service):
    """Test toggling a task's completion status."""
    task = task_service.create_task("Test Toggle", "Toggle me")
    assert not task.completed
    
    # Toggle to complete
    completed_task = task_service.toggle_task_completion(task.id)
    assert completed_task is not None
    assert completed_task.completed
    retrieved_task = task_service.get_task(task.id)
    assert retrieved_task is not None
    assert retrieved_task.completed
    
    # Toggle back to incomplete
    incompleted_task = task_service.toggle_task_completion(task.id)
    assert incompleted_task is not None
    assert not incompleted_task.completed
    retrieved_task = task_service.get_task(task.id)
    assert retrieved_task is not None
    assert not retrieved_task.completed

def test_toggle_completion_not_found(task_service):
    """Test toggling a task that does not exist."""
    result = task_service.toggle_task_completion(999)
    assert result is None
