import React from "react";
import YopexLogo from "../../../images/LogoYopex.png";
import { Link } from "react-router-dom";
import MenuIcons from "./components/MenuIcons/MenuIcons";
import NavbarTabTop from "./components/NavbarNavigation/NavbarTabTop";
import NavbarSearchDropDown from "./components/NavbarSearch/NavbarSearchDropDown";

const CustomNavbar = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white items-center px-16 border-gray-200 border-b-2 shadow-sm">
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

        <div className="md:col-span-6">
          <NavbarTabTop />
        </div>

        <div className="flex flex-col md:flex-row-reverse md:col-span-3">
          <div className="md:col-span-3">
            <MenuIcons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNavbar;
