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
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Choose a Category
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((tab) => (
              <button
                key={tab._id}
                onClick={() => handleCategoryClick(tab.name)}
                className={`bg-white bg-opacity-10 px-4 py-2 text-lg font-medium text-zinc-300 hover:bg-opacity-20 focus:outline-none rounded-md transition duration-300 transform hover:scale-105 ${
                  selectedCategory === tab.name
                    ? "text-green-500 border-2 border-green-500"
                    : ""
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <button
            onClick={toggleIconModal}
            className="block w-full mt-6 px-4 py-2 text-lg font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none rounded-md transition duration-300 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default CategoriesModal;
