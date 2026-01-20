'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ChatInterface from './ChatInterface';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Close chat when user becomes unauthenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setIsOpen(false);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 h-96 rounded-lg border-2 flex flex-col"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-neon)',
            boxShadow: '0 0 15px var(--border-neon)',
          }}
        >
          <div
            className="px-4 py-2 rounded-t-lg flex justify-between items-center"
            style={{
              backgroundColor: 'rgba(255, 0, 255, 0.1)',
              borderColor: 'var(--border-neon)',
            }}
          >
            <h3
              className="font-semibold neon-text"
              style={{
                color: 'var(--neon-cyan)',
                textShadow: '0 0 8px var(--neon-cyan), 0 0 15px var(--neon-cyan)',
              }}
            >
              AI Task Assistant
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[color:var(--neon-pink)] hover:text-[color:var(--neon-cyan)] transition-colors duration-200"
              style={{
                textShadow: '0 0 5px var(--neon-pink)',
              }}
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatInterface userId={user.id} />
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            background: 'linear-gradient(45deg, var(--neon-pink), var(--neon-purple))',
            boxShadow: '0 0 15px var(--border-neon)',
            border: '2px solid var(--border-neon)',
          }}
          aria-label="Open chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
            style={{
              filter: 'drop-shadow(0 0 5px white)',
            }}
          >
            <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </>
  );
};

export default FloatingChat;