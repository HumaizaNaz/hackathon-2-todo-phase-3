// frontend/src/services/todo_api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
}

interface CreateTodoData {
  title: string;
  description?: string;
}

interface UpdateTodoData {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const fetchTodos = async (token: string): Promise<Todo[]> => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

export const createTodo = async (
  token: string,
  data: CreateTodoData
): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  return response.json();
};

export const updateTodo = async (
  token: string,
  id: string,
  data: UpdateTodoData
): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
  return response.json();
};

export const deleteTodo = async (token: string, id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};
