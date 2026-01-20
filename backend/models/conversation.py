import uuid
from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship
from enum import Enum


class RoleEnum(str, Enum):
    user = "user"
    assistant = "assistant"


class Conversation(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id")
    created_at: datetime | None = Field(default=None)
    updated_at: datetime | None = Field(default=None)

    # Relationship to messages
    messages: list["Message"] = Relationship(back_populates="conversation", cascade_delete=True)


class Message(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    conversation_id: int = Field(foreign_key="conversation.id")
    user_id: uuid.UUID = Field(foreign_key="user.id")
    role: RoleEnum = Field(sa_column_kwargs={"default": RoleEnum.user})
    content: str
    created_at: datetime | None = Field(default=None)

    # Relationship to conversation
    conversation: Optional[Conversation] = Relationship(back_populates="messages")