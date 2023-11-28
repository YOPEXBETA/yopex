import { useState } from "react";
import { formatDistance } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CommentButton from "../../comments/CommentButton";

import {
  useLikePost,
  useBookmarkPost,
} from "../../../../hooks/react-query/usePosts";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

import SocialPostImage from "../../PostImage/SocialPostImage";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";
import LoadingSpinner from "../../../LoadingSpinner";
import PostMenuIcon from "../../../MenuIcons/PostMenuIcon";

const SocialPostCard = ({
  post,
  bookmarks,
  companyId,
  height,
  width,
  type = "profile",
  openModal,
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
    <div className="bg-white border divide-gray-100 overflow-hidden rounded-lg dark:bg-zinc-800 dark:border-zinc-500 dark:border text-gray-600  sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
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
            <p className=" text-[14px] dark:text-gray-400  text-gray-500">
              {formatDistance(new Date(post.createdAt), new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        {(post.userId === user._id || user.companies.includes(post.userId)) && (
          <button className="py-6 pr-2 rounded-full">
            <PostMenuIcon className="text-black" post={post} />
          </button>
        )}
      </div>

      <div className="col-span-1 md:col-span-1 px-4">
        {type === "profile" ? null : (
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
                      item={item}
                      height={height}
                      type={type}
                      width={width}
                      openModal={openModal}
                    />
                    <div className="invisible group-hover:visible absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <p
                        className="text-white cursor-pointer"
                        onClick={() => openModal()}
                      >
                        View more details
                      </p>
                    </div>
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
                <AiFillHeart className="text-red-500 w-6 h-6" />
              ) : (
                <AiOutlineHeart className="text-gray-500 w-6 h-6 dark:text-gray-300" />
              )}
            </button>
            <>
              <p className="text-gray-500">{post.likesCount}</p>
              {type !== "profile" && <p className="text-gray-500">like</p>}
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
                  <BsBookmarkFill className="text-green-500 w-5 h-5" />
                ) : (
                  <BsBookmark className="text-gray-500 w-5 h-5" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialPostCard;
