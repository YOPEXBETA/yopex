import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { usePostsByCategory,useBookmarkedPosts } from "../../../../../hooks/react-query/usePosts";
import SocialPostCard from "../../../../../Components/shared/cards/SocialMediaPosts/SocialPost";

const SocialPosts = () => {
  const { user } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.global);
  const { data: posts, isLoading } = usePostsByCategory(category);
  console.log(posts);
  const {data} = useBookmarkedPosts(user._id);
  let bookmarksId=[];
  data?.map((book)=>{
    bookmarksId.push(book._id)
  })
  

  return (
    <Stack spacing={2}>
      {isLoading ? (
        <Typography>Loading posts...</Typography>
      ) : (
        posts?.map((post) => (
          <SocialPostCard key={post._id} post={post} bookmarks={bookmarksId} posts={posts} />
        ))
      )}
    </Stack>
  );
};

export default SocialPosts;
