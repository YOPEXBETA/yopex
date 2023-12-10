import React, { useEffect, useState } from "react";
import YopexLogo from "../../../src/assets/images/LogoYopex.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../redux/auth/authSlice";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const HomeHeader = () => {
  const [nav, setNav] = useState(false);
  const { user, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDark, toggleDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      toggleDark(false);
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      toggleDark(true);
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user]);

  return (
    <div className="container">
      <div className="flex justify-between dark:bg-zinc-800 fixed   items-center w-full h-20 px-4 lg:px-24 md:px-24 text-white  z-10 ">
        <div className="flex items-center gap-8">
          <img src={YopexLogo} width={35} alt="Yopex Logo" />
          <ul className="hidden md:flex">
            <li className="px-4 cursor-pointer capitalize dark:text-white  text-zinc-500 hover:scale-105 duration-200">
              <Link to="home" smooth duration={500}>
                Home
              </Link>
            </li>
            <li className="px-4 cursor-pointer capitalize dark:text-white text-zinc-500 hover:scale-105 duration-200">
              <Link to="about" smooth duration={500}>
                Features
              </Link>
            </li>
            <li className="px-4 cursor-pointer capitalize dark:text-white text-zinc-500 hover:scale-105 duration-200">
              <Link to="contact" smooth duration={500}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          {!user && (
            <a
              onClick={toggleTheme}
              className="px-3 py-2  space-x-2   flex items-center cursor-pointer"
            >
              {isDark ? (
                <LightModeIcon className="w-6 h-6 dark:hover:text-green-500 text-gray-600 dark:text-white" />
              ) : (
                <DarkModeIcon className="w-6 h-6 text-gray-600 hover:text-green-500 dark:text-white" />
              )}
            </a>
          )}

          {user && (
            <p className="flex items-center ">
              <p className=" px-3 z-50 cursor-pointer capitalize dark:text-white font-medium text-gray-500  duration-200">
                Welcome, {user.firstname}
              </p>
              {/*<ProfileMenu />*/}
            </p>
          )}
          {!user && (
            <a href="/login" className="block">
              <button className="cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 dark:text-white dark:hover:text-green-500 hover:text-green-500 duration-200">
                Login
              </button>
            </a>
          )}
          {!user && (
            <a href="/register" className="block">
              <button className="bg-black dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-3xl px-4 py-2 font-medium hover:scale-105 duration-200">
                Sign up
              </button>
            </a>
          )}
        </div>

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        {nav && (
          <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-white dark:bg-zinc-800 text-gray-500">
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
            {user && (
              <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
                <a href="/feed">feed</a>
              </li>
            )}

            {!user && (
              <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
                <a
                  onClick={() => setNav(!nav)}
                  href="/register"
                  className="block"
                >
                  Sign up
                </a>
              </li>
            )}
            {!user && (
              <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
                <a onClick={() => setNav(!nav)} href="/login" className="block">
                  Login
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;