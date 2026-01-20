# Research: Phase 3 AI Chatbot

## Executive Summary

This document outlines the key research findings and decisions for implementing the Phase 3 AI Chatbot. The system will use a custom agent architecture with MCP SDK tools to provide natural language task management capabilities.

## Technology Decisions

### 1. Custom Agent Architecture

**Decision**: Implement a custom agent loop with subagents/skills architecture
**Rationale**: Provides flexibility to work with free LLMs like Gemini, enables reusable intelligence through skills, and allows for fine-grained control over the agent behavior
**Alternatives considered**:
- OpenAI Agents SDK: Would require paid API usage
- LangChain agents: Less control over the specific flow requirements
- Simple function calling: Doesn't support the 9-step flow requirement

### 2. LLM Selection

**Decision**: Use Google Generative AI (Gemini) for cost-effective LLM access
**Rationale**: Offers free tier, good natural language understanding for task management commands, and strong function calling capabilities
**Alternatives considered**:
- OpenAI GPT: Would incur costs
- Anthropic Claude: Would incur costs
- Open-source models: Would require infrastructure management

### 3. Database Solution

**Decision**: Use Neon DB with SQLModel ORM
**Rationale**: Serverless PostgreSQL with excellent scalability, good Python integration, and cost-effective pricing
**Alternatives considered**:
- SQLite: Not suitable for concurrent users
- MongoDB: Would require different data modeling approach
- Supabase: Similar to Neon but with more complexity for this use case

### 4. Backend Framework

**Decision**: Use FastAPI for the backend API
**Rationale**: High-performance, excellent async support, automatic API documentation, and strong typing
**Alternatives considered**:
- Flask: Less modern, no automatic documentation
- Django: Overkill for this API-only use case
- Express.js: Would require switching to JavaScript/TypeScript

### 5. Frontend Framework

**Decision**: Use Next.js with OpenAI ChatKit for UI
**Rationale**: Server-side rendering, excellent developer experience, and ChatKit provides pre-built chat interface components
**Alternatives considered**:
- React with vanilla components: Would require more UI development
- Vue.js: Would require learning curve for team
- Angular: Overkill for this application

## Architecture Patterns

### 1. 9-Step Conversation Flow

The system will implement a 9-step conversation flow:
1. Receive message from user
2. Fetch conversation history
3. Build context from history
4. Process natural language input
5. Select appropriate skill/tool
6. Execute skill/tool
7. Update conversation state
8. Generate response
9. Send response to user

### 2. Stateless API Design

The chat endpoint will be stateless with all state maintained in the database. The conversation_id will be used to retrieve and update conversation context.

### 3. MCP Tools Design

MCP tools will be stateless and communicate with the backend via HTTP with authentication tokens. Each tool corresponds to a specific task operation (add, list, complete, delete, update).

## Skills/Subagents Design

### Available Skills:
- `add_task_skill`: Handles natural language requests to create new tasks
- `list_tasks_skill`: Handles requests to retrieve and display tasks
- `complete_task_skill`: Handles requests to mark tasks as completed
- `delete_task_skill`: Handles requests to remove tasks
- `update_task_skill`: Handles requests to modify existing tasks

Each skill will follow the same pattern: receive parameters, validate input, execute database operation, return structured response.

## Error Handling Strategy

- Invalid input: "Sorry, I didn't understand. Could you rephrase that?"
- Multi-turn conversations: Use conversation_id to maintain context
- Task not found: Graceful error messages with suggestions
- Database errors: Fallback responses with error logging