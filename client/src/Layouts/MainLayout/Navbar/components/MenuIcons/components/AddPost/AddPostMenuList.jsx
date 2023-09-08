import React, { useState } from "react";
// ==============================|| ICONS ||============================== //
import { FaFire, FaBuilding, FaSuitcase, FaPen, FaPlus } from "react-icons/fa";
// ==============================|| MODALS||============================== //
import { AddWorkOfferModal } from "./AddWorkOfferModal";
import { AddChallengeModal } from "./AddChallengeModal";
import { AddCompanyModal } from "./addCompanyModal";
import { AddPostModal } from "./AddPostsModal";

// ==============================|| CODE ||============================== //

const AddPostMenuList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
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

  // ==============================|| ADD A COMPANY CODE ||============================== //
  const [openCompanyModal, setOpenCompanyModal] = useState(false);

  const handleClickOpenModalCompany = () => {
    setOpenCompanyModal(true);
  };

  const handleCloseModalCompany = () => {
    setOpenCompanyModal(false);
  };

  return (
    <div className="relative z-50">
      <div className="relative">
        <button
          onClick={handleClick}
          className="ml-2 p-1 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
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
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="none">
            <button
              onClick={handleClickOpenModalWork}
              className="block px-4 py-2 text-left text-sm w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <FaSuitcase className="mr-2 inline-block" /> Add work offer
            </button>
            <button
              onClick={handleClickOpenModalChallenge}
              className="block px-4 py-2 text-sm text-left text-gray-700 w-full hover:bg-gray-100 hover:text-gray-900"
            >
              <FaFire className="mr-2 inline-block" /> Add a challenge
            </button>
            <button
              onClick={handleClickOpenModalPost}
              className="block px-4 py-2 text-left text-sm text-gray-700 w-full hover:bg-gray-100 hover:text-gray-900"
            >
              <FaPen className="mr-2 inline-block" /> Add a post
            </button>
            <button
              onClick={handleClickOpenModalCompany}
              className="block px-4 py-2 text-left text-sm text-gray-700 w-full hover:bg-gray-100 hover:text-gray-900"
            >
              <FaBuilding className="mr-2 inline-block" /> Add a company
            </button>
          </div>
        </div>
      )}

      <AddWorkOfferModal
        open={openWorkModal}
        handleClose={handleCloseModalWork}
      />
      <AddChallengeModal
        open={openChallengeModal}
        handleClose={handleCloseModalChallenge}
      />
      <AddPostModal open={openPostModal} handleClose={handleCloseModalPost} />
      <AddCompanyModal
        open={openCompanyModal}
        handleClose={handleCloseModalCompany}
      />
    </div>
  );
};

export default AddPostMenuList;
