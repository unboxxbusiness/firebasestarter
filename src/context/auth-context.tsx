"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  email: string;
  role: "admin" | "member";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd check for a token in localStorage or a cookie
    // For this mock, we'll just initialize as logged out
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // In a real app, you'd also set a token here
  };

  const logout = () => {
    setUser(null);
    // In a real app, you'd also clear the token here
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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
