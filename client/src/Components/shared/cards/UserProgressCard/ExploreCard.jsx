import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory } from "../../../../redux/global/globalSlice";
import { useCategories } from "../../../../hooks/react-query/useCategories";
import { FaChevronDown } from "react-icons/fa";
import CategoriesModal from "../../Modals/CategoriesModal";

const ExploreCard = () => {
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

  return (
    <div className="w-full sticky top-24 z-10">
      <div className="w-full rounded-lg bg-white p-3 divide-y divide-gray-200 overflow-y-auto dark:bg-zinc-800 dark:border">
        <div aria-label="navigation" className="py-2">
          <h2 className="text-2xl font-bold mb-4 px-4 dark:text-white">
            Explore
          </h2>
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

      <CategoriesModal
        showIconModal={showIconModal}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
        toggleIconModal={toggleIconModal}
      />
    </div>
  );
};

export default ExploreCard;
