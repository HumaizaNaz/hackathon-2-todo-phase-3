---
id: 1
title: Configure AI Agent MCP Communication
stage: general
date: 2026-01-20
surface: agent
model: Claude Sonnet 4.5
feature: none
branch: main
user: km
command: Configure AI agent to communicate with MCP server
labels:
  - ai-agent
  - mcp-server
  - configuration
  - deployment
links:
  - spec: null
  - ticket: null
  - adr: null
  - pr: null
files:
  - ai-agent/agent.py
tests: []
---

# Configure AI Agent MCP Communication

## Summary

Updated the AI agent to properly communicate with the MCP server instead of making direct API calls to the backend. This ensures proper separation of concerns and enables standardized tool interactions through the MCP protocol.

## Context

The AI agent was originally making direct HTTP calls to the backend service instead of using the MCP server that was deployed at `https://humaiza-todo-mcp-server.hf.space`. This prevented proper integration between the components of the system.

## Changes Made

### 1. Updated AI Agent Communication Logic

Modified `ai-agent/agent.py` to replace the direct backend API calls with calls to the MCP server's HTTP wrapper endpoint (`/call_tool`).

#### Before:
```python
async def _execute_mcp_tool(self, tool_name: str, params: Dict[str, Any]) -> str:
    BACKEND_BASE_URL = os.getenv("BACKEND_BASE_URL", "http://localhost:8000")
    # Direct calls to backend
    # ...
```

#### After:
```python
async def _execute_mcp_tool(self, tool_name: str, params: Dict[str, Any]) -> str:
    # Get the MCP server URL from environment variable
    MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://localhost:8003")
    headers = {"Content-Type": "application/json"}

    # Prepare the tool call request
    tool_call_data = {
        "tool_name": tool_name,
        "parameters": params
    }

    async with httpx.AsyncClient() as http:
        try:
            # Call the MCP server's HTTP wrapper endpoint
            r = await http.post(f"{MCP_SERVER_URL}/call_tool", json=tool_call_data, headers=headers)

            if r.status_code == 200:
                response_data = r.json()
                return response_data.get("result", "Operation completed successfully.")
            else:
                return f"Error calling MCP tool: {r.text}"
        except httpx.RequestError as e:
            return f"Error connecting to MCP server: {str(e)}"
        except Exception as e:
            return f"Unexpected error: {str(e)}"
```

## Expected Outcome

- AI agent now communicates with MCP server at `https://humaiza-todo-mcp-server.hf.space`
- MCP server handles communication with the backend service
- Proper separation of concerns between AI agent and backend
- Standardized tool interaction through MCP protocol

## Validation Steps

1. Verify AI agent can reach MCP server endpoint
2. Test natural language commands that trigger tool usage
3. Confirm proper error handling when MCP server is unavailable
4. Validate that all task operations (create, read, update, delete) work through the new architecture

## Follow-up Actions

1. Redeploy the updated AI agent to `https://humaiza-ai-agent.hf.space`
2. Set the `MCP_SERVER_URL` environment variable in the AI agent deployment to `https://humaiza-todo-mcp-server.hf.space`
3. Ensure the MCP server has the correct `BACKEND_BASE_URL` environment variable set to `https://humaiza-todo-app.hf.space`

## Risks

- Network connectivity between AI agent and MCP server
- Potential latency introduced by additional network hop
- Need to ensure both services remain available for proper functionality