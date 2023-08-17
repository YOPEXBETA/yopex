import { useParams } from "react-router-dom";
import { useUserPosts } from "../../../../../../hooks/react-query/usePosts";
import SocialPostCard from "../../../../../../Components/shared/cards/SocialMediaPosts/SocialPost";

const MySocialPosts = () => {
  const { userId } = useParams();
  const { data: posts, isLoading } = useUserPosts(userId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        posts?.map((post) => <SocialPostCard key={post._id} post={post}  />)
      )}
    </div>
  );
};

export default MySocialPosts;
