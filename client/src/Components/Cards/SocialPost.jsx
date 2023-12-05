import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CommentButton from "../shared/comments/CommentButton";

import { useLikePost, useBookmarkPost } from "../../hooks/react-query/usePosts";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

import SocialPostImage from "../shared/PostImage/SocialPostImage";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";
import LoadingSpinner from "../LoadingSpinner";
import PostMenuIcon from "../MenuIcons/PostMenuIcon";
import Card from "./index";

const SocialPostCard = ({
  post,
  bookmarks,
  companyId,
  height,
  width,
  type = "profile",
  openModal,
  extra,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [isliked, setIsLiked] = useState(user._id in post.likes);

  const { category } = useSelector((state) => state.global);
  const { mutate: likePost, isLoading: likeLoading } = useLikePost(
    user._id,
    post.userId,
    category
  );
  const { mutate: BookmarkPost, isLoading: bookmarkLoading } = useBookmarkPost(
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

  const renderPaginationDots = () => {
    const dots = [];
    for (let i = 0; i < pageCount; i++) {
      dots.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-3 h-3 rounded-full ${
            i === currentPage ? "bg-green-500" : "bg-gray-300"
          } mx-1 focus:outline-none`}
        ></button>
      );
    }
    return dots;
  };

  return (
    <Card
      extra={`transition  cursor-pointer hover:scale-102 duration-500 ${extra}`}
    >
      <div className=" flex justify-between items-start">
        <div className=" flex items-center py-4 pl-4 gap-2">
          {post.userPicturePath ? (
            <img
              alt="post"
              src={post.userPicturePath}
              className="w-11 h-11 rounded-full object-cover bg-white border-2"
            />
          ) : (
            <img
              alt="default"
              src={AvatarProfile}
              className="w-11 h-11 rounded-full object-cover bg-white border-2"
            />
          )}
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
              <p className="text-md font-medium dark:text-gray-300 truncate w-52">
                {post.companyName !== undefined
                  ? `${post?.companyName}`
                  : `${post?.firstname} ${post?.lastname}`}
              </p>
            </Link>
          </div>
        </div>
        {(post.userId === user._id || user.companies.includes(post.userId)) && (
          <button className="py-6 pr-2 rounded-full">
            <PostMenuIcon className="text-black" post={post} />
          </button>
        )}
      </div>
      <div className="col-span-1 md:col-span-1 px-4">
        {type === "profile" || "feed" ? null : (
          <div className="mb-4">
            <div
              className="text-md dark:text-white"
              dangerouslySetInnerHTML={{ __html: post?.description }}
            />
          </div>
        )}
      </div>
      <div className="mx-auto relative">
        <div className="flex items-center">
          <div className="object-cover static">
            <div className="flex items-center object-cover">
              {post.postPicturePath
                .slice(currentPage, currentPage + 1)
                .map((item, index) => (
                  <div className="group relative" key={index}>
                    <SocialPostImage
                      post={post}
                      item={item}
                      height={height}
                      type={type}
                      width={width}
                      openModal={openModal}
                    />
                    <Link to={`/postDetails/${post._id}`}>
                      <div className="invisible group-hover:visible absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <p
                          className="text-white cursor-pointer"
                          //onClick={() => openModal()}
                        >
                          Explore post details
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-3 absolute bottom-4 left-0 w-full">
          {renderPaginationDots()}
        </div>
      </div>
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
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
              ) : /*isliked*/ user._id in post.likes ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-red-500"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              )}
            </button>
            <>
              <p className="text-zinc-800 dark:text-white">{post.likesCount}</p>
            </>
          </div>

          <div className="flex items-center p-2">
            <CommentButton
              post={post}
              category={category}
              commentCount={post.commentCount}
              type={type}
            />
          </div>
        </div>
        <div>
          {ownerId == post.userId ? (
            ""
          ) : (
            <div className="flex items-center">
              <button
                aria-label="bookmark"
                onClick={() => bookmark(post._id)}
                className="focus:outline-none"
              >
                {bookmarkLoading ? (
                  <div>
                    <LoadingSpinner />
                  </div>
                ) : bookmarks.includes(post._id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
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
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SocialPostCard;
