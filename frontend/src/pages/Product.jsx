// src/pages/Product.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Arrow from "../assets/arrow.svg";
import Filter from "../assets/filter.svg";
import ProductList from "../components/ProductList";

const Product = React.memo(() => {
  const { id } = useParams();
  const [product, setProduct] = useState(true);
  const [panel, setPanel] = useState(false);
  const [toogle, setToogle] = useState({
    availability: true,
    category: false,
    color: false,
    priceRange: false,
    rating: false,
    tag: false,
  });

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <main className="grid grid-cols-4 sm:p-[50px] p-4">
      <aside
        className={`${
          panel ? "col-span-2" : "hidden"
        } sm:col-span-1 sm:block min-h-screen`}
      >
        <h3 className="text-lg sm:text-2xl font-bold">Filters</h3>
        <div className="sm:pr-16 pr-5 mt-6">
          <div className="border-b-2 border-[#A9A9A9] border-dashed pt-4 pb-4 sm:pb-8 relative">
            <p className="sm:text-lg text-base font-bold tracking-wider">
              Availability
            </p>
            {toogle.availability && (
              <>
                <div className="flex space-x-2 sm:space-x-4 mt-2 text-xs sm:text-base">
                  <input
                    type="checkbox"
                    name="Availability"
                    id="Availability"
                    className="sm:w-5 w-3"
                  />
                  <label htmlFor="Availability">Availability</label>
                </div>
                <div className="flex space-x-2 sm:space-x-4 mt-2 text-xs sm:text-base">
                  <input
                    type="checkbox"
                    name="outofstock"
                    id="outofstock"
                    className="sm:w-5 w-3"
                  />
                  <label htmlFor="outofstock">Out of Stock</label>
                </div>
              </>
            )}
            <button
              className="absolute top-6 right-0 px-2 py-1"
              onClick={() =>
                setToogle({
                  ...toogle,
                  availability: !toogle.availability,
                })
              }
            >
              <img
                src={Arrow}
                alt="arrow"
                className={`${
                  toogle.availability ? "-rotate-90" : "-rotate-0"
                } w-[6px] sm:w-[8px]`}
              />
            </button>
          </div>
          <div className="border-b-2 border-[#A9A9A9] border-dashed pt-4 pb-4 sm:pb-8 relative">
            <p className="text-base sm:text-lg font-bold tracking-wider">
              Category
            </p>
            {toogle.category && (
              <>
                <div className="flex space-x-2 sm:space-x-4 mt-2 text-xs sm:text-base">
                  <input
                    type="checkbox"
                    name="Men"
                    id="Men"
                    className="sm:w-5 w-3"
                  />
                  <label htmlFor="Men">MEN</label>
                </div>
                <div className="flex space-x-2 sm:space-x-4 mt-2 text-xs sm:text-base">
                  <input
                    type="checkbox"
                    name="Women"
                    id="Women"
                    className="sm:w-5 w-3"
                  />
                  <label htmlFor="Women">WOMEN</label>
                </div>
                <div className="flex space-x-2 sm:space-x-4 mt-2 text-xs sm:text-base">
                  <input
                    type="checkbox"
                    name="Kids"
                    id="Kids"
                    className="sm:w-5 w-3"
                  />
                  <label htmlFor="Kids">KIDS</label>
                </div>
              </>
            )}
            <button
              className="absolute top-6 right-0 px-2 py-1"
              onClick={() =>
                setToogle({ ...toogle, category: !toogle.category })
              }
            >
              <img
                src={Arrow}
                alt="arrow"
                className={`${
                  toogle.category ? "-rotate-90" : "-rotate-0"
                } w-[6px] sm:w-[8px]`}
              />
            </button>
          </div>
          <div className="border-b-2 border-[#A9A9A9] border-dashed pt-4 pb-4 sm:pb-8 relative">
            <p className="text-base sm:text-lg font-bold tracking-wider">
              Colors
            </p>
            {toogle.color && (
              <>
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
              </>
            )}
            <button
              className="absolute top-6 right-0 px-2 py-1"
              onClick={() => setToogle({ ...toogle, color: !toogle.color })}
            >
              <img
                src={Arrow}
                alt="arrow"
                className={`${
                  toogle.color ? "-rotate-90" : "-rotate-0"
                } w-[6px] sm:w-[8px]`}
              />
            </button>
          </div>
          <div className="border-b-2 border-[#A9A9A9] border-dashed pt-4 pb-4 sm:pb-8 relative">
            <p className="text-base sm:text-lg font-bold tracking-wider">
              Price Range
            </p>
            {toogle.priceRange && (
              <>
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
              </>
            )}
            <button
              className="absolute top-6 right-0 px-2 py-1"
              onClick={() =>
                setToogle({ ...toogle, priceRange: !toogle.priceRange })
              }
            >
              <img
                src={Arrow}
                alt="arrow"
                className={`${
                  toogle.priceRange ? "-rotate-90" : "-rotate-0"
                } w-[6px] sm:w-[8px]`}
              />
            </button>
          </div>
          <div className="border-b-2 border-[#A9A9A9] border-dashed pt-4 pb-4 sm:pb-8 relative">
            <p className="text-base sm:text-lg font-bold tracking-wider">
              Ratings
            </p>
            {toogle.rating && (
              <>
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
              </>
            )}
            <button
              className="absolute top-6 right-0 px-2 py-1"
              onClick={() => setToogle({ ...toogle, rating: !toogle.rating })}
            >
              <img
                src={Arrow}
                alt="arrow"
                className={`${
                  toogle.rating ? "-rotate-90" : "-rotate-0"
                } w-[6px] sm:w-[8px]`}
              />
            </button>
          </div>
          <div className="border-b-2 border-[#A9A9A9] border-dashed pt-4 pb-4 sm:pb-8 relative">
            <p className="text-base sm:text-lg font-bold tracking-wider">
              Tags
            </p>
            {toogle.tag && (
              <>
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
              </>
            )}
            <button
              className="absolute top-6 right-0 px-2 py-1"
              onClick={() => setToogle({ ...toogle, tag: !toogle.tag })}
            >
              <img
                src={Arrow}
                alt="arrow"
                className={`${
                  toogle.tag ? "-rotate-90" : "-rotate-0"
                } w-[6px] sm:w-[8px]`}
              />
            </button>
          </div>
        </div>
      </aside>
      <section
        className={`min-h-screen ${
          panel ? "col-span-2" : "col-span-4"
        } sm:col-span-3 sm:pl-8 pl-0`}
      >
        <div>
          <p className="text-sm font-semibold tracking-wider">
            <span className="text-blue-500">Home</span> / Products
          </p>
          <h2 className="text-2xl sm:text-3xl notable-regular sm:mt-4 mt-2">
            Products
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-x-8">
          <div className="group mt-4 sm:mt-8 relative flex-1">
            <input
              type="text"
              className="w-full bg-[#D9D9D9] pl-10 px-4 py-2 rounded-xl transition focus:ring-2 focus:ring-blue-500 focus:outline-none focus:placeholder-transparent"
              placeholder="Search"
            />
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="absolute left-3 top-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              />
            </svg>
            <img
              src={Filter}
              alt="filter"
              className="block sm:hidden w-6 absolute left-0 top-12 cursor-pointer"
              onClick={() => setPanel(!panel)}
            />
          </div>
          <div className="grid grid-rows-2 grid-flow-col gap-x-2 gap-y-1 mt-8 pb-2 sm:pb-0 overflow-x-scroll sm:overflow-x-auto">
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
        <ProductList />
      </section>
    </main>
  );
});

export default Product;
