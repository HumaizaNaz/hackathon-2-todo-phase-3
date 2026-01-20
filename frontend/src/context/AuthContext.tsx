// frontend/src/context/AuthContext.tsx
"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { getAuthToken, customSignOut } from "../lib/auth-client";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  user: {
    bio?: string;
    name?: string;
    id: string;
    email: string;
  } | null;
  updateUser: (userData: { bio?: string; name?: string; email?: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; email: string; name?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = getAuthToken();
      if (storedToken) {
        setTokenState(storedToken);
        try {
          const decoded: { sub: string; email: string; name: string } = jwtDecode(storedToken);
          setUser({ id: decoded.sub, email: decoded.email, name: decoded.name });
        } catch (error) {
          console.error("Failed to decode token:", error);
          // Handle invalid token, e.g., by logging out
          customSignOut();
          setTokenState(null);
          setUser(null);
        }
      }
    }
    setLoading(false);
  }, [token]);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (typeof window !== 'undefined') {
      if (newToken) {
        sessionStorage.setItem("access_token", newToken);
        try {
          const decoded: { sub: string; email: string; name: string } = jwtDecode(newToken);
          setUser({ id: decoded.sub, email: decoded.email, name: decoded.name });
        } catch (error) {
          console.error("Failed to decode token:", error);
          setUser(null);
        }
      } else {
        sessionStorage.removeItem("access_token");
        setUser(null);
      }
    }
  };

  const logout = async () => {
    customSignOut();
    setTokenState(null);
    setUser(null);
    router.push("/login"); // Redirect to login page on logout
  };

  const isAuthenticated = !!token;

  const updateUser = (userData: { bio?: string; name?: string; email?: string }) => {
    if (user) {
      setUser({
        ...user,
        ...userData
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      token,
      setToken,
      logout,
      isAuthenticated,
      loading,
      user,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}