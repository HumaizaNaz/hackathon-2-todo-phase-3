# ADR-002: Full-Stack Monorepo Architecture

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-01-05
- **Feature:** 001-phase2-web-app
- **Context:** The project constitution mandates a monorepo architecture for managing frontend, backend, and specifications. This decision aligns with the goal of simplifying dependency management and streamlining development workflow for the "Phase 2 Todo Full-Stack Web App".

## Decision

The project will be structured as a full-stack monorepo with distinct `backend/`, `frontend/`, and `specs/` directories at the root level.

## Consequences

### Positive

-   Simplified dependency management and shared configurations across frontend and backend.
-   Streamlined development workflow, especially for full-stack features.
-   Easier code sharing (e.g., types, validation schemas) between frontend and backend.
-   Centralized documentation and specification management.

### Negative

-   Increased repository size and potential for slower `git` operations if not managed properly.
-   Requires careful tooling and build process setup to avoid monolithic builds.
-   Potential for tighter coupling if not disciplined with module boundaries.

## Alternatives Considered

-   **Separate Repositories**: Managing frontend, backend, and specs in individual repositories. Rejected due to increased overhead in managing multiple repositories, cross-repository dependency issues, and more complex deployment pipelines.

## References

- Feature Spec: `specs/001-phase2-web-app/spec.md`
- Implementation Plan: `specs/001-phase2-web-app/plan.md`
- Related ADRs: `None`
