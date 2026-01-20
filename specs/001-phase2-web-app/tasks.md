# Tasks: Phase 2 Todo Full-Stack Web App

**Input**: Design documents from `specs/001-phase2-web-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Test tasks are not explicitly requested in the feature specification, so they are not included in this task list.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

-   **[P]**: Can run in parallel (different files, no dependencies)
-   **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
-   Include exact file paths in descriptions

## Path Conventions

-   **Web app**: `backend/src/`, `frontend/src/`, `tests/`
-   Paths assume the monorepo structure defined in `specs/001-phase2-web-app/plan.md`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure.

- [x] T001 Create monorepo root structure (backend/, frontend/, specs/, .github/, etc.)
- [x] T002 Configure `.spec-kit/config.yaml` for project automation
- [x] T003 Create placeholder `CLAUDE.md` files as specified in deliverables (e.g., `CLAUDE.md` at root, potentially in `specs/features/`)
- [x] T004 Create `backend/.env.example` and `.env` for `BETTER_AUTH_SECRET` and `DATABASE_URL`
- [x] T005 Create `frontend/.env.local.example` and `.env.local` for API base URL and other frontend secrets
- [x] T006 Initialize Python virtual environment for backend in `backend/`
- [x] T007 Initialize Node.js project for frontend in `frontend/`
- [x] T008 Install backend dependencies in `backend/` (FastAPI, SQLModel, PyJWT, psycopg2-binary, uvicorn, passlib, bcrypt)
- [x] T009 Install frontend dependencies in `frontend/` (Next.js, React, Tailwind CSS, TypeScript)
- [x] T010 Configure Tailwind CSS in `frontend/tailwind.config.js` and `frontend/postcss.config.js`

---

## Phase 2: Foundational (Backend Base)

**Purpose**: Core backend infrastructure that MUST be complete before ANY user story can be implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T011 Create `backend/src/models.py` for `User` and `Todo` SQLModel definitions
- [x] T012 Implement database connection and session management in `backend/src/database.py`
- [x] T013 Create initial database migration script for `User` and `Todo` models in `backend/migrations/`
- [x] T014 Implement JWT token encoding/decoding/verification logic in `backend/src/core/security.py`
- [x] T015 Define FastAPI app instance and basic middleware in `backend/src/main.py`
- [x] T016 Configure `pytest` for backend unit tests in `backend/pyproject.toml` or `backend/pytest.ini`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

---

## Phase 3: User Authentication (US1, US2)

**Goal**: Enable new users to sign up and existing users to sign in.

**Independent Test**: Successfully register a new user and log in, receiving a valid JWT.

- [x] T017 [US1] Implement user creation logic in `backend/src/services/user_service.py`
- [x] T018 [US1] Create FastAPI endpoint `POST /auth/signup` in `backend/src/routes/auth.py` to register new users
- [x] T019 [US2] Implement user authentication logic and JWT generation in `backend/src/services/auth_service.py`
- [x] T019a [US1, US2] Troubleshoot and resolve `passlib` and `bcrypt` dependency conflicts by pinning `passlib==1.7.4` and `bcrypt==3.2.0` in `backend/pyproject.toml` to ensure compatibility with the restricted package repository.
- [x] T020 [US2] Create FastAPI endpoint `POST /auth/signin` in `backend/src/routes/auth.py` to authenticate users and issue JWTs
- [x] T021 [US1] Create `frontend/src/app/signup/page.tsx` for user registration form
- [x] T022 [US2] Create `frontend/src/app/login/page.tsx` for user login form
- [x] T023 [US1,US2] Implement client-side authentication context and token storage in `frontend/src/context/AuthContext.tsx`
- [x] T024 [US1,US2] Add navigation to signup/login pages from the home page.

**Checkpoint**: User authentication (signup/signin) should be fully functional and testable independently.

---

## Phase 4: Todo Management (US3)

**Goal**: Authenticated users can create, read, update, and delete their todo items.

**Independent Test**: As an authenticated user, perform all CRUD operations on todo items.

- [x] T025 [US3] Implement CRUD operations for `Todo` items in `backend/src/services/todo_service.py`
- [x] T026 [US3] Create FastAPI endpoint `GET /api/tasks` in `backend/src/routes/tasks.py` to retrieve user's todos
- [x] T027 [US3] Create FastAPI endpoint `GET /api/tasks/{id}` in `backend/src/routes/tasks.py` to retrieve a single todo
- [x] T028 [US3] Create FastAPI endpoint `POST /api/tasks` in `backend/src/routes/tasks.py` to create a new todo
- [x] T029 [US3] Create FastAPI endpoint `PUT /api/tasks/{id}` in `backend/src/routes/tasks.py` to update a todo
- [x] T030 [US3] Create FastAPI endpoint `DELETE /api/tasks/{id}` in `backend/src/routes/tasks.py` to delete a todo
- [x] T031 [US3] Implement JWT dependency for protected API routes in `backend/src/dependencies/auth_deps.py`
- [x] T032 [US3] Create `frontend/src/app/dashboard/page.tsx` for displaying and managing user's todos
- [x] T033 [US3] Implement client-side logic for fetching, adding, editing, and deleting todos in `frontend/src/services/todo_api.ts`

**Checkpoint**: Todo management (CRUD) should be fully functional and testable independently for authenticated users.

---

## Phase 5: Public UI (US4, US5)

**Goal**: Unauthenticated users can view the Home and About pages, and all users see consistent navigation.

**Independent Test**: Navigate to Home and About pages as an unauthenticated user, observe correct navigation and footer.

- [x] T034 [US4] Create `frontend/src/app/page.tsx` for the Home/Landing page with hero section and feature showcase
- [x] T035 [US4] Create `frontend/src/app/about/page.tsx` for the About page
- [x] T036 [US5] Create `frontend/src/components/Navbar.tsx` component
- [x] T037 [US5] Create `frontend/src/components/Footer.tsx` component
- [x] T038 [US5] Integrate `Navbar` and `Footer` into main layout in `frontend/src/app/layout.tsx`

**Checkpoint**: Public pages and global navigation should be fully functional and testable independently.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Enhance user experience and implement general application improvements.

- [x] T039 Implement responsive design using Tailwind CSS across all frontend pages and components.
- [x] T040 Create `frontend/src/app/error.tsx` for global error handling and display.
- [x] T041 Implement global loading indicators for data fetching states in `frontend/src/app/loading.tsx` or `frontend/src/components/LoadingSpinner.tsx`.
- [x] T042 Review and refine all API response messages and error handling for user-friendliness.
- [x] T043 Add basic input validation for all forms (signup, login, todo creation/update) on the frontend.
- [x] T044 Run `quickstart.md` validation to ensure setup and run instructions are accurate.
- [x] T045 Final review of `constitution.md` to ensure all principles are reflected in implementation.

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Setup (Phase 1)**: No dependencies - can start immediately.
-   **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
-   **User Stories (Phase 3+)**: All depend on Foundational phase completion.
    -   User stories can then proceed in parallel (if staffed)
    -   Or sequentially in priority order (P1 → P2 → P3).
-   **Polish (Final Phase)**: Depends on all desired user stories being complete.

### User Story Dependencies

-   **US1 (Sign Up)**: Can start after Foundational (Phase 2).
-   **US2 (Sign In)**: Can start after Foundational (Phase 2).
-   **US3 (Todo CRUD)**: Depends on US1/US2 (authentication). Can start after US1/US2.
-   **US4 (Home/About UI)**: Can start after Foundational (Phase 2).
-   **US5 (Nav/Footer)**: Can start after Foundational (Phase 2).

### Within Each User Story

-   Models before services.
-   Services before endpoints.
-   Core implementation before integration.
-   Story complete before moving to next priority.

### Parallel Opportunities

-   All Setup tasks can run in parallel where marked as [P] (e.g., T001-T010).
-   All Foundational tasks can run in parallel where marked as [P] (e.g., T011-T016).
-   Once Foundational phase completes, several user stories can start in parallel:
    -   User Authentication (Phase 3) and Public UI (Phase 5) can be worked on concurrently.
    -   Within Phase 3, T017/T018 (signup backend/frontend) and T019/T020 (signin backend/frontend) can be largely parallelized.
    -   Within Phase 5, T034/T035 (Home/About pages) and T036/T037/T038 (Nav/Footer components/integration) can be largely parallelized.

---

## Parallel Example: Setup Tasks

```bash
# Example of parallel setup tasks:
Task: "Create monorepo root structure"
Task: "Configure .spec-kit/config.yaml"
Task: "Create backend/.env.example and .env"
Task: "Initialize Python virtual environment for backend"
```

## Parallel Example: User Authentication Phase (Phase 3)

```bash
# Backend for signup and signin can be developed in parallel:
Task: "Implement user creation logic in backend/src/services/user_service.py"
Task: "Create FastAPI endpoint POST /auth/signup in backend/src/routes/auth.py"
Task: "Implement user authentication logic and JWT generation in backend/src/services/auth_service.py"
Task: "Create FastAPI endpoint POST /auth/signin in backend/src/routes/auth.py"

# Frontend forms can be developed in parallel:
Task: "Create frontend/src/app/signup/page.tsx"
Task: "Create frontend/src/app/login/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3.  Complete Phase 3: User Authentication (US1 & US2)
4.  **STOP and VALIDATE**: Test User Authentication independently.
5.  Deploy/demo if ready.

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready
2.  Add User Authentication (US1 & US2) → Test independently → Deploy/Demo
3.  Add Todo Management (US3) → Test independently → Deploy/Demo
4.  Add Public UI (US4 & US5) → Test independently → Deploy/Demo
5.  Complete Polish (Phase 6).
6.  Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together.
2.  Once Foundational is done:
    -   Developer A: User Authentication (US1, US2)
    -   Developer B: Todo Management (US3)
    -   Developer C: Public UI (US4, US5)
3.  Stories complete and integrate independently.

---

## Notes

-   Tasks marked [P] can run in parallel (different files, no dependencies).
-   [Story] label maps task to specific user story for traceability.
-   Each user story should be independently completable and testable.
-   Commit after each task or logical group.
-   Stop at any checkpoint to validate story independently.
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence.
