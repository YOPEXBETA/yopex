import { useParams } from "react-router-dom";
import {
  useUserPosts,
  useBookmarkedPosts,
} from "../../../../../../hooks/react-query/usePosts";
import SocialPostCard from "../../../../../../Components/shared/cards/SocialMediaPosts/SocialPost";
import { useSelector } from "react-redux";

const MySocialPosts = () => {
  const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const { data: posts, isLoading } = useUserPosts(userId);
  const { data } = useBookmarkedPosts(user._id);
  let bookmarksId = [];
  data?.map((book) => {
    bookmarksId.push(book._id);
    
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        posts?.map((post) => (
          <SocialPostCard key={post._id} post={post} bookmarks={bookmarksId} height={"48"} width={"screen"} />
        ))
      )}
    </div>
  );
};

export default MySocialPosts;
