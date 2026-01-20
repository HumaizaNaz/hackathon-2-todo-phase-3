# Constitution for Phase 2 Hackathon II Todo Full-Stack Web App

## 1. Overview

This document outlines the architectural and development principles for the Phase 2 Hackathon II Todo Full-Stack Web App. It serves as a guiding constitution for all development activities, ensuring consistency, quality, and adherence to the project's goals.

## 2. Guiding Principles

### P1: Spec-Driven Development
All code must be generated based on specifications. No manual coding is permitted. This ensures that the implementation aligns perfectly with the design and requirements.

### P2: Monorepo Architecture
The project will be housed in a single monorepo containing the frontend, backend, and specifications. This approach simplifies dependency management and streamlines the development workflow.

### P3: Clean and Professional UI
The user interface must be clean, professional, and responsive. It will be built using Tailwind CSS to ensure a modern and consistent look and feel across the application.

## 3. Constraints

### C1: Technology Stack

*   **Frontend**: Next.js (version 16+ with App Router), TypeScript, and Tailwind CSS.
*   **Backend**: FastAPI with SQLModel for data modeling and interaction with a Neon DB.
*   **Authentication**: Authentication will be handled by the "Better Auth" service, which will issue JWTs. The FastAPI backend will verify these JWTs using a shared secret.

### C2: API Design

*   The primary API endpoint for task management will be `/api/tasks`.
*   User identification will be derived from the JWT payload. The `user_id` must not be included in the API path.

## 4. Deliverables

### D1: Monorepo Structure
A well-organized monorepo containing separate directories for the frontend, backend, and specifications.

### D2: Specifications
Comprehensive specifications that drive the code generation process.

### D3: Documentation
Multiple `CLAUDE.md` files (as specified in the project requirements) to document different aspects of the project.