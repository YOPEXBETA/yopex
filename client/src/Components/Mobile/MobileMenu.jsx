import React from "react";
import { FaBell, FaPlus, FaComments } from "react-icons/fa";
import { FiHome, FiCompass, FiAward } from "react-icons/fi";
import { Link } from "react-router-dom";

const MobileMenu = ({ userImage, user }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white z-50 px-8 py-4 flex justify-between items-center border-t-2 border-gray-200">
      <div className="flex justify-between items-center flex-1">
        <Link to={`/profile/${user._id}`}>
          <img
            src={userImage}
            alt="User"
            className="w-8 h-8 rounded-full mr-2 border-2"
          />
        </Link>
        <Link to={`/feed`}>
          <FiHome className="text-2xl text-gray-600 mr-4" />
        </Link>
        <Link to={`/browse`}>
          <FiCompass className="text-2xl text-gray-600 mr-4" />
        </Link>
        <Link to={`/leaderboard`}>
          <FiAward className="text-2xl text-gray-600 mr-4" />
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
