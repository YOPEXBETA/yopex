import React from "react";
import {
  FiHome,
  FiCompass,
  FiAward,
  FiBell,
  FiMessageSquare,
} from "react-icons/fi";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";

import { Link } from "react-router-dom";

const MobileMenu = ({ userImage, user }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 dark:bg-zinc-800 dark:border-zinc-600 bg-white z-50 px-4 py-4 flex justify-between items-center border-t-2 border-gray-200">
      <div className="flex justify-between items-center flex-1">
        <Link to={`/profile/${user._id}`}>
          {userImage ? (
            <img
              alt="picture"
              src={userImage}
              className="w-8 h-8 rounded-full mr-2 border-2"
            />
          ) : (
            <img
              alt="default"
              src={AvatarProfile}
              className="w-8 h-8 rounded-full mr-2 border-2"
            />
          )}
        </Link>
        <Link to={`/feed`}>
          <FiHome className="text-2xl dark:text-gray-200 dark:selection:text-green-600 text-gray-600 mr-4" />
        </Link>
        <Link to={`/browse`}>
          <FiCompass className="text-2xl dark:text-gray-200 text-gray-600 mr-4" />
        </Link>
        <Link to={`/leaderboard`}>
          <FiAward className="text-2xl dark:text-gray-200 text-gray-600 mr-4" />
        </Link>
        <Link to={`/Notifications`}>
          <FiBell className="text-2xl dark:text-gray-200 text-gray-600 mr-4" />
        </Link>
        <Link to={`/chat`}>
          <FiMessageSquare className="text-2xl dark:text-gray-200 text-gray-600 mr-4" />
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
