// frontend/src/components/ThemeToggle.tsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-8 rounded-full w-14 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--neon-pink)]"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Background based on theme */}
      <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-[#ff00ff] to-[#9d00ff]'
          : 'bg-gradient-to-r from-[#00ffff] to-[#00bfff]'
      }`}></div>

      {/* Slider */}
      <div className={`relative inline-block w-6 h-6 transform transition-transform duration-300 ease-in-out rounded-full shadow-lg ${
        theme === 'dark'
          ? 'translate-x-7 bg-[color:var(--bg-primary)]'
          : 'translate-x-1 bg-[color:var(--bg-primary)]'
      }`}>
        <div className="absolute inset-0.5 rounded-full flex items-center justify-center">
          {theme === 'dark' ? (
            // Moon icon for dark mode
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-[color:var(--neon-pink)]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            // Sun icon for light mode
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-[color:var(--neon-cyan)]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;