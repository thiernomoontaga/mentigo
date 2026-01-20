import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { api } from '@/services/api';
import type { User, RegisterData } from '@/services/types';

export type UserRole = 'teacher' | 'student' | null;

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you'd check for a stored token and validate it
        // For now, we'll just check if there's a user in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Prototype mode: Accept any email/password combination
      // Create a dummy user based on the email
      const dummyUser = {
        id: '1',
        email,
        firstName: email.split('@')[0],
        lastName: 'User',
        role: 'student' as const, // Default to student, can be changed later
        createdAt: new Date().toISOString(),
        isVerified: true,
      };

      setUser(dummyUser);
      localStorage.setItem('user', JSON.stringify(dummyUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, role: UserRole) => {
    try {
      // Prototype mode: Always succeed and create a dummy user
      const newUser = {
        id: Date.now().toString(),
        email,
        firstName: '',
        lastName: '',
        role: role as 'student' | 'teacher',
        createdAt: new Date().toISOString(),
        isVerified: true,
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
      login,
      signup,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
