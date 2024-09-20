import React, { useState } from "react";
import { ID, OAuthProvider } from "appwrite";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/confing";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`http://localhost:3000/api/auth/signup`, {
        email: form.email,
        password: form.password,
        name: form.username,
      })
      .then(function (response) {
        console.log(response);
        
        setIsLoading(false);
        toast.success("User created successfully!");
        setForm({
          username: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch(function (error) {
        setIsLoading(false);
        toast.error("Error in creating user!");
        throw new Error(error);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const promise = account.create(ID.unique(), form.email, form.password, form.username);

    promise.then(
      function (response) {
        console.log(response); // Success
        setIsLoading(false);
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const googleSignup = async (e) => {
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
    <div className="w-full min-h-screen max-w-xs mx-auto transition-opacity duration-500 ease-in-out opacity-100 pt-10">
      <Toaster />
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative"
        onSubmit={handleSubmit}
      >
        {isLoading && <div className="loader absolute top-0 left-0"></div>}
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 w-[76.74%] mx-auto text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
        <div className="text-center">
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
        </div>
        <div className="text-center mt-4">
          <Link
            to={`/login`}
            className="text-blue-500 hover:text-blue-700 font-bold"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
