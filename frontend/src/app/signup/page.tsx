// frontend/src/app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { customSignUp } from "../../lib/auth-client";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await customSignUp(email, password, name);
      router.push("/login?message=Account created successfully! Please log in.");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Blob Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="blob-c">
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 bg-[color:var(--bg-card)]/90 backdrop-blur-sm rounded-2xl border border-[color:var(--border-neon)] shadow-[0_0_30px_rgba(255,0,255,0.3)] p-8 transition-all duration-300">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-[color:var(--neon-cyan)] to-[color:var(--neon-pink)] flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[color:var(--text-primary)] mb-2">
            Create Account
          </h2>
          <p className="text-[color:var(--text-secondary)]">
            Join us today to get started
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[color:var(--text-primary)] mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full p-3 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] placeholder-[color:var(--text-secondary)] transition-all duration-300"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-[color:var(--text-primary)] mb-2">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full p-3 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] placeholder-[color:var(--text-secondary)] transition-all duration-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[color:var(--text-primary)] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full p-3 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] placeholder-[color:var(--text-secondary)] transition-all duration-300"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-[color:var(--text-primary)] mb-2">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full p-3 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] placeholder-[color:var(--text-secondary)] transition-all duration-300"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="mt-2 text-center text-sm text-red-300">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} neon-button-primary`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>

        <div className="text-sm text-center mt-6">
          <p className="text-[color:var(--text-secondary)]">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-[color:var(--neon-pink)] hover:text-[color:var(--neon-cyan)] transition-colors duration-300">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
