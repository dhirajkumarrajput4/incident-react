import React, { createContext, useState, useContext } from 'react';

// Create a context for auth state
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        jwtToken: localStorage.getItem('jwtToken') || '',
        username: localStorage.getItem('username') || ''
    });

    const login = (token, username) => {
        setAuth({ jwtToken: token, username });
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('username', username);
    };

    const logout = () => {
        setAuth({ jwtToken: '', username: '' });
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
