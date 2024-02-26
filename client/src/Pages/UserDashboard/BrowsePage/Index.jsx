import React, { useEffect, useState } from "react";
import ContestsHeader from "./components/ContestsHeader";
import { useFindChallenges } from "../../../hooks/react-query/useChallenges";
import Challenges from "./components/Challenges";
import toast from "react-hot-toast";

const Index = () => {
  const [contestQuery, setContestQuery] = useState("");
  const [selectedCategory, setCategoryQuery] = useState([]);
  const [selectedSkill, setSkillQuery] = useState([]);
  //get the url param success 
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get("success");
  const error = urlParams.get("error");
  
  useEffect(() => {
    if (success) {
      toast.success("Payment successful");
    }
    if (error) {
      toast.error("Payment failed");
    }
  }, []);

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
    <div className="md:space-y-6 space-y-10 mx-auto container">
      <ContestsHeader
        setContestQuery={setContestQuery}
        selectedSkill={selectedSkill}
        selectedCategory={selectedCategory}
        setMinAmount={setMinAmount}
        setMaxAmount={setMaxAmount}
        setSkillQuery={setSkillQuery}
        setCategoryQuery={setCategoryQuery}
      />

      <div className="mx-auto container">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-2">
          <div className="lg:col-span-12  col-span-12">
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
