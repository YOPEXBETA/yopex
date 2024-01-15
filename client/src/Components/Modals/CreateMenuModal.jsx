import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from ".";
import PlusIcon from "../icons/PlusIcon";
import CloseIcon from "../icons/CloseIcon";
import ContestIcon from "../icons/ContestIcon";
import JobIcon from "../icons/JobIcon";
import CompanyIcon from "../icons/CompanyIcon";
import CreateProjectModal from "./CreateProjectModal";
import CreateChallengeModal from "./CreateChallengeModal";
import CreateJobOfferModal from "./CreateJobOfferModal";
import ArrowIcon from "../icons/ArrowIcon";

const CreateMenuModal = ({ onClose }) => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const toggleModal = () => {
    setOpenPostModal((prev) => !prev);
  };
  const [openChallengeModal, setOpenChallengeModal] = useState(false);
  const toggleChallengeModal = () => {
    setOpenChallengeModal((prev) => !prev);
  };
  const [openJobModal, setOpenJobModal] = useState(false);
  const toggleJobModal = () => {
    setOpenJobModal((prev) => !prev);
  };

  return (
    <div>
      <Modal>
        <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white dark:bg-zinc-800">
          <div className="w-full">
            <div className="flex justify-between px-4 pt-4">
              <h4 className="text-2xl font-bold mb-4 text-black dark:text-white">
                Create
              </h4>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <CloseIcon />
              </button>
            </div>
            <hr />
            <div className="m-8 my-20 max-w-[400px] mx-auto">
              <div className="flex flex-col gap-4">
                <Link onClick={toggleModal}>
                  <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100 hover:bg-black hover:text-green-500">
                    <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white hover:bg-zinc-700">
                      <PlusIcon />
                    </span>
                    <div className="flex items-center flex-1 justify-between">
                      <h3 className="text-lg font-medium ">Create Project</h3>
                      <ArrowIcon />
                    </div>
                  </div>
                </Link>
                <Link to="/create-company">
                  <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100 hover:bg-black hover:text-green-500">
                    <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white hover:bg-zinc-700">
                      <CompanyIcon />
                    </span>
                    <div className="flex items-center flex-1 justify-between">
                      <h3 className="text-lg font-medium ">Create Company</h3>
                      <ArrowIcon />
                    </div>
                  </div>
                </Link>
                <Link onClick={toggleChallengeModal}>
                  <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100 hover:bg-black hover:text-green-500">
                    <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white hover:bg-zinc-700">
                      <ContestIcon />
                    </span>

                    <div className="flex items-center flex-1 justify-between">
                      <h3 className="text-lg font-medium ">Create Challenge</h3>
                      <ArrowIcon />
                    </div>
                  </div>
                </Link>
                <Link onClick={toggleJobModal}>
                  <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100 hover:bg-black hover:text-green-500">
                    <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white hover:bg-zinc-700">
                      <JobIcon />
                    </span>

                    <div className="flex items-center flex-1 justify-between">
                      <h3 className="text-lg font-medium ">Create Job Offer</h3>
                      <ArrowIcon />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <CreateProjectModal open={openPostModal} handleClose={toggleModal} />
      <CreateChallengeModal
        open={openChallengeModal}
        handleClose={toggleChallengeModal}
      />
      <CreateJobOfferModal open={openJobModal} handleClose={toggleJobModal} />
    </div>
  );
};

export default CreateMenuModal;
