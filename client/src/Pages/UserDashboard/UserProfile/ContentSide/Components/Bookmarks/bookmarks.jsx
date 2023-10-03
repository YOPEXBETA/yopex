import { useParams } from "react-router-dom";
import { useBookmarkedPosts } from "../../../../../../hooks/react-query/usePosts";
import SocialPostCard from "../../../../../../Components/shared/cards/SocialMediaPosts/SocialPost";

const Bookmarks = () => {
  const { userId } = useParams();
  const { data: posts, isLoading } = useBookmarkedPosts(userId);
  console.log("bookmarks ==>", posts);

  // Create an array of bookmark IDs
  const bookmarksId = posts?.map((book) => book._id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
      {isLoading ? (
        <p>Loading posts...</p>
      ) : bookmarksId.length === 0 ? (
        <p>No Favorites found.</p>
      ) : (
        posts?.map((post) => (
          <SocialPostCard
            className="object-cover"
            height={"48"}
            width={"96"}
            key={post._id}
            post={post}
            bookmarks={bookmarksId}
          />
        ))
      )}
    </div>
  );
};

export default Bookmarks;
