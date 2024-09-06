// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as necessary

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { auth } = useAuth();

    return auth.jwtToken ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
