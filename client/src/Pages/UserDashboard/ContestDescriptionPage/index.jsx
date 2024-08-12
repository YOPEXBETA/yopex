import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../hooks/react-query/useChallenges";
import Banner from "./TopSide/Banner";
import ContentSide from "./leftSide/ContentSide";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import ChallengeNavigationTab from "../../../Components/Tabs/ChallengeNavigtionTab";
import { useSelector } from "react-redux";
import {useTeamChallengeById} from "../../../hooks/react-query/useTeamChallenge";

const ContestDetails = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };
  const [entityType, setEntityType] = useState(null); // Track the type of entity
  const [challenge, setChallenge] = useState(null); // Track the current challenge data
  const [loading, setLoading] = useState(true); // Track loading state


  const { id: challengeId } = useParams();
  const { data: challengeData, isLoading: isChallengeLoading } = useChallengeById(challengeId);
  const { data: teamChallengeData, isLoading: isTeamChallengeLoading } = useTeamChallengeById(challengeId);
  useEffect(() => {
    if (challengeData) {
      setEntityType('challenge');
      setChallenge(challengeData);
      setLoading(false);
    } else if (teamChallengeData) {
      setEntityType('teamChallenge');
      setChallenge(teamChallengeData);
      setLoading(false);
    }
  }, [challengeData, teamChallengeData]);

  const { user } = useSelector((state) => state.auth);
  const isOwner = user?.organizations?.find(
    (organization) => organization === challenge?.organization?._id
  )
    ? true
    : challenge?.owner?._id === user?._id;

  useEffect(() => {
    if (!challenge) return;
    const registered = challenge?.users?.find(
      (item) => item?.user?._id === user?._id
    );
    setIsRegistered(registered ? true : false);
  }, [challenge]);

  if (loading) {
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
          <Banner value={value} changeValue={changeValue} type={entityType}/>
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
                type={entityType}
                challenge={challenge}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ContestDetails;
