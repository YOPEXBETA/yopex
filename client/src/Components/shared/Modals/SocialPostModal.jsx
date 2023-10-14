import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";

const SocialPostModal = ({ closeModal, post }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = post.postPicturePath.length;

  const renderPaginationDots = () => {
    const dots = [];
    for (let i = 0; i < pageCount; i++) {
      dots.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-3 h-3 rounded-full ${
            i === currentPage ? "bg-green-500" : "bg-gray-300"
          } mx-1 focus:outline-none`}
        ></button>
      );
    }
    return dots;
  };

  return (
    <div className="min-h-screen flex z-50 justify-center items-center bg-white w-full">
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center overflow-y-auto">
        <div className="max-w-full md:max-w-5xl w-full bg-white rounded-lg h-full p-4">
          {/* Image */}
          <div className="flex  md:flex-row items-start justify-between">
            <div className="flex items-center gap-3">
              {post.userPicturePath ? (
                <img
                  alt="post"
                  src={post.userPicturePath}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover bg-white border-2"
                />
              ) : (
                <img
                  alt="default"
                  src={AvatarProfile}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover bg-white border-2"
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
                  <p className="text-sm md:text-md font-medium">
                    {post.companyName !== undefined
                      ? `${post?.companyName}`
                      : `${post?.firstname} ${post?.lastname}`}
                  </p>
                </Link>
                <p className="text-[12px] md:text-[14px] text-gray-500">
                  {formatDistance(new Date(post.createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          {/* Description */}
          <div className="col-span-1 md:col-span-1 py-6">
            <p className="text-gray-700 text-sm md:text-md">
              {post.description}
            </p>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="mx-auto relative h-full">
              <img
                src={post.postPicturePath[currentPage]}
                alt="Profile"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="flex justify-center mt-3 absolute bottom-4 left-0 w-full z-10">
                {renderPaginationDots()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPostModal;
