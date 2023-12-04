import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const NavbarTabTop = () => {
  const location = useLocation();
  const [value, setValue] = useState(null);
  const { user } = useSelector((state) => state.auth);

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
    } else if (path === "/store") {
      setValue(3);
    } else {
      setValue("");
    }
  }, [location]);

  return (
    <div className=" w-full md:flex md:items-center py-4">
      <nav className="w-full md:flex md:flex-row md:justify-evenly">
        <Link
          to="/feed"
          onClick={() => handleChange(0)}
          className={`block px-4 py-2  xl:text-sm lg:text-sm  md:text-sm  ${
            value === 0
              ? "text-green-500"
              : "text-gray-500 dark:text-gray-100 dark:hover:text-green-600"
          } hover:text-green-500 focus:outline-none`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>
        <Link
          to="/browse"
          onClick={() => handleChange(1)}
          className={`block px-4 py-2  xl:text-sm lg:text-sm  md:text-sm   ${
            value === 1
              ? "text-green-500"
              : "text-gray-500 dark:text-gray-100 dark:hover:text-green-600"
          } hover:text-green-500 focus:outline-none`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-1.19 0-2.37-.21-3.5-.61L5 20.5V19h14v1.5l-3.5-2.11c-1.13.4-2.31.61-3.5.61zm0-14C8.15 4 5 7.15 5 11c0 2.52 1.21 4.82 3.09 6.28.08-.21.18-.41.28-.61L12 13l3.63 3.63c.1.2.2.4.28.61C17.79 15.82 19 13.52 19 11c0-3.85-3.15-7-7-7z"></path>
          </svg>
        </Link>
        <Link
          to="/leaderboard"
          onClick={() => handleChange(2)}
          className={`block px-4 py-2  xl:text-sm lg:text-sm md:text-sm  ${
            value === 2
              ? "text-green-500"
              : "text-gray-500 dark:text-gray-100 dark:hover:text-green-600"
          } hover:text-green-500 focus:outline-none`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
            />
          </svg>
        </Link>
        {user?.companies?.length > 0 && (
          <Link
            to="/store"
            onClick={() => handleChange(3)}
            className={`block px-4 py-2  xl:text-sm lg:text-sm md:text-sm  ${
              value === 3
                ? "text-green-500"
                : "text-gray-500 dark:text-gray-100 dark:hover:text-green-600"
            } hover:text-green-500 focus:outline-none`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default NavbarTabTop;
