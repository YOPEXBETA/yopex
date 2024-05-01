import React, { useState } from "react";
import Tag from "../../../../Components/tags/Index";
import ChevronRightIcon from "../../../../Components/icons/ChevronRightIcon";
import ChevronLeftIcon from "../../../../Components/icons/ChevronLeftIcon";

const PostDetails = ({ post }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = post.postPicturePath.length;

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageCount - 1));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

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
    <div>
      <div className="mb-4 md:mb-0 w-full mx-auto relative">
        <div className="mx-auto relative">
          <div className="flex items-center">
            <div className="object-cover static">
              <div className="flex items-center object-cover">
                <div className="group relative">
                  <img
                    src={post?.postPicturePath[currentPage]}
                    className="w-full object-cover md:rounded-xl"
                  />
                </div>
              </div>
            </div>
            {pageCount > 1 && (
              <button
                onClick={nextPage}
                disabled={currentPage === pageCount - 1}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white p-2 shadow-md rounded-full"
              >
                <ChevronRightIcon />
              </button>
            )}
            {pageCount > 1 && (
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white p-2 shadow-md rounded-full"
              >
                <ChevronLeftIcon />
              </button>
            )}
          </div>
          {pageCount > 1 && (
            <div className="flex justify-center mt-3 absolute bottom-4 left-0 w-full">
              {renderPaginationDots()}
            </div>
          )}
        </div>
      </div>
      <div className="lg:px-0 px-4">
        <hr className="border-t  lg:px-0" />
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="mt-6 dark:text-white text-md leading-relaxed w-full lg:w-full">
            <p dangerouslySetInnerHTML={{ __html: post?.description }}></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
