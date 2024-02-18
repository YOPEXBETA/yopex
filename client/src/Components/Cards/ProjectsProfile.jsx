import { useState } from "react";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useLikePost, useBookmarkPost } from "../../hooks/react-query/usePosts";
import { EditPostModal } from "../shared/Modals/EditPostModal";
import { useDeletePost } from "../../hooks/react-query/usePosts";
import { BsThreeDots } from "react-icons/bs";
import ImagePlaceholder from "../../assets/images/ImagePlaceholder.jpg";
import PostMenuIcon from "../MenuIcons/PostMenuIcon";
import Card from "./index";
import Dropdown from "../dropdown";
import DeletePostPopup from "../Popup/DeletePostPopup";
import Tag from "../tags/Index";

const ProjectsProfile = ({
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
  let ownerId = user._id;
  if (companyId) {
    ownerId = companyId;
  }

  const bookmark = async () => {
    BookmarkPost();
  };

  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = post.postPicturePath.length;

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
    <Card>
      <div className="lg:flex">
        <img
          className="object-cover w-full md:h-56 rounded-tl-2xl rounded-bl-2xl lg:w-64"
          src={post.postPicturePath ? post.postPicturePath : ImagePlaceholder}
          alt="thumbnail"
        />

        <div className="flex flex-col justify-between py-6 lg:mx-6">
          <a
            href={`/postDetails/${post._id}`}
            className="text-xl font-semibold text-gray-800 hover:underline dark:text-white "
          >
            {post?.title}
          </a>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              {format(new Date(post.createdAt), "dd MMMM yyyy")}
            </span>
            {post.user === user._id && (
              <div
                className="font-medium flex  rounded-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Dropdown
                  button={
                    <p className="cursor-pointer">
                      <BsThreeDots />
                    </p>
                  }
                  animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out "
                  children={
                    <PostMenuIcon
                      post={post}
                      handleClickEdit={handleClickEdit}
                      handleDeleteClick={handleDeleteClick}
                    />
                  }
                  classNames={"py-2 top-4 right-0"}
                />
              </div>
            )}
          </div>
        </div>
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

export default ProjectsProfile;
