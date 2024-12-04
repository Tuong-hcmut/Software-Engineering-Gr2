import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: { role: string, id: string } | null;
  login: (role: string, id: string) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ role: string, id: string } | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("hi")
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  const login = (role: string, id: string) => {
    const userData = { id, role };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};