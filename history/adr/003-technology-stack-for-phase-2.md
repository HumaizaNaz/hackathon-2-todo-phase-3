# ADR-003: Technology Stack for Phase 2

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-01-05
- **Feature:** 001-phase2-web-app
- **Context:** Selection of core technologies for the Phase 2 Full-Stack Todo Web App to meet functional and non-functional requirements, adhering to the project constitution's guidelines for frontend, backend, database, and authentication.

## Decision

-   **Backend Framework**: FastAPI (Python 3.11+) for high performance and modern API development.
-   **Frontend Framework**: Next.js 16+ (App Router) with TypeScript for robust, scalable, and SEO-friendly web applications.
-   **ORM/Database Integration**: SQLModel (Python) for type-safe database interactions, built on SQLAlchemy and Pydantic.
-   **Database**: Neon DB (PostgreSQL compatible) for reliable, scalable, and serverless relational data storage.
-   **Authentication**: Better Auth (JWT Plugin) with PyJWT for stateless, token-based authentication.
-   **Styling**: Tailwind CSS for utility-first, highly customizable, and responsive UI development.
-   **Testing**: Pytest for backend unit and integration tests, Jest/React Testing Library for frontend tests.

## Consequences

### Positive

-   Leverages modern, highly performant, and developer-friendly technologies.
-   Strong community support and ecosystem for chosen frameworks.
-   TypeScript on frontend enhances code quality and maintainability.
-   Tailwind CSS enables rapid UI development and consistent design.
-   Stateless authentication simplifies scaling and deployment.

### Negative

-   Learning curve for developers unfamiliar with specific frameworks (e.g., Next.js App Router, SQLModel).
-   Potential for framework lock-in.
-   Requires careful configuration and integration of multiple technologies.

## Alternatives Considered

-   **Frontend**: React (CRA), Angular, Vue.js. Rejected due to Next.js's integrated features for SSR, routing, and API routes, which are beneficial for full-stack development.
-   **Backend**: Django, Node.js (Express/Fastify). Rejected due to FastAPI's performance, Pydantic integration, and modern asynchronous capabilities, aligning well with SQLModel.
-   **Database**: MongoDB, SQLite. Rejected due to PostgreSQL's relational strength, enterprise features, and Neon DB's serverless advantages.
-   **Authentication**: Session-based, OAuth2 directly. Rejected due to project scope and preference for simpler, stateless JWT for internal API.

## References

- Feature Spec: `specs/001-phase2-web-app/spec.md`
- Implementation Plan: `specs/001-phase2-web-app/plan.md`
- Research: `specs/001-phase2-web-app/research.md`
- Related ADRs: `None`
