import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import DiscoverUserCard from "../../../../Components/Cards/DiscoverUserCard";

const DiscoverTalents = ({
  extra,
  suggestedUsers,
  isLoading,
  query,
  setQuery,
  handleChangePage,
  totalPages,
  displayedPages,
  page,
}) => {
  //const { mutate, isSuccess } = useSetquery();
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h5 className="my-5 text-xl text-left">
        Talents ({suggestedUsers?.userCount})
      </h5>
      <hr />
      {isLoading ? (
        <div className="text-center mt-4">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3 lg:grid-cols-2">
          {suggestedUsers.users.length > 0 ? (
            suggestedUsers?.users?.map((option, index) => (
              <DiscoverUserCard
                key={index}
                option={option}
                user={user}
                query={query}
              />
            ))
          ) : (
            <div className="mt-2">
              <p className="dark:text-white">No talents found.</p>
            </div>
          )}
        </div>
      )}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => handleChangePage(page - 1)}
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          disabled={page === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>Previous</span>
        </button>

        <div className="items-center hidden md:flex gap-x-3">
          {Array.from({ length: displayedPages }, (_, index) => page + index)
            .filter((pageNumber) => pageNumber <= totalPages)
            .map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handleChangePage(pageNumber)}
                className={`px-2 py-1 text-sm rounded-md ${
                  pageNumber === page
                    ? "text-green-500 bg-green-100"
                    : "text-gray-500 dark:hover:bg-zinc-800 dark:text-gray-100 hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            ))}
        </div>

        <button
          onClick={() => handleChangePage(page + 1)}
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          disabled={page === totalPages}
        >
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DiscoverTalents;
