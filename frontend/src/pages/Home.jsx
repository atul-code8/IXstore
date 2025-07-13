// src/pages/Home.js
import React, { useState, useEffect, useRef } from "react";
import Image1 from "../assets/Rectangle12.png";
import Image2 from "../assets/Rectangle13.png";
import Image3 from "../assets/Rectangle17.png";
import Image4 from "../assets/Rectangle018.png";
import Image5 from "../assets/Rectangle19.png";
import Image6 from "../assets/Rectangle20.png";
import Image7 from "../assets/Rectangle18.png";
import Image8 from "../assets/Rectangle12.png";
import Image9 from "../assets/Rectangle15.png";
import Image10 from "../assets/Rectangle14.png";
import Image11 from "../assets/Rectangle16.png";
import Image12 from "../assets/Rectangle5.png";
import Arrow from "../assets/vector.svg";
import RightArrow from "../assets/arrow.svg";
import CategoryMens from "../assets/akke-2.png";
import CategoryWomens from "../assets/akke-3.png";
import CategoryAccessories from "../assets/akke-1.png";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);

const categories = [
  {
    id: "mens",
    name: "Men's Collection",
    description: "Timeless essentials for the modern man",
    image: CategoryMens,
    href: "/collections/mens",
  },
  {
    id: "womens",
    name: "Women's Collection",
    description: "Elegant designs for every occasion",
    image: CategoryWomens,
    href: "/collections/womens",
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Complete your look with our premium accessories",
    image: CategoryAccessories,
    href: "/collections/accessories",
  },
];

