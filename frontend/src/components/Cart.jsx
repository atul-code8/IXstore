// src/components/Cart.js
import React from 'react';

const Cart = ({ cartItems }) => (
  <div>
    <h2>Shopping Cart</h2>
    {cartItems.length === 0 ? (
      <p>No items in cart</p>
    ) : (
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>{item.name} - {item.quantity}</li>
        ))}
      </ul>
    )}
  </div>
);

export default Cart;
