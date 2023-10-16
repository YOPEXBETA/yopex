import React from "react";

const CategoriesModal = ({
  showIconModal,
  categories,
  selectedCategory,
  handleCategoryClick,
  toggleIconModal,
}) => {
  return (
    showIconModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-lg w-[50rem] overflow-auto h-full lg:h-96 md:h-96">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold dark:text-gray-200 text-black mb-4">
              Choose a Category
            </h2>
            <button
              type="button"
              onClick={toggleIconModal}
              className="text-gray-400 dark:text-gray-200 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((tab) => (
              <div key={tab._id}>
                <button
                  onClick={() => handleCategoryClick(tab.name)}
                  className={`bg-white bg-opacity-10 py-2 text-lg border-2 w-full font-medium text-green-500 hover:bg-opacity-20 focus:outline-none rounded-md transition duration-300 transform hover:scale-105 ${
                    selectedCategory === tab.name
                      ? "text-green-500 border-2 border-green-500"
                      : "text-zinc-300 dark:text-gray-300"
                  }`}
                >
                  {tab.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default CategoriesModal;
