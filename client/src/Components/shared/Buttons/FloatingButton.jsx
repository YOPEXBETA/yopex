import React, { useState } from "react";
// ==============================|| ICONS ||============================== //
import { FaFire, FaBuilding, FaSuitcase, FaPen, FaPlus } from "react-icons/fa";
import { AddWorkOfferModal } from "../../../Layouts/MainLayout/Navbar/components/MenuIcons/components/AddPost/AddWorkOfferModal";
import { AddChallengeModal } from "../../../Layouts/MainLayout/Navbar/components/MenuIcons/components/AddPost/AddChallengeModal";
import { AddPostModal } from "../../../Layouts/MainLayout/Navbar/components/MenuIcons/components/AddPost/AddPostsModal";
import { AddCompanyModal } from "../../../Layouts/MainLayout/Navbar/components/MenuIcons/components/AddPost/addCompanyModal";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
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
    <div>
      <div className="fixed bottom-20 right-2 z-10">
        <div className="relative">
          <button
            className={`${
              isOpen ? "bg-green-600" : "bg-green-500"
            }  text-white font-bold p-6 rounded-full transition-transform transform ${
              isOpen ? "rotate-45" : ""
            }`}
            onClick={toggleOptions}
          >
            <FaPlus />
          </button>
          {isOpen && (
            <div
              className="absolute flex flex-col items-center space-y-1 z-30 bottom-20 right-16"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                width: "3rem",
              }}
            >
              <button
                onClick={handleClickOpenModalWork}
                className="block p-4 text-center  text-sm w-full dark:bg-zinc-700 text-gray-700 bg-white shadow-lg rounded-full"
              >
                <FaSuitcase className="mr-2 inline-block dark:text-gray-200" />
              </button>
              <button
                onClick={handleClickOpenModalChallenge}
                className="block p-4 text-center  text-sm w-full dark:bg-zinc-700 text-gray-700 bg-white shadow-lg rounded-full"
              >
                <FaFire className="mr-2 inline-block dark:text-gray-200" />
              </button>

              <button
                onClick={handleClickOpenModalCompany}
                className="block p-4 text-center   text-sm w-full dark:bg-zinc-700 text-gray-700 bg-white shadow-lg rounded-full"
              >
                <FaBuilding className="mr-2 inline-block dark:text-gray-200" />
              </button>
              <button
                onClick={handleClickOpenModalPost}
                className="block p-4 text-center   text-sm w-full dark:bg-zinc-700 text-gray-700 bg-white shadow-lg rounded-full"
              >
                <FaPen className="mr-2 inline-block dark:text-gray-200" />
              </button>
            </div>
          )}
        </div>
      </div>
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

export default FloatingButton;
