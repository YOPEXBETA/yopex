import React, { useState } from "react";
import ExploreCard from "../../../../Components/shared/cards/UserProgressCard/ExploreCard";
import CategoriesModal from "../../../../Components/shared/Modals/CategoriesModal";
import { useCategories } from "../../../../hooks/react-query/useCategories";
import { changeCategory } from "../../../../redux/global/globalSlice";
import { useDispatch, useSelector } from "react-redux";

const ExploreSection = () => {
  const dispatch = useDispatch();
  const { data: categories } = useCategories();
  const { category: selectedCategory } = useSelector((state) => state.global);

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

  const handleChange = (_, newValue) => dispatch(changeCategory(newValue));

  return (
    <div className="w-full sticky top-24 z-30">
      <div>
        <ExploreCard
          toggleModal={toggleModal}
          toggleIconModal={toggleIconModal}
          categories={categories}
          handleChange={handleChange}
          selectedCategory={selectedCategory}
          handleCategoryClick={handleCategoryClick}
        />
      </div>

      <CategoriesModal
        showIconModal={showIconModal}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
        toggleIconModal={toggleIconModal}
        showModal={showModal}
      />
    </div>
  );
};

export default ExploreSection;
