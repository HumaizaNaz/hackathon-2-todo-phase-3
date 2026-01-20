// frontend/src/app/dashboard/todos/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { taskApi } from "../../../lib/api-client";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TodoHistory {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  completedAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function TodosPage() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showAddForm, setShowAddForm] = useState(true); // Show form by default
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<'todos' | 'analytics'>('todos');

  // Fetch todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setError("");
    try {
      const data: Todo[] = await taskApi.getTasks();
      setTodos(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Calculate analytics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

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

  // Render analytics component
  const AnalyticsComponent = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(0,255,255,0.2)] p-6">
        <h3 className="text-lg font-semibold text-[color:var(--neon-cyan)] mb-2">Total Tasks</h3>
        <p className="text-3xl font-bold text-[color:var(--text-primary)]">{totalTodos}</p>
      </div>
      <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(0,255,255,0.2)] p-6">
        <h3 className="text-lg font-semibold text-[color:var(--neon-cyan)] mb-2">Completed</h3>
        <p className="text-3xl font-bold text-[color:var(--text-primary)]">{completedTodos}</p>
      </div>
      <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(0,255,255,0.2)] p-6">
        <h3 className="text-lg font-semibold text-[color:var(--neon-cyan)] mb-2">Pending</h3>
        <p className="text-3xl font-bold text-[color:var(--text-primary)]">{pendingTodos}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[color:var(--neon-cyan)] mb-4 md:mb-0">
          My Todos
        </h1>
        <div className="text-center md:text-right">
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">Welcome, {user?.name || user?.email || 'User'}!</h2>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-[color:var(--bg-card)] rounded-lg border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.2)] text-red-300">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[color:var(--border-neon)] mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'todos' ? 'text-[color:var(--neon-cyan)] border-b-2 border-[color:var(--neon-cyan)]' : 'text-[color:var(--text-secondary)] hover:text-[color:var(--neon-pink)]'}`}
          onClick={() => setActiveTab('todos')}
        >
          Todos ({todos.length})
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'analytics' ? 'text-[color:var(--neon-cyan)] border-b-2 border-[color:var(--neon-cyan)]' : 'text-[color:var(--text-secondary)] hover:text-[color:var(--neon-pink)]'}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      {activeTab === 'todos' && (
        <>
          <div className="mb-8 bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(255,0,255,0.2)]">
            <button
              className="w-full p-4 text-left flex justify-between items-center"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <h2 className="text-2xl font-bold text-[color:var(--neon-pink)]">Add New Todo</h2>
              <svg
                className={`w-5 h-5 text-[color:var(--neon-pink)] transform transition-transform ${showAddForm ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showAddForm && (
              <div className="p-6 border-t border-[color:var(--border-neon)]">
                <form onSubmit={handleAddTodo}>
                  <input
                    type="text"
                    placeholder="New todo title"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    className="w-full p-3 mb-3 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] placeholder-[color:var(--text-secondary)]"
                    required
                  />
                  <textarea
                    placeholder="Todo description (optional)"
                    value={newTodoDescription}
                    onChange={(e) => setNewTodoDescription(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] placeholder-[color:var(--text-secondary)]"
                    rows={3}
                  />
                  <button
                    type="submit"
                    className="neon-button-primary px-6 py-3 text-lg"
                  >
                    Add Todo
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(255,0,255,0.2)] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[color:var(--neon-cyan)]">Your Todos ({todos.length})</h2>
            </div>

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
                    className="flex items-start justify-between bg-[color:var(--bg-primary)]/50 p-4 rounded-lg border border-[color:var(--border-neon)] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300 transform hover:scale-[1.01]"
                  >
                    {editingTodo?.id === todo.id ? (
                      <div className="flex-grow flex flex-col space-y-3">
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
                        <div className="flex items-center space-x-4 mt-2">
                          <input
                            type="checkbox"
                            checked={editingTodo.completed}
                            onChange={(e) =>
                              setEditingTodo({ ...editingTodo, completed: e.target.checked })
                            }
                            className="h-5 w-5 text-[color:var(--neon-pink)] rounded focus:ring-[color:var(--neon-pink)]"
                          />
                          <button
                            onClick={() => handleUpdateTodo(editingTodo)}
                            className="neon-button-primary px-4 py-2 text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingTodo(null)}
                            className="neon-button-secondary px-4 py-2 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
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
                          <div className="flex items-center space-x-3 ml-4">
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
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(255,0,255,0.2)] p-6">
          <h2 className="text-2xl font-bold text-[color:var(--neon-cyan)] mb-6">Analytics Dashboard</h2>

          <AnalyticsComponent />

          <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(0,255,255,0.2)] p-6">
            <h3 className="text-xl font-semibold text-[color:var(--neon-pink)] mb-4">Task Completion Rate</h3>
            {totalTodos > 0 ? (
              <div className="w-full bg-[color:var(--bg-primary)] rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-[color:var(--neon-pink)] to-[color:var(--neon-cyan)] h-4 rounded-full"
                  style={{ width: `${(completedTodos / totalTodos) * 100}%` }}
                ></div>
              </div>
            ) : (
              <div className="w-full bg-[color:var(--bg-primary)] rounded-full h-4">
                <div className="bg-gray-500 h-4 rounded-full" style={{ width: '0%' }}></div>
              </div>
            )}
            <p className="text-center mt-2 text-[color:var(--text-primary)]">
              {totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0}% completed
            </p>
          </div>
        </div>
      )}
    </div>
  );
}