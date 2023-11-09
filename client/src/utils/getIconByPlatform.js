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
    "rounded-full p-2 focus:outline-none focus:ring focus:border-blue-300 flex items-center justify-center";

  switch (platform) {
    case "github":
      return (
        <button className={`bg-gray-800 text-white ${buttonStyles}`}>
          <FaGithub {...iconProps} />
        </button>
      );
    case "linkedin":
      return (
        <button className={`bg-blue-600 text-white ${buttonStyles}`}>
          <FaLinkedin {...iconProps} />
        </button>
      );
    case "behance":
      return (
        <button className={`bg-blue-500 text-white ${buttonStyles}`}>
          <FaBehance {...iconProps} />
        </button>
      );
    case "dribbble":
      return (
        <button className={`bg-pink-500 text-white ${buttonStyles}`}>
          <FaDribbble {...iconProps} />
        </button>
      );
    case "instagram":
      return (
        <button className={`bg-pink-500 text-white ${buttonStyles}`}>
          <FaInstagram {...iconProps} />
        </button>
      );
    default:
      return null;
  }
};

export default getIconByPlatform;
