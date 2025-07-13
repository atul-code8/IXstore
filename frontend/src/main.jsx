import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import App from "./App.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import AfterCheckoutPage from "./components/AfterCheckoutPage.jsx";
import ContactPage from "./pages/Contact.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "products",
          element: <Product />,
        },
        {
          path: "product/:id",
          element: <ProductDetail />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "success",
          element: <AfterCheckoutPage />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
  ],
  { future: { v7_relativeSplatPath: true } }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider future={{ v7_startTransition: true }} router={router} />
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#333",
          color: "#fff",
          fontSize: "16px",
          width: "400px",
          maxWidth: "90%",
        },
        success: {
          style: {
            background: "#E0FBE2",
            color: "#333",
          },
        },
        error: {
          style: {
            background: "#FFF",
            color: "#333",
          },
        },
      }}
    />
  </>
);
