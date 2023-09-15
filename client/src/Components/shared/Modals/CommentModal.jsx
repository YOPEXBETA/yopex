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
  console.log(comments);
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={handleDialogClose}
        >
          <div
            className="bg-white p-4 shadow-md rounded-lg w-[40rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-row space-x-2">
                <input
                  id="comment-textfield"
                  className="flex-grow outline-none border border-gray-300 rounded-md p-2"
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
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="ml-2 w-full">
                            <div className="flex gap-2  items-start">
                              <p className="text-md font-semibold">
                                {`${comment.userId.firstname} ${comment.userId.lastname}`}
                              </p>
                           
                           <div className="flex justify-between w-96 items-start ">
                             <p className="text-md text-gray-400 ">
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
                              {comment.userId._id === user._id && (
                                  <CommentMenuIcon className="text-black  " post={comment} />
                          )}
                          </div>
                            </div>
                            
                            <p className="text-md text-zinc-700 whitespace-nowrap max-w-[70px]">
                              {comment.desc}
                            </p>
                           
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
                <p className="mt-4 text-md text-gray-700">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentModal;
