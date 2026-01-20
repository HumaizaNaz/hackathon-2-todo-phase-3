# ADR-005: Core Data Model (User and Todo)

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-01-05
- **Feature:** 001-phase2-web-app
- **Context:** To support multi-user todo management, a clear and efficient data structure is required for users and their associated todo items. The design must accommodate basic CRUD operations and user ownership.

## Decision

The application's core data model will consist of two primary entities:
-   **User**: Representing application users with attributes `id` (UUID, primary key), `email` (unique string), and `hashed_password` (string).
-   **Todo**: Representing individual todo items with attributes `id` (UUID, primary key), `title` (string), `description` (optional string), `completed` (boolean), and `owner_id` (UUID, foreign key to User `id`).
-   A one-to-many relationship will be established where one User can own multiple Todo items.

## Consequences

### Positive

-   **Clarity**: Simple and intuitive representation of user-todo relationship.
-   **Efficiency**: Optimized for basic CRUD operations on individual and user-owned todos.
-   **Scalability**: Well-suited for relational databases like PostgreSQL (Neon DB).
-   **Integrity**: Foreign key constraint ensures data integrity for user ownership.

### Negative

-   **Flexibility**: May require schema migrations for significant changes to attributes or relationships.
-   **Complexity for Richer Features**: Extending with features like shared todos or nested tasks might require re-evaluation or additions to the model.

## Alternatives Considered

-   **NoSQL Document Model**: Using a NoSQL database (e.g., MongoDB) where user and todo data could be nested within documents. Rejected due to the clear relational nature of users owning todos, where a relational database provides stronger integrity and query capabilities for this specific data structure.
-   **Single Table Inheritance/Polymorphic Models**: Combining User and Todo into more generic entities. Rejected as it introduces unnecessary complexity for this straightforward relationship.

## References

- Feature Spec: `specs/001-phase2-web-app/spec.md`
- Implementation Plan: `specs/001-phase2-web-app/plan.md`
- Data Model: `specs/001-phase2-web-app/data-model.md`
- Related ADRs: `None`
