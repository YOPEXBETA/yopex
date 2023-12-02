import React, { useEffect, useRef, useState } from "react";
import AvatarProfile from "../../../../../../assets/images/AvatarProfile.jpg";
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
              onClick={toggleTheme}
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Dark Mode
            </a>
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

            {/* <a
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
              */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
