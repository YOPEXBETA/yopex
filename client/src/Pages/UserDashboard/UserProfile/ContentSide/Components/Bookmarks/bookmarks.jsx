import { useState } from "react";
import { useParams } from "react-router-dom";
import { useBookmarkedPosts } from "../../../../../../hooks/react-query/usePosts";
import SocialPostCard from "../../../../../../Components/shared/cards/SocialMediaPosts/SocialPost";
import SocialPostModal from "../../../../../../Components/shared/Modals/SocialPostModal";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import SocialPostSkeleton from "../../../../../../Components/SkeletonLoading/SocialPostSkeleton";

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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
        {isLoading ? (
          <SocialPostSkeleton />
        ) : bookmarksId.length === 0 ? (
          <p className="dark:text-gray-200">No Favorites found.</p>
        ) : (
          posts?.map((post) => (
            <SocialPostCard
              className="xl:h-48 xl:w-96"
              height={"48"}
              width={"96"}
              key={post._id}
              post={post}
              bookmarks={bookmarksId}
              openModal={() => openModal(post)}
            />
          ))
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

export default Bookmarks;
