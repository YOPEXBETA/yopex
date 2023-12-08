import React, { useState } from "react";
import JobFilterModal from "../../../../Components/Modals/JobFilterModal";
import FilterIcon from "../../../../Components/icons/FilterIcon";

const JobSearchFilter = ({
  setJobQuery,
  setCategoryQuery,
  setSkillQuery,
  selectedCategory,
  selectedSkill,
}) => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const toggleModal = () => setOpenPostModal((prev) => !prev);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <div className="flex space-x-4">
      <div className="w-full mx-auto">
        <div className="flex items-center">
          <label for="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              onChange={(e) => setJobQuery(e.target.value)}
              className="bg-lightPrimary border rounded-full border-gray-300 block w-full pl-10 p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-green-500"
              placeholder="Search for job opportunities"
            />
          </div>
          <button
            onClick={toggleModal}
            type="button"
            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-black rounded-full border hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-blue-800"
          >
            <FilterIcon />
            Filters
          </button>
        </div>
      </div>
      <JobFilterModal
        open={openPostModal}
        handleClose={toggleModal}
        setCategoryQuery={setCategoryQuery}
        setSkillQuery={setSkillQuery}
        selectedCategory={selectedCategory}
        selectedSkill={selectedSkill}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
      />
    </div>
  );
};

export default JobSearchFilter;
