import React from "react";
import Logo from "../assets/Group53.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-neutral-100">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl tracking-wider font-bold mb-4 notable-regular">IX Store</h3>
              <p className="text-neutral-600 mb-4">
                Modern, sustainable clothing for the conscious consumer.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-neutral-600 hover:text-black">
                  {/* <Facebook className="h-5 w-5" /> */}
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-neutral-600 hover:text-black">
                  {/* <Instagram className="h-5 w-5" /> */}
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-neutral-600 hover:text-black">
                  {/* <Twitter className="h-5 w-5" /> */}
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
                Shop
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/products"
                    className="text-neutral-600 hover:text-black"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/new-arrivals"
                    className="text-neutral-600 hover:text-black"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/bestsellers"
                    className="text-neutral-600 hover:text-black"
                  >
                    Bestsellers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/sale"
                    className="text-neutral-600 hover:text-black"
                  >
                    Sale
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-neutral-600 hover:text-black"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sustainability"
                    className="text-neutral-600 hover:text-black"
                  >
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-neutral-600 hover:text-black"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-neutral-600 hover:text-black"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
                Customer Service
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/shipping"
                    className="text-neutral-600 hover:text-black"
                  >
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-neutral-600 hover:text-black"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/size-guide"
                    className="text-neutral-600 hover:text-black"
                  >
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-neutral-600 hover:text-black"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-neutral-600 mb-4 md:mb-0">
                © {new Date().getFullYear()} IX Store. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/terms"
                  className="text-sm text-neutral-600 hover:text-black"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  className="text-sm text-neutral-600 hover:text-black"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
