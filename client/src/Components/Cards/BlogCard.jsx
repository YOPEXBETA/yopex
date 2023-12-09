import React from "react";
import Card from ".";

const BlogCard = ({
  post,
  bookmarks,
  companyId,
  height,
  width,
  type = "profile",
  openModal,
  extra,
}) => {
  return (
    <Card>
      <div className="lg:flex">
        <img
          className="object-cover  h-56 rounded-lg lg:w-64"
          src={post.postPicturePath}
          alt={post.title}
        />

        <div className="flex flex-col justify-between w-full py-6 lg:mx-6">
          <a
            href="#"
            className="text-xl font-semibold text-gray-800 hover:underline dark:text-white"
          >
            {post.title}
          </a>

          <span className="text-sm text-gray-500 dark:text-gray-300">
            On: {post.date}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
