import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

  return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
