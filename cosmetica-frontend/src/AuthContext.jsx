import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Recuperar usuario del localStorage si existe
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Guardar en localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Eliminar del localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
