"""
Custom AI Agent for Phase 3 AI Chatbot
Handles natural language processing and uses MCP tools for task operations
"""

import os
import httpx
from typing import Dict, List, Any, Optional
from pydantic import BaseModel

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# ✅ OPENAI SDK (OFFICIAL)
from openai import OpenAI

# ✅ OPENAI CONFIG (NO FALLBACKS)
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://api.openai.com/v1"
)

# ✅ COST-EFFECTIVE OPENAI MODEL
MODEL_NAME = "gpt-4o-mini"

# MCP Server configuration
MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://localhost:8003")

class Message(BaseModel):
    role: str
    content: str

class Agent:
    def __init__(self):
        self.system_prompt = """You are a helpful productivity assistant that helps users manage their tasks through natural language.

Your capabilities include:
1. Adding new tasks
2. Listing existing tasks
3. Updating tasks
4. Deleting tasks

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

        try:
            tool_name, params = await self._identify_mcp_tool_and_params(user_input, user_id)

            if tool_name and params:
                params["session_token"] = auth_token or ""
                tool_call = {"name": tool_name, "arguments": params}

                tool_result = await self._execute_mcp_tool(tool_name, params)

                response_prompt = f"""
User request: "{user_input}"

Tool result:
{tool_result}

Reply politely and clearly to the user.
"""

                response = client.chat.completions.create(
                    model=MODEL_NAME,
                    messages=[{"role": "user", "content": response_prompt}]
                )

                return response.choices[0].message.content, [tool_call]

            response_prompt = f"""
{self.system_prompt}

User said: "{user_input}"
"""

            response = client.chat.completions.create(
                model=MODEL_NAME,
                messages=[{"role": "user", "content": response_prompt}]
            )

            return response.choices[0].message.content, []

        except Exception as e:
            return f"I'm sorry, I encountered an error: {str(e)}", []

    async def _identify_mcp_tool_and_params(
        self, user_input: str, user_id: str
    ) -> tuple[Optional[str], Optional[Dict[str, Any]]]:

        text = user_input.lower()

        if any(w in text for w in ["add", "create", "make", "new"]):
            for w in ["add", "create", "make", "new"]:
                if w in text:
                    title = text.split(w, 1)[1].strip()
                    title = title.removeprefix("task").removeprefix("to").strip()
                    return "create_task", {"title": title or user_input}

        # Check for phrases that indicate wanting to see tasks
        if any(w in text for w in ["list", "show", "view", "display", "see", "check"]) or "my tasks" in text:
            return "get_tasks", {"user_id": user_id}

        if any(w in text for w in ["delete", "remove"]):
            import re
            nums = re.findall(r"\d+", user_input)
            return "delete_task", {"task_id": int(nums[0]) if nums else 1}

        if any(w in text for w in ["update", "complete", "done"]):
            import re
            nums = re.findall(r"\d+", user_input)
            return "update_task", {"task_id": int(nums[0]) if nums else 1, "status": "completed"}

        return None, None

    async def _execute_mcp_tool(self, tool_name: str, params: Dict[str, Any]) -> str:
        BACKEND_BASE_URL = os.getenv("BACKEND_BASE_URL", "http://localhost:8000")
        # Use the session token in the Authorization header
        session_token = params.get("session_token", "")
        headers = {"Content-Type": "application/json"}
        if session_token:
            headers["Authorization"] = f"Bearer {session_token}"

        async with httpx.AsyncClient() as http:
            if tool_name == "create_task":
                # Extract title and description from params, removing session_token
                task_data = {
                    "title": params.get("title", ""),
                    "description": params.get("description", "")
                }
                r = await http.post(f"{BACKEND_BASE_URL}/api/tasks/", json=task_data, headers=headers)
                return "Task added successfully." if r.status_code in (200, 201) else r.text

            if tool_name == "get_tasks":
                r = await http.get(f"{BACKEND_BASE_URL}/api/tasks/", headers=headers)
                if r.status_code == 200:
                    tasks = r.json()
                    if not tasks:
                        return "No tasks found for you. Feel free to add one!"
                    return r.text
                else:
                    return r.text

            if tool_name == "update_task":
                task_data = {"completed": True}  # Only set completed status to True
                if "title" in params:
                    task_data["title"] = params["title"]
                if "description" in params:
                    task_data["description"] = params["description"]

                r = await http.put(
                    f"{BACKEND_BASE_URL}/api/tasks/{params['task_id']}",
                    json=task_data,
                    headers=headers
                )
                return "Task updated successfully." if r.status_code == 200 else r.text

            if tool_name == "delete_task":
                r = await http.delete(
                    f"{BACKEND_BASE_URL}/api/tasks/{params['task_id']}",
                    headers=headers
                )
                return "Task deleted successfully." if r.status_code == 200 else r.text

        return "Unknown action"

# ✅ SINGLETON
agent_instance = Agent()

async def process_user_input(
    user_input: str,
    conversation_history: List[Dict[str, str]],
    user_id: str,
    conversation_id: str = None,
    auth_token: str = None
):
    return await agent_instance.process(user_input, conversation_history, user_id, conversation_id, auth_token)
