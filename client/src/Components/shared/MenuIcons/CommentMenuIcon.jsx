import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

import { useSelector } from "react-redux";
import { EditPostModal } from "../../shared/Modals/EditPostModal";
import { useDeleteComment } from "../../../hooks/react-query/useComments";
import { EditCommentModal } from "../Modals/EditCommentModal";



const CommentMenuIcon = ({ post }) => {
    console.log(post._id);
  const { user } = useSelector((state) => state.auth);
  const { mutate } = useDeleteComment();

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

  const handleDeleteClick = () => {
    mutate({ CommentId: post._id, postId: post.postId });
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
                onClick={handleDeleteClick}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
              >
                <FaTrash className="text-gray-500 mr-2" />
                Delete Comment
              </button>
            </li>
            <li>
              <button
                onClick={handleEditClick}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
              >
                <FaEdit className="text-gray-500 mr-2" />
                Edit Comment
              </button>
            </li>
          </ul>
        </div>
      )}

      {isEditModalOpen && (
        <EditCommentModal
          open={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          comment={post}
        />
      )}
    </div>
  );
};

export default CommentMenuIcon;
