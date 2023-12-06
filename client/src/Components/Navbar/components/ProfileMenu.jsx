import React from "react";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/auth/authSlice";

// ==============================|| CODE ||============================== //

const ProfileMenu = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Use a ref to detect clicks outside of the menu

  return (
    <div className="flex w-56 flex-col rounded-[20px] bg-white py-2 shadow-xl shadow-shadow-500 dark:!bg-zinc-700 dark:text-white dark:shadow-none">
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
          <h1 className="text-sm font-semibold text-black dark:text-gray-200">
            {user?.firstname + " " + user?.lastname}
          </h1>
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

      <hr className="border-gray-200 dark:border-gray-700 " />

      <a
        href="/"
        onClick={handleLogout}
        className="block px-4 py-3 text-sm text-red-500 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Sign Out
      </a>
    </div>
  );
};

export default ProfileMenu;
