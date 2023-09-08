import { formatDistance } from "date-fns";
import { FaRegComment } from "react-icons/fa";
import React, { useState } from "react";
import {
  useAddComment,
  useCommentsByPosts,
} from "../../../hooks/react-query/useComments";
import { useForm } from "react-hook-form";
import CommentModal from "../Modals/CommentModal";

const CommentButton = ({ post, category, commentCount }) => {
  const { data: comments } = useCommentsByPosts(post._id);
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isLoading } = useAddComment(post._id, category, post.userId);

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => setIsOpen(true);
  const handleDialogClose = () => setIsOpen(false);

  const onSubmit = async (data) => {
    mutate({
      postId: post._id,
      ...data,
    });
    reset();
  };

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <button className="rounded-full" onClick={handleButtonClick}>
          <FaRegComment className="text-gray-500 w-5 h-5" />
        </button>
        <p className="">{commentCount}</p>
      </div>

      <CommentModal
        isOpen={isOpen}
        handleButtonClick={handleButtonClick}
        handleDialogClose={handleDialogClose}
        onSubmit={onSubmit}
        isLoading={isLoading}
        comments={comments}
        register={register}
        formatDistance={formatDistance}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default CommentButton;
