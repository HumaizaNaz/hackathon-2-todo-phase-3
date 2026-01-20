---
id: 003
title: Generate Phase 2 Constitution for Full-Stack Todo App
stage: constitution
date: 2026-01-02
surface: agent
model: gemini-1.5-pro
feature: phase2-web
branch: main
user: km
command: /sp.constitution
labels: ["constitution", "phase2"]
links:
  spec: specs/phase2-web/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/phase2-web/constitution.md
  - specs/phase2-web/CLAUDE.md
  - specs/phase2-web/README.md
tests: []
---

## Prompt

/sp.constitution """Generate a Markdown Constitution for Phase 2 of Hackathon II: Todo Full-Stack Web Application. Base on PDF and examples: Evolve Phase 1 to multi-user web app with persistent storage using Next.js 16+ App Router/TypeScript/Tailwind, FastAPI, SQLModel, Neon Serverless Postgres, Better Auth with database sessions/JWT. Principles: Spec-Driven First (Specify -> Plan -> Tasks -> Implement), Agentic Workflow, Simplicity (monorepo with backend/frontend, RESTful APIs, user isolation), Reusable Intelligence (subagents for auth/CRUD), Clean code (PEP 8, docstrings, Pydantic schemas), Modular structure. Sections: Overview (Full-stack Todo with auth/persistence), Guiding Principles, Constraints (Python 3.13+/UV, no manual code, refine specs for Claude Code, deploy to Vercel/Render), Constitution Check. Deliverables: GitHub repo with constitution.md, specs/phase2-web/, CLAUDE.md (Claude prompts), README.md (setup with UV/npm). Save as specs/phase2-web/constitution.md."""

## Response snapshot

Created the `specs/phase2-web/constitution.md`, `specs/phase2-web/CLAUDE.md`, and `specs/phase2-web/README.md` files as requested, following the provided principles and constraints. The constitution outlines the project's goals, principles, constraints, and governance for Phase 2.

## Outcome

- ✅ Impact: Created the core constitutional document for Phase 2, along with associated initial documentation files.
- 🧪 Tests: No tests were applicable or run for this task.
- 📁 Files: Three new files were created in `specs/phase2-web/`: `constitution.md`, `CLAUDE.md`, `README.md`.
- 🔁 Next prompts: The user can now proceed with further phase 2 development, potentially starting with `sp.specify` for a feature.
- 🧠 Reflection: The process successfully generated the requested files based on detailed user input. The template-based approach for the constitution worked well.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): None.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
