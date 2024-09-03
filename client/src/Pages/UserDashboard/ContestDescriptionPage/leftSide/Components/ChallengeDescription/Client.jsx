import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getDeadlineDifference from "../../../../../../utils/deadlineModif";
import SubmitModal from "../../../../../../Components/shared/Modals/SubmitModal";

import { useSelector } from "react-redux";
import {
  useChallengeById,
  useRegisterChallenge,
  useUnregisterChallenge,
  useUserChallenges,
  useUserSubmission,
} from "../../../../../../hooks/react-query/useChallenges";
import { useJoinContestConversation } from "../../../../../../hooks/react-query/useContestConversation";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import Card from "../../../../../../Components/Cards";
import TeamCreationModal from "../../../../../../Components/Modals/TeamCreationModal";
import {useUnjoinTeamChallenge} from "../../../../../../hooks/react-query/useTeamChallenge";

const ClientCard = ({ isRegistered, isOwner, type, challenge }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [team, setTeam] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { data } = useUserChallenges(user);
  const { data: submissions } = useUserSubmission(challenge._id, user);
  const { mutate: unRegisterChallengeMutate, isLoading: isLoadingUnRegister } = useUnregisterChallenge(challenge, user);
  const { mutate: unjoinTeamChallengeMutate } = useUnjoinTeamChallenge();
  const { mutate: registerMutate, isLoading } = useRegisterChallenge(
    challenge,
    user
  );
  const { mutate: join } = useJoinContestConversation();

  useEffect(() => {
    const submitted = submissions;

    if (submitted) setIsSubmitted(true);
  }, [challenge?._id, submissions]);

  useEffect(() => {
    const formatteDate = getDeadlineDifference(challenge?.deadline);
    setDeadline(formatteDate);
  }, [challenge?.deadline]);

  useEffect(() => {
    if (type === 'teamChallenge' && challenge?.teams) {
      const userTeam = challenge?.teams?.find((team) =>
          team?.team?.teamLeader === user?._id || team?.team?.members?.includes(user?._id)
      );
      if (userTeam) {
        setTeam(userTeam);
      }
    }
  }, [challenge?.teams, user._id, type]);

  const toggleModal = () => setModalOpen((prev) => !prev);

  const handleregiser = () => {
    registerMutate();
    join({ contestId: challenge?._id, userId: user._id });
  };
  const toggleTeamModal = () => setTeamModalOpen((prev) => !prev);

  const handleTeamChallengeRegister = () => {
    setTeamModalOpen(true);
  };
  const handleUnregister = () => {
    if (type === 'teamChallenge') {
      unjoinTeamChallengeMutate({ idChallenge: challenge._id, teamId: team?._id });
    } else {
      unRegisterChallengeMutate();
    }
  };
  return (
    <div className="space-y-6">
      <Card>
        <div className="py-6 px-11 flex justify-center">
          <div className="flex flex-col items-center pb-3">
            <div className="flex flex-col items-center">
                <>
                  <h5 className="text-xl text-gray-500 font-medium pb-2">
                    Contest Type
                  </h5>
                  <p className="text-3xl font-bold pb-6 dark:text-white">
                    {type === 'challenge'
                        ? "Individuals Challenge"
                        : "Teams Challenge"}
                  </p>
                </>

            </div>
            <div className="flex flex-col items-center">
              <p className="text-xl text-gray-500 font-medium pb-4">
                Contest ending in
              </p>
              <p className="text-xl font-bold text-black dark:text-white">
                {deadline}
              </p>
            </div>
          </div>
        </div>
      </Card>
      <div>
        {!isOwner &&
        !challenge?.start | (new Date() < new Date(challenge?.deadline)) ? (
          <div className="flex flex-col gap-2">
            {user.role === "user" &&
            deadline !== "0 Days 0 Hours 0 Minutes" &&
            !isSubmitted ? (
              <div className="space-x-1 flex flex-col gap-4">
                {isRegistered ? (
                  <button
                    className={`px-5 py-3 text-white w-full bg-purple-500 h-16 hover:bg-green-600 rounded-full animate-pulse ${
                        isLoadingUnRegister ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleUnregister}
                    disabled={isLoadingUnRegister}
                  >
                    {isLoadingUnRegister ? <LoadingSpinner /> : "Unregister"}
                  </button>
                ) : (
                  <div>
                    {type === 'challenge' ? (
                        challenge?.users?.length < challenge?.nbruser ? (
                            <button
                                onClick={handleregiser}
                                className={`px-5 py-3 rounded-full bg-green-500 h-16 text-white w-full ${
                                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                disabled={isLoading}
                            >
                              {isLoading ? <LoadingSpinner /> : "Register"}
                            </button>
                        ) : null
                    ) : type === 'teamChallenge' ? (
                        challenge?.teams?.length < challenge?.teamSize ? (
                            <button
                                onClick={handleTeamChallengeRegister}
                                className={`px-5 py-3 rounded-full bg-green-500 h-16 text-white w-full ${
                                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                disabled={isLoading}
                            >
                              {isLoading ? <LoadingSpinner /> : "Register"}
                            </button>
                        ) : null
                    ) : null}
                  </div>
                )}
                {challenge?.start && (
                  <button
                    className={`px-5 py-3 rounded-full w-full h-16 ${
                      isRegistered
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 cursor-not-allowed pointer-events-none text-white truncate w-8"
                    }`}
                    disabled={!isRegistered}
                    onClick={toggleModal}
                  >
                    {isRegistered ? "Submit" : "Not Registered"}
                  </button>
                )}
              </div>
            ) : null}
          </div>
        ) : (
          ""
        )}
      </div>

      <SubmitModal
        open={modalOpen}
        handleClose={toggleModal}
        setIsSubmitted={setIsSubmitted}
        isRegistered={isRegistered}
        challenge={challenge}
        type={type}
        team={team}
      />
      <TeamCreationModal
          open={teamModalOpen}
          handleClose={toggleTeamModal}
          challenge={challenge}
      />
    </div>
  );
};

export default ClientCard;
