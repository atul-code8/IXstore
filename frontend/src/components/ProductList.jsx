// src/components/ProductList.js
import React, { useRef, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGetProductsQuery } from "../redux/features/services/product";

const ProductList = () => {
  const gridRef = useRef(null);
  const { data, isLoading } = useGetProductsQuery();

  useEffect(() => {
    if (data?.products?.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".product-item", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 70%",
          },
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <>
      <div className="px-4 sm:py-16 py-12 sm:px-6">
        {/* <h2 className="notable-regular text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2> */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        >
          {/* {Products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.title}`}
              className="group product-item"
            >
              <div className="aspect-ratio aspect-[1/1] w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-[7/8]">
                <img
                  alt={product.imageAlt}
                  src={product.image}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 transition"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p>
            </Link>
          ))} */}

          {data?.products?.map((product) => (
            <div key={product._id} className="product-item">
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
