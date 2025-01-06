import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { ROUTES } from "../../utils/constants";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuthenticated = Boolean(sessionStorage.getItem("authToken"));

  return isAuthenticated ? <>{children}</> : <Navigate to={ROUTES.SIGN_IN} />;
};

export default ProtectedRoute;
