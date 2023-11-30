import React, { useState } from "react";
// ==============================|| ICONS ||============================== //
import { FaFire, FaBuilding, FaSuitcase, FaPen, FaPlus } from "react-icons/fa";
import { AddPostModal } from "../../../Layouts/MainLayout/Navbar/components/MenuIcons/components/AddPost/AddPostsModal";
import { AddWorkOfferModal } from "../../Modals/AddWorkOfferModal";
import { Link } from "react-router-dom";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  // ==============================|| ADD WORK OFFER CODE ||============================== //
  const [openWorkModal, setOpenWorkModal] = useState(false);

  const handleCloseModalWork = () => {
    setOpenWorkModal(false);
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
              <Link to="/create-job-offer">
                <button className="block p-4 text-center  text-sm w-full dark:bg-zinc-700 text-gray-700 bg-white shadow-lg rounded-full">
                  <FaSuitcase className="inline-block dark:text-gray-200" />
                </button>
              </Link>
              <Link to="/create-challenge">
                <button className="block p-4 text-center  text-sm w-full dark:bg-zinc-700 text-gray-700 bg-white shadow-lg rounded-full">
                  <FaFire className="inline-block dark:text-gray-200" />
                </button>
              </Link>

              <Link to="/create-company">
                <button className="block p-4 text-center   text-sm w-full dark:bg-zinc-700 text-gray-700 bg-white shadow-lg rounded-full">
                  <FaBuilding className="inline-block dark:text-gray-200" />
                </button>
              </Link>

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

      <AddPostModal open={openPostModal} handleClose={handleCloseModalPost} />
    </div>
  );
};

export default FloatingButton;
