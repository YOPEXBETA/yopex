import { useParams } from "react-router-dom";
import { useUserPosts } from "../../../../../../hooks/react-query/usePosts";
import SocialPostCard from "../../../../../../Components/shared/cards/SocialMediaPosts/SocialPost";

const MyCompanySocialPosts = () => {
  const { companyId } = useParams();
  const { data: posts, isLoading } = useUserPosts(companyId);
  console.log(companyId, posts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4  py-5">
      {isLoading ? (
        <p>Loading posts...</p>
      ) : posts?.length ? (
        posts.map((post) => (
          <SocialPostCard
            key={post._id}
            post={post}
            companyId={companyId}
            height={"72"}
            width={"screen"}
          />
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default MyCompanySocialPosts;
