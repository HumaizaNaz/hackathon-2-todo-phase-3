# API Contracts: REST Endpoints for Phase 2 Todo Full-Stack Web App

## Base URL

`/api`

## Authentication Endpoints

### `POST /auth/signup`

Registers a new user.

*   **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "securepassword"
    }
    ```
*   **Response (Success 201 Created)**:
    ```json
    {
        "message": "User registered successfully",
        "user_id": "uuid-of-new-user"
    }
    ```
*   **Response (Error 400 Bad Request)**:
    ```json
    {
        "detail": "Email already registered"
    }
    ```

### `POST /auth/signin`

Authenticates a user and issues a JWT.

*   **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "securepassword"
    }
    ```
*   **Response (Success 200 OK)**:
    ```json
    {
        "access_token": "jwt-token-string",
        "token_type": "bearer"
    }
    ```
*   **Response (Error 401 Unauthorized)**:
    ```json
    {
        "detail": "Invalid credentials"
    }
    ```

## Todo Management Endpoints (`/api/tasks`)

All todo management endpoints require a valid JWT in the `Authorization` header (`Bearer <jwt-token>`).

### `GET /api/tasks`

Retrieves all todo items for the authenticated user.

*   **Authentication**: Required (JWT)
*   **Response (Success 200 OK)**:
    ```json
    [
        {
            "id": "uuid-of-todo-1",
            "title": "Buy groceries",
            "description": "Milk, eggs, bread",
            "completed": false,
            "owner_id": "uuid-of-authenticated-user"
        },
        {
            "id": "uuid-of-todo-2",
            "title": "Walk the dog",
            "description": null,
            "completed": true,
            "owner_id": "uuid-of-authenticated-user"
        }
    ]
    ```
*   **Response (Error 401 Unauthorized)**:
    ```json
    {
        "detail": "Not authenticated"
    }
    ```

### `GET /api/tasks/{id}`

Retrieves a specific todo item for the authenticated user by its ID.

*   **Authentication**: Required (JWT)
*   **Path Parameters**:
    *   `id`: (UUID) The ID of the todo item.
*   **Response (Success 200 OK)**:
    ```json
    {
        "id": "uuid-of-todo-1",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "completed": false,
        "owner_id": "uuid-of-authenticated-user"
    }
    ```
*   **Response (Error 401 Unauthorized)**:
    ```json
    {
        "detail": "Not authenticated"
    }
    ```
*   **Response (Error 404 Not Found)**:
    ```json
    {
        "detail": "Todo not found or not owned by user"
    }
    ```

### `POST /api/tasks`

Creates a new todo item for the authenticated user.

*   **Authentication**: Required (JWT)
*   **Request Body**:
    ```json
    {
        "title": "New todo item",
        "description": "Optional details",
        "completed": false
    }
    ```
*   **Response (Success 201 Created)**:
    ```json
    {
        "id": "uuid-of-new-todo",
        "title": "New todo item",
        "description": "Optional details",
        "completed": false,
        "owner_id": "uuid-of-authenticated-user"
    }
    ```
*   **Response (Error 401 Unauthorized)**:
    ```json
    {
        "detail": "Not authenticated"
    }
    ```
*   **Response (Error 422 Unprocessable Entity)**:
    ```json
    {
        "detail": "Validation error"
    }
    ```

### `PUT /api/tasks/{id}`

Updates an existing todo item for the authenticated user.

*   **Authentication**: Required (JWT)
*   **Path Parameters**:
    *   `id`: (UUID) The ID of the todo item to update.
*   **Request Body**:
    ```json
    {
        "title": "Updated todo title",
        "description": "Updated details",
        "completed": true
    }
    ```
    (Fields are optional; only provided fields will be updated)
*   **Response (Success 200 OK)**:
    ```json
    {
        "id": "uuid-of-updated-todo",
        "title": "Updated todo title",
        "description": "Updated details",
        "completed": true,
        "owner_id": "uuid-of-authenticated-user"
    }
    ```
*   **Response (Error 401 Unauthorized)**:
    ```json
    {
        "detail": "Not authenticated"
    }
    ```
*   **Response (Error 404 Not Found)**:
    ```json
    {
        "detail": "Todo not found or not owned by user"
    }
    ```
*   **Response (Error 422 Unprocessable Entity)**:
    ```json
    {
        "detail": "Validation error"
    }
    ```

### `DELETE /api/tasks/{id}`

Deletes a specific todo item for the authenticated user.

*   **Authentication**: Required (JWT)
*   **Path Parameters**:
    *   `id`: (UUID) The ID of the todo item to delete.
*   **Response (Success 204 No Content)**: (No response body)
*   **Response (Error 401 Unauthorized)**:
    ```json
    {
        "detail": "Not authenticated"
    }
    ```
*   **Response (Error 404 Not Found)**:
    ```json
    {
        "detail": "Todo not found or not owned by user"
    }
    ```
