from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from sqlalchemy import text
from typing import List
from uuid import UUID
from pydantic import BaseModel
from typing import Optional
import json
from datetime import datetime

from models.task import Task
from models.user import User
from core.db import get_session
from core.jwt_auth import verify_jwt_token

router = APIRouter()

# Pydantic model for task creation
class TaskCreate(BaseModel):
    title: str
    description: str | None = None

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    completed: bool | None = None

class TaskToggleComplete(BaseModel):
    completed: bool

@router.post("/", response_model=Task)
def create_task(task: TaskCreate, user_id: UUID = Depends(verify_jwt_token), session: Session = Depends(get_session)):
    current_time = datetime.utcnow()
    new_task = Task(
        title=task.title,
        description=task.description,
        user_id=user_id,
        created_at=current_time,
        updated_at=current_time
    )
    session.add(new_task)
    session.commit()
    session.refresh(new_task)

    return new_task

@router.get("/", response_model=List[Task])
def get_tasks(user_id: UUID = Depends(verify_jwt_token), session: Session = Depends(get_session)):
    import logging
    logging.basicConfig(level=logging.INFO)
    logging.info(f"Fetching tasks for user_id: {user_id}")
    
    tasks = session.exec(select(Task).where(Task.user_id == user_id)).all()
    
    logging.info(f"Found {len(tasks)} tasks for user_id: {user_id}")
    logging.info(f"Tasks: {tasks}")
    
    return tasks

@router.get("/{task_id}", response_model=Task)
def get_task(task_id: int, user_id: UUID = Depends(verify_jwt_token), session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=Task)
def update_task(task_id: int, task_update: TaskUpdate, user_id: UUID = Depends(verify_jwt_token), session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")

    # Update task fields if provided
    if task_update.title is not None:
        task.title = task_update.title
    if task_update.description is not None:
        task.description = task_update.description
    if task_update.completed is not None:
        task.completed = task_update.completed

    # Set updated_at timestamp (set to current time)
    task.updated_at = datetime.utcnow()

    # If created_at is None (for existing records), set it to current time
    if task.created_at is None:
        task.created_at = task.updated_at

    session.add(task)
    session.commit()
    session.refresh(task)

    return task

@router.patch("/{task_id}/toggle-complete", response_model=Task)
def toggle_task_complete(task_id: int, toggle_data: TaskToggleComplete, user_id: UUID = Depends(verify_jwt_token), session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")

    # Update task completion status
    task.completed = toggle_data.completed
    task.updated_at = datetime.utcnow()

    # If created_at is None (for existing records), set it to current time
    if task.created_at is None:
        task.created_at = task.updated_at

    session.add(task)
    session.commit()
    session.refresh(task)

    return task

@router.delete("/{task_id}")
def delete_task(task_id: int, user_id: UUID = Depends(verify_jwt_token), session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")

    # First, delete any related records in taskhistory table to avoid foreign key constraint violations
    try:
        # Attempt to delete related task history records if they exist
        session.execute(text("DELETE FROM taskhistory WHERE task_id = :task_id"), {"task_id": task_id})
    except Exception:
        # If the table doesn't exist or there's another issue, continue with task deletion
        pass

    session.delete(task)
    session.commit()
    return {"detail": "Task deleted"}


# Profile endpoint to get user information
@router.get("/profile", response_model=User)
def get_profile(user_id: UUID = Depends(verify_jwt_token), session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
