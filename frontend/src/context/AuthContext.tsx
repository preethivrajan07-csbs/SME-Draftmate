import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthenticated: bool;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_DEMO_USER: User = {
  id: 1,
  email: "promoter@apexauto.co.in",
  full_name: "Rajesh Kumar",
  role: "promoter",
  designation: "Managing Director",
  organization: "Apex Auto Components Ltd",
  is_active: true
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sme_user');
    return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
  });
  const [token, setToken] = useState<string | null>(() => {
    let savedToken = localStorage.getItem('sme_token');
    if (!savedToken) {
      savedToken = 'demo-jwt-token-2026';
      localStorage.setItem('sme_token', savedToken);
    }
    return savedToken;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sme_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sme_user');
    }
  }, [user]);

  const login = async (email: string, role?: UserRole) => {
    const res = await api.login(email, "password123");
    if (res && res.user) {
      const u = role ? { ...res.user, role } : res.user;
      setUser(u);
      setToken(res.access_token);
      localStorage.setItem('sme_token', res.access_token);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('sme_token');
    localStorage.removeItem('sme_user');
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const roleTitles: Record<UserRole, { name: string; org: string; desig: string }> = {
        promoter: { name: "Rajesh Kumar", org: "Apex Auto Components Ltd", desig: "Managing Director" },
        banker: { name: "Vikramaditya Shah", org: "Pinnacle Capital Advisory Ltd", desig: "VP - Investment Banking" },
        legal: { name: "Ananya Roy", org: "JurisLex Legal Counsel", desig: "Senior Legal Counsel" },
        compliance: { name: "Suresh Menon", org: "Capital Compliance Advisory", desig: "Chief Compliance Officer" },
        admin: { name: "System Administrator", org: "SME DraftMate Enterprise", desig: "System Platform Admin" },
      };
      const info = roleTitles[role];
      const updatedUser: User = {
        ...user,
        role,
        full_name: info.name,
        organization: info.org,
        designation: info.desig
      };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchRole, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
