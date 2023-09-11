import React, { useState } from "react";
import { useSelector } from "react-redux";
import YopexLogo from "../../../images/LogoYopex.png";
import { Link } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import MenuIcons from "./components/MenuIcons/MenuIcons";
import NavbarTabTop from "./components/NavbarNavigation/NavbarTabTop";
import NavbarSearchDropDown from "./components/NavbarSearch/NavbarSearchDropDown";
import MobileMenu from "../../../Components/Mobile/MobileMenu";

const CustomNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div>
      <div className="grid fixed w-full grid-cols-1 lg:grid-cols-12 bg-white items-center xl:px-16 px-6 border-gray-200 border-b-2 shadow-sm lg:py-1 py-4">
        <div className="md:col-span-9 text-white items-center lg:col-span-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center ">
              <Link
                to="/feed"
                className="text-2xl font-bold text-primary flex items-center"
              >
                <img src={YopexLogo} alt="Yopex Logo" className="w-9 h-9" />
              </Link>
              <NavbarSearchDropDown />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="block lg:hidden md:block p-2 text-gray-400 hover:text-black focus:outline-none"
            >
              <FiMoreVertical className="h-6 w-6" />
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
      <div className="lg:hidden  bg-white md:flex flex-col items-center">
        <MobileMenu userImage={user?.picturePath} user={user} />
      </div>

      {/* Mobile menu content */}
      {showMobileMenu && (
        <div className="lg:hidden  bg-white h-full border-b-2 border-gray-200">
          <NavbarTabTop />
        </div>
      )}
    </div>
  );
};

export default CustomNavbar;
