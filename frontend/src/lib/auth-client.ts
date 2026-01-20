// frontend/src/lib/auth-client.ts
// Client-side auth functions that work with our backend API

// Functions that work with our backend API
// These functions call the backend auth endpoints directly
export const customSignIn = async (email: string, password: string) => {
  // Call the backend auth endpoint directly
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include' // Include cookies in the request
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Login failed');
  }

  const data = await response.json();
  // Store token in a more secure way if needed, or rely on cookies
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('access_token', data.access_token);
  }
  return data;
};

export const customSignUp = async (email: string, password: string, name?: string) => {
  // Call the backend auth endpoint directly
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
    credentials: 'include' // Include cookies in the request
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Signup failed');
  }

  const data = await response.json();
  return data;
};

export const customSignOut = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('access_token');
  }
};

export const getAuthToken = () => {
  // Only access sessionStorage in the browser (client-side)
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('access_token');
  }
  return null;
};

// Mock implementations for Better Auth functions to prevent errors
export const signIn = {
  email: async ({ email, password, callbackURL }: { email: string; password: string; callbackURL: string }) => {
    // Use our custom sign in function instead
    try {
      await customSignIn(email, password);
      // Simulate redirect
      if (typeof window !== 'undefined') {
        window.location.href = callbackURL;
      }
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  }
};

export const signOut = async () => {
  customSignOut();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

export const useSession = () => {
  // Check if we're in the browser
  if (typeof window === 'undefined') {
    return {
      data: {
        user: null,
        session: null
      },
      isLoading: true
    };
  }

  // Mock session hook
  const token = getAuthToken();
  const isAuthenticated = !!token;

  // In a real implementation, you'd decode the JWT to get user info
  const user = token ? { email: 'user@example.com' } : null;

  return {
    data: {
      user,
      session: token ? { token } : null
    },
    isLoading: false
  };
};

export const token = async () => {
  const tokenValue = getAuthToken();
  return tokenValue ? { data: { token: tokenValue } } : { data: null };
};