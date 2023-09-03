import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";

import { useSelector } from "react-redux";
import { useDeletePost } from "../../../hooks/react-query/usePosts";
import { EditPostModal } from "../../shared/Modals/EditPostModal";

const PostMenuIcon = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const { mutate } = useDeletePost(user._id);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    // Toggle the menu open/close state
    setAnchorEl(open ? null : event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    handleClose(); // Close the menu when clicking on "Edit Post"
  };

  const handleDeleteClick = () => {
    mutate(post._id);
    handleClose(); // Close the menu when clicking on "Delete Post"
  };

  return (
    <div className="relative inline-block text-center z-20">
      <button
        onClick={handleClick}
        className="hover:bg-gray-100 px-2 py-2 rounded-full"
      >
        <HiDotsVertical className="text-gray-600 text-lg" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
          <ul>
            <li>
              <button
                onClick={handleDeleteClick}
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <FaTrash className="text-gray-500 mr-2" />
                Delete Post
              </button>
            </li>
            <li>
              <button
                onClick={handleEditClick}
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <FaEdit className="text-gray-500 mr-2" />
                Edit Post
              </button>
            </li>
          </ul>
        </div>
      )}

      {isEditModalOpen && (
        <EditPostModal
          open={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          post={post}
        />
      )}
    </div>
  );
};

export default PostMenuIcon;
