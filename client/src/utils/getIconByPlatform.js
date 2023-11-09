// IconHelper.js

import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaBehance,
  FaDribbble,
  FaInstagram,
} from "react-icons/fa";

const getIconByPlatform = (platform) => {
  const iconProps = {
    className: "cursor-pointer",
    size: 20,
  };

  const buttonStyles =
    "rounded-full p-2 focus:outline-none focus:ring focus:border-blue-300 w-full flex items-center justify-center py-3 px-4";

  switch (platform) {
    case "github":
      return (
        <button className={`bg-gray-800 text-white ${buttonStyles}`}>
          <FaGithub {...iconProps} />
          <span className="ml-2">GitHub</span>
        </button>
      );
    case "linkedin":
      return (
        <button className={`bg-blue-600 text-white ${buttonStyles}`}>
          <FaLinkedin {...iconProps} />
          <span className="ml-2">LinkedIn</span>
        </button>
      );
    case "behance":
      return (
        <button className={`bg-blue-500 text-white ${buttonStyles}`}>
          <FaBehance {...iconProps} />
          <span className="ml-2">Behance</span>
        </button>
      );
    case "dribbble":
      return (
        <button className={`bg-pink-500 text-white ${buttonStyles}`}>
          <FaDribbble {...iconProps} />
          <span className="ml-2">Dribbble</span>
        </button>
      );
    case "instagram":
      return (
        <button className={`bg-pink-500 text-white ${buttonStyles}`}>
          <FaInstagram {...iconProps} />
          <span className="ml-2">Instagram</span>
        </button>
      );
    default:
      return null;
  }
};

export default getIconByPlatform;
