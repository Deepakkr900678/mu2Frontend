import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const WardenPrivateRoute = ({ component: Component, ...rest }) => {
  const state = useSelector((state) => state);
  const history = useHistory();
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    history.push("/admin-login");
  }
  const role = state.auth?.userInfo?.role;
  const isAuthenticated =
    role === "Warden" || "Admin" || "Security" ? true : false;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin-login" />
        )
      }
    />
  );
};

export default WardenPrivateRoute;
