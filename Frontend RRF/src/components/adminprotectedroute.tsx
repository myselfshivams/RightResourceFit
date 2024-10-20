import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps1 {
  children: ReactNode; 
}

const AdminProtectedRoute: React.FC<ProtectedRouteProps1> = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // Assuming role is stored in local storage
  
    // Check if the user is authenticated and has the 'admin' role
    const isAuthenticated = token && role === "admin";
  

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default AdminProtectedRoute;
