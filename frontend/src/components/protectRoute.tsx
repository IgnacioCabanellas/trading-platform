import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const jwt = localStorage.getItem("jwt"); // <-- check "jwt" key

  // If there's no JWT, redirect to login
  if (!jwt) {
    return <Navigate to="/login" replace />;
  }

  // If JWT exists, render the protected page
  return children;
}