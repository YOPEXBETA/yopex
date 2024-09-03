import React, { useEffect, useState } from "react";
import ContestsHeader from "./components/ContestsHeader";
import { useFindChallenges } from "../../../hooks/react-query/useChallenges";
import Challenges from "./components/Challenges";
import toast from "react-hot-toast";
import ChallengeTab from "./ChallengeTab";
import {useFindTeamChallenges} from "../../../hooks/react-query/useTeamChallenge";
import TeamChallenges from "./components/TeamChallenges";
import useDebounce from "../../../hooks/useDebounce";

const Index = () => {
  const [value, setValue] = useState(0);
  const [contestQuery, setContestQuery] = useState("");
  const [selectedCategory, setCategoryQuery] = useState([]);
  const [selectedSkill, setSkillQuery] = useState([]);
  //get the url param success
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get("success");
  const error = urlParams.get("error");
  const changeValue = (newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (success) {
      toast.success("Payment successful");
    }
    if (error) {
      toast.error("Payment failed");
    }
  }, [success, error]);

  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);


  const debouncedChallengeQuery = useDebounce(contestQuery, 500);

  const { data: challenges, isLoading } = useFindChallenges(
    minAmount,
    maxAmount,
      debouncedChallengeQuery,
    selectedSkill,
    selectedCategory
  );
  const { data: teamChallenges, isTeamLoading } = useFindTeamChallenges(
      minAmount,
      maxAmount,
      debouncedChallengeQuery,
      selectedSkill,
      selectedCategory
  );
  return (
      <div className="mx-auto container">
        <div className="col-span-12 lg:col-span-12 md:col-span-12 mt-4 mb-2 md:mt-0">
          <ChallengeTab
              changeValue={changeValue}
              value={value}
          />
        </div>
        {value === 0 && (
        <div className="flex flex-col gap-6">
          <ContestsHeader
              setContestQuery={setContestQuery}
              selectedSkill={selectedSkill}
              selectedCategory={selectedCategory}
              setMinAmount={setMinAmount}
              setMaxAmount={setMaxAmount}
              setSkillQuery={setSkillQuery}
              setCategoryQuery={setCategoryQuery}
          />
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
            )}
        {value === 1 && (
            <div className="flex flex-col gap-6">
              <ContestsHeader
                  setContestQuery={setContestQuery}
                  selectedSkill={selectedSkill}
                  selectedCategory={selectedCategory}
                  setMinAmount={setMinAmount}
                  setMaxAmount={setMaxAmount}
                  setSkillQuery={setSkillQuery}
                  setCategoryQuery={setCategoryQuery}
              />
              <div className="grid grid-cols-2 md:grid-cols-12 gap-2">
                <div className="lg:col-span-12  col-span-12">
                  <TeamChallenges
                      minAmount={minAmount}
                      maxAmount={maxAmount}
                      searchQuery={contestQuery}
                      selectedSkill={selectedSkill}
                      selectedCategory={selectedCategory}
                      teamChallenges={teamChallenges}
                      isLoading={isTeamLoading}
                  />
                </div>
              </div>
            </div>
        )}
      </div>
        );
        };

        export default Index;
