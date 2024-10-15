import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const state = useSelector((state) => state);
  const history = useHistory();
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    history.push("/login");
  }
  const role = state.auth?.userInfo?.role;
  const isAuthenticated = role === "Student" ? true : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
