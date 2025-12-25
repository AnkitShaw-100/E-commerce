import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

// Provider component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Default axios base URL and auth header
  axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:8080";
  axios.defaults.headers.common["Authorization"] = auth?.token
    ? `Bearer ${auth.token}`
    : "";
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
