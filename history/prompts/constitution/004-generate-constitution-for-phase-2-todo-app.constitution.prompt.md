---
id: 004
title: Generate Constitution for Phase 2 Todo App
stage: constitution
date: 2026-01-05
surface: agent
model: gemini-pro
feature: none
branch: none
user: km
command: /sp.constitution
labels: [constitution, hackathon]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - constitution.md
tests:
 - "none"
---

## Prompt

/sp.constitution """Generate Markdown Constitution for Phase 2 Hackathon II Todo Full-Stack Web App. Base on PDF pages 7-15: Use JWT for auth (Better Auth issues JWT, FastAPI verifies with shared secret), professional responsive UI with Home/Landing page (features showcase), About page, Nav/Footer, Error/Loading pages. Principles: Spec-Driven (no manual code), Monorepo (backend/frontend/specs), Clean professional Tailwind UI. Constraints: Next.js 16+ App Router/TS/Tailwind, FastAPI/SQLModel/Neon, Better Auth with JWT plugin, API /api/tasks (no user_id in path, use JWT). Sections: Overview, Guiding Principles, Constraints, Deliverables (monorepo with organized specs, multiple CLAUDE.md). Save as constitution.md."""

## Response snapshot

Successfully created file: constitution.md.

## Outcome

- ✅ Impact: Created the project constitution file.
- 🧪 Tests: None.
- 📁 Files: 1 created.
- 🔁 Next prompts: none.
- 🧠 Reflection: The constitution was created successfully based on the user's prompt.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
