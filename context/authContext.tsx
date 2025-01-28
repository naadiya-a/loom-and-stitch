'use client';

import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

type AuthContextType = {
  userId: string;
  loading: boolean;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const defaultAuthContext: AuthContextType = { userId: '', loading: true };
const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState(defaultAuthContext.userId);
  const [loading, setLoading] = useState(defaultAuthContext.loading);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUserId(user?.uid ?? '');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext value={{ userId, loading }}>{children}</AuthContext>;
};

export default AuthContext;
