import React, { useEffect, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logout } from "../../../redux/auth/authSlice";

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
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="rounded-fullshadow-shadow-500 relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
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
                className="rounded-full bg-green-500 w-8 h-8 object-contain"
              />
            </button>
          </div>
          <div className="relative">
            {open && (
              <div className="absolute right-0 mt-6 bg-white shadow-lg rounded-lg min-w-[320px] max-w-[380px] overflow-visible border border-gray-200">
                <a
                  href={`/profile/${user._id}`}
                  className="p-3 hover:bg-gray-100 space-x-2 flex items-center"
                >
                  <img
                    src={user.picturePath}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full bg-green-500"
                  />
                  <div className="flex-grow">
                    {user.role === "user" || user.role === "admin" ? (
                      <div>
                        <p className="text-[1rem] font-medium">
                          {user.firstname + " " + user.lastname}
                        </p>
                        <p className="text-gray-500">{user.country}</p>
                      </div>
                    ) : (
                      <p className="text-xl font-medium">{user.companyName}</p>
                    )}
                  </div>
                </a>
                <hr className="border-t border-gray-200 mb-2" />
                {user.role === "admin" && (
                  <a
                    href="/Dashboard"
                    className="p-3 hover:bg-gray-100 space-x-2 flex items-center cursor-pointer"
                  >
                    <AdminPanelSettingsIcon className="w-6 h-6 text-gray-600" />
                    <span className="text-gray-600">Admin Dashboard</span>
                  </a>
                )}
                <a
                  href="/settings"
                  className="px-3 py-2 hover:bg-gray-100 space-x-2 flex items-center"
                >
                  <Settings className="w-6 h-6 text-gray-600" />
                  <span className="text-gray-600">Settings</span>
                </a>
                <a
                  href="/login"
                  onClick={handleLogout}
                  className="px-3 py-2 hover:bg-gray-100 space-x-2 flex items-center cursor-pointer"
                >
                  <Logout className="w-6 h-6 text-gray-600" />
                  <span className="text-gray-600">Logout</span>
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
