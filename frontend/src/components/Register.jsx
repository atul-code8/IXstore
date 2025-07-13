import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useRegisterMutation } from "../redux/features/services/auth";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [register] = useRegisterMutation();
  const [toggleEye, setToggleEye] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.email || !form.password || !form.username) {
      toast.error("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await register({
        email: form.email,
        password: form.password,
        username: form.username,
      }).unwrap();
      if (response.data) {
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.data?.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignup = (e) => {
    e.preventDefault();
    // Go to OAuth provider login page
    account.createOAuth2Session(
      OAuthProvider.Google, // provider
      "https://ix-store.vercel.app/success", // redirect here on success
      "https://ix-store.vercel.app/failed" // redirect here on failure
      // [] // scopes (optional)
    );
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-5">
      <Toaster />
      <form
        className="bg-white shadow rounded-lg px-8 pt-6 pb-8 mx-auto relative w-full md:w-[500px]"
        onSubmit={handleRegister}
      >
        {isLoading && <div className="loader absolute top-0 left-0"></div>}
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 tracking-wide"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border-2 text-sm border-[#1F41BB] rounded w-full py-3 px-4 text-gray-700 leading-tight"
            id="username"
            name="Username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 tracking-wide"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border-2 text-sm border-[#1F41BB] rounded w-full py-3 px-4 text-gray-700 leading-tight"
            id="email"
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
            className="bg-[#1F41BB] hover:bg-gray-900 text-white w-full px-5 py-3 rounded-lg font-semibold transition"
            type="submit"
          >
            Register
          </button>
        </div>
        {/* <div className="text-center">
          <button type="button" className="gsi-material-button mt-2" onClick={googleSignup}>
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ display: "block" }}
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents">
                Continue with Google
              </span>
              <span style={{ display: "none" }}>Sign up with Google</span>
            </div>
          </button>
        </div> */}
        <div className="text-center mt-4">
          <Link
            to={`/login`}
            className="text-[#1F41BB] hover:text-blue-700 font-bold text-sm tracking-wide"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
