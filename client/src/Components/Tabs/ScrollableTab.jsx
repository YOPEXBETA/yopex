import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory } from "../../redux/global/globalSlice";
import { useCategories } from "../../hooks/react-query/useCategories";
import { BsThreeDots } from "react-icons/bs"; // Import the 3 dots icon
import CategoriesModal from "../shared/Modals/CategoriesModal";

export default function ScrollableTabs() {
  const { category: selectedCategory } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const { data: categories } = useCategories();

  const handleChange = (_, newValue) => dispatch(changeCategory(newValue));

  const [showModal, setShowModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleIconModal = () => {
    setShowIconModal(!showIconModal);
  };

  const handleCategoryClick = (newValue) => {
    dispatch(changeCategory(newValue));
    toggleModal();
  };

  if (categories)
    return (
      <div className="w-full">
        <div className="p-4 bg-white divide-gray-100 overflow-hidden border rounded-lg dark:bg-zinc-800 dark:border-zinc-500 dark:border text-gray-600  sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
          <div className="border-b border-gray-200 mb-4">
            <div>
              <nav className="flex">
                <button
                  onClick={() => handleChange(null, "")}
                  className={`px-4 py-2 text-sm font-medium ${
                    selectedCategory === ""
                      ? "text-green-500 border-green-500"
                      : "text-gray-500 dark:text-gray-300"
                  } border-b-2 focus:outline-none`}
                >
                  All
                </button>
                {categories.slice(0, 3).map((tab) => (
                  <button
                    key={tab._id}
                    onClick={() => handleCategoryClick(tab.name)}
                    className={`px-4 py-2 text-sm font-medium truncate w-48 ${
                      selectedCategory === tab.name
                        ? "text-green-600 border-green-500"
                        : "text-gray-500 dark:text-gray-300"
                    } border-b-2 focus:outline-none`}
                  >
                    {tab.name}
                  </button>
                ))}
                <button
                  onClick={toggleIconModal}
                  className={`px-4 py-2 text-sm font-medium text-gray-500 border-b-2 focus:outline-none ${
                    "md:grid-cols-2 xl:grid-cols-4" // Responsive classes
                  }`}
                >
                  <BsThreeDots className="dark:text-gray-200" />
                </button>
              </nav>
            </div>
          </div>
        </div>
        <CategoriesModal
          showIconModal={showIconModal}
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryClick={handleCategoryClick}
          toggleIconModal={toggleIconModal}
        />
      </div>
    );
}
