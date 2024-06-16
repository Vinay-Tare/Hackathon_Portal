import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AutoRedirectRoute = () => {
  const { isAuth, roles } = useAuth();

  const location = useLocation();

  if (isAuth != null) {
    if (isAuth) {
      if (roles.includes("PARTICIPANT")) {
        return (
          <Navigate to="/participant" state={{ from: location }} replace />
        );
      }
      if (roles.includes("JUDGE")) {
        return <Navigate to="/judge" state={{ from: location }} replace />;
      }
      if (roles.includes("PANELIST")) {
        return <Navigate to="/panelist" state={{ from: location }} replace />;
      }
      if (roles.includes("ADMIN")) {
        return <Navigate to="/admin" state={{ from: location }} replace />;
      }
    } else {
      return <Outlet />;
    }
  }
};

export default AutoRedirectRoute;
