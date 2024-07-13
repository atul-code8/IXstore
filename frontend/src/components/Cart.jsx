// src/components/Cart.js
import React from "react";

const Cart = ({ cartItems, removeFromCart }) => (
  <div>
    <h2>Shopping Cart</h2>
    {cartItems.length === 0 ? (
      <p>No items in cart</p>
    ) : (
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="mt-4">
            {item.name}
            <button
              type="button"
              className="text-red-500 text-xl px-1 shadow-md ml-2"
              onClick={() => removeFromCart(item)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Cart;
