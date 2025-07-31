// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for authentication
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // This useEffect hook runs once when the app first loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // You need to configure axios to send cookies with requests
        axios.defaults.withCredentials = true;
        
        const response = await axios.get('/api/v1/users/current-user'); 

        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        // User is not logged in, so set the state to null
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUser();
  }, []); // The empty dependency array ensures this runs only once

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};