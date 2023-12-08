import React, { useState } from "react";
import ContestsHeader from "./components/ContestsHeader";
import ContestsFilters from "./components/ContestFilters";
import { useFindChallenges } from "../../../hooks/react-query/useChallenges";
import Challenges from "./components/Challenges";

const Index = () => {
  const [contestQuery, setContestQuery] = useState("");
  const [selectedCategory, setCategoryQuery] = useState([]);
  const [selectedSkill, setSkillQuery] = useState([]);

  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);

  // Data fetching | react-query
  const { data: challenges, isLoading } = useFindChallenges(
    minAmount,
    maxAmount,
    contestQuery,
    selectedSkill,
    selectedCategory
  );

  return (
    <div className="md:space-y-6 space-y-1">
      <ContestsHeader
        setContestQuery={setContestQuery}
        selectedSkill={selectedSkill}
        selectedCategory={selectedCategory}
      />

      <div className="mx-auto container">
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
              challenges={challenges}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
