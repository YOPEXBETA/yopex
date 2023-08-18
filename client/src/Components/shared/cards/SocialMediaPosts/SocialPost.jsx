import { Favorite, FavoriteBorder, Share } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { formatDistance } from "date-fns";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentButton from "../../comments/CommentButton";
import {
  useLikePost,
  useSharePost,
} from "../../../../hooks/react-query/usePosts";
import PostMenuIcon from "./components/PostMenuIcon";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";

const SocialPostCard = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.global);

  const { mutate: likePost } = useLikePost(user._id, post.userId, category);
  const { mutate: sharePost } = useSharePost(user._id, post.userId, category);

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
            className=" w-11 h-11 rounded-full object-cover bg-green-500"
          />
          <div>
            <Link
              key={post.userId._id}
              to={`/profile/${post.userId._id}`}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <p className="text-md font-medium ">
                {`${post.userId.firstname} ${post.userId.lastname}`}
              </p>
            </Link>
            <p className=" text-[14px]  text-gray-500">
              {formatDistance(new Date(post.createdAt), new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        {post.userId === user._id && (
          <button className="p-2 rounded-full">
            <PostMenuIcon className="text-black" post={post} />
          </button>
        )}
      </div>

      <div className="px-4 pb-3 ">
        <p>{post.description}</p>
      </div>

      <div className="relative">
        <div className="overflow-x-auto py-2">
          <div className="flex relative">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className="absolute left-0 top-1/2 transform -translate-y-1/2"
              style={{ background: "transparent", border: "none" }}
            >
              <FaChevronLeft size={40} className=" text-white" />
            </button>

            {post.postPicturePath
              .slice(currentPage, currentPage + 1)
              .map((item, index) => (
                <div key={item}>
                  <img
                    alt="photo"
                    src={item}
                    className="max-w-[calc(100% - 0.5rem)] h-full w-screen object-cover"
                  />
                </div>
              ))}

            <button
              onClick={handleNext}
              disabled={currentPage === pageCount - 1}
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
              style={{ background: "transparent", border: "none" }}
            >
              <FaChevronRight size={40} className=" text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className=" flex items-center py-1 gap-2">
        <div className="flex items-center gap-1">
          <button
            aria-label="add to favorites"
            onClick={() => likePost(post._id)}
          >
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
              checked={user._id in post.likes}
            />
          </button>
          <p className="">{post.likesCount}</p>
        </div>

        {/* Comment button */}
        <div className=" flex items-center gap-1">
          <CommentButton post={post} category={category} />
          <p className="">{post.commentCount}</p>
        </div>

        {/* Share button */}
        <div className=" flex items-center gap-1">
          <button onClick={() => sharePost(post._id)}>
            <Share sx={{ color: "silver" }} />
          </button>
          <p className="">{post.shareCount}</p>
        </div>
      </div>
    </div>
  );
};

export default SocialPostCard;
