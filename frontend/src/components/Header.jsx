// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import Hamburger from "../assets/Group36.svg";
import Logo from "../assets/Group53.svg";
import FavorateIcon from "../assets/favorate.svg";
import ProfileIcon from "../assets/profile.svg";
import CartIcon from "../assets/cart.svg";

const Header = () => (
  <header className="pt-5 sm:pt-[41px]">
    <nav className="flex items-center justify-between lg:px-14 px-4">
      <div className="flex items-center gap-8 sm:pt-3">
        <img src={Hamburger} alt="hamgurger" className="w-full h-full" />
        <Link to="/" className="hidden sm:inline-block text-base font-semibold">
          Home
        </Link>
        <Link to="/products" className="hidden sm:inline-block text-base font-semibold">
          Collections
        </Link>
        <Link to="/new" className="hidden sm:inline-block text-base font-semibold">
          New
        </Link>
      </div>
      <div className="w-8 sm:w-fit">
        <img src={Logo} alt="logo" />
      </div>
      <div className="flex gap-4 sm:gap-8 relative">
        <img
          src={FavorateIcon}
          className="w-10 sm:w-fit invert hover:invert-0 transition ease-out duration-500 cursor-pointer border-none sm:border-2  rounded-full"
        />
        <img
          src={CartIcon}
          className="w-10 sm:w-fit invert hover:invert-0 transition ease-out duration-500 cursor-pointer border-none sm:border-2  rounded-full"
        />
        <img
          src={ProfileIcon}
          className="w-10 sm:w-fit invert hover:invert-0 transition ease-out duration-500 cursor-pointer border-none sm:border-2  rounded-full"
        />
        <span className="absolute top-0 left-[62%] text-purple-800 font-mono font-semibold">0</span>
      </div>
    </nav>
  </header>
);

export default Header;
