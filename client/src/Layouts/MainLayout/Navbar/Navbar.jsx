import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import YopexLogo from "../../../images/LogoYopex.png";
import NavbarSearchDropDown from "./components/NavbarSearch/NavbarSearchDropDown";
import MenuIcons from "./components/MenuIcons/MenuIcons";
import NavbarTabTop from "./components/NavbarNavigation/NavbarTabTop";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center w-full   bg-white  z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4  items-center px-16 border-gray-200 border-b-2 shadow-sm">
          {/* Left part (3 columns on medium and larger screens) */}
          <div className="md:col-span-3 text-white items-center">
            <div className="flex gap-4">
              <Link
                to="/feed"
                className="text-2xl font-bold text-primary flex items-center"
              >
                <img src={YopexLogo} width={35} />
              </Link>
              <NavbarSearchDropDown />
            </div>
          </div>

          <div className="lg:col-span-6">
            <NavbarTabTop />
          </div>

          <div className="flex flex-col md:flex-row-reverse md:col-span-3">
            <div className="md:col-span-3">
              <MenuIcons />
            </div>
          </div>
        </div>

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        {nav && (
          <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
            <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
              <Link
                onClick={() => setNav(!nav)}
                to="home"
                smooth
                duration={500}
              >
                Home
              </Link>
            </li>
            <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
              <Link
                onClick={() => setNav(!nav)}
                to="about"
                smooth
                duration={500}
              >
                About
              </Link>
            </li>
            <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
              <Link
                onClick={() => setNav(!nav)}
                to="contact"
                smooth
                duration={500}
              >
                Contact
              </Link>
            </li>
            <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
              <a
                onClick={() => setNav(!nav)}
                href="/register"
                className="block"
              >
                Sign up
              </a>
            </li>

            <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
              <a onClick={() => setNav(!nav)} href="/login" className="block">
                Login
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
