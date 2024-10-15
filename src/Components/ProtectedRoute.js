import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isAuthenticated = userInfo.isAuthenticated;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin-login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
