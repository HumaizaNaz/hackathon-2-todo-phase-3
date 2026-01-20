# Data Model for Phase 2 Todo Full-Stack Web App

## 1. Entity: User

Represents a user of the todo application.

### Attributes

*   **`id`**: (UUID) Primary key, unique identifier for the user.
*   **`email`**: (String, unique) User's email address, used for login.
*   **`hashed_password`**: (String) Securely stored hash of the user's password.

### Relationships

*   **`todos`**: (One-to-Many) A user can have multiple Todo items.

## 2. Entity: Todo

Represents a single todo item for a user.

### Attributes

*   **`id`**: (UUID) Primary key, unique identifier for the todo item.
*   **`title`**: (String) The main title or description of the todo.
*   **`description`**: (String, optional) More detailed description of the todo.
*   **`completed`**: (Boolean) Indicates whether the todo item is completed or not. Default is `false`.
*   **`owner_id`**: (UUID) Foreign key referencing the `id` of the `User` who owns this todo.

### Relationships

*   **`owner`**: (Many-to-One) A Todo item belongs to one `User`.
