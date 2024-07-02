// src/pages/Home.js
import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('...');
  }, []);

  return (
    <main className="lg:px-20 sm:px-8 px-4">
      <section id="#1">
        <div className="mt-14">
          <p>MEN</p>
          <p>WOMEN</p>
          <p>KIDS</p>
        </div>
        <input
          type="text"
          placeholder="Find"
          className="bg-[#D9D9D9] w-[80%] h-[34px] sm:w-[367px] sm:h-[50px] mt-4 px-4 focus:ring-2 focus:placeholder-transparent focus:outline-none focus:ring-blue-500"
        />
      </section>

      <section id="#2" className="flex flex-col sm:flex-row sm:space-x-8 relative pb-12 sm:pb-0">
        <div className="mt-14 flex flex-col justify-between">
          <div>
          <h1 className="text-3xl sm:text-[54px] sm:leading-[48px] font-bold tracking-tight notable-regular">
              New <br /> Collection
            </h1>
            <p className="mt-2 sm:mt-3">2024</p>
          </div>
          <div className="flex absolute left-1 bottom-0">
            <div className="w-[176px] h-[30px] sm:w-[265px] sm:h-[40px] bg-[#D9D9D9] flex justify-between items-center px-6">
              <span className="text-sm sm:text-base">Go to shop</span>
              <img src={Arrow} alt="goToArrow" className="w-10 sm:w-fit"/>
            </div>
            <div className="ml-6 sm:ml-10">
              <button className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] border-2 border-[#d1d1d1]">
                <img src={RightArrow} alt="arrow" className="rotate-180 mx-auto opacity-50"/>
              </button>
              <button className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] border-2 border-[#d1d1d1] ml-4">
                <img src={RightArrow} alt="arrow" className="mx-auto" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-14 flex gap-2 sm:gap-[41px] row-start-4">
          <img src={Image1} alt="post" className="w-[169px] h-[173px] sm:w-full sm:h-full"/>
          <img src={Image2} alt="post" className="w-[169px] h-[173px] sm:w-full sm:h-full"/>
        </div>
      </section>

      <section id="#3" className="mt-10 sm:mt-40 relative">
        <h1 className="text-3xl sm:text-[54px] sm:leading-[48px] font-bold tracking-tight notable-regular">
          New <br /> This week
        </h1>

        <div className="flex mt-10 space-x-8 overflow-x-scroll sm:overflow-x-auto pb-4 sm:pb-0">
          <div>
            <div className="w-[169px] sm:w-[305px] overflow-hidden">
              <img src={Image6} alt="img" width={400} />
            </div>
            <div className="flex justify-between px-2">
              <div>
                <span>V-Neck T-Shirt</span>
                <p>Embroidered Seersucker Shirt</p>
              </div>
              <div>
                <p>$99</p>
              </div>
            </div>
          </div>
          <div>
            <div className="sm:w-[305px] w-[169px] overflow-hidden">
              <img src={Image5} alt="img" width={400} />
            </div>
            <div className="flex justify-between">
              <div>
                <span>V-Neck T-Shirt</span>
                <p>Embroidered Seersucker Shirt</p>
              </div>
              <div>
                <p>$99</p>
              </div>
            </div>
          </div>
          <div>
            <div className="sm:w-[305px] w-[169px] overflow-hidden">
              <img src={Image4} alt="img" width={400} />
            </div>
            <div className="flex justify-between">
              <div>
                <span>V-Neck T-Shirt</span>
                <p>Embroidered Seersucker Shirt</p>
              </div>
              <div>
                <p>$129</p>
              </div>
            </div>
          </div>
          <div>
            <div className="sm:w-[305px] w-[169px] overflow-hidden">
              <img src={Image3} alt="img" width={400} />
            </div>
            <div className="flex justify-between">
              <div>
                <span>V-Neck T-Shirt</span>
                <p>Embroidered Seersucker Shirt</p>
              </div>
              <div>
                <p>$99</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:mt-8 mt-4 text-center">
          <button className="w-[40px] h-[40px] border-2 border-[#d1d1d1]">
            <img
              src={RightArrow}
              alt="arrow"
              className="rotate-180 mx-auto opacity-50"
            />
          </button>
          <button className="w-[40px] h-[40px] border-2 border-[#d1d1d1] ml-4">
            <img src={RightArrow} alt="arrow" className="mx-auto" />
          </button>
        </div>
        <div className="absolute right-0 sm:top-24 top-20">
          <Link to="/products">See All →</Link>
        </div>
      </section>

      <section id="#4" className="mt-32">
        <h1 className="text-3xl sm:text-[54px] sm:leading-[48px] font-bold tracking-tight notable-regular">
          xiv <br /> Collections <br /> 23-24
        </h1>
        <div className="flex space-x-8 border-b-2 border-[#D9D9D9] py-2 mt-10">
          <span className="font-medium">(ALL)</span>
          <span>MEN</span>
          <span>WOMEN</span>
          <span>KID</span>
        </div>
        <div className="flex space-x-8 mt-10 relative sm:overflow-x-auto overflow-x-scroll pb-8 sm:pb-0">
          <div>
            <div className="w-[169px] sm:w-full">
              <img src={Image7} alt="cover" />
            </div>
            <div className="flex justify-between">
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
            <div className="w-[169px] sm:w-full">
              <img src={Image8} alt="cover" />
            </div>
            <div className="flex justify-between">
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
            <div className="w-[169px] sm:w-full">
              <img src={Image9} alt="cover" />
            </div>
            <div className="flex justify-between">
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
      </section>

      <section id="#5" className="mt-28">
        <div className="text-center">
          <h1 className="sm:text-4xl text-xl font-thin notable-regular">
            Our Approach to fashion design{" "}
          </h1>
          <p className="sm:w-[40%] w-[60%] sm:text-base text-sm tracking-wider mx-auto mt-4">
            at elegant vogue , we blend creativity with craftsmanship to create
            fashion that transcends trends and stands the test of time each
            design is meticulously crafted, ensuring the highest quelity
            exqulsite finish
          </p>
        </div>
        <div className="py-16 flex flex-col sm:flex-row sm:space-x-9">
          <div className="w-[317px] h-[389px]">
            <img src={Image11} alt="gallary" className="mt-0 w-full h-full" />
          </div>
          <div className="w-[317px] h-[389px] ml-8 sm:ml-0 mt-12">
            <img src={Image10} alt="gallary" className="mt-0 w-full h-full" />
          </div>
          <div className="w-[317px] h-[389px] mt-12 sm:mt-0">
            <img src={Image8} alt="gallary" className="mt-0 w-full h-full" />
          </div>
          <div className="w-[317px] h-[389px] ml-8 sm:ml-0 mt-12">
            <img src={Image12} alt="gallary" className="mt-0 w-full h-full" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
