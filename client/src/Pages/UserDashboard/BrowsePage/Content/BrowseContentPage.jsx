import React, { useState } from "react";
import ContestsFilters from "./ContestCards/ContestFilters";
import Jobs from "./JobCards/Jobs";
import Challenges from "./ContestCards/Challenges";

const BrowseContentPage = ({
  value,
  contestQuery,
  jobQuery,
  setCategoryQuery,
  setSkillQuery,
  selectedCategory,
  selectedSkill,
}) => {
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);

  return (
    <div className=" space-y-6 ">
      <div spacing={2}>
        {value === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-12 gap-2">
            <div className="lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12 md:pr-8 pb-4">
              <ContestsFilters
                setMinAmount={setMinAmount}
                setMaxAmount={setMaxAmount}
                selectedSkill={selectedSkill}
                selectedCategory={selectedCategory}
                setSkillQuery={setSkillQuery}
                setCategoryQuery={setCategoryQuery}
              />
            </div>

            <div className="lg:col-span-9 md:col-span-9 col-span-12">
              <Challenges
                minAmount={minAmount}
                maxAmount={maxAmount}
                searchQuery={contestQuery}
                selectedSkill={selectedSkill}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        )}

        {value === 1 && (
          <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
            <Jobs
              jobQuery={jobQuery}
              selectedCategory={selectedCategory}
              selectedSkill={selectedSkill}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseContentPage;
