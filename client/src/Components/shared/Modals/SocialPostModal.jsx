import React from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

const SocialPostModal = ({ closeModal, post }) => {
  return (
    <div className="min-h-screen flex z-50 justify-center items-center bg-black bg-opacity-25 w-full">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg h-[35rem]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="col-span-1 md:col-span-1">
            <img
              src={post.postPicturePath}
              alt="Your Image"
              className="w-full h-[35rem] shadow-lg object-cover"
            />
          </div>
          {/* Description */}
          <div className="col-span-1 md:col-span-1 p-8">
            <div className="flex items-start justify-between  mb-8">
              <div className="flex items-center gap-3">
                <img
                  alt="post"
                  src={post.userPicturePath}
                  className=" w-11 h-11 rounded-full object-cover bg-white"
                />
                <div>
                  <Link
                    key={post.userId}
                    to={
                      post?.companyName !== undefined
                        ? `/company/${post.userId}`
                        : `/profile/${post.userId}`
                    }
                    style={{ textDecoration: "none", color: "#000000" }}
                  >
                    <p className="text-md font-medium ">
                      {post.companyName !== undefined
                        ? `${post?.companyName}`
                        : `${post?.firstname} ${post?.lastname}`}
                    </p>
                  </Link>
                  <p className=" text-[14px]  text-gray-500">
                    {formatDistance(new Date(post.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg"
                onClick={closeModal}
              >
                x
              </button>
            </div>
            <p className="text-gray-700 text-md">{post.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPostModal;
