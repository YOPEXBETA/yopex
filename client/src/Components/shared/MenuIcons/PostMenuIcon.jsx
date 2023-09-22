import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

import { useSelector } from "react-redux";
import { useDeletePost } from "../../../hooks/react-query/usePosts";
import { EditPostModal } from "../../shared/Modals/EditPostModal";

const PostMenuIcon = ({ post }) => {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const handleDeleteClickModal = () => {
    // Show the confirmation dialog
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete action
      handleDeleteCompany();

    // Close the confirmation dialog
    setConfirmationDialogOpen(false);
  };
  const handleCancelDelete = () => {
    // Close the confirmation dialog without deleting
    setConfirmationDialogOpen(false);
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this Post?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 ml-2 bg-green-500 text-white hover:bg-green-600"
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