const Home = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef(null);
  const heroRef = useRef(null);
  const sectionRef = useRef(null);
  const newArrivalSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".hero-button",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".hero-image",
          {
            scale: 1.1,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.8"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = newArrivalSectionRef.current;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%", // when the top of the section hits 90% down the viewport
          toggleActions: "play none none none",
          // once: true, // animate only once
          // markers: true, // Uncomment to debug
        },
      }
    );
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".product-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top 70%",
        },
      });
    }, scrollRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".category-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Title and paragraph animation
    gsap.from(".fashion-text", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#fashion-section",
        start: "top 80%",
      },
    });

    // Image animations with stagger
    gsap.from(".fashion-image", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#fashion-section",
        start: "top 70%",
      },
    });
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === "left") {
      current.scrollLeft -= 400;
    } else {
      current.scrollLeft += 400;
    }
  };

  // Check if the carousel is at the start or end
  const checkScrollPosition = () => {
    const { current } = scrollRef;
    const isAtStart = current.scrollLeft === 0;
    const isAtEnd =
      current.scrollLeft + current.offsetWidth >= current.scrollWidth - 1;

    setCanScrollLeft(!isAtStart);
    setCanScrollRight(!isAtEnd);
  };

  // Check scroll position on component mount and after every scroll
  useEffect(() => {
    const { current } = scrollRef;
    checkScrollPosition();

    current.addEventListener("scroll", checkScrollPosition);

    return () => {
      current.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  return (
    <main className="lg:px-20 sm:px-8 px-4">
      <section
        id="hero-section"
        ref={heroRef}
        className="relative min-h-screen overflow-hidden"
      >
        {/* <div> */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="max-w-lg">
              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 notable-regular">
                Elevate Your Style This Season
              </h1>
              <p className="hero-description sm:text-base text-sm tracking-wider mb-8">
                Discover our new collection of premium clothing designed for
                comfort and style. Ethically made with sustainable materials.
              </p>
              <div className="hero-button">
                <Link href="/products">
                  <button
                    size="lg"
                    className="rounded-full px-8 bg-neutral-900 py-3 text-white font-medium hover:bg-neutral-800"
                  >
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>

            <div className="hero-image relative h-[500px] rounded-lg overflow-hidden">
              <img
                // src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                src="https://images.unsplash.com/photo-1621423938441-5a7346cb2213?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Fashion model wearing stylish clothing"
                className="object-cover object-center w-full h-full"
              />
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>

      <section
        id="new-arrival-section"
        ref={newArrivalSectionRef}
        className="flex flex-col xl:flex-row flex-wrap sm:gap-x-8 relative py-12 sm:pb-0"
      >
        <div className="flex-1 flex flex-col mt-6">
          <div>
            <h1 className="heading text-3xl sm:text-[54px] sm:leading-[48px] font-bold tracking-tight notable-regular">
              New <br /> Collection
            </h1>
            <p className="mt-2 sm:mt-3 font-mono font-semibold">
              {new Date().getFullYear()}
            </p>
          </div>
          <div className="button flex items-center mt-20">
            <div className="w-[176px] h-[30px] sm:w-[265px] sm:h-[40px] bg-[#D9D9D9] flex justify-between items-center px-6 cursor-pointer">
              <span className="text-sm sm:text-base">Go to shop</span>
              <img src={Arrow} alt="goToArrow" className="w-10 sm:w-fit" />
            </div>
            <div className="ml-6 sm:ml-10">
              <button className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] border-2 border-[#d1d1d1]">
                <img
                  src={RightArrow}
                  alt="arrow"
                  className="rotate-180 mx-auto opacity-50"
                />
              </button>
              <button className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] border-2 border-[#d1d1d1] ml-4">
                <img src={RightArrow} alt="arrow" className="mx-auto" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-14 flex gap-2 sm:gap-[41px] py-2">
          <img
            src={Image1}
            alt="post"
            className="image w-[169px] h-[173px] sm:w-80 sm:h-80 drop-shadow-sm"
          />
          <img
            src={Image2}
            alt="post"
            className="image w-[169px] h-[173px] sm:w-80 sm:h-80 drop-shadow-sm"
          />
        </div>
      </section>

      <section id="#3" className="mt-10 sm:mt-40 relative">
        <h1 className="text-3xl sm:text-[54px] sm:leading-[48px] font-bold tracking-tight notable-regular">
          New <br /> This week
        </h1>
        <div
          className="flex flex-row mt-10 space-x-8 overflow-x-auto scroll-smooth hide-scrollbar pb-4 2xl:pb-0"
          ref={scrollRef}
        >
          <div className="product-card">
            <div className="w-[169px] sm:w-[305px] overflow-hidden">
              <img src={Image6} alt="img" width={400} />
            </div>
            <div className="flex justify-between px-2">
              <div>
                <span className="text-sm text-gray-700">V-Neck T-Shirt</span>
                <p>Embroidered Seersucker Shirt</p>
              </div>
              <div>
                <p>$99</p>
              </div>
            </div>
          </div>
          <div className="product-card">
            <div className="sm:w-[305px] w-[169px] overflow-hidden">
              <img src={Image5} alt="img" width={400} />
            </div>
            <div className="flex justify-between">
              <div>
                <span className="text-sm text-gray-700">V-Neck T-Shirt</span>
                <p>Embroidered Seersucker Shirt</p>
              </div>
              <div>
                <p>$99</p>
              </div>
            </div>
          </div>
          <div className="product-card">
            <div className="sm:w-[305px] w-[169px] overflow-hidden">
              <img src={Image4} alt="img" width={400} />
            </div>
            <div className="flex justify-between">
              <div>
                <span className="text-sm text-gray-700">V-Neck T-Shirt</span>
                <p>Embroidered Seersucker Shirt</p>
              </div>
              <div>
                <p>$129</p>
              </div>
            </div>
          </div>
          <div className="product-card">
            <div className="sm:w-[305px] w-[169px] overflow-hidden">
              <img src={Image3} alt="img" width={400} />
            </div>
            <div className="flex justify-between">
              <div>
                <span className="text-sm text-gray-700">V-Neck T-Shirt</span>
                <p>Embroidered Seersucker Shirt</p>
              </div>
              <div>
                <p>$99</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:mt-8 mt-4 text-center">
          <button
            className={`w-[40px] h-[40px] border-2 ${
              canScrollLeft ? "border-[#343434]" : "border-[#d1d1d1]"
            }`}
            onClick={() => scroll("left")}
          >
            <img
              src={RightArrow}
              alt="arrow"
              className={`${
                canScrollLeft ? "opacity-100" : "opacity-40"
              } rotate-180 mx-auto`}
            />
          </button>
          <button
            className={`w-[40px] h-[40px] border-2 ml-4 ${
              canScrollRight ? "border-[#343434]" : "border-[#d1d1d1]"
            }`}
            onClick={() => scroll("right")}
          >
            <img
              src={RightArrow}
              alt="arrow"
              className={`${
                canScrollRight ? "opacity-100" : "opacity-40"
              } mx-auto`}
            />
          </button>
        </div>
        <div className="absolute right-0 sm:top-24 top-20">
          <Link
            to="/products"
            className="font-semibold flex gap-x-2 hover:text-blue-500 transition"
          >
            See All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* <section id="#4" className="mt-32">
        <h1 className="text-3xl sm:text-[54px] sm:leading-[48px] font-bold tracking-tight notable-regular">
          xiv <br /> Collections <br /> 23-24
        </h1>
        <div className="flex space-x-8 border-b-2 border-[#D9D9D9] py-2 mt-10">
          <span className="font-medium">(ALL)</span>
          <span>MEN</span>
          <span>WOMEN</span>
          <span>KID</span>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-6">
          <div>
            <div className="aspect-ratio aspect-[1/1] w-full overflow-hidden bg-gray-200 xl:aspect-[7/8]">
              <img
                src={Image7}
                alt="cover"
                className="h-full w-full object-cover object-center group-hover:opacity-75 transition"
              />
            </div>
            <div className="flex justify-between mt-2">
              <div>
                <p>Cotton T Shirt</p>
                <p>Basic Heavy Weight T-shirt</p>
              </div>
              <div>
                <span>$199</span>
              </div>
            </div>
          </div>
          <div>
            <div className="aspect-ratio aspect-[1/1] w-full overflow-hidden bg-gray-200 xl:aspect-[7/8]">
              <img
                src={Image8}
                alt="cover"
                className="h-full w-full object-cover object-center group-hover:opacity-75 transition"
              />
            </div>
            <div className="flex justify-between mt-2">
              <div>
                <p>Cotton T Shirt</p>
                <p>Basic Heavy Weight T-shirt</p>
              </div>
              <div>
                <span>$279</span>
              </div>
            </div>
          </div>
          <div>
            <div className="aspect-ratio aspect-[1/1] w-full overflow-hidden bg-gray-200 xl:aspect-[7/8]">
              <img
                src={Image9}
                alt="cover"
                className="h-full w-full object-cover object-center group-hover:opacity-75 transition"
              />
            </div>
            <div className="flex justify-between mt-2">
              <div>
                <p>Cotton T Shirt</p>
                <p>Basic Heavy Weight T-shirt</p>
              </div>
              <div>
                <span>$199</span>
              </div>
            </div>
          </div>
          <div>
            <div className="aspect-ratio aspect-[1/1] w-full overflow-hidden bg-gray-200 xl:aspect-[7/8]">
              <img
                src={Image7}
                alt="cover"
                className="h-full w-full object-cover object-center group-hover:opacity-75 transition"
              />
            </div>
            <div className="flex justify-between mt-2">
              <div>
                <p>Cotton T Shirt</p>
                <p>Basic Heavy Weight T-shirt</p>
              </div>
              <div>
                <span>$199</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4 sm:mt-8">
          <p>More</p>
          <img src={RightArrow} alt="arrow" className="rotate-90 mx-auto" />
        </div>
      </section> */}

      <section ref={sectionRef} className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={category.id} className="category-card">
                <Link href={category.href} className="block group">
                  <div className="relative h-96 overflow-hidden rounded-lg">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-20" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        {category.name}
                      </h3>
                      <p className="mb-4">{category.description}</p>
                      <button className="text-white border border-white hover:bg-white hover:text-black px-4 py-2 rounded-md transition-colors">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fashion-section" className="mt-28 px-4">
        <div className="text-center">
          <h1 className="sm:text-4xl text-xl font-thin notable-regular fashion-text">
            Our Approach to Fashion Design
          </h1>
          <p className="sm:w-[40%] w-[90%] sm:text-base text-sm tracking-wider mx-auto mt-4 fashion-text">
            At Elegant Vogue, we blend creativity with craftsmanship to create
            fashion that transcends trends and stands the test of time. Each
            design is meticulously crafted, ensuring the highest quality and an
            exquisite finish.
          </p>
        </div>

        <div className="py-16 flex flex-wrap justify-center gap-8">
          <div className="w-[90%] sm:w-[317px] h-[389px] fashion-image sm:mt-0">
            <img
              src={Image11}
              alt="gallery"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[90%] sm:w-[317px] h-[389px] fashion-image sm:mt-16">
            <img
              src={Image10}
              alt="gallery"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[90%] sm:w-[317px] h-[389px] fashion-image sm:mt-0">
            <img
              src={Image8}
              alt="gallery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4">
        <div className="bg-neutral-100 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 notable-regular">
              Our Commitment to Quality
            </h2>
            <p className="text-neutral-600 tracking-wider mb-6">
              We source the finest materials and work with ethical manufacturers
              to create clothing that looks good, feels good, and does good.
              Every piece is designed to last, reducing waste and environmental
              impact.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              Learn more about our story
            </Link>
          </div>
        </div>
      </section>

      <section className="hidden bg-neutral-900 text-white py-16">
        <div className="px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-neutral-300 mb-8 max-w-md mx-auto">
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </p>

          <form
            // onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
            />
            <button
              type="submit"
              // disabled={isSubmitting}
              className="bg-white text-black hover:bg-neutral-200 px-4 py-2 rounded-md transition-colors"
            >
              {/* {isSubmitting ? "Subscribing..." : "Subscribe"} */}
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Home;
