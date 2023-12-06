import React, { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/auth/authSlice";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";

const AdminNavbar = (props) => {
  const { onOpenSidenav, brandText } = props;
  const [open, setOpen] = useState(false);
  const handleClick = (event) => setOpen(!open);

  const [darkmode, setDarkmode] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="0 sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl p-2 backdrop-blur-xl ">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-zinc-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-zinc-700 hover:text-zinc-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-zinc-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-zinc-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-zinc-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="rounded-fullshadow-shadow-500 relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 dark:!bg-zinc-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full xl:w-[225px]"></div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>

        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>

        <div>
          <div className="relative z-10">
            <button
              onClick={handleClick}
              className="flex items-center justify-center  text-gray-600 rounded-full"
            >
              <img
                src={user.picturePath}
                alt="picture"
                className="rounded-full w-8 h-8 object-contain border"
              />
            </button>
          </div>
          <div>
            {open && (
              <div className="absolute right-0 z-20 w-60 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
                <a
                  href={`/profile/${user?._id}`}
                  className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {user.picturePath ? (
                    <img
                      alt="picture"
                      src={user.picturePath}
                      className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9 border"
                    />
                  ) : (
                    <img
                      alt="default"
                      src={AvatarProfile}
                      className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9 border"
                    />
                  )}
                  <div className="mx-1">
                    <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {user?.firstname + " " + user?.lastname}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.country}
                    </p>
                  </div>
                </a>
                <hr className="border-gray-200 dark:border-gray-700 " />

                <a
                  href={`/profile/${user._id}`}
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  View Profile
                </a>
                {user.role === "admin" && (
                  <a
                    href="/Dashboard"
                    className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                )}

                <a
                  href="/"
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Home
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Settings
                </a>

                <hr className="border-gray-200 dark:border-gray-700 " />

                <a
                  href="/"
                  onClick={handleLogout}
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Sign Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
