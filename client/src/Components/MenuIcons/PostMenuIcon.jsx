// PostMenuIcon.jsx
import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useDeletePost } from "../../hooks/react-query/usePosts";
import { EditPostModal } from "../shared/Modals/EditPostModal";
import DeletePostConfirmationModal from "../Modals/DeletePostConfirmationModal";

const PostMenuIcon = ({ post }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutate } = useDeletePost();

  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  const handleMenuClick = (event) => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    mutate(post._id);
    handleClose();
  };

  return (
    <div className="relative inline-block text-center z-20">
      <button
        onClick={handleMenuClick}
        className="hover:bg-gray-100 dark:bg-zinc-800 px-2 py-2 rounded-full"
      >
        <HiDotsVertical className="text-gray-600 text-lg hover:text-green-600" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 dark:bg-zinc-800 shadow-lg rounded-lg">
          <ul>
            <li>
              <button
                onClick={handleDeleteClick}
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

      {isDeleteModalOpen && (
        <DeletePostConfirmationModal
          open={isDeleteModalOpen}
          handleCancel={handleCancelDelete}
          handleConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default PostMenuIcon;
