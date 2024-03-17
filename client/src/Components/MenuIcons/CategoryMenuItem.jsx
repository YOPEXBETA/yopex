import React, { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import EditIcon from "../icons/EditIcon";
import { useDeleteCategory } from "../../../src/hooks/react-query/useCategories";
import EditCategoryModal from "../Modals/EditCategoryModal";

const CategoryMenuItem = ({ category }) => {
  const { mutate: deleteCategory } = useDeleteCategory();

  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  return (
    <div>
      <ul className="absolute right-0 z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white dark:bg-zinc-700 p-2 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
        <li
          onClick={() => deleteCategory(category._id)}
          role="menuitem"
          className="block w-full hover:bg-gray-300 cursor-pointer select-none rounded-md px-3 pt-2 pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        >
          <div className="flex items-center gap-2">
            <TrashIcon />
            <p className="font-medium">Delete Category</p>
          </div>
        </li>

        <li
          onClick={handleEditClick}
          role="menuitem"
          className="block w-full cursor-pointer hover:bg-gray-300 select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        >
          <div className="flex items-center gap-2">
            <EditIcon />
            <p className="font-medium">Edit Category</p>
          </div>
        </li>
      </ul>

      {/* Render the modal conditionally */}
      {showEditModal && (
        <EditCategoryModal
          onClose={handleCloseModal}
          initialValue={category?.name}
          category={category}
        />
      )}
    </div>
  );
};

export default CategoryMenuItem;