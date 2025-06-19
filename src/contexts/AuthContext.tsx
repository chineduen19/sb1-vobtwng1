import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'admin' | 'affiliate' | 'vendor' | 'customer' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  hasCompletedPayment?: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  completePayment: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [mockUsers, setMockUsers] = useState([
    { 
      id: '1', 
      name: 'Admin User', 
      email: 'admin@example.com', 
      password: 'password123', 
      role: 'admin' as UserRole, 
      avatar: 'https://i.pravatar.cc/150?img=1',
      hasCompletedPayment: true
    },
    { 
      id: '2', 
      name: 'Affiliate User', 
      email: 'affiliate@example.com', 
      password: 'password123', 
      role: 'affiliate' as UserRole, 
      avatar: 'https://i.pravatar.cc/150?img=2',
      hasCompletedPayment: true
    },
    { 
      id: '3', 
      name: 'Vendor User', 
      email: 'vendor@example.com', 
      password: 'password123', 
      role: 'vendor' as UserRole, 
      avatar: 'https://i.pravatar.cc/150?img=3',
      hasCompletedPayment: true
    },
    { 
      id: '4', 
      name: 'Customer User', 
      email: 'customer@example.com', 
      password: 'password123', 
      role: 'customer' as UserRole, 
      avatar: 'https://i.pravatar.cc/150?img=4',
      hasCompletedPayment: true
    },
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const normalizedEmail = email.toLowerCase();
      
      const user = mockUsers.find(user => 
        user.email.toLowerCase() === normalizedEmail && 
        user.password === password
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      const { password: _, ...userWithoutPassword } = user;
      
      setCurrentUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const normalizedEmail = email.toLowerCase();
      
      const existingUser = mockUsers.find(user => user.email.toLowerCase() === normalizedEmail);
      if (existingUser) {
        throw new Error('Email already registered');
      }

      const newUser = {
        id: `${mockUsers.length + 1}`,
        name,
        email: normalizedEmail,
        password,
        role,
        avatar: `https://i.pravatar.cc/150?img=${mockUsers.length + 1}`,
        hasCompletedPayment: false
      };
      
      setMockUsers(prevUsers => [...prevUsers, newUser]);

      const { password: _, ...userWithoutPassword } = newUser;
      
      setCurrentUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const setUserRole = (role: UserRole) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, role };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const completePayment = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, hasCompletedPayment: true };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    register,
    logout,
    userRole: currentUser?.role || null,
    setUserRole,
    completePayment
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};