import React, {useEffect, useState} from "react";
import {
  useChallengeById,
  useGetChallengeSubmissions,
} from "../../../../../../hooks/react-query/useChallenges";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import { useParams } from "react-router-dom";
import SubmissionCard from "./submissionCard";
import {useGetTeamChallengeSubmissions} from "../../../../../../hooks/react-query/useTeamChallenge";
import {useSelector} from "react-redux";
import TeamSubmissionCard from "./teamSubmissionCard";

const Submission = ({ isOwner, challenge, type }) => {
  const [team, setTeam] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const { data: challengeSubmissions, isLoading } = useGetChallengeSubmissions(challenge._id, type);
  const { data: teamChallengeSubmissions, isTeamLoading } = useGetTeamChallengeSubmissions(challenge._id, type);
  const submissions = type === "challenge" ? challengeSubmissions : teamChallengeSubmissions;

  useEffect(() => {
    if (type === 'teamChallenge' && challenge?.teams) {
      const userTeam = challenge.teams.find(
          (teamEntry) => teamEntry.team.teamLeader.toString() === user._id.toString()
      );
      if (userTeam) {
        setTeam(userTeam);
      }
    }
  }, [challenge?.teams, user._id, type]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 gap-4">
      {isLoading || isTeamLoading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : submissions?.length > 0 ? (
          submissions?.map((item) => (
              type === "challenge" ? (
                  <SubmissionCard
                      key={item?._id}
                      item={item}
                      isOwner={isOwner}
                      user={item?.userId}
                      challenge={challenge}
                  />
              ) : (
                  <TeamSubmissionCard
                      key={item?._id}
                      item={item}
                      isOwner={isOwner}
                      challenge={challenge}
                      team={team}
                  />
              )
          ))
      ) : (
        <p className="dark:text-white text-lg">No Submission found</p>
      )}
    </div>
  );
};

export default Submission;
