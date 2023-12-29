import React from "react";
import CloseIcon from "../icons/CloseIcon";
import { Link } from "react-router-dom";
import Modal from ".";
import PlusIcon from "../icons/PlusIcon";
import ContestIcon from "../icons/ContestIcon";
import JobIcon from "../icons/JobIcon";
import CompanyIcon from "../icons/CompanyIcon";

const CreateMenuModal = ({ onClose }) => {
  return (
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
              <Link to="/create-company">
                <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100 hover:bg-black hover:text-white">
                  <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white ">
                    <CompanyIcon />
                  </span>
                  <div className="flex flex-col flex-1">
                    <h3 className="text-lg font-medium"> Create a Company</h3>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 shrink-0"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 6l6 6l-6 6"></path>
                  </svg>
                </div>
              </Link>
              <Link to="/create-challenge">
                <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100 hover:bg-black hover:text-white">
                  <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white ">
                    <ContestIcon />
                  </span>
                  <div className="flex flex-col flex-1">
                    <h3 className="text-lg font-medium">Create a Challenge</h3>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 shrink-0"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 6l6 6l-6 6"></path>
                  </svg>
                </div>
              </Link>
              <Link to="/create-job-offer">
                <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100 hover:bg-black hover:text-white">
                  <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white ">
                    <JobIcon />
                  </span>
                  <div className="flex flex-col flex-1">
                    <h3 className="text-lg font-medium">Create a Job Offer</h3>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 shrink-0"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 6l6 6l-6 6"></path>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateMenuModal;
