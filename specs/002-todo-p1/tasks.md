# Tasks for Todo Console App - Phase 1

This document breaks down the implementation of the Todo Console App into actionable tasks, based on the approved implementation plan.

## Phase 1: Project Setup

**Purpose**: To create the basic project structure and files.

- [ ] T001 Create the initial directory structure: `src/`, `tests/`.
- [ ] T002 Create empty Python files with `__init__.py` in `src/` and `tests/` to mark them as packages.
- [ ] T003 Create the main application files: `src/models.py`, `src/services.py`, `src/cli.py`, `main.py`.
- [ ] T004 Create the main test file: `tests/test_services.py`.
- [ ] T005 Create project documentation files: `README.md`, `CLAUDE.md`.

## Phase 2: Core Model and Business Logic (TDD)

**Purpose**: To define the data model and implement the core business logic using a Test-Driven Development (TDD) approach.

### Sub-phase 2.1: Define the Task Model

- [ ] T006 [P] Define the `Task` dataclass in `src/models.py` with attributes: `id` (int), `title` (str), `description` (str), `completed` (bool).

### Sub-phase 2.2: Test Business Logic

- [ ] T007 [P] [US1] Write a pytest test case in `tests/test_services.py` for `create_task`.
- [ ] T008 [P] [US2] Write a pytest test case in `tests/test_services.py` for `get_all_tasks`.
- [ ] T009 [P] [US4] Write a pytest test case in `tests/test_services.py` for `update_task`.
- [ ] T010 [P] [US5] Write a pytest test case in `tests/test_services.py` for `delete_task`.
- [ ] T011 [P] [US3] Write a pytest test case in `tests/test_services.py` for `toggle_completion`.

### Sub-phase 2.3: Implement Business Logic

- [ ] T012 Implement the `TaskService` class in `src/services.py` with an in-memory dictionary for storage.
- [ ] T013 [US1] Implement the `create_task` method in `src/services.py`.
- [ ] T014 [US2] Implement the `get_all_tasks` method in `src/services.py`.
- [ ] T015 [US4] Implement the `update_task` method in `src/services.py`.
- [ ] T016 [US5] Implement the `delete_task` method in `src/services.py`.
- [ ] T017 [US3] Implement the `toggle_completion` method in `src/services.py`.

## Phase 3: User Interface

**Purpose**: To implement the command-line interface for user interaction.

- [ ] T018 Implement the main menu loop in `src/cli.py` to display options and get user input.
- [ ] T019 [US1] Implement the UI flow for adding a new task in `src/cli.py`.
- [ ] T020 [US2] Implement the UI flow for viewing all tasks in `src/cli.py`, including status indicators like `[X]`.
- [ ] T021 [US4] Implement the UI flow for updating a task in `src/cli.py`.
- [ ] T022 [US5] Implement the UI flow for deleting a task in `src/cli.py`.
- [ ] T023 [US3] Implement the UI flow for toggling a task's completion status in `src/cli.py`.
- [ ] T024 Implement user-friendly error handling in `src/cli.py` for invalid inputs and non-existent IDs.

## Phase 4: Final Integration and Documentation

**Purpose**: To integrate all components and finalize the project documentation.

- [ ] T025 Implement the main entry point in `main.py` to initialize the `TaskService` and `CLI`, and start the application.
- [ ] T026 Update `README.md` with setup and execution instructions, including `uv` commands.
- [ ] T027 Update `CLAUDE.md` with instructions for the AI agent.

## Dependencies

- **Phase 2** depends on **Phase 1**.
- **Phase 3** depends on **Phase 2**.
- **Phase 4** depends on **Phase 3**.

## Parallel Execution

- Within **Sub-phase 2.2**, all test creation tasks (T007-T011) can be done in parallel.
- Within **Phase 3**, after the main menu loop is created (T018), the UI flow tasks for each user story (T019-T023) can be developed in parallel if the underlying service methods are complete.

## Implementation Strategy

The implementation will follow the phases outlined above. Each phase, and sub-phase, builds upon the previous one, ensuring a stable foundation before moving to the next layer of functionality. The TDD approach in Phase 2 will ensure the business logic is robust and correct before the UI is built.
