import React, { useContext, useEffect, useState, useRef } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import Products from "../redux/app/store";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAddToCartMutation } from "../redux/features/cart/cartAPI";
import { useGetProductByIdQuery } from "../redux/features/services/product";

const product = {
  name: "Basic Slim Fit T-shirt",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://unsplash.com/photos/4ebd1d7e2b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://unsplash.com/photos/4ebd1d7e2b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://unsplash.com/photos/4ebd1d7e2b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Slim Tee allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deatil, setDetail] = useState(null);
  const param = useParams();
  
  const [ addToCart ] = useAddToCartMutation();
  const { data, isLoading } = useGetProductByIdQuery(param.id);

  // const [data, setData] = useState(null);
  const recommendationSectionRef = useRef(null);

  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Animate image change
    gsap.fromTo(
      ".main-image",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [selectedImage]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".recommendation-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: recommendationSectionRef.current,
          start: "top 70%",
        },
      });
    }, recommendationSectionRef);

    return () => ctx.revert();
  }, []);

  const handleAddCart = async () => {
    // dispatch(addToCart(data));
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      toast.error("Please login to add item to cart.");
      return;
    }
    try {
      const response = await addToCart({
        product: data._id,
        quantity: 1
      }).unwrap();
      console.log(response);
      toast.success("Item added to cart successfully.");
    } catch (error) {
      console.log(error);
      toast.error(error.data.error);
    }
  };
;

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>{error}</p>
      </div>
    );
  }

  const reviews = { href: "#", average: 4, totalCount: 117 };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto lg:max-w-7xl px-4">
          <p className="text-sm font-semibold tracking-wider">
            <span className="text-blue-500">Home</span> / Products / {data?.name}
          </p>
          <h2 className="text-2xl sm:text-3xl notable-regular sm:mt-4 mt-2">
            {data?.name}
          </h2>
        </div>
      <div className="">
        <div>
          {/* <nav aria-label="Breadcrumb" className="mb-6">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    <svg
                      fill="currentColor"
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {deatil?.title}
                </a>
              </li>
            </ol>
          </nav> */}

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 gap-12 lg:px-8">
            <div className="col-span-1">
              <div className="w-full">
                <div className="relative max-h-[500px] overflow-hidden rounded-lg mb-4">
                  <img
                    src={data?.images[selectedImage].src || "/placeholder.svg"}
                    alt="Product image"
                    className="main-image object-contain"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {data?.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative aspect-square overflow-hidden rounded-md ${
                        selectedImage === index
                          ? "ring-2 ring-black"
                          : "ring-1 ring-neutral-200"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={`Product thumbnail ${index + 1}`}
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Product info */}
            <div>
              <form>
                {/* Options */}
                <div className="mt-4 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    {`$ ${data?.price}`}
                  </p>

                  {/* Reviews */}
                  <div className="mt-4">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            aria-hidden="true"
                            className={classNames(
                              reviews.average > rating
                                ? "text-gray-900"
                                : "text-white",
                              "h-5 w-5 shrink-0"
                            )}
                          />
                        ))}
                      </div>
                      <p className="sr-only">
                        {reviews.average} out of 5 stars
                      </p>
                      <a
                        href={reviews.href}
                        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {reviews.totalCount} reviews
                      </a>
                    </div>
                  </div>
                </div>
                {/* Colors */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="flex items-center space-x-3"
                    >
                      {data?.colors.map((color) => (
                        <Radio
                          key={color.name}
                          value={color}
                          aria-label={color.name}
                          className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1 ring-indigo-500"
                        >
                          <span
                            aria-hidden="true"
                            style={{ backgroundColor: color.colorCode }}
                            className={`h-8 w-8 rounded-full border border-black border-opacity-10`}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-5"
                    >
                      {data?.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border p-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
                <button
                  type="button"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleAddCart}
                >
                  Add to bag
                </button>
              </form>
            </div>
          </div>

          {/* Product details */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-16 lg:pt-16">
            <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {data?.name}
              </h1>
            </div>
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">{data?.description}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {data?.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-500">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{data?.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={recommendationSectionRef} className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* {products.map((product) => (
          <div key={product.id} className="recommendation-card">
            <ProductCard product={product} />
          </div>
        ))} */}
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
