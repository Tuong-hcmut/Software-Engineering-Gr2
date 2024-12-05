import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: { role: string, id: string} | null;
  login: (role: string, id: string) => void;
  logout: () => void;
  loading: boolean;
  balance: number;
  setBalance: (balance: number) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ role: string, id: string} | null>(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("hi")
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedBalance = localStorage.getItem('balance');
    if (storedBalance) {
      setBalance(Number(storedBalance));
    }
    setLoading(false);
  }, []);
  const login = (role: string, id: string) => {
    const userData:{ role: string, id: string} = { id, role };
    setBalance(1000);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (role === "user") {
      localStorage.setItem('balance', '1000');
    }
  };

  const logout = () => {
    setUser(null);
    setBalance(0);
    localStorage.removeItem('user');
    localStorage.removeItem('balance');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, balance, setBalance }}>
      {children}
    </AuthContext.Provider>
  );
};