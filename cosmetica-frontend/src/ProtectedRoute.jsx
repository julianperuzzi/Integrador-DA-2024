import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Asegúrate de que el hook esté correctamente importado

const ProtectedRoute = ({ element }) => {
    const { user } = useAuth(); // Obtener el usuario del contexto

    return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
