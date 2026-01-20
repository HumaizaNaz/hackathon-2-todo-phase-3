---
description: "Task list template for feature implementation"
---

# Tasks: Phase 3 AI Chatbot

**Input**: Design documents from `/specs/phase3-ai-chatbot/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /sp.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure per implementation plan with backend/, ai-agent/, mcp-server/, frontend/ directories
- [X] T002 [P] Create pyproject.toml files for backend/, ai-agent/, mcp-server/ with required dependencies
- [X] T003 [P] Install Official MCP SDK in ai-agent/ and mcp-server/ projects
- [X] T004 Create database migration for Conversation/Message tables in backend/migrations/001_initial_tables.sql

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [X] T005 Create Task, Conversation, and Message models in backend/models/
- [X] T006 [P] Create database session and connection setup in backend/database/
- [X] T007 Create task service functions in backend/services/task_service.py
- [X] T008 Setup basic FastAPI application structure in backend/main.py
- [X] T009 Create MCP server entry point in mcp-server/main.py
- [X] T010 Create basic tool definitions in mcp-server/tools.py
- [X] T011 Setup Google Generative AI integration in ai-agent/config.py
- [X] T012 Create basic agent structure in ai-agent/agent.py

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Natural Language Task Management (Priority: P1) 🎯 MVP

**Goal**: Enable users to manage tasks using natural language commands in a chat interface

**Independent Test**: The system can accept natural language input and convert it to appropriate task operations, allowing users to manage their tasks without needing to remember specific command syntax.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T013 [P] [US1] Contract test for chat endpoint in backend/tests/test_chat_api.py
- [ ] T014 [P] [US1] Integration test for add task via natural language in backend/tests/test_task_service.py

### Implementation for User Story 1

- [X] T015 [P] [US1] Create add_task skill in ai-agent/skills/add_task_skill.py
- [X] T016 [P] [US1] Create list_tasks skill in ai-agent/skills/list_tasks_skill.py
- [X] T017 [US1] Create main agent orchestration in ai-agent/agent.py with system prompt
- [X] T018 [US1] Create AI agent main wrapper in ai-agent/main.py with FastAPI
- [X] T019 [US1] Implement add_task tool in mcp-server/tools.py
- [X] T020 [US1] Implement list_tasks tool in mcp-server/tools.py
- [X] T021 [US1] Add chat endpoint /api/{user_id}/chat in backend/api/chat.py
- [X] T022 [US1] Implement chat logic to fetch history, build messages, call agent, store messages in backend/api/chat.py
- [X] T023 [US1] Add response handling with tool_calls in backend/api/chat.py

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Conversation Continuity (Priority: P2)

**Goal**: Maintain context during conversations so users can refer back to previous tasks or continue working on specific tasks across multiple messages

**Independent Test**: The system remembers conversation context and can reference previous tasks or actions when responding to follow-up commands.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T024 [P] [US2] Contract test for conversation history endpoint in backend/tests/test_chat_api.py
- [ ] T025 [P] [US2] Integration test for multi-turn conversation in backend/tests/test_conversation_service.py

### Implementation for User Story 2

- [X] T026 [P] [US2] Create conversation service in backend/services/conversation_service.py
- [X] T027 [P] [US2] Update message model and service in backend/models/message.py and backend/services/message_service.py
- [X] T028 [US2] Update agent to handle conversation_id and maintain context in ai-agent/agent.py
- [X] T029 [US2] Update complete_task skill to handle context-aware operations in ai-agent/skills/complete_task_skill.py
- [X] T030 [US2] Implement conversation history fetching in backend/api/chat.py
- [X] T031 [US2] Update chat endpoint to maintain conversation state in backend/api/chat.py

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Task Organization (Priority: P3)

**Goal**: Allow users to organize and manage their tasks efficiently, including updating details, deleting unwanted tasks, and keeping track of completed items

**Independent Test**: Users can modify, delete, and organize their tasks through natural language commands.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T032 [P] [US3] Contract test for update/delete task endpoints in backend/tests/test_task_service.py
- [ ] T033 [P] [US3] Integration test for task update/delete via natural language in backend/tests/test_task_service.py

### Implementation for User Story 3

- [X] T034 [P] [US3] Create update_task skill in ai-agent/skills/update_task_skill.py
- [X] T035 [P] [US3] Create delete_task skill in ai-agent/skills/delete_task_skill.py
- [X] T036 [US3] Update complete_task skill in ai-agent/skills/complete_task_skill.py
- [X] T037 [US3] Implement update_task and delete_task tools in mcp-server/tools.py
- [X] T038 [US3] Implement update and delete task functionality in backend/services/task_service.py
- [X] T039 [US3] Update agent to handle update/delete commands in ai-agent/agent.py

**Checkpoint**: All user stories should now be independently functional

---

[Add more user stories as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T040 [P] Setup ChatKit domain allowlist configuration for frontend security
- [X] T041 Create ChatInterface component in frontend/components/ChatInterface.tsx
- [X] T042 Create dashboard page in frontend/app/dashboard/page.tsx
- [X] T043 Implement frontend API connection in frontend/lib/api.ts
- [X] T044 [P] Documentation updates in docs/
- [X] T045 Code cleanup and refactoring
- [X] T046 Performance optimization across all stories
- [X] T047 [P] Additional unit tests (if requested) in backend/tests/unit/
- [X] T048 Security hardening
- [X] T049 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for chat endpoint in backend/tests/test_chat_api.py"
Task: "Integration test for add task via natural language in backend/tests/test_task_service.py"

# Launch all skills for User Story 1 together:
Task: "Create add_task skill in ai-agent/skills/add_task_skill.py"
Task: "Create list_tasks skill in ai-agent/skills/list_tasks_skill.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence