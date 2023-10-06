import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory } from "../../redux/global/globalSlice";
import { useCategories } from "../../hooks/react-query/useCategories";
import { BsThreeDots } from "react-icons/bs"; // Import the 3 dots icon
import CategoriesModal from "../shared/Modals/CategoriesModal";

const categoriesToShow = 4; // Number of categories to show initially

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
        <div className="bg-white shadow-md p-4 rounded-lg border-green-500 border-b-2">
          <div className="border-b border-gray-200 mb-4">
            <div>
              <nav className="flex">
                <button
                  onClick={() => handleChange(null, "")}
                  className={`px-4 py-2 text-sm font-medium ${
                    selectedCategory === ""
                      ? "text-green-500 border-green-500"
                      : "text-gray-500"
                  } border-b-2 focus:outline-none`}
                >
                  All
                </button>
                {categories.slice(0, categoriesToShow).map((tab) => (
                  <button
                    key={tab._id}
                    onClick={() => handleCategoryClick(tab.name)}
                    className={`px-4 py-2 text-sm font-medium ${
                      selectedCategory === tab.name
                        ? "text-green-600 border-green-500"
                        : "text-gray-500"
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
                  <BsThreeDots />
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
