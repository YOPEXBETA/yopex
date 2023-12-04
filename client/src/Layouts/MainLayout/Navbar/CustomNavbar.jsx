import React, { useState } from "react";
import { useSelector } from "react-redux";
import YopexLogo from "../../../assets/images/LogoYopex.png";
import { Link } from "react-router-dom";
import MenuIcons from "./components/MenuIcons/MenuIcons";
import NavbarTabTop from "./components/NavbarNavigation/NavbarTabTop";
import NavbarSearchDropDown from "./components/NavbarSearch/NavbarSearchDropDown";
import MobileMenu from "../../../Components/Mobile/MobileMenu";

const CustomNavbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="grid fixed w-full grid-cols-1 lg:grid-cols-12 dark:bg-zinc-800 bg-white items-center xl:px-16 px-6 dark:border-b-zinc-500 border-b-[1px] text-gray-600  md:py-0 py-2 z-50">
        <div className="md:col-span-9 text-white items-center lg:col-span-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-4 items-center w-full">
              <Link
                to="/feed"
                className="text-2xl font-bold text-primary flex items-center"
              >
                <img
                  src={YopexLogo}
                  alt="Yopex Logo"
                  className="w-9 h-9 object-contain"
                />
              </Link>
              <NavbarSearchDropDown />
            </div>

            <div className="block xl:hidden lg:hidden">
              <MenuIcons />
            </div>
          </div>
        </div>

        <div className="md:col-span-6">
          <div className="hidden lg:block md:hidden">
            <NavbarTabTop />
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse md:col-span-3">
          <div className="hidden lg:block">
            <MenuIcons />
          </div>
        </div>
      </div>
      <div className="lg:hidden  bg-white md:flex flex-col items-center">
        <MobileMenu userImage={user?.picturePath} user={user} />
      </div>
    </div>
  );
};

export default CustomNavbar;
