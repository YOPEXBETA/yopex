import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";

const SocialPostModal = ({ open, closeModal, post }) => {
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
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg max-w-[50rem] w-full max-h-[40rem] overflow-y-auto border">
        <div className="max-w-full  w-full dark:bg-zinc-800 rounded-lg h-full mb-6">
          {/* Image */}
          <div className="flex  md:flex-row items-start">
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
              <div className="flex-col justify-between">
                <Link
                  key={post.userId}
                  to={
                    post?.companyName !== undefined
                      ? `/company/${post.userId}`
                      : `/profile/${post.userId}`
                  }
                  style={{ textDecoration: "none", color: "#000000" }}
                >
                  <p className="text-sm md:text-md dark:text-white font-medium">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="col-span-1 md:col-span-1">
          <div className="mx-auto relative">
            <img
              src={post.postPicturePath[currentPage]}
              alt="Profile"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="flex justify-center mt-3 absolute bottom-4 left-0 w-full z-10">
              {renderPaginationDots()}
            </div>
          </div>
        </div>{" "}
        <div>
          {/* Description */}
          <div className="col-span-1 md:col-span-1 pt-6">
            <div className="mb-4" style={{ whiteSpace: "pre-line" }}>
              <div
                className="text-md dark:text-white"
                dangerouslySetInnerHTML={{ __html: post?.description }}
              />
            </div>
          </div>
          <div className="my-4">
            <h2 className="dark:text-white mb-4 text-xl font-bold">
              Categories
            </h2>
            <div className="flex flex-row flex-wrap space-x-2 md:space-x-2 space-y-0 md:space-y-0 w-full">
              {post.categories &&
                Array?.isArray(post?.categories) &&
                post?.categories?.map((cat, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 dark:text-white  text-md border-2 border-gray-300 rounded-full"
                  >
                    {cat.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPostModal;
