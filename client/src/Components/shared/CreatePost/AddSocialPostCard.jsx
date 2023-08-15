import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AddSocialPostModal } from "./AddSocialPostModal";

const AddSocialPostCard = () => {
  const { user } = useSelector((state) => state.auth);
  const [openPostModal, setOpenPostModal] = useState(false);
  const toggleModal = () => setOpenPostModal((prev) => !prev);

  return (
    <div className="shadow-md bg-white w-full mx-auto rounded-lg border-green-500 border-b-2">
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <img
            className="w-10 h-10 rounded-full object-cover cursor-pointer bg-green-500"
            src={user.picturePath}
            alt="photo"
          />
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
