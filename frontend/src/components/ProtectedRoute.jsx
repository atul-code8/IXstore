import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  const [hasShownToast, setHasShownToast] = useState(false);

  const isAuthenticated = () => {
    return localStorage.getItem("token") ? true : false;
  };

  const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  useEffect(() => {
    if (isTokenExpired()) {
      localStorage.removeItem("token");
    }
  }, []);
  

  useEffect(() => {
    if (!isAuthenticated() && !hasShownToast) {
      toast.error("You need to be logged in to access this page.");
      setHasShownToast(true);
    }
  }, [hasShownToast]);

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
