# ADR-004: JWT-based Authentication Strategy

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-01-05
- **Feature:** 001-phase2-web-app
- **Context:** The application requires secure, multi-user authentication with a clear separation between frontend and backend services. The project constitution specifies using JWT for authentication.

## Decision

User authentication will be implemented using JSON Web Tokens (JWTs). The "Better Auth" JWT plugin will be used for issuing tokens, and the FastAPI backend will verify these tokens using PyJWT with a shared secret. User identity for API requests will be derived solely from the JWT payload; `user_id` will not be passed in API paths (e.g., `/api/tasks`).

## Consequences

### Positive

-   **Statelessness**: Backend remains stateless, simplifying horizontal scaling and load balancing.
-   **Security**: Tokens are signed, preventing tampering.
-   **Decoupling**: Clear separation between authentication and authorization concerns.
-   **Cross-Domain**: Easier to use across different domains or subdomains for API access.
-   **Modern UX**: Facilitates single sign-on scenarios and mobile application integration.

### Negative

-   **Token Invalidation**: Revoking JWTs before expiry is complex; requires mechanisms like blacklisting or short expiration times with refresh tokens.
-   **Token Size**: Large tokens can increase request overhead.
-   **Secret Management**: Secure management of the JWT secret is critical for security.

## Alternatives Considered

-   **Session-based Authentication**: Storing user sessions on the server. Rejected due to increased backend complexity for scaling (sticky sessions or shared session stores) and less flexibility for mobile/cross-domain clients.
-   **OAuth2 / OpenID Connect**: Full-fledged identity protocols. While more robust for complex identity management, it was deemed overkill for the current project scope and could introduce unnecessary complexity for simple user authentication.

## References

- Feature Spec: `specs/001-phase2-web-app/spec.md`
- Implementation Plan: `specs/001-phase2-web-app/plan.md`
- API Contracts: `specs/001-phase2-web-app/contracts/rest-endpoints.md`
- Related ADRs: `None`
