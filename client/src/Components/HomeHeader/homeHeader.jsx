import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../redux/auth/authSlice";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";
import YopexLogo from "../../../src/assets/images/LogoYopex.png";
import MoonIcon from "../icons/MoonIcon";
import LightIcon from "../icons/LightIcon";
import CloseIcon from "../icons/CloseIcon";
import BurgerMenu from "../icons/BurgerMenu";
import Dropdown from "../dropdown";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

const HomeHeader = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState(false);
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

  //change nav color when scrolling
  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 100) {
        setColor(true);
      } else {
        setColor(false);
      }
    };

    window.addEventListener("scroll", changeColor);

    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        className={
          color
            ? "border-b-[1px] dark:border-zinc-600 transition-all duration-300 bg-white dark:bg-zinc-800"
            : " bg-transparent dark:bg-transparent"
        }
      >
        <div className="flex justify-between items-center w-full h-20 px-4 lg:px-24 md:px-24 z-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              {/*<img src={YopexLogo} width={30} alt="Yopex Logo" />*/}
              <h1
                className={
                  color
                    ? "text-emerald-500 text-2xl font-semibold"
                    : "text-white text-2xl font-semibold"
                }
              >
                YOPEX
              </h1>
            </div>
            <ul className="hidden md:flex">
              <li
                className={
                  color
                    ? "px-4 cursor-pointer capitalize dark:text-white  text-slate-500 hover:scale-105 duration-200"
                    : "px-4 cursor-pointer capitalize dark:text-white  text-white hover:scale-105 duration-200"
                }
              >
                <Link to="home" smooth duration={500}>
                  Home
                </Link>
              </li>
              <li
                className={
                  color
                    ? "px-4 cursor-pointer capitalize dark:text-white  text-slate-500 hover:scale-105 duration-200"
                    : "px-4 cursor-pointer capitalize dark:text-white  text-white hover:scale-105 duration-200"
                }
              >
                <Link to="features" smooth duration={500}>
                  Features
                </Link>
              </li>
              <li
                className={
                  color
                    ? "px-4 cursor-pointer capitalize dark:text-white  text-slate-500 hover:scale-105 duration-200"
                    : "px-4 cursor-pointer capitalize dark:text-white  text-white hover:scale-105 duration-200"
                }
              >
                <Link to="companies" smooth duration={500}>
                  Companies
                </Link>
              </li>
              <li
                className={
                  color
                    ? "px-4 cursor-pointer capitalize dark:text-white  text-slate-500 hover:scale-105 duration-200"
                    : "px-4 cursor-pointer capitalize dark:text-white  text-white hover:scale-105 duration-200"
                }
              >
                <Link to="challenges" smooth duration={500}>
                  Challenges
                </Link>
              </li>
              <li
                className={
                  color
                    ? "px-4 cursor-pointer capitalize dark:text-white  text-slate-500 hover:scale-105 duration-200"
                    : "px-4 cursor-pointer capitalize dark:text-white  text-white hover:scale-105 duration-200"
                }
              >
                <Link to="jobs" smooth duration={500}>
                  Jobs
                </Link>
              </li>
              <li
                className={
                  color
                    ? "px-4 cursor-pointer capitalize dark:text-white  text-slate-500 hover:scale-105 duration-200"
                    : "px-4 cursor-pointer capitalize dark:text-white  text-white hover:scale-105 duration-200"
                }
              >
                <Link to="contact" smooth duration={500}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden md:flex gap-4 items-center">
            <a
              onClick={toggleTheme}
              className="px-3 py-2  space-x-2   flex items-center cursor-pointer"
            >
              {isDark ? (
                <LightIcon className="w-6 h-6 dark:hover:text-green-500 text-white dark:text-white" />
              ) : (
                <MoonIcon className="w-6 h-6  hover:text-green-500 text-white dark:text-white" />
              )}
            </a>

            {user && (
              <p className="flex items-center gap-2">
                <p
                  className={
                    color
                      ? "px-2 cursor-pointer capitalize dark:text-white text-slate-500 duration-200 lg:block md:hidden"
                      : "px-2 cursor-pointer capitalize dark:text-white text-white lg:block duration-200 md:hidden"
                  }
                >
                  Welcome, {user?.firstname}
                </p>
                <div className="relative focus:ring-offset-2 focus:ring-offset-zinc-800">
                  <Dropdown
                    button={
                      <button>
                        {user?.picturePath ? (
                          <img
                            alt="picture"
                            src={user?.picturePath}
                            className="rounded-full  object-cover w-9 h-9"
                          />
                        ) : (
                          <img
                            alt="default"
                            src={AvatarProfile}
                            className="rounded-full object-cover w-9 h-9"
                          />
                        )}
                      </button>
                    }
                    children={
                      <div>
                        <ProfileMenu />
                      </div>
                    }
                    classNames={"py-2 top-10 -left-[180px] w-max z-50"}
                  />
                </div>
              </p>
            )}
            {!user && (
              <a href="/login" className="block">
                <button
                  className={
                    color
                      ? "cursor-pointer capitalize font-medium text-slate-500 hover:scale-105 dark:text-white dark:hover:text-amber-400 hover:text-amber-400 duration-200"
                      : "pcursor-pointer capitalize font-medium text-white hover:scale-105 dark:hover:text-amber-400 hover:text-amber-400 duration-200"
                  }
                >
                  Login
                </button>
              </a>
            )}
            {!user && (
              <a href="/register" className="block">
                <button className="bg-black dark:bg-amber-500 dark:hover:bg-amber-600 text-white rounded-3xl px-4 py-2 font-medium hover:scale-105 duration-200">
                  Sign up
                </button>
              </a>
            )}
          </div>

          <div
            onClick={() => setNav(!nav)}
            className="cursor-pointer z-10 text-gray-500 md:hidden"
          >
            {nav ? (
              <CloseIcon width={6} height={6} />
            ) : (
              <BurgerMenu width={10} height={10} />
            )}
          </div>
        </div>
      </div>

      <div>
        {nav && (
          <ul
            className={`flex flex-col justify-center items-center fixed top-0 left-0 w-full h-screen ${
              color ? "bg-white" : "bg-white"
            } dark:bg-zinc-800 text-gray-500`}
          >
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
                to="features"
                smooth
                duration={500}
              >
                Features
              </Link>
            </li>
            <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
              <Link
                onClick={() => setNav(!nav)}
                to="companies"
                smooth
                duration={500}
              >
                Companies
              </Link>
            </li>
            <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
              <Link
                onClick={() => setNav(!nav)}
                to="challenges"
                smooth
                duration={500}
              >
                Challenges
              </Link>
            </li>
            <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
              <Link
                onClick={() => setNav(!nav)}
                to="jobs"
                smooth
                duration={500}
              >
                Jobs
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
