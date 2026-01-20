# Quickstart Guide for Phase 2 Todo Full-Stack Web App

This guide provides basic instructions to get the development environment set up and the application running.

## 1. Prerequisites

Before you begin, ensure you have the following installed:

*   **Python 3.11+**
*   **Node.js 18+** (LTS recommended)
*   **npm** or **yarn** (Node.js package manager)
*   **Docker** (for database setup, if applicable)
*   **Git**

## 2. Setting up the Development Environment

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Backend Setup:**
    Navigate to the `backend/` directory:
    ```bash
    cd backend/
    ```
    Create a Python virtual environment and activate it:
    ```bash
    python -m venv .venv
    # On Windows
    .venv\Scripts\activate
    # On macOS/Linux
    source .venv/bin/activate
    ```
    Install backend dependencies:
    ```bash
    pip install -r requirements.txt
    ```
    Configure environment variables (e.g., database connection, JWT secret). Create a `.env` file based on a `.env.example` (if provided).

3.  **Frontend Setup:**
    Navigate to the `frontend/` directory:
    ```bash
    cd ../frontend/
    ```
    Install frontend dependencies:
    ```bash
    npm install # or yarn install
    ```
    Configure environment variables (e.g., API base URL). Create a `.env.local` file based on a `.env.local.example` (if provided).

## 3. Running the Application

### 3.1. Running the Backend

From the `backend/` directory (with virtual environment activated):
```bash
uvicorn main:app --reload
```
The backend API should now be running, typically on `http://127.0.0.1:8000`.

### 3.2. Running the Frontend

From the `frontend/` directory:
```bash
npm run dev # or yarn dev
```
The frontend application should now be running, typically on `http://localhost:3000`.

## 4. Basic Usage

Once both the backend and frontend are running:

1.  Open your web browser and navigate to `http://localhost:3000`.
2.  **Sign Up**: Create a new user account.
3.  **Sign In**: Log in with your new account.
4.  **Manage Todos**: You should now be able to create, view, update, and delete your todo items on the dashboard.
