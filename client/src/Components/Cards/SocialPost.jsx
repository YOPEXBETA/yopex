import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { EditPostModal } from "../shared/Modals/EditPostModal";
import { useDeletePost } from "../../hooks/react-query/usePosts";
import { useLikePost, useBookmarkPost } from "../../hooks/react-query/usePosts";
import { BsThreeDots } from "react-icons/bs";
import CommentButton from "../shared/comments/CommentButton";
import SocialPostImage from "../shared/PostImage/SocialPostImage";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";
import LoadingSpinner from "../LoadingSpinner";
import PostMenuIcon from "../MenuIcons/PostMenuIcon";
import Card from "./index";
import Dropdown from "../dropdown";
import DeletePostPopup from "../Popup/DeletePostPopup";
import HeartFilled from "../icons/HeartFilled";
import HeartOutlined from "../icons/HeartOutlined";
import BookMarkFilled from "../icons/BookMarkFilled";
import BookMarkOutlined from "../icons/BookMarkOutlined";

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
  const { mutate } = useDeletePost();
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

  const [openEdit, setOpenEdit] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleClickEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDeleteClick = () => {
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    mutate(post._id);
    setConfirmationDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
  };

  return (
    <Card
      extra={`transition  cursor-pointer hover:scale-102 duration-500 ${extra}`}
    >
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
                      <div className="invisible group-hover:visible absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-t-2xl">
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
      <div className="col-span-1 md:col-span-1 px-4 mt-3">
        <h1 className="text-lg font-semibold leading-6 tracking-wide hover:text-green-500 cursor-pointer">
          {post?.title}
        </h1>
      </div>
      <div class="flex flex-row items-end h-full w-full px-4 mt-4">
        <div class="flex border-t border-gray-300 w-full py-4">
          <div class="flex items-center space-x-3  w-full">
            {post?.user?.picturePath ? (
              <img
                alt="post"
                src={post?.user?.picturePath}
                className="w-11 h-11 rounded-full object-cover bg-white border-2"
              />
            ) : (
              <img
                alt="default"
                src={AvatarProfile}
                className="w-11 h-11 rounded-full object-cover bg-white border-2"
              />
            )}
            <div className="">
              <Link
                key={post.user._id}
                to={post ? `/profile/${post.user._id}` : null}
              >
                <p className="text-sm font-semibold tracking-wide">
                  {post.user
                    ? `${post?.user?.firstname} ${post?.user?.lastname}`
                    : "undefined"}
                </p>
              </Link>
              <p className="text-xs font-light tracking-wider text-gray-500">
                {format(new Date(post?.createdAt), "dd MMMM yyyy")}
              </p>
            </div>
          </div>

          <div className="flex items-center flex-shrink-0 px-2">
            <div className="flex items-center space-x-3 text-gray-400">
              <div className="flex gap-1">
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
                <p className="font-medium">{post.likesCount}</p>
              </div>
              <div className="border-l border-gray-300 pl-2">
                {user._id == post.userId ? (
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
                        <BookMarkFilled />
                      ) : (
                        <BookMarkOutlined />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {post.user._id === user._id && (
        <div className="absolute right-4 top-4 hover:bg-white dark:hover:bg-zinc-600 bg-white/40 rounded-full">
          <button
            className="font-medium p-2 flex  rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Dropdown
              button={
                <p className="cursor-pointer">
                  <BsThreeDots />
                </p>
              }
              animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
              children={
                <PostMenuIcon
                  post={post}
                  handleClickEdit={handleClickEdit}
                  handleDeleteClick={handleDeleteClick}
                />
              }
              classNames={"py-2 top-4 right-0"}
            />
          </button>
        </div>
      )}
      <div className="flex items-center justify-between px-4">
        {/*<div className="flex items-center gap-6">
          <div className="flex items-center p-2">
            <CommentButton
              post={post}
              category={category}
              commentCount={post.commentCount}
              type={type}
            />
            </div>
        </div>*/}
      </div>
      {openEdit && (
        <EditPostModal
          open={openEdit}
          handleClose={handleCloseEdit}
          post={post}
        />
      )}

      {confirmationDialogOpen && (
        <DeletePostPopup
          handleCancel={handleCancelDelete}
          handleConfirm={handleConfirmDelete}
        />
      )}
    </Card>
  );
};

export default SocialPostCard;
