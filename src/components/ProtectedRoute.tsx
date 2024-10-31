import React from "react";
import { Navigate, Route } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  return (
    <Route
      render={(props) =>
        localStorage.getItem("token") ? { children } : <Navigate to="/login" />
      }
    />
  );
}
