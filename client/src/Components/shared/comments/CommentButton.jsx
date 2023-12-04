import { formatDistance } from "date-fns";
import { FaRegComment } from "react-icons/fa";
import React, { useState } from "react";
import {
  useAddComment,
  useCommentsByPosts,
} from "../../../hooks/react-query/useComments";
import { useForm } from "react-hook-form";
import CommentModal from "../Modals/CommentModal";

const CommentButton = ({ post, category, commentCount, type }) => {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </button>
        <p className="text-zinc-800">{commentCount}</p>
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
