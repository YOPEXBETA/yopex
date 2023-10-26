import React, { useEffect, useRef, useState } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Logout from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Settings from "@mui/icons-material/Settings";
import AvatarProfile from "../../../../../../assets/images/AvatarProfile.jpg";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../../../redux/auth/authSlice";
import LightModeIcon from "@mui/icons-material/LightMode";

// ==============================|| CODE ||============================== //

const ProfileMenu = () => {
  const [isDark, toggleDark] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClick = (event) => setOpen(!open);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");

      localStorage.theme = "light";
      toggleDark(false);
      handleCloseMenu();
    } else {
      document.documentElement.classList.add("dark");

      localStorage.theme = "dark";
      toggleDark(true);
      handleCloseMenu();
    }
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Use a ref to detect clicks outside of the menu
  const outsideClickRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        outsideClickRef.current &&
        !outsideClickRef.current.contains(event.target)
      ) {
        handleCloseMenu();
      }
    }

    if (setOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  return (
    <div className="relative z-40" ref={outsideClickRef}>
      <div>
        <button
          onClick={handleClick}
          className="flex items-center justify-center w-10 h-10 text-gray-600  rounded-full"
        >
          {user.picturePath ? (
            <img
              alt="picture"
              src={user.picturePath}
              className="rounded-full  object-cover w-10 h-10 border-2 border-gray-200"
            />
          ) : (
            <img
              alt="default"
              src={AvatarProfile}
              className="rounded-full object-cover w-10 h-10 border-2 border-gray-200"
            />
          )}
        </button>
      </div>
      <div>
        {open && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-6 bg-white  dark:bg-zinc-800 shadow-lg rounded-lg min-w-[320px] max-w-[380px] overflow-visible border border-gray-200"
          >
            <a
              href={`/profile/${user._id}`}
              className="p-3 hover:bg-gray-100 dark:hover:bg-green-600  space-x-2 flex items-center"
            >
              {user.picturePath ? (
                <img
                  alt="picture"
                  src={user.picturePath}
                  className="w-12 h-12 rounded-full  border-2 border-gray-200"
                />
              ) : (
                <img
                  alt="default"
                  src={AvatarProfile}
                  className="w-12 h-12 rounded-full  border-2 border-gray-200"
                />
              )}
              <div className="flex-grow">
                {user.role === "user" || user.role === "admin" ? (
                  <div>
                    <p className="text-[1rem] text-black dark:text-white font-medium">
                      {user.firstname + " " + user.lastname}
                    </p>
                    <p className="text-gray-500 dark:text-white">
                      {user.country}
                    </p>
                  </div>
                ) : (
                  <p className="text-xl font-medium dark:text-white">
                    {user.companyName}
                  </p>
                )}
              </div>
            </a>
            <hr className="border-t border-gray-200 mb-2" />
            {user.role === "admin" && (
              <a
                href="/Dashboard"
                className="p-3 hover:bg-gray-100 space-x-2 flex items-center cursor-pointer"
              >
                <AdminPanelSettingsIcon className="w-6 h-6 text-gray-600 dark:text-white" />
                <span className="text-gray-600">Admin Dashboard</span>
              </a>
            )}
            <a
              href="/"
              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-green-600 space-x-2 flex items-center"
            >
              <FaHome className="w-6 h-6 text-gray-600 dark:text-white" />
              <span className="text-gray-600 dark:text-white">Home</span>
            </a>
            <a
              href="/settings"
              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-green-600 space-x-2 flex items-center"
            >
              <Settings className="w-6 h-6 text-gray-600 dark:text-white" />
              <span className="text-gray-600 dark:text-white">Settings</span>
            </a>

            <a
              onClick={toggleTheme}
              className="px-3 py-2 hover:bg-gray-100 space-x-2  dark:hover:bg-green-600 flex items-center cursor-pointer"
            >
              {document.documentElement.classList.contains("dark") || isDark ? (
                <LightModeIcon className="w-6 h-6 text-gray-600 dark:text-white" />
              ) : (
                <DarkModeIcon className="w-6 h-6 text-gray-600 dark:text-white" />
              )}

              {document.documentElement.classList.contains("dark") ? (
                <span className="text-gray-600 dark:text-white">
                  Light Mode
                </span>
              ) : (
                <span className="text-gray-600 dark:text-white">Dark Mode</span>
              )}
            </a>

            <a
              href="/"
              onClick={handleLogout}
              className="px-3 py-2 hover:bg-gray-100 space-x-2 dark:hover:bg-green-600 flex items-center cursor-pointer"
            >
              <Logout className="w-6 h-6 text-gray-600 dark:text-white" />
              <span className="text-gray-600 dark:text-white">Logout</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
