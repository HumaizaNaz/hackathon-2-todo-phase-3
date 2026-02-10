"""
Custom AI Agent for Phase 3 AI Chatbot
Handles natural language processing and uses MCP tools for task operations
"""

import os
import httpx
import json
from typing import Dict, List, Any, Optional
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from openai import OpenAI

# OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

MODEL_NAME = "gpt-4o-mini"


class Message(BaseModel):
    role: str
    content: str


# --- Tool Definitions for OpenAI Function Calling ---
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "create_task",
            "description": "Add a new task to the user's task list",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                },
                "required": ["title"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_tasks",
            "description": "List all tasks for a user",
            "parameters": {"type": "object", "properties": {}, "required": []}
        }
    },
    {
        "type": "function",
        "function": {
            "name": "update_task",
            "description": "Update an existing task. Either task_id or task_title must be provided.",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_id": {"type": "integer"},
                    "task_title": {"type": "string"},
                    "title": {"type": "string"},
                    "status": {"type": "string"},
                    "description": {"type": "string"},
                    "append_description": {"type": "string"},
                },
                "required": []
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "delete_task",
            "description": "Delete a task. Either task_id or task_title must be provided.",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_id": {"type": "integer"},
                    "task_title": {"type": "string"}
                },
                "required": []
            }
        }
    }
]


class Agent:
    def __init__(self):
        self.system_prompt = """You are a helpful productivity assistant that helps users manage their tasks.
You have access to tools to create, list, update, and delete tasks.
Always respond in a helpful and friendly manner.
"""

    async def process(
        self,
        user_input: str,
        conversation_history: List[Dict[str, str]],
        user_id: str,
        conversation_id: str = None,
        auth_token: str = None
    ) -> tuple[str, List[Dict[str, Any]]]:

        messages_for_llm = [
            {"role": "system", "content": self.system_prompt},
            *conversation_history,
            {"role": "user", "content": user_input}
        ]

        try:
            response = client.chat.completions.create(
                model=MODEL_NAME,
                messages=messages_for_llm,
                tools=TOOLS,
                tool_choice="auto"
            )

            response_message = response.choices[0].message
            tool_calls = response_message.tool_calls

            if tool_calls:
                # Process each tool call
                executed_tools = []
                for tool_call in tool_calls:
                    function_name = tool_call.function.name
                    function_args = json.loads(tool_call.function.arguments)
                    function_args["session_token"] = auth_token

                    # Fix for update_task: ensure task_id exists
                    if function_name == "update_task":
                        function_args = await self._resolve_task_id(function_args, auth_token)

                    tool_result_str = await self._execute_mcp_tool(function_name, function_args)
                    executed_tools.append({"name": function_name, "arguments": function_args})

                    # Update conversation for second LLM call
                    messages_for_llm.append(response_message)
                    messages_for_llm.append({
                        "tool_call_id": tool_call.id,
                        "role": "tool",
                        "name": function_name,
                        "content": tool_result_str
                    })

                second_response = client.chat.completions.create(
                    model=MODEL_NAME,
                    messages=messages_for_llm
                )

                return second_response.choices[0].message.content, executed_tools

            else:
                return response_message.content, []

        except Exception as e:
            return f"I'm sorry, I encountered an error: {str(e)}", []

    async def _resolve_task_id(self, params: Dict[str, Any], session_token: str) -> Dict[str, Any]:
        """
        If task_id is missing but task_title exists, fetch tasks and find the correct ID.
        """
        if "task_id" in params and params["task_id"]:
            return params

        if "task_title" not in params or not params["task_title"]:
            return params  # Nothing to resolve

        MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://localhost:8003")
        headers = {"Content-Type": "application/json"}

        tasks = []
        async with httpx.AsyncClient(timeout=30) as http_client:
            try:
                # Use POST (not GET) — MCP server only accepts POST for /call_tool
                r = await http_client.post(
                    f"{MCP_SERVER_URL}/call_tool",
                    json={"tool_name": "get_tasks", "parameters": {"session_token": session_token}},
                    headers=headers
                )
                data = r.json()
                result = data.get("result", [])
                # MCP get_tasks returns formatted text, so fetch raw tasks from backend directly
                if isinstance(result, str):
                    # Fallback: call backend directly for raw task data
                    from urllib.parse import urlparse
                    backend_url = os.getenv("BACKEND_URL", "http://localhost:8000")
                    backend_headers = {"Content-Type": "application/json", "Authorization": f"Bearer {session_token}"}
                    r2 = await http_client.get(f"{backend_url}/api/tasks/", headers=backend_headers)
                    if r2.status_code == 200:
                        tasks = r2.json()
                elif isinstance(result, list):
                    tasks = result
            except Exception as e:
                print(f"Agent: Error resolving task_id: {e}")
                tasks = []

        # Match title ignoring case
        matching_task = next((t for t in tasks if isinstance(t, dict) and params["task_title"].lower() in t.get("title", "").lower()), None)
        if matching_task:
            params["task_id"] = matching_task["id"]
            params.pop("task_title", None)

        return params

    async def _execute_mcp_tool(self, tool_name: str, params: Dict[str, Any]) -> str:
        MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://localhost:8003")
        headers = {"Content-Type": "application/json"}
        tool_call_data = {"tool_name": tool_name, "parameters": params}

        async with httpx.AsyncClient(timeout=30) as http:
            try:
                r = await http.post(f"{MCP_SERVER_URL}/call_tool", json=tool_call_data, headers=headers)
                if r.status_code == 200:
                    return json.dumps(r.json())
                else:
                    return json.dumps({"error": r.text, "status_code": r.status_code})
            except Exception as e:
                return f"Error connecting to MCP server: {str(e)}"


agent_instance = Agent()


async def process_user_input(
    user_input: str,
    conversation_history: List[Dict[str, str]],
    user_id: str,
    conversation_id: str = None,
    auth_token: str = None
):
    return await agent_instance.process(user_input, conversation_history, user_id, conversation_id, auth_token)
