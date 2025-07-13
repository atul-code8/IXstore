// src/components/Header.js
import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Hamburger from "../assets/Group36.svg";
import Cancel from "../assets/cancel.svg";
import Logo from "../assets/Group53.svg";
import FavorateIcon from "../assets/favorate.svg";
import ProfileIcon from "../assets/profile.svg";
import CartIcon from "../assets/cart.svg";
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { ArrowLeftStartOnRectangleIcon, Bars3Icon, Cog6ToothIcon, CreditCardIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const [toogle, setToogle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [itemCount, setItemCount] = useState(0)

  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("token");
  const [scrolled, setScrolled] = useState(false);
  const dropdownNavbarRef = useRef();
  const profileBtnRef = useRef();

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast("Logout successfully!");
    navigate("/login");
  };

  useEffect(() => {
    if (isMenuOpen) {
      // Animate mobile menu opening
      gsap.fromTo(
        ".mobile-nav-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    }
  }, [isMenuOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileBtnRef.current &&
        !profileBtnRef.current.contains(event.target) &&
        dropdownNavbarRef.current &&
        !dropdownNavbarRef.current.contains(event.target)
      ) {
        setMenu(!menu);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <header
      className={`${scrolled ? "bg-white shadow-sm" : "bg-transparent"
        } sticky top-0 z-50 w-full transition-all duration-300 ease-in-out py-3`}
    >
      <nav className="flex items-center justify-between lg:px-14 px-4">
        <button
          className="mr-4 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
        <div className="items-center gap-2 sm:gap-8 hidden md:flex">
          <img
            src={toogle ? Cancel : Hamburger}
            alt="hamgurger"
            width={30}
            className="inline-block sm:hidden"
            onClick={() => setToogle(!toogle)}
          />
          <Link
            to="/"
            className={`text-xs sm:text-base ${toogle ? "inline-block" : "hidden"
              } sm:inline-block font-semibold`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`text-xs sm:text-base ${toogle ? "inline-block" : "hidden"
              } sm:inline-block font-semibold`}
          >
            Collections
          </Link>
        </div>
        {!toogle && (
          <div className="w-8 sm:w-fit hidden sm:block absolute -translate-x-1/2 left-1/2">
            <img src={Logo} alt="logo" />
          </div>
        )}
        <div className="flex items-center gap-4 sm:gap-8 relative">
          {/* Favorate */}
          {/* <img
            src={FavorateIcon}
            className="w-10 sm:w-fit invert hover:invert-0 transition ease-out duration-500 cursor-pointer border-none sm:border-2 rounded-full"
          /> */}
          <div className="relative">
            <img
              src={CartIcon}
              className="w-10 sm:w-fit invert hover:invert-0 transition ease-out duration-500 cursor-pointer border-none sm:border-2 rounded-full"
              onClick={() => navigate("/cart")}
            />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                {itemCount}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <>
              <button
                ref={profileBtnRef}
                type="button"
                onClick={() => setMenu(!menu)}
              >
                <img
                  src={ProfileIcon}
                  className="w-10 sm:w-fit invert hover:invert-0 transition ease-out duration-500 border-none sm:border-2 rounded-full"
                />
              </button>

              {/* Dropdown menu */}
              {menu && (
                <div
                  ref={dropdownNavbarRef}
                  id="dropdownNavbar"
                  className="absolute top-16 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li className="flex items-center px-4 py-2">
                      <UserCircleIcon
                        className="w-6 h-6 mr-2"
                        aria-hidden="true"
                      />
                      <a
                        href="#"
                        className="block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Profile
                      </a>
                    </li>
                    <li className="flex items-center px-4 py-2">
                      <CreditCardIcon className="w-6 h-6 mr-2" aria-hidden="true" />
                      <a
                        href="#"
                        className="block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Orders
                      </a>
                    </li>
                    <li className="flex items-center px-4 py-2">
                      <Cog6ToothIcon className="w-6 h-6 mr-2" aria-hidden="true" />
                      <a
                        href="#"
                        className="block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <button
                      className="inline-flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={handleLogout}
                    >
                      <ArrowLeftStartOnRectangleIcon className="w-6 h-6 mr-2" aria-hidden="true" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link to={`login`}>
              <button
                type="button"
                className="tracking-wide px-4 py-2 border-gray-700 hover:border-[#343434] border-2 rounded hover:bg-[#343434] hover:text-white font-semibold transition ease-in"
              >
                Login/Register
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t transition ease-in-out duration-500">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`mobile-nav-item text-sm font-medium transition-colors hover:text-neutral-500 ${location.pathname === link.href
                      ? "text-black"
                      : "text-neutral-600"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
