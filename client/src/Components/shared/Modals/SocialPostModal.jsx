import React from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";

const SocialPostModal = ({ closeModal, post }) => {
  return (
    <div className="min-h-screen flex z-50 justify-center items-center bg-black bg-opacity-25 w-full">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg h-[35rem]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="col-span-1 md:col-span-1">
            <img
              src={post.postPicturePath}
              alt="Profile"
              className="w-full h-[35rem] shadow-lg object-cover"
            />
          </div>
          {/* Description */}
          <div className="col-span-1 md:col-span-1 p-8">
            <div className="flex items-start justify-between  mb-8">
              <div className="flex items-center gap-3">
                {post.userPicturePath ? (
                  <img
                    alt="post"
                    src={post.userPicturePath}
                    className="w-11 h-11 rounded-full object-cover bg-white border-2"
                  />
                ) : (
                  <img
                    alt="default"
                    src={AvatarProfile}
                    className="w-11 h-11 rounded-full object-cover bg-white border-2"
                  />
                )}
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
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
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
