---
id: 1
title: Hackathon Phase3 AI Chatbot Constitution
stage: constitution
date: 2026-01-15
surface: agent
model: Claude Sonnet 4.5
feature: none
branch: main
user: km
command: /sp.constitution
labels: [constitution, ai-chatbot, hackathon, phase3]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

"Generate Markdown Constitution for Phase 3 of Hackathon II: Todo AI-Powered Chatbot. Base on PDF page 1 and Phase III requirements (pages 17-20): Create natural language chatbot using custom agent logic (OpenAI Agents SDK style but flexible for free LLMs like Gemini), Official MCP SDK for tools, Claude Code and Spec-Kit Plus. Focus on Reusable Intelligence (agents skills and subagent development first). Principles: Spec-Driven First (Specify -> Plan -> Tasks -> Implement), Agentic Workflow, Simplicity (stateless chat endpoint/MCP tools/DB state). Constraints (Custom agent loop for cost-free LLM, MCP SDK for tools, Neon DB for Conversation/Message models, no manual code, refine specs for Claude Code). Sections: Overview (Conversational interface for Basic CRUD via natural language), Guiding Principles, Constraints (OpenAI ChatKit domain allowlist, stateless design), Constitution Check. Deliverables: Monorepo with frontend/backend/mcp-server, specs/phase3-ai-chatbot/, migration scripts, README. Save as specs/ph"

## Response snapshot

Created a comprehensive constitution for the Phase 3 AI-Powered Chatbot project with the following key aspects:

Core Principles:
- Spec-Driven First: Every feature starts with specification document; specifications must be complete and validated before implementation; follow Specify → Plan → Tasks → Implement workflow.
- Agentic Workflow: Custom agent loop for cost-free LLMs; Reusable Intelligence through agent skills and subagent development; Official MCP SDK for tools integration.
- Test-First (NON-NEGOTIABLE): TDD mandatory with Red-Green-Refactor cycle strictly enforced.
- Simplicity: Stateless chat endpoint design; minimal dependencies; database state managed separately; YAGNI principles applied.
- Reusable Intelligence: Agent skills and subagent development first; components designed for reuse; MCP SDK for standardized tool interfaces.
- Data-Driven Architecture: Data-driven architecture with Neon DB for Conversation/Message models; clear data contracts; schema evolution with migration strategies.

Technical Constraints: OpenAI ChatKit domain allowlist; Custom agent loop for cost-free LLMs; MCP SDK for tools; Neon DB for storage; No manual code outside of Spec-Kit Plus workflow; Claude Code and Spec-Kit Plus for automation.

Development Workflow: Refine specs for Claude Code compatibility; Monorepo structure with frontend/backend/mcp-server; Natural language processing for CRUD operations; Conversational interface design.

## Outcome

- ✅ Impact: Created comprehensive constitution for Phase 3 AI-Powered Chatbot project
- 🧪 Tests: none
- 📁 Files: Updated .specify/memory/constitution.md with new constitution
- 🔁 Next prompts: Continue with specification, planning, and implementation phases
- 🧠 Reflection: Constitution properly captures all required principles and constraints for the AI chatbot project

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin with specification phase using /sp.specify