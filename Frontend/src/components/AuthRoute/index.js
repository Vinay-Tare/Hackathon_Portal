import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import React from "react";

const AuthRoute = ({ allowedRoles }) => {
  const { isAuth, roles } = useAuth();

  const location = useLocation();

  if (isAuth != null)
    return isAuth && allowedRoles.find((role) => roles.includes(role)) ? (
      <Outlet />
    ) : isAuth ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/register" state={{ from: location }} replace />
    );
};

export default AuthRoute;
