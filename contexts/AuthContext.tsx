'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService, User, LoginCredentials, RegisterData } from '@/lib/auth-service';
import { handleApiError } from '@/lib/api-client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const isAuthenticated = await authService.isAuthenticated();
        if (isAuthenticated) {
          const profile = await authService.getProfile();
          setUser(profile);
        }
      } catch (error) {
        const errorMessage = handleApiError(error);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      setUser(response.user);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(data);
      setUser(response.user);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user state even if API call fails
      setUser(null);
      setError(null);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await authService.updateProfile(data);
      setUser(updatedUser);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
