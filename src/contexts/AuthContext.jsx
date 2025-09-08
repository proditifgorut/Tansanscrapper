import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing auth
    const checkAuth = () => {
      const savedUser = localStorage.getItem('tansanUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };
    
    setTimeout(checkAuth, 500);
  }, []);

  const login = (email, password) => {
    // Mock login
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: email,
      plan: 'Premium',
      quotaUsed: 1250,
      quotaLimit: 5000
    };
    setUser(mockUser);
    localStorage.setItem('tansanUser', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const register = (name, email, password) => {
    // Mock registration
    const mockUser = {
      id: 1,
      name: name,
      email: email,
      plan: 'Free',
      quotaUsed: 0,
      quotaLimit: 100
    };
    setUser(mockUser);
    localStorage.setItem('tansanUser', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tansanUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
