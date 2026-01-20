# Actionable Tasks for Todo Full-Stack Web Application (Phase 2)

**Feature Branch**: `001-todo-fullstack-web`  
**Date**: 2026-01-02  
**Spec**: [specs/001-todo-fullstack-web/spec.md](specs/001-todo-fullstack-web/spec.md)  
**Plan**: [specs/001-todo-fullstack-web/plan.md](specs/001-todo-fullstack-web/plan.md)

## Summary

This document outlines the actionable tasks for implementing the Todo Full-Stack Web Application (Phase 2). Tasks are organized into phases: Setup, Foundational, User Stories (prioritized), and Polish, to facilitate incremental and independent development.

## Dependencies

User stories are primarily independent but rely on the completion of Setup and Foundational phases.

-   **Phase 1 (Setup)**: No external dependencies.
-   **Phase 2 (Foundational)**: Depends on Phase 1.
-   **User Story 3 (Secure User Authentication)**: Depends on Phase 2.
-   **User Story 1 (Basic Todo Management)**: Depends on Phase 2 and User Story 3 (for user context).
-   **User Story 2 (Task Organization and Discovery)**: Depends on Phase 2 and User Story 1 (for existing tasks).
-   **Final Phase (Polish & Cross-Cutting Concerns)**: Depends on all prior phases.

## Parallel Execution Opportunities

-   Frontend UI components can be developed in parallel with backend API routes once models and schemas are stable.
-   Unit tests for individual modules can be written in parallel with module implementation.

## Implementation Strategy

We will follow an MVP-first approach, delivering core authentication and basic todo management functionality (User Story 3 and User Story 1) before proceeding to advanced features (User Story 2). Development will be incremental, with each user story representing a deliverable increment.

## Phase 1: Setup

Goal: Initialize the monorepo structure and basic project configurations for both backend and frontend.

- [x] T001 Create `backend/` and `frontend/` root directories.
- [x] T002 Create `backend/pyproject.toml` with basic project metadata and dependencies (FastAPI, SQLModel, PyJWT, Uvicorn, Psycopg2).
- [x] T003 Create `backend/src/main.py` with a basic FastAPI app instance.
- [x] T004 Create `backend/.env` for environment variables (e.g., database connection string, JWT secret).
- [x] T005 Initialize `frontend/` as a Next.js project using `npx create-next-app@latest frontend --ts --tailwind --app --eslint --src-dir --import-alias "@/*"`.
- [x] T006 Configure `frontend/.env.local` for frontend environment variables (e.g., backend API URL).
- [x] T007 Install `uvicorn` in `backend/` via `uv pip install uvicorn`.
- [x] T008 Install `psycopg2-binary` in `backend/` via `uv pip install psycopg2-binary`.
- [x] T009 Install `python-dotenv` in `backend/` via `uv pip install python-dotenv`.

## Phase 2: Foundational

Goal: Establish database connection, define core data models, and set up database migrations.

- [x] T010 Create `backend/src/core/config.py` for application settings and environment variable loading.

- [x] T011 Create `backend/src/core/db.py` for database engine and session management (SQLModel).

- [x] T012 Create `backend/src/models.py` to define `User`, `Task`, and `Session` SQLModel entities.

- [x] T013 Implement database initialization and basic migration logic in `backend/src/main.py` to create tables on startup if they don't exist.

- [x] T014 Create `backend/src/schemas.py` for Pydantic schemas corresponding to `User`, `Task`, and `Session` models.

## Phase 3: User Story 3 - Secure User Authentication (Priority: P1)

Goal: Implement user registration, login, and session management.
Independent Test: A new user can sign up and log in successfully, and their session is maintained.

- [x] T015 Create `backend/src/core/security.py` for password hashing, JWT encoding/decoding, and database session lookup functions.

- [x] T016 Install `python-jose[cryptography]` in `backend/` via `uv pip install "python-jose[cryptography]"`.

- [x] T017 Create `backend/src/api/routes/auth.py` (new file) to define authentication endpoints (e.g., `/register`, `/login`, `/logout`).

- [x] T018 Integrate `backend/src/api/routes/auth.py` into `backend/src/main.py`.

- [x] T019 [P] Create `frontend/src/lib/auth.ts` for handling authentication state (e.g., `useSession` equivalent, login/logout functions).

- [x] T020 [P] Create `frontend/src/lib/auth-client.ts` for client-side authentication utilities and contexts.

- [x] T021 [P] Implement `frontend/src/app/api/auth/[...all]/route.ts` for Next.js API route handling authentication callbacks/actions.

- [x] T022 [P] Design and implement the login/registration UI in `frontend/src/app/login/page.tsx` with calls to backend authentication API.

- [x] T023 [P] Implement a mechanism to protect routes in `frontend/src/middleware.ts` (new file) to redirect unauthenticated users.

## Phase 4: User Story 1 - Basic Todo Management (Priority: P1)

Goal: Enable users to perform CRUD operations on their own todo tasks.
Independent Test: A logged-in user can create, view, update, and delete their tasks.

- [x] T024 Create `backend/src/api/routes/tasks.py` to define CRUD endpoints for tasks (e.g., `/tasks`, `/tasks/{task_id}`).

- [x] T025 Implement ownership checks within `backend/src/api/routes/tasks.py` to ensure users only interact with their own tasks.
- [x] T026 Integrate `backend/src/api/routes/tasks.py` into `backend/src/main.py`.
- [x] T027 [P] Create `frontend/src/lib/api.ts` with `axios` instance and API client functions for task CRUD operations, including an interceptor for authentication headers.
- [x] T028 [P] Design and implement the dashboard UI in `frontend/src/app/dashboard/page.tsx` to display tasks and allow CRUD operations.

## Phase 5: User Story 2 - Task Organization and Discovery (Priority: P2)

Goal: Implement features for task priorities, tags, search, filter, and sort.
Independent Test: A logged-in user can organize and discover tasks using priorities, tags, search, filter, and sort.

- [x] T029 Update `backend/src/models.py` to include fields for `priority` and `tags` in the `Task` model.

- [x] T030 Update `backend/src/schemas.py` to reflect changes in `Task` model for `priority` and `tags`.

- [x] T031 Update `backend/src/api/routes/tasks.py` to support adding/updating `priority` and `tags` for tasks.
- [x] T032 Implement search functionality in `backend/src/api/routes/tasks.py` based on keywords.
- [x] T033 Implement filter functionality in `backend/src/api/routes/tasks.py` based on completion status, priority, and tags.
- [x] T034 Implement sort functionality in `backend/src/api/routes/tasks.py` based on criteria like creation date, due date, and priority.
- [x] T035 [P] Update `frontend/src/lib/api.ts` to include API client functions for task organization and discovery features.
- [x] T036 [P] Update `frontend/src/app/dashboard/page.tsx` to include UI for assigning priorities/tags, and for searching, filtering, and sorting tasks.

## Final Phase: Polish & Cross-Cutting Concerns

Goal: Address cross-cutting concerns and finalize the application for deployment.

- [x] T037 Configure CORS in `backend/src/main.py` to allow requests from the frontend origin.

- [x] T038 Address any potential trailing slash issues in backend API routes or frontend routing.
- [x] T039 Implement comprehensive error handling and logging for both backend and frontend.
- [x] T040 Review and optimize database queries for performance.
- [x] T041 Configure deployment settings for Vercel (frontend) and Render (backend).
- [x] T042 [P] Create `backend/requirements.txt` for `uv` to install dependencies.
- [x] T043 [P] Create `frontend/package.json` scripts for building and deploying.