import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import {
  useAddComment,
  useCommentsByPosts,
} from "../../../../hooks/react-query/useComments";
import {
  useLikePost,
  useBookmarkPost,
} from "../../../../hooks/react-query/usePosts";
import CommentMenuIcon from "../../../../Components/MenuIcons/CommentMenuIcon";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";
import HeartFilled from "../../../../Components/icons/HeartFilled";
import HeartOutlined from "../../../../Components/icons/HeartOutlined";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Dropdown from "../../../../Components/dropdown";
import LoadingSpinner from "../../../../Components/LoadingSpinner";

const Comments = ({ post, postId, userId }) => {
  const { user } = useSelector((state) => state?.auth);
  const { data: comments } = useCommentsByPosts(postId);
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isLoading } = useAddComment(postId, post.userId);

  const { mutate: likePost, isLoading: likeLoading } = useLikePost(
    user._id,
    post.userId
  );

  const onSubmit = async (data) => {
    mutate({
      postId: postId,
      ...data,
    });
    reset();
  };
  return (
    <div className="bg-transparent overflow-hidden shadow-none px-4 lg:px-0">
      <div className="flex-grow overflow-y-auto h-full">
        <header className="border-b border-gray-200">
          <Link
            key={post?.user?._id}
            to={post ? `/profile/${post?.user?._id}` : null}
            className="cursor-pointer pb-4 flex items-center text-sm outline-none focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
          >
            {post?.userPicturePath ? (
              <img
                alt="post"
                src={post?.userPicturePath}
                className="h-9 w-9 rounded-full border"
              />
            ) : (
              <img
                alt="default"
                src={AvatarProfile}
                className="h-9 w-9 rounded-full border"
              />
            )}
            <p class="block ml-2 font-bold dark:text-white">
              {post.user
                ? `${post?.user?.firstname} ${post?.user?.lastname}`
                : "undefined"}
            </p>
          </Link>
        </header>
        {comments && comments.length > 0 ? (
          <ul className="mt-4 overflow-y-auto">
            {comments.map((comment) =>
              comment.userId ? (
                <li key={comment._id} className="pt-1">
                  <div className="flex gap-2 items-start justify-between">
                    <div className="flex-col w-full">
                      <div className="text-sm mb-2 flex flex-start items-center">
                        <div>
                          <a className="cursor-pointer flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                            {comment?.userId?.picturePath ? (
                              <img
                                alt="post"
                                src={comment.userId.picturePath}
                                className="h-8 w-8 rounded-full object-cover border"
                              />
                            ) : (
                              <img
                                alt="default"
                                src={AvatarProfile}
                                className="h-8 w-8 rounded-full object-cover border"
                              />
                            )}
                          </a>
                        </div>
                        <div className="ml-2">
                          <p className="font-bold">
                            <a className="cursor-pointer dark:text-white">
                              {comment?.userId?.firstname}.
                              {comment?.userId?.lastname}
                            </a>
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 font-medium break-words">
                            {comment?.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="font-medium p-2 flex  rounded-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {comment.userId._id === user._id && (
                      <Dropdown
                        button={
                          <p className="cursor-pointer">
                            <BsThreeDots />
                          </p>
                        }
                        animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
                        children={
                          <CommentMenuIcon
                            className="text-black text-md"
                            post={comment}
                          />
                        }
                        classNames={"py-2 top-4 right-0"}
                      />
                    )}
                  </button>
                  <hr className="border-t border-gray-200 my-4" />
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

      <div className="xl:fixed xl:w-1/4 xl:bottom-1 xl:pr-4 bg-white dark:bg-zinc-900">
        <div className="flex items-center">
          <button
            aria-label="add to favorites"
            onClick={() => {
              likePost(post._id);
              //setIsLiked(!isliked);
            }}
            className="focus:outline-none"
          >
            {likeLoading ? (
              <div>
                <LoadingSpinner />
              </div> // Show a loader while liking
            ) : user._id in post.likes ? (
              <HeartFilled />
            ) : (
              <HeartOutlined />
            )}
          </button>
          <span className="ml-2 text-sm font-bold dark:text-white">
            {post?.likesCount} Likes
          </span>
        </div>
        <span className="block mt-2 text-xs text-gray-700 dark:text-white">
          {format(new Date(post?.createdAt), "dd MMMM yyyy")}
        </span>
        <hr className="border-t my-6 lg:px-0" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-start">
            <textarea
              className="flex-1 resize-none outline-none appearance-none bg-transparent text-gray-700 dark:text-white"
              aria-label="Enter your comment..."
              placeholder="Enter your comment..."
              {...register("desc")}
            ></textarea>
            <button
              type="submit"
              className="ml-2 focus:outline-none border-none bg-transparent text-green-600"
              disabled={isLoading}
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
