import { useState } from "react";
import PlusIcon from "../../icons/PlusIcon";

const SidebarCard = ({ isRouteWithSpecificWidth, handleCreateClick }) => {
  return (
    <div>
      <div>
        {isRouteWithSpecificWidth ? (
          <button
            onClick={handleCreateClick}
            type="button"
            className="text-white bg-gradient-to-br from-[#868CFF] via-[#432CF3] to-brand-500 focus:ring-4 focus:outline-none  hover:bg-gradient-to-b font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
          >
            <PlusIcon />
            <span className="sr-only">Create</span>
          </button>
        ) : (
          <button
            onClick={handleCreateClick}
            className="text-medium mt-7 block w-[256px] rounded-full bg-gradient-to-br from-[#868CFF] via-[#432CF3] to-brand-500 py-[12px] px-11 text-center text-base text-white hover:bg-gradient-to-b"
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
};

export default SidebarCard;
