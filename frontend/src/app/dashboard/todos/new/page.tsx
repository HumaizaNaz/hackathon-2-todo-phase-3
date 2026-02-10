"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { taskApi } from "../../../../lib/api-client";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  due_date: string | null;
}

export default function AddTaskPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await taskApi.createTask({
        title: title,
        description: description,
       
      });

      setSuccess("Task created successfully!");
      setTitle("");
      setDescription("");
      setDueDate("");

      // Redirect to dashboard after a delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to create task");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[color:var(--neon-pink)] mb-4 md:mb-0 flex items-center">
          <span className="inline-block w-4 h-4 bg-[color:var(--neon-pink)] rounded-full mr-3"></span>
          Add New Task
        </h1>
        <div className="text-left md:text-right">
          <h2 className="text-base md:text-lg font-semibold text-[color:var(--text-primary)]">
            Welcome, {user?.name || user?.email || 'User'}!
          </h2>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-[color:var(--bg-card)] rounded-lg border border-green-500/50 shadow-[0_0_15px_rgba(0,255,0,0.2)] text-green-300">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-[color:var(--bg-card)] rounded-lg border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.2)] text-red-300">
          {error}
        </div>
      )}

      {/* Add Task Form */}
      <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(255,0,255,0.2)] p-4 md:p-6 w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-[color:var(--text-primary)] mb-2">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] placeholder-[color:var(--text-secondary)]"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium text-[color:var(--text-primary)] mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] placeholder-[color:var(--text-secondary)]"
              placeholder="Enter task description (optional)"
              rows={4}
            />
          </div>

          <div>
           
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="neon-button-primary px-6 py-3 text-lg w-full sm:w-auto"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="neon-button-secondary px-6 py-3 text-lg w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}