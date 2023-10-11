import { useState } from "react";
//hooks
import {
  usePostsByCategory,
  useBookmarkedPosts,
} from "../../../../hooks/react-query/usePosts";
//redux
import { useSelector } from "react-redux";
//card
import SocialPostCard from "../../../../Components/shared/cards/SocialMediaPosts/SocialPost";
import SocialPostModal from "../../../../Components/shared/Modals/SocialPostModal";

const SocialPosts = () => {
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
  const { category } = useSelector((state) => state.global);
  const { data: posts, isLoading } = usePostsByCategory(category);
  const { data } = useBookmarkedPosts(user._id);
  let bookmarksId = [];
  data?.map((book) => {
    bookmarksId.push(book._id);
  });

  return (
    <div>
      <div className="space-y-2">
        {isLoading ? (
          <p>Loading posts...</p>
        ) : (
          posts?.map((post, index) => (
            <SocialPostCard
              key={post._id}
              post={post}
              bookmarks={bookmarksId}
              posts={posts}
              height={"full"}
              width={"full"}
              type="feed"
              openModal={() => openModal(post)}
            />
          ))
        )}
      </div>
      {/* Render the SocialPostModal conditionally 
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <SocialPostModal
            image={selectedImage}
            closeModal={closeModal}
            post={selectedPost}
          />
        </div>
      )}*/}
    </div>
  );
};

export default SocialPosts;
