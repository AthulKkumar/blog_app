import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { AuthContext } from "../context/authContext";

function AuthRoute({ Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/" /> : <Component {...rest} />;
}

export default AuthRoute;
