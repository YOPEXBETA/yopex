import React, { useState } from "react";
import { useSelector } from "react-redux";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";
import { AddSocialPostModal } from "./AddSocialPostModal";

const AddSocialPostCard = () => {
  const { user } = useSelector((state) => state.auth);
  const [openPostModal, setOpenPostModal] = useState(false);
  const toggleModal = () => setOpenPostModal((prev) => !prev);

  return (
    <div className="bg-white divide-gray-100 overflow-hidden rounded-lg dark:bg-zinc-800 dark:border-zinc-500 dark:border text-gray-600  sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
      <div className="p-4">
        <div className="flex items-center space-x-2">
          {user.picturePath ? (
            <img
              alt="banner"
              src={user.picturePath}
              className="w-10 h-10 rounded-full object-cover cursor-pointer border-2"
            />
          ) : (
            <img
              alt="default"
              src={AvatarProfile}
              className="w-10 h-10 rounded-full object-cover cursor-pointer border-2"
            />
          )}
          <button
            className="flex-1 px-3 text-gray-400 text-left border  focus:outline-none rounded-full h-10 dark:bg-zinc-800 dark:placeholder-gray-200 bg-zinc-100"
            onClick={toggleModal}
          >
            Share your work...
          </button>
        </div>
      </div>

      <AddSocialPostModal open={openPostModal} handleClose={toggleModal} />
    </div>
  );
};

export default AddSocialPostCard;
