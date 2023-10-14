import React, { useState } from "react";
import { useSelector } from "react-redux";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";
import { AddSocialPostModal } from "./AddSocialPostModal";

const AddSocialPostCard = () => {
  const { user } = useSelector((state) => state.auth);
  const [openPostModal, setOpenPostModal] = useState(false);
  const toggleModal = () => setOpenPostModal((prev) => !prev);

  return (
    <div className=" divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-2xl border border-gray-300 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
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
          <input
            type="text"
            className="flex-1 px-3  focus:outline-none rounded-full h-10 bg-gray-100"
            placeholder="Share your work..."
            onClick={toggleModal}
          />
        </div>
      </div>

      <AddSocialPostModal open={openPostModal} handleClose={toggleModal} />
    </div>
  );
};

export default AddSocialPostCard;
