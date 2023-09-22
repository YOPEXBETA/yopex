import React from "react";
import { FaBell, FaPlus, FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";

const MobileMenu = ({ userImage, user }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white z-50 px-16 py-4 flex justify-between items-center border-t-2 border-gray-200">
      <div className="flex justify-between items-center flex-1">
        <Link to={`/profile/${user._id}`}>
          <img
            src={userImage}
            alt="User"
            className="w-8 h-8 rounded-full mr-2"
          />
        </Link>
        <FaBell className="text-2xl text-gray-600 mr-4" />
        <FaPlus className="text-2xl text-gray-600 mr-4" />
        <Link to={`/chat`}> <FaComments className="text-2xl text-gray-600" /> </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
