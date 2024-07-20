// src/pages/Product.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Arrow from "../assets/arrow.svg";
import Products from "../store";
import { Link } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import Filter from "../assets/filter.svg";

const Product = () => {
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

  // useEffect(() => {
  //   fetch(`/api/products/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => setProduct(data));
  // }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <main className="grid grid-cols-4 mt-10 sm:p-[50px] p-4">
      {id ? (
        <ProductDetail {...Products} products={Products} id={id} />
      ) : (
        <>
          <aside
            className={`${
              panel ? "col-span-2" : "hidden"
            } sm:col-span-1 sm:block min-h-screen`}
          >
            <h3 className="text-lg sm:text-2xl font-bold">Filters</h3>
            <div className="sm:pr-16 pr-5">
              <p className="text-base sm:text-lg font-bold mt-4 sm:mt-8 tracking-wider">
                Size
              </p>
              <div className="flex space-x-[2.73px] sm:space-x-2 border-b-2 border-[#A9A9A9] border-dashed pt-4 pb-4 sm:pb-8">
                <button className="w-6 sm:w-10 h-6 sm:h-10 border-[1px] sm:border-2 border-[#808080] text-[9px] sm:text-base">
                  XS
                </button>
                <button className="w-6 sm:w-10 h-6 sm:h-10 border-[1px] sm:border-2 border-[#808080] text-[9px] sm:text-base">
                  L
                </button>
                <button className="w-6 sm:w-10 h-6 sm:h-10 border-[1px] sm:border-2 border-[#808080] text-[9px] sm:text-base">
                  M
                </button>
                <button className="w-6 sm:w-10 h-6 sm:h-10 border-[1px] sm:border-2 border-[#808080] text-[9px] sm:text-base">
                  S
                </button>
                <button className="w-6 sm:w-10 h-6 sm:h-10 border-[1px] sm:border-2 border-[#808080] text-[9px] sm:text-base">
                  XL
                </button>
                <button className="w-6 sm:w-10 h-6 sm:h-10 border-[1px] sm:border-2 border-[#808080] text-[9px] sm:text-base">
                  2XL
                </button>
              </div>
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
                  onClick={() =>
                    setToogle({ ...toogle, rating: !toogle.rating })
                  }
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
              <div className="group mt-4 sm:mt-8 relative">
                <input
                  type="text"
                  className="sm:w-[367px] sm:h-[50px] w-full h-[40px] bg-[#D9D9D9] pl-10 transition focus:ring-2 focus:ring-blue-500 focus:outline-none focus:placeholder-transparent"
                  placeholder="Search"
                />
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
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
                  className="block sm:hidden w-4 absolute left-0 top-12 cursor-pointer"
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
            <div className="mt-10 flex flex-wrap gap-x-5 sm:gap-x-10 gap-y-8">
              {Products.map((product) => (
                <div key={product.id} className="">
                  <div>
                    <Link to={`${product.id}`}>
                      <img
                        src={product.image}
                        alt="img"
                        className="sm:w-[266px] sm:h-[314px] w-[161px] h-[200px] object-cover object-center"
                      />
                    </Link>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="">
                      <p className="text-[11px]">{product.category}</p>
                      <p className="text-xs font-medium">{product.title}</p>
                    </div>
                    <p className="text-xs font-medium">${product.price}</p>
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
