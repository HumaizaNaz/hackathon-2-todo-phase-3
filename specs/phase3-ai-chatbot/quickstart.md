# Quickstart Guide: Phase 3 AI Chatbot

## Overview

This guide will help you set up and run the AI-powered task management chatbot. The system consists of a frontend chat interface, a backend API, an AI agent service, and an MCP server for tools.

## Prerequisites

- Python 3.12+
- Node.js 18+
- Access to Google Generative AI (for Gemini API key)
- Neon DB account

## Environment Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Set up the backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Set up the AI agent:
   ```bash
   cd ai-agent
   pip install -r requirements.txt
   ```

4. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

## Configuration

Create a `.env` file in each service directory with the following variables:

### Backend (.env)
```
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
SECRET_KEY=your-secret-key
```

### AI Agent (.env)
```
GEMINI_API_KEY=your-gemini-api-key
BACKEND_BASE_URL=http://localhost:8000
MCP_SERVER_URL=http://localhost:8001
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## Database Setup

1. Run the initial migration:
   ```bash
   cd backend
   python -m alembic upgrade head
   ```

   Or execute the migration script manually:
   ```sql
   -- migrations/001_initial_tables.sql
   CREATE TABLE users (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       email VARCHAR(255) UNIQUE NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE TABLE tasks (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       user_id UUID REFERENCES users(id),
       title VARCHAR(255) NOT NULL,
       description TEXT,
       completed BOOLEAN DEFAULT FALSE,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE TABLE conversations (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       user_id UUID REFERENCES users(id),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE TABLE messages (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       user_id UUID REFERENCES users(id),
       conversation_id UUID REFERENCES conversations(id),
       role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
       content TEXT NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

## Running the Application

1. Start the backend API:
   ```bash
   cd backend
   uvicorn main:app --reload --port 8000
   ```

2. Start the MCP server:
   ```bash
   cd mcp-server
   python main.py
   ```

3. Start the AI agent:
   ```bash
   cd ai-agent
   python main.py
   ```

4. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

5. Visit `http://localhost:3000` to access the chat interface.

## Testing the Chatbot

1. Navigate to the dashboard page in the frontend
2. The chat interface will connect to the backend API
3. Type natural language commands like:
   - "Add a task to buy groceries"
   - "Show me my tasks"
   - "Mark task 1 as complete"
   - "Delete the meeting task"

## API Endpoints

### Chat Endpoint
- `POST /api/{user_id}/chat`
- Request body: `{"message": "string", "conversation_id": "string"}`
- Response: `{"conversation_id": "string", "response": "string", "tool_calls": []}`

## Troubleshooting

- If the AI agent can't connect to the MCP server, verify that both services are running and the URLs are configured correctly
- If database operations fail, check the connection string and ensure the database is accessible
- If the chat interface doesn't load, verify that the frontend is running and the API base URL is correct

## Next Steps

- Customize the system prompt in the AI agent configuration
- Add new skills/subagents for additional functionality
- Extend the data model with additional entities as needed