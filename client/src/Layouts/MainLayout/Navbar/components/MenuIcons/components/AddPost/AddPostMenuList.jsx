import React, { useEffect, useRef, useState } from "react";
// ==============================|| MODALS||============================== //
import { Link } from "react-router-dom";
import { AddPostModal } from "../../../../../../../Components/Modals/AddPostsModal";

// ==============================|| CODE ||============================== //

const AddPostMenuList = () => {
  const [Open, setOpen] = useState(false);

  const handleClick = (event) => setOpen(!Open);

  const handleCloseMenu = () => {
    setOpen(false);
  };

  // ==============================|| ADD A POST CODE ||============================== //
  const [openPostModal, setOpenPostModal] = useState(false);

  const handleClickOpenModalPost = () => {
    setOpenPostModal(true);
  };

  const handleCloseModalPost = () => {
    setOpenPostModal(false);
  };

  // Use a ref to detect clicks outside of the menu
  const outsideClickRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        outsideClickRef.current &&
        !outsideClickRef.current.contains(event.target)
      ) {
        handleCloseMenu();
      }
    }

    if (setOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  return (
    <div className="relative z-50" ref={outsideClickRef}>
      <div className="relative">
        <button
          onClick={handleClick}
          className="px-4 py-2 flex items-center bg-zinc-800 text-white dark:text-gray-100 focus:outline-none  rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Create</span>
        </button>
      </div>
      {Open && (
        <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
          <Link
            to="/create-challenge"
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Create a Challenge
          </Link>

          <Link
            to="/create-job-offer"
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Create a Job offer
          </Link>

          <Link
            to="/create-company"
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Create a Company
          </Link>

          <hr className="border-gray-200 dark:border-gray-700 " />

          <Link
            onClick={handleClickOpenModalPost}
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Create a Social post
          </Link>
        </div>
      )}

      {/*<AddPostModal open={openPostModal} handleClose={handleCloseModalPost} />*/}
    </div>
  );
};

export default AddPostMenuList;
