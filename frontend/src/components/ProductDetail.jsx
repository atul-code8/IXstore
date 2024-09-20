import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductDetail = ({products, id}) => {
    const current = Number(id) - 1;
    const {cartItems, addToCart} = useContext(CartContext);
  return (
    <>
      <section className="flex flex-col lg:flex-row items-center justify-evenly col-span-4 mt-4">
        <div className="bg-white">
          <img
            src={products[current].image}
            alt="detail"
            className="w-full h-full object-center"
          />
        </div>
        <div className="w-auto max-w-[500px] border-2 border-[#D9D9D9] p-10 mt-12 lg:mt-0">
          <h2 className="text-lg notable-regular tracking-wide">
            abstract print shirt
          </h2>
          <p className="font-bold mt-2">$199</p>
          <p className="text-sm text-gray-500 font-mono font-semibold mt-1">
            MRP incl. of all taxes
          </p>
          <p className="mt-4 font-bold tracking-wider">
            Relaxed-fit shirt. Camp collar and short sleeves. Button-up front.
          </p>
          <div className="mt-4">
            <p className="font-semibold">Color</p>
            <div className="flex space-x-1">
              <button className="w-[35px] h-[36px] bg-gray-500"></button>
              <button className="w-[35px] h-[36px] bg-blue-500"></button>
              <button className="w-[35px] h-[36px] bg-amber-500"></button>
              <button className="w-[35px] h-[36px] bg-teal-500"></button>
              <button className="w-[35px] h-[36px] bg-black"></button>
              <button className="w-[35px] h-[36px] bg-white"></button>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-semibold">Size</p>
            <div className="flex space-x-1">
              <button className="w-[35px] h-[36px] border-2 border-gray-700">
                XS
              </button>
              <button className="w-[35px] h-[36px] border-2 border-gray-700">
                S
              </button>
              <button className="w-[35px] h-[36px] border-2 border-gray-700">
                M
              </button>
              <button className="w-[35px] h-[36px] border-2 border-gray-700">
                L
              </button>
              <button className="w-[35px] h-[36px] border-2 border-gray-700">
                XL
              </button>
              <button className="w-[35px] h-[36px] border-2 border-gray-700">
                2XL
              </button>
            </div>
          </div>

          <div>
            <button type="button" className="w-full hover:ring-2 transition bg-[#D9D9D9] py-2 text-center font-bold mt-4" >
              Add
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
