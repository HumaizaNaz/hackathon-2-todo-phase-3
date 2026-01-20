from typing import List, Optional
import uuid
from sqlmodel import Session, select
from models.task import Task
from schemas import TaskCreate, TaskUpdate

def create_task(*, task_create: TaskCreate, owner_id: uuid.UUID, session: Session) -> Task:
    db_obj = Task.from_orm(task_create)
    db_obj.user_id = owner_id
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

def get_tasks_by_owner(*, owner_id: uuid.UUID, session: Session) -> List[Task]:
    statement = select(Task).where(Task.user_id == owner_id)
    return session.exec(statement).all()

def get_task_by_id_and_owner(*, task_id: int, owner_id: uuid.UUID, session: Session) -> Optional[Task]:
    statement = select(Task).where(Task.id == task_id, Task.user_id == owner_id)
    return session.exec(statement).first()

def update_task(*, task: Task, task_update: TaskUpdate, session: Session) -> Task:
    task_data = task_update.dict(exclude_unset=True)
    for key, value in task_data.items():
        setattr(task, key, value)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

def delete_task(*, task: Task, session: Session):
    session.delete(task)
    session.commit()
