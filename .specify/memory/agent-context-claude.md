# Agent Context for Claude Code

## Project: Phase 3 AI Chatbot

### Technologies Used
- Python 3.12
- FastAPI
- SQLModel
- Neon DB
- Google Generative AI (Gemini)
- Next.js
- TypeScript

### Architecture
- Custom agent loop with subagents/skills for MCP tools
- Stateless chat endpoint with database state management
- OpenAI ChatKit UI for frontend
- MCP SDK for tool integration

### Key Components
- Backend API: FastAPI application handling chat endpoints
- AI Agent: Custom agent processing natural language and orchestrating skills
- MCP Server: Exposes database operations as tools
- Frontend: Next.js application with chat interface

### Skills Available
- add_task_skill: Creates new tasks from natural language
- list_tasks_skill: Retrieves and displays user tasks
- complete_task_skill: Marks tasks as completed
- delete_task_skill: Removes tasks
- update_task_skill: Modifies existing tasks