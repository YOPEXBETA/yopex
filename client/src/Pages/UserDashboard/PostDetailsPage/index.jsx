import React from "react";
import { useParams } from "react-router-dom";
import PostDetails from "./components/PostDetails";
import { usePostById } from "../../../hooks/react-query/usePosts";
import Comments from "./components/Comments";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const Index = () => {
  const { id: postId } = useParams();
  const { data: post, isLoading } = usePostById(postId);

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="mx-auto container">
      <div className="grid grid-cols-12 lg:gap-8 md:gap-2 xl:py-6 py-0">
        <div className="xl:col-span-12 lg:col-span-12 md:col-span-12  col-span-12 xl:space-y-2 lg:space-y-2 md:space-y-2 ">
          <PostDetails post={post} />
        </div>

        {/*<div className="xl:col-span-4 lg:col-span-12 md:col-span-12 col-span-12">
          <div className="w-full sticky top-32">
            <Comments post={post} postId={post?._id} userId={post?.userId} />
          </div>
  </div>*/}
      </div>
    </div>
  );
};

export default Index;
