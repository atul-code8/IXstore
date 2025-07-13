import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoginMutation } from "../redux/features/services/auth";
import GoogleLoginButton from "./GoogleLogin";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [toggleEye, setToggleEye] = useState(false);

  const location = useLocation();
  const message = location.state?.message;

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!form.email || !form.password) {
      toast.error("Email and password are required.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await login({
        email: form.email,
        password: form.password,
      }).unwrap();
      localStorage.setItem("token", response.access_token);
      toast.success("User login successfully!");
      navigate("/");
    } catch (err) {
      console.log("Error:", err);
      const errorMessage =
        err.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-5">
      <form
        className="bg-white shadow rounded-lg px-8 pt-6 pb-8 w-full md:w-[500px]"
        onSubmit={handleLogin}
      >
        {isLoading && <div className="loader absolute top-0 left-0"></div>}
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 tracking-wide"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border-2 text-sm border-[#1F41BB] rounded w-full py-3 px-4 text-gray-700 leading-tight"
            id="username"
            name="Email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 tracking-wide"
            htmlFor="password"
          >
            Password
          </label>
          <div className="flex border-2 border-[#1F41BB] focus-within:border-black rounded shadow">
            <input
              className="appearance-none outline-none rounded text-sm w-full py-3 px-4 text-gray-700 leading-tight"
              id="password"
              name="Password"
              type={toggleEye ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              className="p-2"
              onClick={() => setToggleEye(!toggleEye)}
            >
              {toggleEye ? (
                <svg
                  className="w-6 h-6 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-[#1F41BB] hover:bg-gray-900 w-full text-white font-semibold py-3 px-5 rounded-lg transition"
          >
            Sign In
          </button>
        </div>
        <GoogleLoginButton />
        <div className="text-center mt-4">
          <Link
            to={`/register`}
            className="text-[#1F41BB] hover:text-blue-700 font-bold text-sm tracking-wide"
          >
            Don't have account? Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
