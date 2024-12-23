import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // إعادة التوجيه إلى صفحة تسجيل الدخول
  }

  return children;
};

export default ProtectedRoute;
