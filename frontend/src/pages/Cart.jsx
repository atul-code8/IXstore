// src/pages/Cart.js
import React from 'react';
import Cart from '../components/Cart';

const CartPage = ({ cartItems }) => (
  <div>
    <h1>Cart</h1>
    <Cart cartItems={cartItems} />
  </div>
);

export default CartPage;
