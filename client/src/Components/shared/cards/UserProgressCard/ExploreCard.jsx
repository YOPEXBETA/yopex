import React from "react";
import { FaChevronDown } from "react-icons/fa";

const ExploreCard = ({
  toggleIconModal,
  categories,
  handleCategoryClick,
  selectedCategory,
  handleChange,
}) => {
  return (
    <div className="w-full rounded-lg bg-white p-3 divide-y divide-gray-200 overflow-y-auto dark:bg-zinc-800 dark:border">
      <div aria-label="navigation" className="py-2">
        <div className="flex items-center gap-2 mb-4 px-2">
          <h2 className="text-2xl font-bold dark:text-white">Explore</h2>
        </div>
        <nav className="grid gap-1">
          <button
            onClick={() => handleChange(null, "")}
            className={`flex items-center leading-6 gap-3 py-3 px-4 w-full text-lg focus:outline-none ${
              selectedCategory === "" ? "text-green-500" : "text-gray-600"
            }`}
          >
            <span>All</span>
          </button>
          {categories?.map((link, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(link.name)}
              className={`flex items-center leading-6 gap-3 py-3 px-4 w-full text-lg focus:outline-none ${
                selectedCategory === link.name
                  ? "text-green-500"
                  : "text-gray-600"
              }`}
            >
              <span>{link?.name}</span>
            </button>
          ))}
          <button
            onClick={toggleIconModal}
            className={`flex items-center leading-6 gap-3 py-3 px-4 w-full text-lg focus:outline-none`}
          >
            <FaChevronDown className="text-green-500" />
            <h5 className="text-green-500">See All</h5>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ExploreCard;
