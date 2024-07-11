import React, { useState } from 'react';
import { Client, Account, ID } from "appwrite";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const client = new Client()
        .setEndpoint(import.meta.env.VITE_ENDPOINT) // Your API Endpoint
        .setProject(import.meta.env.VITE_PROJECT_ID); // Your project ID
    
    const account = new Account(client);
    
    const user = await account.create(
        ID.unique(), 
        form.email, 
        form.password,
        form.username
    );

    const promise = await account.createEmailPasswordSession(form.email, form.password);
    navigate('/');
    
  }

  return (
    <div className="w-full min-h-screen max-w-xs mx-auto transition-opacity duration-500 ease-in-out opacity-100 pt-10">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({...form, username: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
        <div className="text-center mt-4">
          <Link to={`/login`}
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
