import { useState } from "react";
import { formatDistance } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CommentButton from "../../comments/CommentButton";

import {
  useLikePost,
  useBookmarkPost,
} from "../../../../hooks/react-query/usePosts";
import PostMenuIcon from "../../MenuIcons/PostMenuIcon";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

import SocialPostImage from "../../PostImage/SocialPostImage";

const SocialPostCard = ({
  post,
  bookmarks,
  companyId,
  height,
  width,
  openModal,
}) => {
  const { user } = useSelector((state) => state.auth);

  console.log(post, "socialpost");
  const { category } = useSelector((state) => state.global);
  const { mutate: likePost } = useLikePost(user._id, post.userId, category);
  const { mutate: BookmarkPost } = useBookmarkPost(
    user._id,
    post._id,
    category
  );
  let ownerId = user._id;
  if (companyId) {
    ownerId = companyId;
  }

  const bookmark = async () => {
    BookmarkPost();
  };

  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = post.postPicturePath.length;

  const handlePrevious = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage(Math.min(currentPage + 1, pageCount - 1));
  };

  return (
    <div className="bg-white w-full mx-auto h-full rounded-lg border-green-500 border-b-2 shadow-md">
      <div className=" flex justify-between items-start">
        <div className=" flex items-center gap-3 py-6 px-4">
          <img
            alt="post"
            src={post.userPicturePath}
            className=" w-11 h-11 rounded-full object-cover bg-white"
          />
          <div>
            <Link
              key={post.userId}
              to={
                post?.companyName !== undefined
                  ? `/company/${post.userId}`
                  : `/profile/${post.userId}`
              }
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <p className="text-md font-medium ">
                {post.companyName !== undefined
                  ? `${post?.companyName}`
                  : `${post?.firstname} ${post?.lastname}`}
              </p>
            </Link>
            <p className=" text-[14px]  text-gray-500">
              {formatDistance(new Date(post.createdAt), new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        {(post.userId === user._id || user.companies.includes(post.userId)) && (
          <button className="py-6 px-2 rounded-full">
            <PostMenuIcon className="text-black" post={post} />
          </button>
        )}
      </div>

      <div className="relative">
        <div className="overflow-x-auto">
          <div className="flex relative">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-zinc-200 rounded-full hover:scale-110 hover:bg-green-500"
            >
              <FaChevronLeft className=" text-white  w-8 h-8 p-2" />
            </button>

            {post.postPicturePath
              .slice(currentPage, currentPage + 1)
              .map((item, index) => (
                <SocialPostImage
                  item={item}
                  height={height}
                  width={width}
                  openModal={openModal}
                />
              ))}

            <button
              onClick={handleNext}
              disabled={currentPage === pageCount - 1}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-zinc-200 rounded-full hover:scale-110 hover:bg-green-500"
            >
              <FaChevronRight className=" text-white  w-8 h-8 p-2" />
            </button>
          </div>
        </div>
      </div>

      <div className=" flex items-center gap-6 px-4">
        <div className="flex items-center gap-2">
          <button
            aria-label="add to favorites"
            onClick={() => likePost(post._id)}
            className="focus:outline-none"
          >
            {user._id in post.likes ? (
              <AiFillHeart className="text-red-500 w-6 h-6" />
            ) : (
              <AiOutlineHeart className="text-gray-500 w-6 h-6" />
            )}
          </button>
          <p className="">{post.likesCount}</p>
        </div>

        {/* Comment button */}
        <div className=" flex items-center p-2">
          <CommentButton
            post={post}
            category={category}
            commentCount={post.commentCount}
          />
        </div>

        {ownerId == post.userId ? (
          ""
        ) : (
          <div className="flex items-center gap-1">
            <button
              aria-label="bookmark"
              onClick={() => bookmark(post._id)}
              className="focus:outline-none"
            >
              {bookmarks.includes(post._id) ? (
                <BsBookmarkFill className="text-green-500 w-5 h-5" />
              ) : (
                <BsBookmark className="text-gray-500 w-5 h-5" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialPostCard;
