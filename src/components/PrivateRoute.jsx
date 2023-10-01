import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
function PrivateRoute({ children, dispatch }) {
  const token = window.localStorage.getItem("access_token");
  return token ? children : <Navigate to="/" />;
}

export default connect()(PrivateRoute);