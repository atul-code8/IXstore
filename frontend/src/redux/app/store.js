import Image01 from "../../assets/Rectangle15.png";
import Image02 from "../../assets/Rectangle3.png";
import Image03 from "../../assets/Rectangle4.png";
import Image04 from "../../assets/Rectangle18.png";
import Image05 from "../../assets/Rectangle13.png";
import Image06 from "../../assets/Rectangle1.png";
import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from "../features/cart/cartSlice";
import { productApi } from "../features/services/product";
import { authApi } from "../features/services/auth";
import { cartApi } from "../features/cart/cartAPI";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      authApi.middleware,
      cartApi.middleware
    ),
});

setupListeners(store.dispatch);

const Products = [
  {
    id: 1,
    image: Image01,
    category: "Cotton T-shirt",
    title: "Basic Slim Fit T-Shirt",
    price: 199,
  },
  {
    id: 2,
    image: Image02,
    category: "Crewneck T-shirt",
    title: "Heavy weight T-Shirt",
    price: 199,
  },
  {
    id: 3,
    image: Image03,
    category: "Cotton T-shirt",
    title: "Basic Slive Zipper",
    price: 199,
  },
  {
    id: 4,
    image: Image04,
    category: "Cotton T-shirt",
    title: "Basic Fit T-Shirt",
    price: 199,
  },
  {
    id: 5,
    image: Image05,
    category: "Cotton T-shirt",
    title: "Oversize T-Shirt",
    price: 199,
  },
  {
    id: 6,
    image: Image06,
    category: "Cotton T-shirt",
    title: "Basic Slim Fit T-Shirt",
    price: 199,
  },
];

export default Products;
