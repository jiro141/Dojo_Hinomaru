import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const grade = localStorage.getItem("grade");

  // Si no existe la variable 'grade', redirige a /sign-in
  if (!grade) {
    return <Navigate to="/sign-in" />;
  }

  // Si existe, renderiza el componente hijo (la ruta protegida)
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
