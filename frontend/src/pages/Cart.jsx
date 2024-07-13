// src/pages/Cart.jsx
import React, { useContext } from "react";
import Cart from "../components/Cart";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const {cartItems, removeFromCart} = useContext(CartContext);
  console.log(cartItems);
  return (
    <div className="min-h-screen px-14 mt-10">
      <h1>Cart</h1>
      <Cart cartItems={cartItems} removeFromCart={removeFromCart}/>
    </div>
  );
};

export default CartPage;
