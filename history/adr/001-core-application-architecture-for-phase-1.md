# ADR-001: Core Application Architecture for Phase 1

- **Status:** Proposed
- **Date:** 2026-01-01
- **Feature:** 002-todo-p1
- **Context:** The hackathon requires a simple, in-memory Python console application for implementing basic Todo features. The development process must be spec-driven, with no external dependencies for this initial phase.

## Decision

We will adopt a modular, in-memory architecture for the Phase 1 implementation, consisting of the following key components:

-   **Data Storage**: A global Python dictionary will be used for in-memory storage of tasks. The dictionary keys will be auto-incrementing integer IDs, and the values will be task objects, allowing for efficient lookup.
-   **Code Structure**: A modular design will be enforced to separate concerns:
    -   `src/models.py`: To define the `Task` data structure.
    -   `src/services.py`: To contain the core business logic for task management (add, update, delete, etc.).
    -   `src/cli.py`: To handle all user interface interactions, including menu display and user input.
-   **Testing**: `pytest` will be used for Test-Driven Development (TDD) to ensure the reliability of the business logic in `services.py`.
-   **Environment Management**: `uv` will be used for creating and managing the Python virtual environment, as specified in the project constitution.

## Consequences

### Positive

-   **Simplicity**: The in-memory dictionary approach is simple to implement and requires no external databases or file I/O, aligning perfectly with the Phase 1 constraints.
-   **Performance**: In-memory operations are extremely fast, providing an excellent user experience for a small number of tasks.
-   **Evolvability**: The modular structure makes the application easy to evolve. For example, the storage mechanism can be swapped out in a later phase (e.g., to a database) with minimal changes to the UI or business logic layers.
-   **Compliance**: This architecture fully complies with the project constitution's principles of "Simplicity" and "Clean Code Principles".

### Negative

-   **No Persistence**: All task data is ephemeral and will be lost when the application closes. This is an accepted tradeoff for Phase 1 but will need to be addressed in subsequent phases.
-   **Not Scalable**: The global dictionary approach is not suitable for a large number of tasks or concurrent users, but this is outside the scope of Phase 1.

## Alternatives Considered

-   **List of Dictionaries for Storage**: A Python list could have been used to store task dictionaries. However, a dictionary was chosen to provide O(1) complexity for task lookups by ID, which is a common operation (update, delete, mark complete).
-   **Monolithic Script**: All code could have been written in a single `main.py` file. A modular structure was chosen to improve code readability, maintainability, and to facilitate testing, aligning with the "Clean Code Principles".

## References

-   Feature Spec: `../../specs/002-todo-p1/spec.md`
-   Implementation Plan: `../../specs/002-todo-p1/plan.md`
-   Related ADRs: None
-   Evaluator Evidence: None
