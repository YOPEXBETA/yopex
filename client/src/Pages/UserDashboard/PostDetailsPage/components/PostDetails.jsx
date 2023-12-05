import React from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";

const PostDetails = ({ post }) => {
  return (
    <div>
      <div className="mb-4 md:mb-0 w-full mx-auto relative">
        <div className="px-4 lg:px-0">
          <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
            Pellentesque a consectetur velit, ac molestie ipsum. Donec sodales,
            massa et auctor.
          </h2>
          <a
            href="#"
            className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
          >
            Cryptocurrency
          </a>
        </div>

        <img
          src={post?.postPicturePath}
          className="w-full object-cover md:rounded-xl"
        />
      </div>

      <div className="flex items-center gap-3 mt-6">
        <div className=" xl:px-0 md:px-4">
          {post?.userPicturePath ? (
            <img
              alt="post"
              src={post?.userPicturePath}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover bg-white border-2"
            />
          ) : (
            <img
              alt="default"
              src={AvatarProfile}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover bg-white border-2"
            />
          )}
        </div>
        <div className="flex-col justify-between">
          <Link
            key={post.userId}
            to={
              post?.companyName !== undefined
                ? `/company/${post.userId}`
                : `/profile/${post.userId}`
            }
          >
            <p className="text-sm md:text-md dark:text-white font-medium">
              {post.companyName !== undefined
                ? `${post?.companyName}`
                : `${post?.firstname} ${post?.lastname}`}
            </p>
          </Link>
          <p className="text-sm">
            {formatDistance(new Date(post.createdAt), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <div class="px-4 lg:px-0 mt-6 text-gray-700 text-lg leading-relaxed w-full lg:w-full">
          <p className="pb-6">{post?.description} </p>
        </div>
      </div>

      <div className="border-t mt-12 pt-12 pb-32 px-4 lg:px-0"></div>
    </div>
  );
};

export default PostDetails;