'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Staff';
  status: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  checkTokenExpiry: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'adminToken';
const USER_KEY = 'adminUser';
const TOKEN_EXPIRY_KEY = 'adminTokenExpiry';
const REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiry

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if token is expired or about to expire
  const checkTokenExpiry = useCallback(() => {
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiry) return false;

    const expiryTime = parseInt(expiry);
    const now = Date.now();

    return now >= expiryTime - REFRESH_THRESHOLD;
  }, [logout]);

  // Decode JWT to get expiry time
  const getTokenExpiry = (token: string): number | null => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000; // Convert to milliseconds
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };  // Refresh token
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const currentToken = localStorage.getItem(TOKEN_KEY);
      if (!currentToken) return false;

      const response = await fetch(
        'http://localhost:5000/api/admin/auth/refresh',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const newExpiry = getTokenExpiry(data.token);

        localStorage.setItem(TOKEN_KEY, data.token);
        if (newExpiry) {
          localStorage.setItem(TOKEN_EXPIRY_KEY, newExpiry.toString());
        }

        setToken(data.token);
        return true;
      } else {
        // Refresh failed, logout user
        logout();
        return false;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);      logout();
      return false;
    }
  }, []);

  // Login function
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/admin/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const expiry = getTokenExpiry(data.token);

        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.admin));
        if (expiry) {
          localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
        }

        setToken(data.token);
        setUser(data.admin);

        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    setToken(null);
    setUser(null);
    router.push('/admin/sign-in');
  }, [router]);

  // Auto-refresh token when it's about to expire
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(async () => {
      if (checkTokenExpiry()) {
        await refreshToken();
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [token, checkTokenExpiry, refreshToken]);

  // Initialize auth state
  useEffect(() => {
    const initAuth = () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      const storedExpiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

      if (storedToken && storedUser && storedExpiry) {
        const now = Date.now();
        const expiry = parseInt(storedExpiry);

        if (now < expiry) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          // Token expired, clear storage
          logout();
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, [logout]);

  // Handle API response errors (401 Unauthorized)
  useEffect(() => {
    const handleApiError = (event: CustomEvent) => {
      if (event.detail.status === 401) {
        logout();
      }
    };

    window.addEventListener('apiError', handleApiError as EventListener);
    return () =>
      window.removeEventListener('apiError', handleApiError as EventListener);
  }, [logout]);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    login,
    logout,
    refreshToken,
    checkTokenExpiry,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
