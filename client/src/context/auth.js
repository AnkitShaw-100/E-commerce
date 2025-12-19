import React, { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

// Provider component
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const parseData = JSON.parse(data)
            setAuth({
                user: parseData.user,
                token: parseData.token
            })
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
