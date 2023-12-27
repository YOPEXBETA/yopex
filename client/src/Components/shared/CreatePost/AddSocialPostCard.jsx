import React, { useState } from "react";
import { useSelector } from "react-redux";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";
import { AddSocialPostModal } from "./AddSocialPostModal";
import PlusIcon from "../../icons/PlusIcon";
import Card from "../../Cards";

const AddSocialPostCard = () => {
  const { user } = useSelector((state) => state.auth);
  const [openPostModal, setOpenPostModal] = useState(false);
  const toggleModal = () => setOpenPostModal((prev) => !prev);

  return (
    <Card>
      <a
        onClick={toggleModal}
        className="relative flex h-full flex-col rounded-md border hover:bg-gray-50 border-gray-200 p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5"
      >
        <div className="flex items-center gap-2">
          {/* SVG plus button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-10 w-10 text-white mr-2 rounded-full bg-indigo-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>

          {/* Content */}
          <div>
            <span className="text-md mb-0 font-semibold text-zinc-900 dark:text-white sm:mb-1.5 sm:text-xl">
              Share your work {user?.firstname}
            </span>
            <span className="text-sm leading-normal text-gray-400 sm:block">
              Share your outstanding work and let your projects speak for
              themselves.
            </span>
          </div>
        </div>
      </a>

      <AddSocialPostModal open={openPostModal} handleClose={toggleModal} />
    </Card>
  );
};

export default AddSocialPostCard;
