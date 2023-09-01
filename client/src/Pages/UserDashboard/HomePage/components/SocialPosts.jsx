//hooks
import {
  usePostsByCategory,
  useBookmarkedPosts,
} from "../../../../hooks/react-query/usePosts";
//redux
import { useSelector } from "react-redux";
//card
import SocialPostCard from "../../../../Components/shared/cards/SocialMediaPosts/SocialPost";

const SocialPosts = () => {
  const { user } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.global);
  const { data: posts, isLoading } = usePostsByCategory(category);
  console.log(posts);
  const { data } = useBookmarkedPosts(user._id);
  let bookmarksId = [];
  data?.map((book) => {
    bookmarksId.push(book._id);
  });

  return (
    <div className="space-y-2">
      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        posts?.map((post) => (
          <SocialPostCard
            key={post._id}
            post={post}
            bookmarks={bookmarksId}
            posts={posts}
          />
        ))
      )}
    </div>
  );
};

export default SocialPosts;
