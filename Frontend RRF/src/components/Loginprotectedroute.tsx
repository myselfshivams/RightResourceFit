import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps2 {
  children: ReactNode;
}

const Loginprotectedroute: React.FC<ProtectedRouteProps2> = ({ children }) => {
  const token = localStorage.getItem('token');

  // Check if the user is authenticated and has the 'admin' role
  const isAuthenticated = !token;

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default Loginprotectedroute;
