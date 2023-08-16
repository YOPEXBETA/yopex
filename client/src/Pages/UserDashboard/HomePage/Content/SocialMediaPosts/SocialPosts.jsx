import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { usePostsByCategory } from "../../../../../hooks/react-query/usePosts";
import SocialPostCard from "../../../../../Components/shared/cards/SocialMediaPosts/SocialPost";

const SocialPosts = () => {
  const { category } = useSelector((state) => state.global);
  const { data: posts, isLoading } = usePostsByCategory(category);
  console.log(posts);
  return (
    <Stack spacing={2}>
      {isLoading ? (
        <Typography>Loading posts...</Typography>
      ) : (
        posts?.map((post) => (
          <SocialPostCard key={post._id} post={post} posts={posts} />
        ))
      )}
    </Stack>
  );
};

export default SocialPosts;
