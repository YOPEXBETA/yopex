import React, { useEffect, useRef, useState } from "react";
// ==============================|| ICONS ||============================== //
import { FaFire, FaBuilding, FaSuitcase, FaPen, FaPlus } from "react-icons/fa";
// ==============================|| MODALS||============================== //
import { AddPostModal } from "./AddPostsModal";
import { AddWorkOfferModal } from "../../../../../../../Components/Modals/AddWorkOfferModal";
import { Link } from "react-router-dom";

// ==============================|| CODE ||============================== //

const AddPostMenuList = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [Open, setOpen] = useState(false);

  const handleClick = (event) => setOpen(!Open);

  const handleCloseMenu = () => {
    setOpen(false);
  };

  // ==============================|| ADD WORK OFFER CODE ||============================== //
  const [openWorkModal, setOpenWorkModal] = useState(false);

  const handleClickOpenModalWork = () => {
    setOpenWorkModal(true);
  };

  const handleCloseModalWork = () => {
    setOpenWorkModal(false);
  };
  // ==============================|| ADD A CHALLENGE CODE ||============================== //
  const [openChallengeModal, setOpenChallengeModal] = useState(false);

  const handleClickOpenModalChallenge = () => {
    setOpenChallengeModal(true);
  };

  const handleCloseModalChallenge = () => {
    setOpenChallengeModal(false);
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
          className="ml-2 p-1 text-gray-600 dark:text-gray-100 dark:hover:text-green-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        </button>
      </div>
      {Open && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-zinc-700 ring-1 ring-black ring-opacity-5"
          ref={menuRef}
        >
          <div className="py-1" role="none">
            <Link
              to="/create-job-offer"
              className="block px-4 py-2 text-left text-sm w-full dark:text-gray-100 dark:hover:bg-green-600 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <button>
                <FaSuitcase className="mr-2 inline-block" /> Add work offer
              </button>
            </Link>
            <Link
              to="/create-challenge"
              className="block px-4 py-2 text-left text-sm w-full dark:text-gray-100 dark:hover:bg-green-600 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <button>
                <FaFire className="mr-2 inline-block" /> Add a challenge
              </button>
            </Link>

            <button
              onClick={handleClickOpenModalPost}
              className="block px-4 py-2 text-left text-sm text-gray-700 w-full dark:text-gray-100 dark:hover:bg-green-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <FaPen className="mr-2 inline-block" /> Add a post
            </button>
            <Link
              to="/create-company"
              className="block px-4 py-2 text-left text-sm w-full dark:text-gray-100 dark:hover:bg-green-600 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <button>
                <FaBuilding className="mr-2 inline-block" />
                Add a company
              </button>
            </Link>
          </div>
        </div>
      )}

      <AddWorkOfferModal
        open={openWorkModal}
        handleClose={handleCloseModalWork}
      />

      <AddPostModal open={openPostModal} handleClose={handleCloseModalPost} />
      {/* <AddCompanyModal
        open={openCompanyModal}
        handleClose={handleCloseModalCompany}
      /> */}
    </div>
  );
};

export default AddPostMenuList;
