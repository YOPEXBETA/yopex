import { useState } from "react";
import { useParams } from "react-router-dom";
import { useBookmarkedPosts } from "../../../../../../hooks/react-query/usePosts";
import SocialPostCard from "../../../../../../Components/Cards/SocialPost";
import SocialPostModal from "../../../../../../Components/shared/Modals/SocialPostModal";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import SocialPostSkeleton from "../../../../../../Components/SkeletonLoading/SocialPostSkeleton";
import ProjectsProfile from "../../../../../../Components/Cards/ProjectsProfile";

const Bookmarks = () => {
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
  const { userId } = useParams();
  const { data: posts, isLoading } = useBookmarkedPosts(userId);
  console.log("bookmarks ==>", posts);

  // Create an array of bookmark IDs
  const bookmarksId = posts?.map((book) => book._id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 py-2 mb-12">
      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : posts?.length === 0 ? (
          <p className="dark:text-gray-200">No Favorites found.</p>
        ) : (
          posts?.map((post) => (
            <ProjectsProfile
              key={post?._id}
              post={post}
              bookmarks={bookmarksId}
              openModal={() => openModal(post)}
            />
          ))
        )}
      </div>

      {/* Render the SocialPostModal conditionally */}
      {/*isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <SocialPostModal
            image={selectedImage}
            closeModal={closeModal}
            post={selectedPost}
          />
        </div>
      )*/}
    </div>
  );
};

export default Bookmarks;
