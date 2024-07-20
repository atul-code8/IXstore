// src/components/Header.js
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Hamburger from "../assets/Group36.svg";
import Cancel from "../assets/cancel.svg";
import Logo from "../assets/Group53.svg";
import FavorateIcon from "../assets/favorate.svg";
import ProfileIcon from "../assets/profile.svg";
import CartIcon from "../assets/cart.svg";
import { account } from "../appwrite/confing";

const Header = () => {
  const [toogle, setToogle] = useState(false);
  const [isLoggedIn, setIsLoaggedIn] = useState(false);
  const [menu, setMenu] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      await account.get();
      setIsLoaggedIn(true);
    } catch (error) {
      console.log("User not found:", error.message);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSessions();
      alert("Logout succesfully");
      setIsLoaggedIn(false);
    } catch (error) {
      console.log("Error in logout:", error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [param]);

  return (
    <header className="pt-5 sm:pt-[41px]">
      <nav className="flex items-center justify-between lg:px-14 px-4">
        <div className="flex items-center gap-2 sm:gap-8 sm:pt-3">
          <img
            src={toogle ? Cancel : Hamburger}
            alt="hamgurger"
            width={30}
            className="inline-block sm:hidden"
            onClick={() => setToogle(!toogle)}
          />
          <Link
            to="/"
            className={`text-xs sm:text-base ${
              toogle ? "inline-block" : "hidden"
            } sm:inline-block font-semibold`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`text-xs sm:text-base ${
              toogle ? "inline-block" : "hidden"
            } sm:inline-block font-semibold`}
          >
            Collections
          </Link>
          <Link
            to="/new"
            className={`text-xs sm:text-base ${
              toogle ? "inline-block" : "hidden"
            } sm:inline-block font-semibold`}
          >
            New
          </Link>
        </div>
        {!toogle && (
          <div className="w-8 sm:w-fit">
            <img src={Logo} alt="logo" />
          </div>
        )}
        {isLoggedIn ? (
          <div className="flex gap-4 sm:gap-8 relative">
            <img
              src={FavorateIcon}
              className="w-10 sm:w-fit invert hover:invert-0 transition ease-out duration-500 cursor-pointer border-none sm:border-2  rounded-full"
            />
            <img
              src={CartIcon}
              className="w-10 sm:w-fit invert hover:invert-0 transition ease-out duration-500 cursor-pointer border-none sm:border-2  rounded-full"
              onClick={() => navigate("/cart")}
            />
            <img
              src={ProfileIcon}
              className="w-10 sm:w-fit invert hover:invert-0 transition ease-out duration-500 cursor-pointer border-none sm:border-2  rounded-full"
              onClick={() => setMenu(!menu)}
            />
            {menu && (
              <div className="absolute right-0 top-14 flex flex-col space-y-2 bg-white py-2 px-4 rounded shadow-md ">
                <Link to="/profile">Profile</Link>
                <hr />
                <Link to="/logout" className="text-red-500" onClick={logout}>
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link to={`login`}>
            <button
              type="button"
              className="px-4 py-2 border-gray-700 border-2 rounded hover:bg-[#D9D9D9] hover:font-semibold transition delay-200 ease-out"
            >
              Login
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
