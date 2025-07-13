// src/components/ProductItem.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-neutral-100">
          <img
            src={product.images[0].src}
            alt={product.name}
            className="h-[300px] w-[300px] object-cover object-center"
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="font-semibold">{product.name}</p>
          <p className="font-semibold">{product.price}</p>
        </div>
        <div className="mt-4">
          <button
            className="w-full bg-gray-700 font-semibold rounded shadow text-white px-4 py-2"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div> */}
      <div className="aspect-[1/1] w-full overflow-hidden rounded-lg bg-neutral-100">
        <Link to={`/product/${product._id}`}>
          <div className="relative w-full">
            <img
              src={product.images[0].src || "/placeholder.svg"}
              alt={product.name}
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* {product.images.length > 1 && (
              <img
                src={product.images[1].src || "/placeholder.svg"}
                alt={product.name}

                className={`object-cover object-center transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )} */}
          </div>
        </Link>

        <button
          className="absolute top-4 right-4 rounded-full bg-white p-2 shadow-sm transition-opacity duration-300 hover:bg-neutral-100"
          aria-label="Add to wishlist"
        >
          {/* <Heart className="h-4 w-4" /> */}
          ❤️
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="mt-1 text-sm text-neutral-500">{product.category}</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-sm font-medium">${product.price}</p>
          {product.originalPrice && (
            <p className="text-sm text-neutral-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 border border-neutral-300 hover:bg-neutral-100 px-4 py-1.5 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button
          variant="outline"
          className="w-full text-sm font-semibold text-neutral-700"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
