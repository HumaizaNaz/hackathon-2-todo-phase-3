<!--
Sync Impact Report:
Version change: undefined → 1.0.0
Modified principles: N/A (new constitution)
Added sections: All sections (new constitution for Phase 3 AI-Powered Chatbot)
Removed sections: N/A
Templates requiring updates: ⚠ pending - .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md
Follow-up TODOs: None
-->
# Phase 3 AI-Powered Chatbot Constitution

## Core Principles

### Spec-Driven First
Every feature starts with specification document; Specifications must be complete and validated before implementation; Follow Specify → Plan → Tasks → Implement workflow.

### Agentic Workflow
Custom agent loop for cost-free LLMs; Reusable Intelligence through agent skills and subagent development; Official MCP SDK for tools integration.

### Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced.

### Simplicity
Stateless chat endpoint design; Minimal dependencies; Database state managed separately; YAGNI principles applied.

### Reusable Intelligence
Agent skills and subagent development first; Components designed for reuse; MCP SDK for standardized tool interfaces.

### Data-Driven Architecture
Data-driven architecture with Neon DB for Conversation/Message models; Clear data contracts; Schema evolution with migration strategies.

## Technical Constraints

OpenAI ChatKit domain allowlist; Custom agent loop for cost-free LLMs; MCP SDK for tools; Neon DB for storage; No manual code outside of Spec-Kit Plus workflow; Claude Code and Spec-Kit Plus for automation.

## Development Workflow

Refine specs for Claude Code compatibility; Monorepo structure with frontend/backend/mcp-server; Natural language processing for CRUD operations; Conversational interface design.

## Governance

Constitution supersedes all other practices; Amendments require documentation and approval; All implementations must comply with Spec-Driven approach; Complexity must be justified; Use Claude Code for all development tasks.

**Version**: 1.0.0 | **Ratified**: 2026-01-15 | **Last Amended**: 2026-01-15