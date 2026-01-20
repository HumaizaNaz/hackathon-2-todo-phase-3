// frontend/src/app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { customSignIn } from "../../lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken } = useAuth();

  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) {
      setMessage(msg);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const data = await customSignIn(email, password);
      if (data.access_token) {
        setToken(data.access_token);
        router.push("/dashboard"); // Redirect to dashboard on successful login
      } else {
        throw new Error("Login successful, but no access token received.");
      }
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
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-[color:var(--neon-pink)] to-[color:var(--neon-cyan)] flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[color:var(--text-primary)] mb-2">
            Welcome Back
          </h2>
          <p className="text-[color:var(--text-secondary)]">
            Sign in to your account to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                autoComplete="current-password"
                required
                className="w-full p-3 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] placeholder-[color:var(--text-secondary)] transition-all duration-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {message && <p className="mt-2 text-center text-sm text-green-300">{message}</p>}
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
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>

        <div className="text-sm text-center mt-6">
          <p className="text-[color:var(--text-secondary)]">
            Don't have an account?{' '}
            <a href="/signup" className="font-semibold text-[color:var(--neon-pink)] hover:text-[color:var(--neon-cyan)] transition-colors duration-300">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
