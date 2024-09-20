import React from "react";
import Logo from "../assets/Group53.svg";

const Footer = () => {
  return (
    <footer className="bg-[#D9D9D9] px-5 sm:px-16 pt-16 mt-8">
      <div className="flex justify-evenly sm:flex-row flex-col items-start">
        <div className="flex flex-col sm:flex-row sm:block">
          <p>PRICING</p>
          <p>ABOUT</p>
          <p>CONTACT</p>
        </div>
        <div className="flex flex-col items-center gap-4 mt-4 sm:mt-0">
          <img src={Logo} width={30} alt="logo" />
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <a
              href="https://www.instagram.com"
              className="hover:underline cursor-pointer"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com"
              className="hover:underline cursor-pointer"
            >
              Facebook
            </a>
            <a
              href="https://www.youtube.com"
              className="hover:underline cursor-pointer"
            >
              Youtube
            </a>
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <p>Leagal</p>
          <p>Terms & policy</p>
          <p>Support</p>
        </div>
      </div>
      <div className="py-4 text-center mt-4">
        <p>&copy; code-8 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
