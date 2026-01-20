from pydantic import BaseModel
import uuid

# User schemas
class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


# Properties shared by models stored in DB
class UserInDBBase(UserBase):
    id: uuid.UUID

    class Config:
        orm_mode = True

# Properties to return to client
class UserResponse(UserInDBBase):
    pass


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: uuid.UUID | None = None


# Shared properties
class TaskBase(BaseModel):
    title: str
    description: str | None = None
    status: str = "pending"

# Properties to receive on item creation
class TaskCreate(TaskBase):
    pass

# Properties to receive on item update
class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: str | None = None
    completed: bool | None = None

# Properties shared by models stored in DB
class TaskInDBBase(TaskBase):
    id: int
    user_id: uuid.UUID

    class Config:
        orm_mode = True

# Properties to return to client
class Task(TaskInDBBase):
    pass

# Properties stored in DB
class TaskInDB(TaskInDBBase):
    pass


# Conversation schemas
class ConversationBase(BaseModel):
    pass


class ConversationCreate(ConversationBase):
    pass


class ConversationResponse(ConversationBase):
    id: int
    user_id: uuid.UUID
    created_at: str | None = None
    updated_at: str | None = None

    class Config:
        orm_mode = True


# Message schemas
class MessageBase(BaseModel):
    conversation_id: int
    role: str
    content: str


class MessageCreate(MessageBase):
    pass


class MessageResponse(MessageBase):
    id: int
    user_id: uuid.UUID
    created_at: str | None = None

    class Config:
        orm_mode = True
