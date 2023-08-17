import { useParams } from "react-router-dom";
import { useBookmarkedPosts } from "../../../../../../hooks/react-query/usePosts";
import SocialPostCard from "../../../../../../Components/shared/cards/SocialMediaPosts/SocialPost";

const Bookmarks = () => {
  const { userId } = useParams();
  const { data: posts, isLoading } = useBookmarkedPosts(userId);
  console.log("bookmarks ==>",posts);
  let bookmarksId=[];
  posts?.map((book)=>{
    bookmarksId.push(book._id)
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        posts?.map((post) => <SocialPostCard key={post._id} post={post} bookmarks={bookmarksId}  />)
      )}
    </div>
  );
};

export default Bookmarks;
