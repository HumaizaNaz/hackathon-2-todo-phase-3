---
id: 001
title: Generate Project Constitution for Hackathon Phase 1
stage: constitution
date: 2026-01-01
surface: agent
model: gemini
feature: none
branch: master
user: km
command: /sp.constitution
labels: ["constitution", "hackathon"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/phase1-console/constitution.md
tests:
 - "none"
---

## Prompt

/sp.constitution """Generate a Markdown Constitution for Phase 1 of Hackathon II: Evolution of Todo (In-Memory Python Console App). Base it on the hackathon requirements: Use Spec-Driven Development with Claude Code and Spec-Kit Plus; no manual code writing; refine specs until correct output. Key principles: Spec-Driven First (Specify -> Plan -> Tasks -> Implement cycle), Agentic Workflow, Simplicity (in-memory storage, no dependencies beyond standard library), Reusable Intelligence (if applicable via subagents), Compliance with PEP 8, Modular code with docstrings, User-friendly error handling. Include sections for Overview, Guiding Principles, Constraints (e.g., Python 3.13+, in-memory dict/list for tasks, auto-increment IDs, continuous menu loop), and Constitution Check process. Save as specs/phase1-console/constitution.md."""

## Response snapshot

I have created the constitution file at `specs/phase1-console/constitution.md` as you requested.

## Outcome

- ✅ Impact: Created the project constitution file.
- 🧪 Tests: No tests were run.
- 📁 Files: 1 file created.
- 🔁 Next prompts: none
- 🧠 Reflection: The user's request was very specific and provided all the necessary information to generate the constitution file. The process was straightforward.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment: none
