import React from "react";
import DiscoverCompanyCard from "../../../../Components/Cards/DiscoverCompanyCard";
import LoadingSpinner from "../../../../Components/LoadingSpinner";

const DiscoverOrganizations = ({
  suggestedOrganizations,
  isLoading,
  companyQuery,
  setCompanyQuery,
  user,
  handleChangePage, organizationtotalPages, displayedOrganizationPages,
  page,
}) => {
  return (
    <div>
      <h5 className="my-5 text-xl text-left dark:text-white">
        Organizations ({suggestedOrganizations?.companyCount})
      </h5>
      <hr />
      {isLoading ? (
        <div className="text-center mt-4">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3 lg:grid-cols-2">
          {suggestedOrganizations?.organizations?.length > 0 ? (
            suggestedOrganizations?.organizations?.map((option, index) => (
              <DiscoverCompanyCard
                key={index}
                option={option}
                companyQuery={companyQuery}
                user={user}
              />
            ))
          ) : (
            <div className="mt-2">
              <p className="dark:text-white">No company found.</p>
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
                    {Array.from(
                        {length: displayedOrganizationPages},
                        (_, index) => page + index
                    )
                        .filter((pageNumber) => pageNumber <= organizationtotalPages)
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
                    disabled={page === organizationtotalPages}
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

export default DiscoverOrganizations;
