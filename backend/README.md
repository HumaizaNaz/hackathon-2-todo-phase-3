---
title: Todo App Backend
emoji: 📝
colorFrom: blue
colorTo: green
sdk: docker
sdk_version: "3.12"
app_file: main.py
pinned: false
---

# Todo App Backend - Deployed Version

This is the deployed backend for the Todo Web App, running on Hugging Face Spaces. The backend is built with FastAPI and SQLModel.

Live URL: https://humaiza-todo-app.hf.space

## Features

- User authentication (signup/signin)
- Task management (CRUD operations)
- Task history tracking
- JWT-based authentication
- PostgreSQL database integration

## API Routes

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/signin` - Sign in to an existing account

### Tasks
- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{task_id}` - Get a specific task
- `PUT /api/tasks/{task_id}` - Update a task
- `PATCH /api/tasks/{task_id}/toggle-complete` - Toggle task completion status
- `DELETE /api/tasks/{task_id}` - Delete a task

### Task History
- `GET /api/tasks/{task_id}/history` - Get history for a specific task
- `GET /api/tasks/history` - Get history for all user's tasks

## Local Development Setup

If you want to run this backend locally:

1. Install dependencies:
   ```bash
   pip install fastapi sqlmodel uvicorn alembic pydantic-settings python-jose[cryptography] python-multipart psycopg2-binary passlib==1.7.4 bcrypt==3.2.0 python-dotenv
   ```

2. Create a `.env` file in the backend directory with the following content:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/todo_app
   BETTER_AUTH_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   ```

3. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

The backend will be available at `http://localhost:8000`.

## Environment Variables

- `DATABASE_URL`: PostgreSQL database connection string
- `BETTER_AUTH_SECRET`: Secret key for JWT token signing
- `ALGORITHM`: Algorithm for JWT (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time (default: 30 minutes)

## Database Models

- `User`: Stores user information (id, email, name, hashed password)
- `Task`: Stores task information (id, title, description, completion status, timestamps, user association)
- `TaskHistory`: Tracks changes to tasks (action, old/new values, timestamp, user association)

## Configuration for Frontend Integration

When running the frontend with this deployed backend, ensure the following configuration:

### Frontend Configuration
Make sure your frontend's `.env.local` file has the API base URL set to the deployed backend:
```
NEXT_PUBLIC_API_BASE_URL=https://humaiza-todo-app.hf.space/api
```

## Project Architecture

### Backend Architecture
The backend follows a modular architecture with the following structure:
- `core/`: Contains core utilities like database connection (`db.py`) and JWT authentication (`jwt_auth.py`)
- `models/`: Defines SQLModel database models (User, Task, TaskHistory)
- `routes/`: API route definitions for authentication and tasks
- `services/`: Business logic implementations
- `migrations/`: Database migration files

### Frontend Architecture
The frontend is built with Next.js and includes:
- API client for communicating with the backend
- Authentication management
- Task management components
- Analytics dashboard for task statistics

### Data Flow
1. User interacts with the frontend
2. Frontend makes API calls to the backend using JWT authentication
3. Backend validates tokens and processes requests
4. Backend interacts with PostgreSQL database
5. Response is sent back to frontend
6. Frontend updates UI based on response

### Authentication Flow
1. User signs up/signs in via the frontend
2. Credentials are sent to the backend
3. Backend verifies credentials and creates JWT token
4. Token is stored in frontend session storage
5. Subsequent requests include the token in the Authorization header
6. Backend validates the token on protected routes