import { apiClient, setAuthToken, removeAuthToken, ApiError } from './api-client';

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  subscriptionPlan: string;
  emailVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

// Auth service
export class AuthService {
  // Register new user
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      
      // Store token on successful registration
      if (response.token) {
        setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      
      // Store token on successful login
      if (response.token) {
        setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    } finally {
      // Always remove local token
      removeAuthToken();
    }
  }

  // Get current user profile
  async getProfile(): Promise<User> {
    try {
      const response = await apiClient.get<User>('/auth/profile');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = localStorage.getItem('formcraft_token');
      if (!token) return false;
      
      // Try to get profile to validate token
      await this.getProfile();
      return true;
    } catch (error) {
      // Token is invalid, remove it
      removeAuthToken();
      return false;
    }
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.put<User>('/auth/profile', data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
    } catch (error) {
      throw error;
    }
  }

  // Request password reset (if implemented)
  async requestPasswordReset(email: string): Promise<void> {
    try {
      await apiClient.post('/auth/request-password-reset', { email });
    } catch (error) {
      throw error;
    }
  }

  // Reset password (if implemented)
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post('/auth/reset-password', {
        token,
        newPassword
      });
    } catch (error) {
      throw error;
    }
  }
}

// Create singleton instance
export const authService = new AuthService();

// React hook for authentication
export const useAuth = () => {
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
        setError(handleApiError(error));
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
      return response;
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
      return response;
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
      return updatedUser;
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };
};

// Import React hooks
import { useState, useEffect } from 'react';
import { handleApiError } from './api-client';
