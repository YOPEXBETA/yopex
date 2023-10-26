import React from "react";
import { useSelector } from "react-redux";
import CommentMenuIcon from "../MenuIcons/CommentMenuIcon";
const CommentModal = ({
  isOpen,
  handleSubmit,
  handleDialogClose,
  onSubmit,
  isLoading,
  comments,
  register,
  formatDistance,
}) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={handleDialogClose}
        >
          <div
            className="bg-white dark:bg-zinc-700 p-4 shadow-md rounded-lg w-[40rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-row space-x-2">
                <input
                  id="comment-textfield"
                  className="flex-grow outline-none border dark:bg-zinc-600 dark:placeholder-gray-300 dark:text-gray-200 border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="Enter your comment"
                  {...register("desc")}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-500 focus:outline-none"
                  disabled={isLoading}
                >
                  Comment
                </button>
              </div>
            </form>
            <div className="mt-4">
              <hr className="border-t border-gray-300" />
              {comments && comments.length > 0 ? (
                <ul className="mt-4 space-y-4">
                  {comments.map((comment) =>
                    comment.userId ? (
                      <li key={comment._id}>
                        <div className="flex items-center">
                          <img
                            src={comment.userId.picturePath}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border mr-1"
                          />
                          <div className="ml-2 w-full">
                            <div className="flex gap-2  items-start justify-between">
                              <div className="flex-col">
                                <div className="flex gap-1">
                                  <p className="text-md font-semibold dark:text-gray-200">
                                    {`${comment.userId.firstname} ${comment.userId.lastname}`}
                                  </p>
                                  <p className="text-md text-gray-400 dark:text-gray-400">
                                    {" "}
                                    |{" "}
                                    {formatDistance(
                                      new Date(comment.createdAt),
                                      new Date(),
                                      {
                                        addSuffix: true,
                                      }
                                    )}
                                  </p>
                                </div>
                                <p className="text-md dark:text-gray-200 text-zinc-700 whitespace-nowrap max-w-[70px]">
                                  {comment.desc}
                                </p>
                              </div>

                              {comment.userId._id === user._id && (
                                <CommentMenuIcon
                                  className="text-black text-md   "
                                  post={comment}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <hr className="border-t border-gray-300 mt-2" />
                      </li>
                    ) : (
                      <p>Comment has been deleted</p>
                    )
                  )}
                </ul>
              ) : (
                <p className="mt-4 text-md text-gray-700 dark:text-white">
                  No comments yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentModal;
