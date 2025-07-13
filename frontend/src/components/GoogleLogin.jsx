import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useGoogleMutation } from "../redux/features/services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const [google] = useGoogleMutation();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      // Send the ID token to your backend
      const response = await google({
        idToken: credential,
      }).unwrap();
      localStorage.setItem("token", response.access_token);
      toast.success(response.message);
      navigate('/');
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.message || "Google login failed. Please try again.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="my-4">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            console.error("Google Login Failed");
            toast.error("Google login failed. Please try again.");
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
