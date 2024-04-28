import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, component: Component }) => {
  return isAuthenticated ? <Component /> : <Navigate to='/'/>
}

export default ProtectedRoute;