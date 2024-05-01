import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useUserPosts,
  useBookmarkedPosts,
} from "../../../../../../hooks/react-query/usePosts";
import { useSelector } from "react-redux";
import SocialPostModal from "../../../../../../Components/shared/Modals/SocialPostModal";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import ProjectsProfile from "../../../../../../Components/Cards/ProjectsProfile";
import SocialPostCard from "../../../../../../Components/Cards/SocialPost";

const MyPosts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };
  const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const { data: posts, isLoading } = useUserPosts(userId);
  const { data } = useBookmarkedPosts(user._id);
  let bookmarksId = [];
  data?.map((book) => {
    bookmarksId.push(book._id);
  });

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-2 mb-12">
        {isLoading ? (
          <LoadingSpinner />
        ) : posts?.length > 0 ? (
          posts.map((post, index) => (
            <SocialPostCard
              key={post._id}
              post={post}
              bookmarks={bookmarksId}
              height={"48"}
              width={"96"}
              openModal={() => openModal(post)}
              type="profile"
            />
          ))
        ) : (
          <p className="dark:text-gray-200 text-md">No post added.</p>
        )}
      </div>

      {/* Render the SocialPostModal conditionally */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <SocialPostModal
            image={selectedImage}
            closeModal={closeModal}
            post={selectedPost}
          />
        </div>
      )}
    </div>
  );
};

export default MyPosts;
