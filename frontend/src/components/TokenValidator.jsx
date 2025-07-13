// src/components/TokenValidator.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TokenValidator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // handleLogout();
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status !== 200) {
          handleLogout();
        }
      } catch (err) {
        console.error("Token check failed:", err);
        handleLogout();
      }
    };

    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };

    checkTokenValidity();
  }, [navigate]);

  return null; // No UI needed
};

export default TokenValidator;
