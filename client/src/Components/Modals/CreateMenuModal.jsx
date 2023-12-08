import React from "react";
import CloseIcon from "../icons/CloseIcon";
import { Link } from "react-router-dom";
import Modal from ".";

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
              <Link to="/create-post">
                <button className="p-3 text-lg bg-white border hover:bg-black rounded-full hover:text-white w-full font-semibold">
                  Create a Post
                </button>
              </Link>
              <Link to="/create-company">
                <button className="p-3 text-lg bg-white border hover:bg-black rounded-full hover:text-white w-full font-semibold">
                  Create a Company
                </button>
              </Link>
              <Link to="/create-challenge">
                <button className="p-3 text-lg bg-white border hover:bg-black rounded-full hover:text-white w-full font-semibold">
                  Create a Challenge
                </button>
              </Link>
              <Link to="/create-job-offer">
                <button className="p-3 text-lg bg-white border hover:bg-black rounded-full hover:text-white w-full font-semibold">
                  Create a Job Offer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateMenuModal;
