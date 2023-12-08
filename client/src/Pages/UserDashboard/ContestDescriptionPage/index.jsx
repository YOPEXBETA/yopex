import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../hooks/react-query/useChallenges";
import Banner from "./TopSide/Banner";
import ContentSide from "./leftSide/ContentSide";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import ChallengeNavigationTab from "../../../Components/Tabs/ChallengeNavigtionTab";

const ContestDetails = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };
  const { id: challengeId } = useParams();
  const { data: challenge, isLoading } = useChallengeById(challengeId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (challenge) {
    return (
      <div className="md:space-y-6">
        <div>
          <Banner value={value} changeValue={changeValue} />
        </div>
        <div>
          <div className="mb-4">
            <ChallengeNavigationTab
              changeValue={changeValue}
              value={value}
              isRegistered={isRegistered}
            />
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 mb-2">
              <ContentSide value={value} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ContestDetails;
