import React, { useState } from "react";

import BrowseNavigationTab from "../Content/BrowseNavigationTabs/BrowseNavigationTab";
import JobFilterModal from "../../../../Components/Modals/JobFilterModal";

const BrowseJobsHeader = ({
  changeValue,
  value,
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
    <div className="h-56 px-6 flex flex-col justify-end dark:bg-zinc-900 border-b from-black w-full to-purple-900 bg-gradient-to-tr rounded-lg">
      <div className="space-y-2 items-start mx-auto container">
        <div>
          <h4 class=" max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
            Browse Jobs
          </h4>
          <p class="mb-4 max-w-full text-base font-medium text-zinc-400 md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
            Apply to job opportunities and advance your career
          </p>
        </div>
        <div className="flex space-x-2 ">
          <input
            type="text"
            placeholder="Search for Jobs"
            className=" w-full py-2 px-3 outline-none rounded border dark:bg-zinc-700 border-white text-white bg-black hover:border-green-500"
            onChange={(e) => setJobQuery(e.target.value)}
          />

          <div>
            <button
              onClick={toggleModal}
              className="py-2 px-4 outline-none rounded border border-white text-white dark:bg-zinc-700 bg-black hover:border-green-500"
            >
              Filters
            </button>
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
        <BrowseNavigationTab value={value} changeValue={changeValue} />
      </div>
    </div>
  );
};

export default BrowseJobsHeader;
