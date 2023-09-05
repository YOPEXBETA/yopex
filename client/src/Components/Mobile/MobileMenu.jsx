import React from "react";
import { FaBell, FaPlus, FaComments } from "react-icons/fa";

const MobileMenu = ({ userImage }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white z-50 px-16 py-4 flex justify-between items-center border-t-2 border-gray-200">
      <div className="flex justify-between items-center flex-1">
        <img src={userImage} alt="User" className="w-8 h-8 rounded-full mr-2" />
        <FaBell className="text-2xl text-gray-600 mr-4" />
        <FaPlus className="text-2xl text-gray-600 mr-4" />
        <FaComments className="text-2xl text-gray-600" />
      </div>
    </div>
  );
};

export default MobileMenu;
