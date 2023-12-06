import React from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";

const PostDetails = ({ post }) => {
  return (
    <div className="">
      <div className="mb-4 md:mb-0 w-full mx-auto relative">
        <div className="px-4 lg:px-0 flex flex-col space-y-6">
          <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
            {post?.title}
          </h2>

          <div className="flex items-center gap-3">
            <div className=" xl:px-0 md:px-4">
              {post?.userPicturePath ? (
                <img
                  alt="post"
                  src={post?.userPicturePath}
                  className="w-14 h-14 md:w-11 md:h-11 rounded-full object-cover bg-white border-2"
                />
              ) : (
                <img
                  alt="default"
                  src={AvatarProfile}
                  className="w-14 h-14 md:w-11 md:h-11 rounded-full object-cover bg-white border-2"
                />
              )}
            </div>
            <div className="flex-col justify-between">
              <Link
                key={post?.userId}
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
              <p className="text-sm text-zinc-400">
                {formatDistance(new Date(post.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {post?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="block rounded-md bg-primary/[0.08] py-[5px] px-[14px] text-base text-dark dark:text-white hover:bg-primary hover:text-white"
                >
                  {skill?.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <hr className="border-t  my-4 lg:px-0" />

        <img
          src={post?.postPicturePath}
          className="w-full object-cover md:rounded-xl"
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <div className="px-4 lg:px-0 mt-6 text-gray-700 text-lg leading-relaxed w-full lg:w-full">
          <p
            className="pb-6"
            dangerouslySetInnerHTML={{ __html: post?.description }}
          ></p>
        </div>
      </div>
      <hr className="border-t  my-4 lg:px-0" />
    </div>
  );
};

export default PostDetails;
