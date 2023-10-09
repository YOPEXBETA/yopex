import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserPosts } from "../../../../../../hooks/react-query/usePosts";
import SocialPostCard from "../../../../../../Components/shared/cards/SocialMediaPosts/SocialPost";
import SocialPostModal from "../../../../../../Components/shared/Modals/SocialPostModal";

const MyCompanySocialPosts = () => {
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
  const { companyId } = useParams();
  const { data: posts, isLoading } = useUserPosts(companyId);
  // console.log(companyId, posts);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4  py-5">
        {isLoading ? (
          <p>Loading posts...</p>
        ) : posts?.length ? (
          posts.map((post) => (
            <SocialPostCard
              key={post._id}
              post={post}
              companyId={companyId}
              className="xl:h-48 xl:w-96"
              height={"48"}
              width={"96"}
              openModal={() => openModal(post)}
            />
          ))
        ) : (
          <p>No posts found.</p>
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

export default MyCompanySocialPosts;
