import React, { useState } from "react";
import YopexLogo from "../../../images/LogoYopex.png";
import { Link } from "react-router-dom";
import MenuIcons from "./components/MenuIcons/MenuIcons";
import NavbarTabTop from "./components/NavbarNavigation/NavbarTabTop";
import NavbarSearchDropDown from "./components/NavbarSearch/NavbarSearchDropDown";
import { FiMenu } from "react-icons/fi";

const CustomNavbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white items-center px-16 border-gray-200 border-b-2 shadow-sm lg:py-1 py-4">
        <div className="md:col-span-9 text-white items-center lg:col-span-3">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-4 items-center ">
              <Link
                to="/feed"
                className="text-2xl font-bold text-primary flex items-center"
              >
                <img src={YopexLogo} alt="Yopex Logo" width={35} />
              </Link>
              <NavbarSearchDropDown />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="block lg:hidden md:block p-2 text-gray-400 hover:text-black focus:outline-none"
            >
              <FiMenu size={30} />
            </button>
          </div>
        </div>

        <div className="md:col-span-6">
          <div className="hidden lg:block md:hidden">
            <NavbarTabTop />
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse md:col-span-3">
          <div className="hidden lg:block md:hidden">
            <MenuIcons />
          </div>
        </div>
      </div>
      {/* Mobile menu content */}
      {showMobileMenu && (
        <div className="lg:hidden  bg-white  p-4 md:flex flex-col items-center">
          <NavbarTabTop />
          <MenuIcons />
        </div>
      )}
    </div>
  );
};

export default CustomNavbar;
