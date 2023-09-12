import React, { useState } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../../../redux/auth/authSlice";

// ==============================|| CODE ||============================== //

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const handleClick = (event) => setOpen(!open);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="relative z-50">
      <div>
        <button
          onClick={handleClick}
          className="flex items-center justify-center w-10 h-10 text-gray-600 rounded-full"
        >
          <img
            alt="picture"
            src={user.picturePath}
            className="rounded-full  object-cover w-10 h-10 border-2 border-gray-200"
          />
        </button>
      </div>
      <div className="relative -z-50">
        {open && (
          <div className="absolute right-0 mt-6 bg-white shadow-lg rounded-lg min-w-[320px] max-w-[380px] overflow-visible border border-gray-200">
            <a
              href={`/profile/${user._id}`}
              className="p-3 hover:bg-gray-100 space-x-2 flex items-center"
            >
              <img
                src={user.picturePath}
                alt="User Avatar"
                className="w-12 h-12 rounded-full  border-2 border-gray-200"
              />
              <div className="flex-grow">
                {user.role === "user" || user.role === "admin" ? (
                  <div>
                    <p className="text-[1rem] text-black font-medium">
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
              href="/"
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
  );
};

export default ProfileMenu;
