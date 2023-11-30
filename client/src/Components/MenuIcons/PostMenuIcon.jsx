import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

import { useSelector } from "react-redux";
import { useDeletePost } from "../../hooks/react-query/usePosts";
import { EditPostModal } from "../shared/Modals/EditPostModal";

const PostMenuIcon = ({ post }) => {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const handleDeleteClickModal = () => {
    setConfirmationDialogOpen(true);
    handleClose();
  };

  const handleConfirmDelete = () => {
    handleDeleteCompany();

    setConfirmationDialogOpen(false);
  };
  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
    handleClose();
  };
  const { user } = useSelector((state) => state.auth);
  const { mutate } = useDeletePost(user._id);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(open ? null : event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    handleClose();
  };

  const handleDeleteCompany = async () => {
    mutate(post._id);
    handleClose();
  };

  return (
    <div className="relative inline-block text-center">
      <button
        onClick={handleClick}
        className="hover:bg-gray-100 dark:bg-zinc-800 px-2 py-2 rounded-full"
      >
        <HiDotsVertical className="text-gray-600 text-lg hover:text-green-600" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 z-10 bg-white border border-gray-200 dark:bg-zinc-800 shadow-lg rounded-lg">
          <ul>
            <li>
              <button
                onClick={handleDeleteClickModal}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
              >
                <FaTrash className="text-gray-500 mr-2" />
                Delete Post
              </button>
            </li>
            <li>
              <button
                onClick={handleEditClick}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
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
      {confirmationDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="dark:bg-zinc-800 bg-white p-6 rounded-lg shadow-lg border">
            <h2 className="text-xl font-semibold dark:text-white text-left mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-700 dark:text-white mb-4">
              Are you sure you want to delete this Post?
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 ml-2 bg-red-500 rounded-lg text-white hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 ml-2 bg-green-500 rounded-lg text-white hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostMenuIcon;
