
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Define admin credentials - in production, use environment variables or better yet, a proper auth system
const ADMIN_USERNAME = "Haziq Zaaran";
const ADMIN_PASSWORD = "Notsowatermeloon5#"; // In a real app, this would be securely hashed and stored on a server

interface User {
  username: string;
  role?: string;
  lastLogin?: Date;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// Default context with type safety
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      try {
        const storedUser = localStorage.getItem('portfolioUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Add validation here to ensure the user object has expected properties
          if (parsedUser && parsedUser.username) {
            setUser(parsedUser);
            setIsAuthenticated(true);
          } else {
            // Invalid stored user data
            localStorage.removeItem('portfolioUser');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('portfolioUser');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Simple authentication logic
  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would make an API call to a secure backend
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const userData: User = { 
          username,
          role: 'admin',
          lastLogin: new Date()
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('portfolioUser', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('portfolioUser');
  };

  // Memoize the context value to prevent unnecessary rerenders
  const contextValue = useMemo(() => ({
    isAuthenticated,
    user,
    login,
    logout,
    isLoading
  }), [isAuthenticated, user, isLoading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
