import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../hooks/react-query/useChallenges";
import Banner from "./TopSide/Banner";
import ContentSide from "./leftSide/ContentSide";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import ChallengeNavigationTab from "../../../Components/Tabs/ChallengeNavigtionTab";
import { useSelector } from "react-redux";

const ContestDetails = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };
  const { id: challengeId } = useParams();
  const { data: challenge, isLoading } = useChallengeById(challengeId);

  const { user } = useSelector((state) => state.auth);

  const isOwner = user.companies.find(
    (company) => company === challenge?.company?._id
  )
    ? true
    : challenge?.owner?._id === user._id
    ? true
    : false;

  useEffect(() => {
    if (!challenge) return;
    const registered = challenge.users.find(
      (item) => item?.user?._id === user?._id
    );
    setIsRegistered(registered ? true : false);
  }, [challenge]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (challenge) {
    return (
      <div className="md:space-y-6 mx-auto container">
        <div>
          <Banner value={value} changeValue={changeValue} />
        </div>
        <div>
          <div className="mb-4">
            <ChallengeNavigationTab
              changeValue={changeValue}
              value={value}
              isRegistered={isRegistered}
              challenge={challenge}
              isOwner={isOwner}
            />
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 mb-2">
              <ContentSide
                value={value}
                isOwner={isOwner}
                start={challenge?.start}
                isRegistered={isRegistered}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ContestDetails;
