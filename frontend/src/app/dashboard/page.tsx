"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { taskApi } from "../../lib/api-client";
import AnalyticsDashboard from "../../components/AnalyticsDashboard";


interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
}

export default function DashboardPage() {
  const { logout, isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    } else if (isAuthenticated && !loading) {
      fetchTodos();
    }
  }, [isAuthenticated, loading, router]);

  const fetchTodos = async () => {
    setError("");
    try {
      const data: Todo[] = await taskApi.getTasks();
      setTodos(data);
    } catch (err: any) {
      setError(err.message || "Failed to load todos");
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    setError("");
    try {
      await taskApi.createTask({ title: newTodoTitle, description: newTodoDescription });
      setNewTodoTitle("");
      setNewTodoDescription("");
      fetchTodos();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateTodo = async (todo: Todo) => {
    setError("");
    try {
      await taskApi.updateTask(Number(todo.id), {
        title: todo.title,
        description: todo.description,
        completed: todo.completed
      });
      setEditingTodo(null);
      fetchTodos();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleTodoComplete = async (id: string) => {
    setError("");
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await taskApi.toggleTaskComplete(Number(id), !todo.completed);
        fetchTodos();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    setError("");
    try {
      await taskApi.deleteTask(Number(id));
      fetchTodos();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] flex items-center justify-center">
        <div className="text-2xl font-bold text-[color:var(--neon-cyan)] animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] relative overflow-hidden">

      {/* Animated Blob Background */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="blob-c">
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
      </div>

    

      {/* Main Content - Full remaining space */}
      <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-6 relative z-10">
        
        {/* Content Container - No max-width restriction */}
        <div className="w-full">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[color:var(--neon-cyan)] mb-4 md:mb-0">
              Dashboard
            </h1>
            <div className="text-left md:text-right">
              <h2 className="text-base md:text-lg font-semibold text-[color:var(--text-primary)]">
                Welcome, {user?.name || user?.email || 'User'}!
              </h2>
            </div>
          </div>

          {/* Analytics Component */}
          <AnalyticsDashboard />

          {/* Error */}
          {error && (
            <div className="mt-6 mb-6 p-4 bg-[color:var(--bg-card)] rounded-lg border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.2)] text-red-300">
              {error}
            </div>
          )}

          {/* Add New Todo */}
          <div className="mb-8 p-4 md:p-6 bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(255,0,255,0.2)] w-full">
            <h2 className="text-2xl font-bold mb-4 text-[color:var(--neon-pink)]">Add New Todo</h2>
            <form onSubmit={handleAddTodo} className="w-full space-y-4">
              <input
                type="text"
                placeholder="New todo title"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                className="w-full p-3 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] placeholder-[color:var(--text-secondary)]"
                required
              />
              <textarea
                placeholder="Todo description (optional)"
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
                className="w-full p-3 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] placeholder-[color:var(--text-secondary)]"
                rows={3}
              />
              <button type="submit" className="neon-button-primary px-6 py-3 text-lg w-full md:w-auto">
                Add Todo
              </button>
            </form>
          </div>

          {/* Todos List */}
          <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(255,0,255,0.2)] p-4 md:p-6 w-full">
            <h2 className="text-2xl font-bold mb-6 text-[color:var(--neon-cyan)]">Your Todos</h2>

            <div className="space-y-4">
              {todos.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-[color:var(--text-secondary)] mb-4">No todos yet. Add one above!</p>
                  <div className="text-[color:var(--neon-cyan)] text-6xl animate-pulse">📝</div>
                </div>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between bg-[color:var(--bg-primary)]/50 p-4 rounded-lg border border-[color:var(--border-neon)] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300 transform hover:scale-[1.01]"
                  >
                    {editingTodo?.id === todo.id ? (
                      <div className="flex-grow flex flex-col space-y-3 w-full md:w-auto">
                        <input
                          type="text"
                          value={editingTodo.title}
                          onChange={(e) =>
                            setEditingTodo({ ...editingTodo, title: e.target.value })
                          }
                          className="w-full p-2 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)]"
                        />
                        <textarea
                          value={editingTodo.description || ""}
                          onChange={(e) =>
                            setEditingTodo({ ...editingTodo, description: e.target.value })
                          }
                          className="w-full p-2 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)]"
                          rows={2}
                        />
                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 mt-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={editingTodo.completed}
                              onChange={(e) =>
                                setEditingTodo({ ...editingTodo, completed: e.target.checked })
                              }
                              className="h-5 w-5 text-[color:var(--neon-pink)] rounded focus:ring-[color:var(--neon-pink)]"
                            />
                            <span className="text-[color:var(--text-primary)]">Completed</span>
                          </label>
                          <button
                            onClick={() => handleUpdateTodo(editingTodo)}
                            className="neon-button-primary px-4 py-2 text-sm w-full md:w-auto"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingTodo(null)}
                            className="neon-button-secondary px-4 py-2 text-sm w-full md:w-auto"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
                        <div className="flex-grow">
                          <h3 className={`text-lg font-semibold ${todo.completed ? "line-through text-[color:var(--text-secondary)]/60" : "text-[color:var(--text-primary)]"}`}>
                            {todo.title}
                          </h3>
                          {todo.description && (
                            <p className={`text-[color:var(--text-secondary)] mt-1 ${todo.completed ? "line-through" : ""}`}>
                              {todo.description}
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
                            onClick={() => setEditingTodo(todo)}
                            className="neon-button-primary px-3 py-1 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="neon-button-secondary px-3 py-1 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}