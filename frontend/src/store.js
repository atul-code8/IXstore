import Image01 from "./assets/Rectangle15.png";
import Image02 from "./assets/Rectangle3.png";
import Image03 from "./assets/Rectangle4.png";
import Image04 from "./assets/Rectangle18.png";
import Image05 from "./assets/Rectangle13.png";
import Image06 from "./assets/Rectangle1.png";
import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productApi } from './services/product'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [productApi.reducerPath]: productApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)



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

    }
]

export default Products;