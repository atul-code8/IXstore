// src/pages/Product.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Arrow from "../assets/arrow.svg";
import Products from "../store";
import { Link } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(true);
  const [toogle, seToogle] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <main className="grid grid-cols-4 mt-10 p-[50px]">
      {id ? (
        <section className="flex items-center justify-evenly col-span-4 mt-4">
          <div className="w-[367px] h-[438px] bg-white">
            <img
              src={Products[4].image}
              alt="detail"
              className="w-full h-full object-center"
            />
          </div>
          <div className="w-[310px] h-[500px] border-2 border-[#D9D9D9] pl-10">
            <h2 className="mt-10 text-lg notable-regular tracking-wide">
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
              <button className="w-[90%] bg-[#D9D9D9] py-2 text-center font-bold mt-4">Add</button>
            </div>
          </div>
        </section>
      ) : (
        <>
          <aside className="min-h-screen col-span-1 ">
            <h3 className="text-2xl font-bold">Filters</h3>
            <div className="pr-16">
              <p className="text-lg font-bold mt-8 tracking-wider">Size</p>
              <div className="flex space-x-2 border-b-2 border-[#D9D9D9] border-dashed pt-4 pb-8">
                <button className="w-10 h-10 border-2 border-[#D9D9D9]">
                  XS
                </button>
                <button className="w-10 h-10 border-2 border-[#D9D9D9]">
                  L
                </button>
                <button className="w-10 h-10 border-2 border-[#D9D9D9]">
                  M
                </button>
                <button className="w-10 h-10 border-2 border-[#D9D9D9]">
                  S
                </button>
                <button className="w-10 h-10 border-2 border-[#D9D9D9]">
                  XL
                </button>
                <button className="w-10 h-10 border-2 border-[#D9D9D9]">
                  2XL
                </button>
              </div>
              <div className="border-b-2 border-[#D9D9D9] border-dashed pt-4 pb-8 relative">
                <p className="text-lg font-bold tracking-wider">Availability</p>
                <div className="flex space-x-4 mt-2">
                  <input
                    type="checkbox"
                    name="Availability"
                    id="Availability"
                    className="w-5"
                  />
                  <label htmlFor="Availability">Availability</label>
                </div>
                <div className="flex space-x-4 mt-2">
                  <input
                    type="checkbox"
                    name="outofstock"
                    id="outofstock"
                    className="w-5"
                  />
                  <label htmlFor="outofstock">Out of Stock</label>
                </div>
                <button className="absolute top-6 right-0">
                  <img
                    src={Arrow}
                    alt="arrow"
                    width={8}
                    className="-rotate-90"
                  />
                </button>
              </div>
              <div className="border-b-2 border-[#D9D9D9] border-dashed pt-4 pb-8 relative">
                <p className="text-lg font-bold tracking-wider">Category</p>
                <button className="absolute top-6 right-0">
                  <img src={Arrow} alt="arrow" width={8} className="" />
                </button>
              </div>
              <div className="border-b-2 border-[#D9D9D9] border-dashed pt-4 pb-8 relative">
                <p className="text-lg font-bold tracking-wider">Colors</p>
                <button className="absolute top-6 right-0">
                  <img src={Arrow} alt="arrow" width={8} className="" />
                </button>
              </div>
              <div className="border-b-2 border-[#D9D9D9] border-dashed pt-4 pb-8 relative">
                <p className="text-lg font-bold tracking-wider">Price Range</p>
                <button className="absolute top-6 right-0">
                  <img src={Arrow} alt="arrow" width={8} className="" />
                </button>
              </div>
              <div className="border-b-2 border-[#D9D9D9] border-dashed pt-4 pb-8 relative">
                <p className="text-lg font-bold tracking-wider">Ratings</p>
                <button className="absolute top-6 right-0">
                  <img src={Arrow} alt="arrow" width={8} className="" />
                </button>
              </div>
              <div className="border-b-2 border-[#D9D9D9] border-dashed pt-4 pb-8 relative">
                <p className="text-lg font-bold tracking-wider">Tags</p>
                <button className="absolute top-6 right-0">
                  <img src={Arrow} alt="arrow" width={8} className="" />
                </button>
              </div>
            </div>
          </aside>
          <section className="min-h-screen col-span-3 pl-8">
            <div>
              <p className="text-sm font-semibold tracking-wider">
                <span className="text-blue-500">Home</span> / Products
              </p>
              <h2 className="text-3xl notable-regular mt-4">Products</h2>
            </div>
            <div className="flex gap-x-8">
              <div className="group mt-8 relative">
                <input
                  type="text"
                  className="w-[367px] h-[50px] bg-[#D9D9D9] pl-10 transition focus:ring-2 focus:ring-blue-500 focus:outline-none focus:placeholder-transparent"
                  placeholder="Search"
                />
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  />
                </svg>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 mt-8">
                <button className="w-[100px] h-[24px] text-center border-2 border-[#D9D9D9] text-xs font-medium">
                  NEW
                </button>
                <button className="w-[100px] h-[24px] text-center border-2 border-[#D9D9D9] text-xs">
                  SHIRTS
                </button>
                <button className="w-[100px] h-[24px] text-center border-2 border-[#D9D9D9] text-xs">
                  POLO SHIRTS
                </button>
                <button className="w-[100px] h-[24px] text-center border-2 border-[#D9D9D9] text-xs">
                  SHORTS
                </button>
                <button className="w-[100px] h-[24px] text-center border-2 border-[#D9D9D9] text-xs">
                  SUIT
                </button>
                <button className="w-[100px] h-[24px] text-center border-2 border-[#D9D9D9] text-xs">
                  JEANS
                </button>
                <button className="w-[100px] h-[24px] text-center border-2 border-[#D9D9D9] text-xs">
                  T-SHIRTS
                </button>
                <button className="w-[100px] h-[24px] text-center border-2 border-[#D9D9D9] text-xs">
                  JACKETS
                </button>
                <button className="w-[100px] h-[24px] text-center border-2 border-[#D9D9D9] text-xs">
                  COAT
                </button>
                <button className="w-[100px] h-[24px] text-center border-2 border-[#D9D9D9] text-xs">
                  CARGOS
                </button>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-8">
              {Products.map((product) => (
                <div key={product.id} className="">
                  <div>
                    <Link to={`${product.id}`}>
                      <img
                        src={product.image}
                        alt="img"
                        className="w-[266px] h-[314px] object-cover object-center"
                      />
                    </Link>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div>
                      <p>{product.category}</p>
                      <p>{product.title}</p>
                    </div>
                    <p>${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Product;
