"""
Main entry point for the AI Agent
Provides a FastAPI wrapper for the custom agent using OpenAI
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uuid
try:
    from .agent import process_user_input
except ImportError:
    # Handle direct execution
    from agent import process_user_input

# Initialize FastAPI app
app = FastAPI(
    title="AI Task Management Agent",
    description="Custom AI agent for task management using natural language via OpenAI",
    version="1.0.0"
)

# Pydantic models
class ChatRequest(BaseModel):
    message: str
    user_id: str
    conversation_id: Optional[str] = None
    auth_token: Optional[str] = None

class ChatResponse(BaseModel):
    conversation_id: str
    response: str
    tool_calls: List[Dict[str, Any]]

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Chat endpoint that processes user input and returns a response
    """
    try:
        # Generate conversation ID if not provided
        conversation_id = request.conversation_id or str(uuid.uuid4())

        # For simplicity, we're not storing conversation history in this implementation
        # In a real implementation, you would fetch the conversation history from a database
        conversation_history = []

        # Process the user input using the agent
        response_text, tool_calls = await process_user_input(
            user_input=request.message,
            conversation_history=conversation_history,
            user_id=request.user_id,
            conversation_id=request.conversation_id,
            auth_token=request.auth_token
        )

        return ChatResponse(
            conversation_id=conversation_id,
            response=response_text,
            tool_calls=tool_calls
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat request: {str(e)}")

@app.get("/")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy", "service": "AI Agent"}

# For running directly with uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8002)