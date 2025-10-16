import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const jwt = localStorage.getItem("jwt"); 

  if (!jwt) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}