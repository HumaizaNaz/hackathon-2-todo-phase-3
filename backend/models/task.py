import uuid
from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship

class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    description: str | None = Field(default=None)
    status: str = Field(default="pending")
    completed: bool = Field(default=False)
    created_at: datetime | None = Field(default=None)  # Allow None for existing records
    updated_at: datetime | None = Field(default=None)  # Allow None for existing records

    user_id: uuid.UUID = Field(foreign_key="user.id")
    owner: Optional["User"] = Relationship(back_populates="tasks")  # noqa: F821
