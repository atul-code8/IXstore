// src/pages/Cart.jsx
import React, { useContext } from "react";
import Cart from "../components/Cart";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  console.log(cartItems);
  return (
    <div className="min-h-screen px-14 mt-10">
      <p className="text-sm font-semibold tracking-wider">
        <span className="text-blue-500">Home</span> / Cart
      </p>
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default CartPage;
