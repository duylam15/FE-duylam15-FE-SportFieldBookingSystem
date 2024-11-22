import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  // Kiểm tra token đăng nhập trong local storage hoặc context
  const isAuthenticated = localStorage.getItem("accessToken") !== null;

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Nếu đã đăng nhập, hiển thị trang order
  return children;
};

export default ProtectedRoute;
