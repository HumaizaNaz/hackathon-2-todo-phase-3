# Architectural Decision Record: Phase 3 AI Chatbot

## Title
Custom Agent Architecture for AI-Powered Task Management Chatbot

## Status
Proposed

## Date
2026-01-15

## Context
The requirements call for an AI-native chatbot that allows users to manage tasks using natural language commands. The system needs to integrate with MCP tools and implement agent logic while maintaining cost-effectiveness and reusable intelligence capabilities.

## Decision
We will implement a custom agent loop architecture with the following characteristics:

1. **Custom agent loop first** with free LLM like Gemini for cost considerations
2. **MCP SDK for stateless tools** that interact with the database
3. **Stateless chat endpoint with DB state** management
4. **OpenAI ChatKit for UI** with domain allowlist for security

The agent will use a main orchestrator with subagents/skills for each MCP tool, supporting flexible LLMs like Gemini to maintain cost-effectiveness.

## Rationale
- **Cost Control**: Using free-tier LLMs like Gemini keeps operational costs low
- **Flexibility**: Custom agent loop allows full control over the 9-step conversation flow
- **Reusability**: Subagent/skill architecture promotes reusable intelligence
- **Scalability**: Stateless design with database persistence allows horizontal scaling
- **Security**: Domain allowlist restricts ChatKit access to authorized origins

## Alternatives Considered
- **OpenAI Agents SDK vs Custom Loop**: OpenAI Agents SDK offers pre-built functionality but requires paid API usage. Custom loop provides the same capabilities with free LLMs like Gemini.
- **Monolithic vs Service Architecture**: Monolithic approach would simplify deployment but reduce flexibility. Service architecture allows independent scaling and development.
- **Stateful vs Stateless Design**: Stateful design would be simpler but less scalable. Stateless design with DB persistence provides better scalability.

## Consequences
### Positive
- Cost-free operation with Gemini free tier
- Reusable intelligence through agent skills/subagents
- Highly scalable architecture with stateless services
- Flexible to accommodate different LLM providers

### Negative
- Increased complexity compared to using managed services
- More components to monitor and maintain
- Potential latency from multiple service calls

## References
- specs/phase3-ai-chatbot/spec.md for functional requirements
- 9-step conversation flow requirement
- MCP tools specifications
- OpenAI ChatKit integration requirements