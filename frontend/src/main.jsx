import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Checkout from "./components/Checkout.jsx";
import App from "./App.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Profile from "./components/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="text-5xl font-mono text-center pt-40 min-h-screen">Page not found 404!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <>Logged out successfully</>
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "products/:id",
        element: <Product />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
);
