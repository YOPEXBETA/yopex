import React, { useState } from "react";
import JobFilterModal from "../../../../Components/Modals/JobFilterModal";

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
    <div className="flex space-x-4 ">
      <input
        type="text"
        placeholder="Search for Jobs"
        className="py-3 px-3 outline-none border-2 bg-lightPrimary dark:bg-zinc-800 dark:text-white rounded-full  hover:border-green-500 w-full"
        onChange={(e) => setJobQuery(e.target.value)}
      />

      <button
        onClick={toggleModal}
        className="py-3 px-4 outline-none border border-white text-white dark:bg-zinc-700 bg-zinc-800 rounded-full hover:border-green-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>
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
