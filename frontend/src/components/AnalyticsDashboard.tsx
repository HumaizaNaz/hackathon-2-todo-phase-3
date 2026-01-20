// frontend/src/components/AnalyticsDashboard.tsx
import { taskApi } from "../lib/api-client";
import { useState, useEffect } from "react";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
}

interface AnalyticsData {
  totalTodos: number;
  completedTodos: number;
  pendingTodos: number;
}

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalTodos: 0,
    completedTodos: 0,
    pendingTodos: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const todos: Todo[] = await taskApi.getTasks();
      const completedTodos = todos.filter(todo => todo.completed).length;
      const totalTodos = todos.length;
      const pendingTodos = totalTodos - completedTodos;

      setAnalytics({
        totalTodos,
        completedTodos,
        pendingTodos
      });
    } catch (err: any) {
      setError(err.message || "Failed to load analytics");
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(0,255,255,0.2)] p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-[color:var(--bg-primary)] rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-[color:var(--bg-primary)]/30 rounded-lg p-4">
                <div className="h-4 bg-[color:var(--bg-primary)] rounded w-1/3 mb-2"></div>
                <div className="h-8 bg-[color:var(--bg-primary)] rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[color:var(--bg-card)] rounded-lg border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.2)] p-6">
        <p className="text-red-300">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(0,255,255,0.2)] p-6">
      <h2 className="text-2xl font-bold text-[color:var(--neon-cyan)] mb-6">Task Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[color:var(--bg-primary)]/30 rounded-lg border border-[color:var(--border-neon)] p-6">
          <h3 className="text-lg font-semibold text-[color:var(--neon-cyan)] mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold text-[color:var(--text-primary)]">{analytics.totalTodos}</p>
        </div>
        <div className="bg-[color:var(--bg-primary)]/30 rounded-lg border border-[color:var(--border-neon)] p-6">
          <h3 className="text-lg font-semibold text-[color:var(--neon-cyan)] mb-2">Completed</h3>
          <p className="text-3xl font-bold text-[color:var(--text-primary)]">{analytics.completedTodos}</p>
        </div>
        <div className="bg-[color:var(--bg-primary)]/30 rounded-lg border border-[color:var(--border-neon)] p-6">
          <h3 className="text-lg font-semibold text-[color:var(--neon-cyan)] mb-2">Pending</h3>
          <p className="text-3xl font-bold text-[color:var(--text-primary)]">{analytics.pendingTodos}</p>
        </div>
      </div>

      <div className="bg-[color:var(--bg-primary)]/30 rounded-lg border border-[color:var(--border-neon)] p-6">
        <h3 className="text-xl font-semibold text-[color:var(--neon-pink)] mb-4">Completion Rate</h3>
        {analytics.totalTodos > 0 ? (
          <div className="w-full bg-[color:var(--bg-primary)] rounded-full h-4">
            <div
              className="bg-gradient-to-r from-[color:var(--neon-pink)] to-[color:var(--neon-cyan)] h-4 rounded-full"
              style={{ width: `${(analytics.completedTodos / analytics.totalTodos) * 100}%` }}
            ></div>
          </div>
        ) : (
          <div className="w-full bg-[color:var(--bg-primary)] rounded-full h-4">
            <div className="bg-gray-500 h-4 rounded-full" style={{ width: '0%' }}></div>
          </div>
        )}
        <p className="text-center mt-2 text-[color:var(--text-primary)]">
          {analytics.totalTodos > 0 ? Math.round((analytics.completedTodos / analytics.totalTodos) * 100) : 0}% completed
        </p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;