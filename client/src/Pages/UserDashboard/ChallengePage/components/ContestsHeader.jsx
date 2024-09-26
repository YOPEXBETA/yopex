import React, { useState } from "react";
import SearchIcon from "../../../../Components/icons/SearchIcon";
import FilterIcon from "../../../../Components/icons/FilterIcon";
import ChallengeFilterModal from "../../../../Components/Modals/ChallengeFilterModal";
import ChallengeFilterPanel from "./ChallengeFilterPanel";
import ChallengeTab from "../ChallengeTab";

const ContestsHeader = ({
  setContestQuery,
  setMinAmount,
  setMaxAmount,
  setSkillQuery,
  setCategoryQuery,
  selectedCategory,
  selectedSkill,
  changeValue, 
  value 
}) => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const toggleFilterPanel = () => setIsFilterPanelOpen((prev) => !prev);
  return (
      <div className="relative"> {/* Added relative positioning here */}
        {/* Render the ChallengeFilterPanel as a dropdown */}
        {isFilterPanelOpen && (
            <ChallengeFilterPanel
                setMinAmount={setMinAmount}
                setMaxAmount={setMaxAmount}
                setSkillQuery={setSkillQuery}
                setCategoryQuery={setCategoryQuery}
                selectedCategory={selectedCategory}
                selectedSkill={selectedSkill}
                handleClose={toggleFilterPanel}
            />
        )}

    <div className="flex justify-between items-center mb-5">
        
        <h5 className="my-5 text-xl text-left dark:text-white">
          Challenges ( )
        </h5>
        {/* Render the ChallengeFilterPanel as a dropdown */}
        {isFilterPanelOpen && (
            <ChallengeFilterPanel
                setMinAmount={setMinAmount}
                setMaxAmount={setMaxAmount}
                setSkillQuery={setSkillQuery}
                setCategoryQuery={setCategoryQuery}
                selectedCategory={selectedCategory}
                selectedSkill={selectedSkill}
                handleClose={toggleFilterPanel}
            />
        )}

          <button
              onClick={toggleFilterPanel}
              type="button"
              className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-black rounded-full border hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-blue-800"
          >
            <FilterIcon/>
            Filters
          </button>
        </div>
      </div>
  );
};

export default ContestsHeader;
