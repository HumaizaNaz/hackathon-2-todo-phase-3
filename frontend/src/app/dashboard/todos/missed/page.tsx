"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { taskApi } from "../../../../lib/api-client";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  due_date: string | null;
}

export default function MissedTasksPage() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setError("");
    try {
      const data: Todo[] = await taskApi.getTasks();
      // Filter for missed tasks (not completed and past due date)
      const now = new Date();
      const missed = data.filter(todo =>
        !todo.completed &&
        todo.due_date &&
        new Date(todo.due_date) < now
      );
      setTodos(missed);
    } catch (err: any) {
      setError(err.message || "Failed to load todos");
    }
  };

  const toggleTodoComplete = async (id: string) => {
    setError("");
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await taskApi.toggleTaskComplete(Number(id), !todo.completed);
        fetchTodos(); // Refresh the list
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    setError("");
    try {
      await taskApi.deleteTask(Number(id));
      fetchTodos(); // Refresh the list
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-red-400 mb-4 md:mb-0 flex items-center">
          <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-3 animate-pulse"></span>
          Missed Tasks
        </h1>
        <div className="text-left md:text-right">
          <h2 className="text-base md:text-lg font-semibold text-[color:var(--text-primary)]">
            Welcome, {user?.name || user?.email || 'User'}!
          </h2>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 mb-6 p-4 bg-[color:var(--bg-card)] rounded-lg border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.2)] text-red-300">
          {error}
        </div>
      )}

      {/* Missed Tasks List */}
      <div className="bg-[color:var(--bg-card)] rounded-lg border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.2)] p-4 md:p-6 w-full">
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-[color:var(--text-secondary)] mb-4">No missed tasks. Great job staying on track!</p>
            <div className="text-[color:var(--neon-cyan)] text-6xl animate-pulse">✅</div>
          </div>
        ) : (
          <div className="space-y-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between bg-red-500/10 p-4 rounded-lg border border-red-500/50 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300 transform hover:scale-[1.01]"
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-red-300">
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className="text-[color:var(--text-secondary)] mt-1">
                      {todo.description}
                    </p>
                  )}
                  {todo.due_date && (
                    <p className="text-red-400 text-sm mt-1">
                      Was due: {new Date(todo.due_date).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center space-x-3 mt-2 md:mt-0">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodoComplete(todo.id)}
                    className="h-5 w-5 text-[color:var(--neon-pink)] rounded focus:ring-[color:var(--neon-pink)]"
                  />
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="neon-button-secondary px-3 py-1 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}