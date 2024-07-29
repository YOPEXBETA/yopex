import React, { useState } from "react";
import JobFilterModal from "../../../../Components/Modals/JobFilterModal";
import FilterIcon from "../../../../Components/icons/FilterIcon";
import SearchIcon from "../../../../Components/icons/SearchIcon";

const JobSearchFilter = ({
  setJobQuery,
  setSkillQuery,
  selectedSkill,
  selectedJobType,
  setSelectedJobType,
  selectedOfferType,
  setSelectedOfferType,
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
              <SearchIcon />
            </div>
            <input
              type="text"
              onChange={(e) => setJobQuery(e.currentTarget.value)}
              className="border rounded-full border-gray-300 block w-full pl-10 p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-green-500"
              placeholder="Search for Job opportunities"
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
        setSkillQuery={setSkillQuery}
        selectedSkill={selectedSkill}
        selectedJobType={selectedJobType}
        setSelectedJobType={setSelectedJobType}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
        setJobQuery={setJobQuery}
        selectedOfferType={selectedOfferType}
        setSelectedOfferType={setSelectedOfferType}
      />
    </div>
  );
};

export default JobSearchFilter;
