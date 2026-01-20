from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlmodel import Session, select
from datetime import datetime
import httpx
import os
import uuid
from pydantic import BaseModel

from core.db import get_session
from core.jwt_auth import verify_jwt_token
from models.user import User
from models.conversation import Conversation, Message
from schemas import ConversationCreate, MessageCreate
from uuid import UUID

router = APIRouter(tags=["chat"])

# AI Agent configuration
AI_AGENT_URL = os.getenv("AI_AGENT_URL", "http://localhost:8002")

# Security scheme to get raw token
security = HTTPBearer(auto_error=True)


def get_raw_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """Extract raw JWT token from Authorization header"""
    return credentials.credentials


class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None



@router.get("/conversations", response_model=List[Conversation])
def get_user_conversations(
    session: Session = Depends(get_session),
    current_user_id: UUID = Depends(verify_jwt_token)
):
    """
    Get all conversations for the current user
    """
    conversations = session.exec(
        select(Conversation)
        .where(Conversation.user_id == current_user_id)
        .order_by(Conversation.updated_at.desc())
    ).all()
    return conversations

@router.get("/{conversation_id}/history", response_model=List[Message])
def get_conversation_history(
    conversation_id: int,
    session: Session = Depends(get_session),
    current_user_id: UUID = Depends(verify_jwt_token)
):
    """
    Get the history of a specific conversation
    """
    # Fetch the conversation to ensure the user has access
    db_conversation = session.get(Conversation, conversation_id)
    if not db_conversation or db_conversation.user_id != current_user_id:
        raise HTTPException(status_code=404, detail="Conversation not found")

    # Fetch messages for the conversation
    messages = session.exec(
        select(Message)
        .where(Message.conversation_id == conversation_id)
        .order_by(Message.created_at)
    ).all()

    return messages

@router.post("/{user_id}")
async def chat_with_ai(
    user_id: str,
    request: ChatRequest,  # Accept the request body as a Pydantic model
    session: Session = Depends(get_session),
    current_user_id: UUID = Depends(verify_jwt_token),
    raw_token: str = Depends(get_raw_token)
):
    """
    Chat endpoint that integrates with the AI agent
    Creates or continues a conversation with the AI agent
    """
    # Validate that the user_id matches the authenticated user
    if str(current_user_id) != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this conversation")

    # Get or create conversation
    db_conversation = None
    if request.conversation_id:
        # Fetch existing conversation
        db_conversation = session.get(Conversation, request.conversation_id)
        if not db_conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        if db_conversation.user_id != current_user_id:
            raise HTTPException(status_code=403, detail="Not authorized to access this conversation")
    else:
        # Create new conversation
        db_conversation = Conversation(
            user_id=current_user_id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        session.add(db_conversation)
        session.commit()
        session.refresh(db_conversation)

    # Store user message in database
    user_message = Message(
        conversation_id=db_conversation.id,
        user_id=current_user_id,
        role="user",
        content=request.message,
        created_at=datetime.now()
    )
    session.add(user_message)
    session.commit()

    # Fetch conversation history for context
    conversation_history = session.exec(
        select(Message)
        .where(Message.conversation_id == db_conversation.id)
        .order_by(Message.created_at)
    ).all()

    # Prepare messages for AI agent (convert to the format expected by the agent)
    messages_for_agent = []
    for msg in conversation_history:
        messages_for_agent.append({
            "role": msg.role,
            "content": msg.content
        })

    # Call AI agent
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{AI_AGENT_URL}/chat",
                json={
                    "message": request.message,
                    "user_id": str(current_user_id),
                    "conversation_id": str(db_conversation.id),
                    "auth_token": raw_token  # Pass the JWT token to the AI agent
                }
            )

            if response.status_code != 200:
                raise HTTPException(
                    status_code=500,
                    detail=f"AI agent error: {response.text}"
                )

            ai_response = response.json()

    except httpx.RequestError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Could not connect to AI agent: {str(e)}"
        )

    # Store AI response in database
    ai_message = Message(
        conversation_id=db_conversation.id,
        user_id=current_user_id,  # AI messages are associated with the user for consistency
        role="assistant",
        content=ai_response.get("response", ""),
        created_at=datetime.now()
    )
    session.add(ai_message)
    session.commit()

    # Update conversation timestamp
    db_conversation.updated_at = datetime.now()
    session.add(db_conversation)
    session.commit()

    return {
        "conversation_id": db_conversation.id,
        "response": ai_response.get("response", ""),
        "tool_calls": ai_response.get("tool_calls", [])
    }