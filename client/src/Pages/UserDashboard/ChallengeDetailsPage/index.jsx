import React, { useEffect, useState } from "react";
import {useLocation, useParams} from "react-router-dom";
import { useChallengeById } from "../../../hooks/react-query/useChallenges";
import Banner from "./TopSide/Banner";
import ContentSide from "./leftSide/ContentSide";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import ChallengeNavigationTab from "../../../Components/Tabs/ChallengeNavigtionTab";
import { useSelector } from "react-redux";
import {useTeamChallengeById} from "../../../hooks/react-query/useTeamChallenge";

const ContestDetails = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [team, setTeam] = useState(null);
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };


  const { id: challengeId} = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const entityType = queryParams.get("type");

  const { data: challengeData, isLoading: isChallengeLoading } = useChallengeById(challengeId, entityType);
  const { data: teamChallengeData, isLoading: isTeamChallengeLoading } = useTeamChallengeById(challengeId, entityType);

  const challenge = entityType === "challenge" ? challengeData : teamChallengeData;
  const loading = entityType === "challenge" ? isChallengeLoading : isTeamChallengeLoading;
  const { user } = useSelector((state) => state.auth);
  const isOwner = user?.organizations?.find(
    (organization) => organization === challenge?.organization?._id
  )
    ? true
    : challenge?.owner?._id === user?._id;

  useEffect(() => {
    if (!challenge) return;

    if (entityType === "challenge") {
      const registered = challenge?.users?.find(
          (item) => item?.user?._id === user?._id
      );
      setIsRegistered(!!registered);
    }

    if (entityType === "teamChallenge") {
      const isTeamMemberOrLeader = challenge?.teams?.find((team) =>
          team?.team?.teamLeader === user?._id || team?.team?.members?.includes(user?._id)
      );
      setIsRegistered(!!isTeamMemberOrLeader);
      if (isTeamMemberOrLeader) {
        setTeam(isTeamMemberOrLeader);
      }
    }
  }, [challenge, entityType, user]);

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
                team={team}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ContestDetails;
