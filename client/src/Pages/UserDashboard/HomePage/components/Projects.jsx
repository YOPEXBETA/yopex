import { useState } from "react";
import { useSelector } from "react-redux";
import {
  usePostsByCategory,
  useBookmarkedPosts,
} from "../../../../hooks/react-query/usePosts";
import SocialPostCard from "../../../../Components/Cards/SocialPost";
import SocialPostModal from "../../../../Components/shared/Modals/SocialPostModal";
import LoadingSpinner from "../../../../Components/LoadingSpinner";

const Projects = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {isLoading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          posts?.map((post, index) => (
            <div>
              <SocialPostCard
                key={post._id}
                post={post}
                bookmarks={bookmarksId}
                posts={posts}
                height={"48"}
                width={"full"}
                type="feed"
                openModal={() => openModal(post)}
              />
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <SocialPostModal
            image={selectedImage}
            closeModal={closeModal}
            post={selectedPost}
            open={openModal}
          />
        </div>
      )}
    </div>
  );
};

export default Projects;
