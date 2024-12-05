import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { students, SPSO } from '../utils/sample';

interface AuthContextType {
  user: { role: string, id: string} | null;
  login: (username: string, password: string, role: string) => string;
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
  const login = (username: string, password: string, role: string) => {
    if (role === "admin" && username === SPSO.username && password === SPSO.password) {
      const userData = { role: "admin", id: "admin" };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return "";
    }
    const student = students.find((student) => student.username === username && student.password === password);
    if (!student) {
      return "invalidCredentials";
    }
    const userData = { role: "user", id: student.id };
    setBalance(student.balance);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (role === "user") {
      localStorage.setItem('balance', '1000');
    }
    return "";
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