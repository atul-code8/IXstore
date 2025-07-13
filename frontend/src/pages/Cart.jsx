// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import EmptyCart from "../assets/empty-cart.svg";
import {
  useGetCartItemsQuery,
  useRemoveFromCartMutation,
} from "../redux/features/cart/cartAPI";
import { LockClosedIcon } from "@heroicons/react/24/outline";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const AuthCard = ({
  title = "Authentication Required",
  description = "You need to be logged in to access this page.",
  onLogin = () => console.log("Login clicked"),
  loginButtonText = "Login",
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mb-2 transform transition-transform duration-300 hover:scale-110">
              <LockClosedIcon className="size-8 stroke-2" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            {title}
          </h2>
          <p className="text-center text-gray-600 mb-8">{description}</p>

          <Link
            to={"/login"}
            className="w-full inline-block text-center py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg 
                     transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none 
                     focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 shadow-md"
          >
            {loginButtonText}
          </Link>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const [loading, setLoading] = useState(false);

  const { data: cartItems, isLoading, error } = useGetCartItemsQuery();
  const [removeFromCart] = useRemoveFromCartMutation();

  // const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  const handleRemoveFromCart = (item) => {
    // dispatch(removeFromCart(item));
    try {
      const response = removeFromCart(item.product._id).unwrap();
      toast.success("Item removed from cart successfully.");
    } catch (error) {
      console.log(error);
      toast.error(error.data.error);
    }
  };

  const totalAmount = cartItems?.data?.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    alert("Stripe disabled for this project.");
    // setLoading(true);
    // const stripe = await stripePromise;
    // const token = localStorage.getItem("token");
    // try {
    //   const { data } = await axios.post(
    //     "http://localhost:8080/api/payment/create-checkout-intent",
    //     {
    //       items: cartItems,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   const result = await stripe.redirectToCheckout({
    //     sessionId: data.id,
    //   });
    //   if (result.error) {
    //     console.error("Stripe Checkout error", result.error.message);
    //   }
    // } catch (error) {
    //   console.error("Error during checkout:", error);
    //   toast.error(error.message || "Error when checkout the product");
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  if (message || error) {
    return (
      <section className="h-screen p-4 flex justify-center items-center">
        <p>{message}</p>
        {error ? (
          error.status === 401 ? (
            <AuthCard />
          ) : (
            error.data.message
          )
        ) : null}
      </section>
    );
  }

  return (
    <div className="px-4 sm:px-8 lg:px-12">
      <p className="text-sm font-semibold tracking-wider mt-10">
        <span className="text-blue-500">Home</span> / Cart
      </p>
      {
        isLoading ? (
          <div className="mt-2 flex justify-center items-center min-h-96">
            <svg
              className="animate-spin h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <div>
            {cartItems?.data?.length === 0 ? (
              <div className="min-h-[80vh] flex flex-col justify-center items-center">
                <img src={EmptyCart} alt="empty-cart" className="max-w-xs mb-4" />
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-neutral-600 mb-8">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link to="/products">
                  <button className="mt-4 bg-black/90 text-white px-5 py-2 rounded-md hover:bg-black transition">
                    <span className="font-medium">Continue Shopping</span>
                  </button>
                </Link>
              </div>
            ) : (
              <>
                {loading && <div className="loader mt-2"></div>}
                <div className="max-w-full rounded-lg px-8 py-10">
                  <div className="max-w-[42rem] mx-auto lg:max-w-none lg:grid lg:grid-cols-12 space-y-12 gap-x-8">
                    <section className="lg:col-span-7 p-8">
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-300"
                          >
                            {cartItems?.data?.map((item) => (
                              <li key={item._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    alt={item.product.name}
                                    src={item.product.images[0].src}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3 className="">{item.product.name}</h3>
                                      <p className="ml-4">{`$${item.product.price}`}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.product.category}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.product.color}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex justify-between items-center">
                                      <p className="text-gray-500 font-medium bg-white p-2 rounded">
                                        Qty {item.quantity}
                                      </p>
                                      <div className="flex gap-x-1 items-center ml-4 px-3 py-1 rounded-full bg-[#f9fafb]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="green"
                                          aria-hidden="true"
                                          data-slot="icon"
                                          className="w-4"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                            clipRule="evenodd"
                                          ></path>
                                        </svg>
                                        <span className="text-gray-700 font-medium">
                                          in stock
                                        </span>
                                      </div>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => handleRemoveFromCart(item)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                    <section className="bg-[#f9fafb] p-8 rounded-lg lg:col-span-5">
                      <h2 id="summary-heading" className="text-xl font-semibold">
                        Order summary
                      </h2>
                      <dl>
                        <div className="flex items-center justify-between mt-4 pt-4 font-medium">
                          <dt className="text-gray-700">Subtotal</dt>
                          <dd className="axa axh ayy">{`$${totalAmount}`}</dd>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e5e7eb]">
                          <dt className="flex items-center gap-x-1 font-medium text-gray-700">
                            <span>Shipping estimate</span>
                            <a
                              href="#"
                              className="jx vf ays bmg"
                              title="Learn more about how shipping is calculated"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                                className="w-5"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </a>
                          </dt>
                          <dd className="font-medium line-through">$5.00</dd>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e5e7eb]">
                          <dt className="flex items-center gap-x-1 font-medium text-gray-700">
                            <span>Tax estimate</span>
                            <a
                              href="#"
                              className="jx vf ays bmg"
                              title="Learn more about how tax is calculated"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                                className="w-5"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </a>
                          </dt>
                          <dd className="font-medium line-through">
                            {`$${(totalAmount * 12) / 100}`}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e5e7eb] font-medium">
                          <dt className="text-gray-700">Order total</dt>
                          <div>
                            <dd className="line-through">{`$${5 + totalAmount + (totalAmount * 12) / 100
                              }`}</dd>
                            <dd className="">{`$${totalAmount}`}</dd>
                          </div>
                        </div>
                      </dl>
                      <div className="mt-6">
                        <button
                          type="button"
                          className="w-4/5 mx-auto flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          onClick={handleCheckout}
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6">
                        <p className="text-center mb-2">or </p>
                        <Link
                          to="/products"
                          className="font-medium flex justify-center items-center gap-x-2 text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      </div>
                    </section>
                  </div>
                </div>
              </>
            )}
          </div>
        )
      }
    </div>
  );
};

export default CartPage;
