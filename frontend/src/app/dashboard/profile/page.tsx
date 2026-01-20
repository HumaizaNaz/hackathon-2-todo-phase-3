// frontend/src/app/dashboard/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getAuthToken } from "../../../lib/auth-client";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Update the user profile via API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();

      // Update the user in the auth context
      if (updateUser) {
        updateUser({
          name: updatedUser.name || formData.name,
          email: updatedUser.email || formData.email,
          bio: updatedUser.bio || formData.bio
        });
      }

      setIsEditing(false);
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[color:var(--neon-cyan)] mb-4 md:mb-0">
          Profile
        </h1>
        <div className="text-center md:text-right">
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">Welcome, {user?.email || user?.name || 'User'}!</h2>
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

      <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(255,0,255,0.2)] p-6 md:p-8">
        <div className="flex flex-col items-center md:flex-row md:items-start mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#ff00ff] to-[#00ffff] flex items-center justify-center text-4xl text-[color:var(--bg-card)] font-bold mb-4 md:mb-0 md:mr-6">
            {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-[color:var(--text-primary)]">{user?.name || 'User'}</h2>
            <p className="text-[color:var(--neon-cyan)]">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-[color:var(--text-secondary)] mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-3 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] disabled:bg-[color:var(--bg-primary)] disabled:opacity-70"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[color:var(--text-secondary)] mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-3 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] disabled:bg-[color:var(--bg-primary)] disabled:opacity-70"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-[color:var(--text-secondary)] mb-2">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="w-full p-3 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] disabled:bg-[color:var(--bg-primary)] disabled:opacity-70"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="neon-button-primary px-6 py-3"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        bio: user?.bio || ''
                      });
                      setError('');
                      setSuccess('');
                    }}
                    className="neon-button-secondary px-6 py-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="neon-button-primary px-6 py-3"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
