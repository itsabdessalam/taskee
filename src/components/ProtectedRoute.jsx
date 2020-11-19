/* eslint-disable no-unused-vars */
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const ProtectedRoute = ({ children, ...props }) => {
  if (!isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  return <Route {...props}>{children}</Route>;
};

export default ProtectedRoute;
