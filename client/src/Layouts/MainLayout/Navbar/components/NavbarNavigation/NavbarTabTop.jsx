import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const tabStyles = { p: 3 };

const NavbarTabTop = () => {
  const location = useLocation();
  const [value, setValue] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === "/feed") {
      setValue(0);
    } else if (path === "/browse") {
      setValue(1);
    } else if (path === "/leaderboard") {
      setValue(2);
    } else {
      setValue("");
    }
  }, [location]);

  return (
    <div className="w-full md:flex md:items-center py-4">
      <nav className="w-full md:flex md:flex-row md:justify-center">
        <Link
          to="/feed"
          onClick={() => handleChange(0)}
          className={`block px-4 py-2  text-3xl xl:text-sm lg:text-sm  md:text-sm font-medium ${
            value === 0 ? "text-green-500" : "text-gray-500"
          } hover:text-green-500 focus:outline-none`}
        >
          Home
        </Link>
        <Link
          to="/browse"
          onClick={() => handleChange(1)}
          className={`block px-4 py-2 text-3xl xl:text-sm lg:text-sm  md:text-sm  font-medium ${
            value === 1 ? "text-green-500" : "text-gray-500"
          } hover:text-green-500 focus:outline-none`}
        >
          Browse
        </Link>
        <Link
          to="/leaderboard"
          onClick={() => handleChange(2)}
          className={`block px-4 py-2  text-3xl xl:text-sm lg:text-sm md:text-sm font-medium ${
            value === 2 ? "text-green-500" : "text-gray-500"
          } hover:text-green-500 focus:outline-none`}
        >
          Leaderboard
        </Link>
      </nav>
    </div>
  );
};

export default NavbarTabTop;
