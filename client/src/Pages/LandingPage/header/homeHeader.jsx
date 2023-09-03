import React, { useEffect, useState } from "react";
import YopexLogo from "../../../../src/images/LogoYopex.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../redux/auth/authSlice";
import ProfileMenu from "../../../Layouts/MainLayout/Navbar/components/MenuIcons/components/ProfileMenu";

const HomeHeader = () => {
  const [nav, setNav] = useState(false);
  const { user, error } = useSelector((state) => state.auth); // Assuming you have an error state in your Redux slice
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("layout");
    if (!user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user]);

  console.log(user);
  return (
    <div>
      <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-white fixed z-10 border-b-2">
        <div className="flex items-center gap-8">
          <img src={YopexLogo} width={35} alt="Yopex Logo" />
          <ul className="hidden md:flex">
            <li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
              <Link to="home" smooth duration={500}>
                Home
              </Link>
            </li>
            <li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
              <Link to="about" smooth duration={500}>
                About
              </Link>
            </li>
            <li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
              <Link to="contact" smooth duration={500}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          {user && (
            <p className="hover:scale-105 ">
              <ProfileMenu />
            </p>
          )}
          {!user && (
            <a href="/login" className="block">
              <button className="cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-green-500 duration-200">
                Login
              </button>
            </a>
          )}
          {!user && (
            <a href="/register" className="block">
              <button className="bg-black text-white rounded-3xl px-4 py-2 font-medium hover:scale-105 duration-200">
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
            {user && (
              <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
                <Link
                  onClick={() => setNav(!nav)}
                  to="feed"
                  smooth
                  duration={500}
                >
                  Feed
                </Link>
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
