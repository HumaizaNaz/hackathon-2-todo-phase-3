import uuid
from typing import List
from sqlmodel import SQLModel, Field, Relationship

class User(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str = Field(unique=True, index=True, max_length=255)
    name: str | None = Field(default=None, max_length=255)  # Add name field
    hashed_password: str = Field(max_length=255)

    tasks: List["Task"] = Relationship(back_populates="owner", sa_relationship_kwargs={"lazy": "select"})  # noqa: F821
