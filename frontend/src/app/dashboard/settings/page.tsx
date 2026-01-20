// frontend/src/app/dashboard/settings/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [theme, setTheme] = useState('cyberpunk');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSaveSettings = async () => {
    setError('');
    setSuccess('');

    try {
      // Simulate saving settings
      setTimeout(() => {
        setSuccess('Settings saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[color:var(--neon-cyan)] mb-4 md:mb-0">
          Settings
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

      {success && (
        <div className="mb-6 p-4 bg-[color:var(--bg-card)] rounded-lg border border-green-500/50 shadow-[0_0_15px_rgba(0,255,0,0.2)] text-green-300">
          {success}
        </div>
      )}

      <div className="space-y-8">
        {/* Account Settings */}
        <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(255,0,255,0.2)] p-6">
          <h2 className="text-2xl font-bold mb-6 text-[color:var(--neon-cyan)]">Account Settings</h2>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-[color:var(--border-neon)]/30">
              <div className="mb-2 md:mb-0">
                <h3 className="font-medium text-[color:var(--text-primary)]">Dark Mode</h3>
                <p className="text-sm text-[color:var(--text-secondary)]">Enable dark theme for the application</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="opacity-0 w-0 h-0 peer"
                  id="darkModeToggle"
                />
                <label
                  htmlFor="darkModeToggle"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[color:var(--border-neon)] rounded-full transition-colors duration-300 peer-checked:bg-[color:var(--neon-cyan)] ${darkMode ? 'bg-[color:var(--neon-cyan)]' : 'bg-[color:var(--border-neon)]'}`}
                >
                  <span
                    className={`absolute h-4 w-4 bg-[color:var(--bg-card)] rounded-full transition-transform duration-300 top-1 ${darkMode ? 'left-7' : 'left-1'}`}
                  ></span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-[color:var(--border-neon)]/30">
              <div className="mb-2 md:mb-0">
                <h3 className="font-medium text-[color:var(--text-primary)]">Email Notifications</h3>
                <p className="text-sm text-[color:var(--text-secondary)]">Receive email notifications for important updates</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="opacity-0 w-0 h-0 peer"
                  id="notificationsToggle"
                />
                <label
                  htmlFor="notificationsToggle"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[color:var(--border-neon)] rounded-full transition-colors duration-300 peer-checked:bg-[color:var(--neon-cyan)] ${notifications ? 'bg-[color:var(--neon-cyan)]' : 'bg-[color:var(--border-neon)]'}`}
                >
                  <span
                    className={`absolute h-4 w-4 bg-[color:var(--bg-card)] rounded-full transition-transform duration-300 top-1 ${notifications ? 'left-7' : 'left-1'}`}
                  ></span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-[color:var(--border-neon)]/30">
              <div className="mb-2 md:mb-0">
                <h3 className="font-medium text-[color:var(--text-primary)]">Auto Sync</h3>
                <p className="text-sm text-[color:var(--text-secondary)]">Automatically sync your todos across devices</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={autoSync}
                  onChange={(e) => setAutoSync(e.target.checked)}
                  className="opacity-0 w-0 h-0 peer"
                  id="autoSyncToggle"
                />
                <label
                  htmlFor="autoSyncToggle"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[color:var(--border-neon)] rounded-full transition-colors duration-300 peer-checked:bg-[color:var(--neon-cyan)] ${autoSync ? 'bg-[color:var(--neon-cyan)]' : 'bg-[color:var(--border-neon)]'}`}
                >
                  <span
                    className={`absolute h-4 w-4 bg-[color:var(--bg-card)] rounded-full transition-transform duration-300 top-1 ${autoSync ? 'left-7' : 'left-1'}`}
                  ></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(255,0,255,0.2)] p-6">
          <h2 className="text-2xl font-bold mb-6 text-[color:var(--neon-cyan)]">Theme Settings</h2>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-[color:var(--border-neon)]/30">
              <div className="mb-2 md:mb-0">
                <h3 className="font-medium text-[color:var(--text-primary)]">Theme</h3>
                <p className="text-sm text-[color:var(--text-secondary)]">Choose your preferred theme</p>
              </div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] rounded-lg px-3 py-2 text-[color:var(--text-primary)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent"
              >
                <option value="cyberpunk">Cyberpunk Neon</option>
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
                <option value="matrix">Matrix Green</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-[color:var(--bg-card)] rounded-lg border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.2)] p-6">
          <h2 className="text-2xl font-bold mb-6 text-[color:var(--neon-pink)]">Danger Zone</h2>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between py-3">
              <div className="mb-2 md:mb-0">
                <h3 className="font-medium text-[color:var(--text-primary)]">Delete Account</h3>
                <p className="text-sm text-[color:var(--text-secondary)]">Permanently delete your account and all data</p>
              </div>
              <button
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] text-red-300"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="neon-button-primary px-8 py-3 text-lg"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}