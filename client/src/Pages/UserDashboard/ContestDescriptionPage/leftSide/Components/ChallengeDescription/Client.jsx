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

const ClientCard = ({isRegistered,isOwner}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(null);
  const [deadline, setDeadline] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const { id: challengeId } = useParams();
  const { data: challenge } = useChallengeById(challengeId);
  const { data } = useUserChallenges(user);
  const { data: submissions } = useUserSubmission(challengeId, user);
  const { mutate: unRegisterMutate, isLoading: isloadingun } =
    useUnregisterChallenge(challenge, user);
  const { mutate: registerMutate, isLoading } = useRegisterChallenge(
    challenge,
    user
  );
  const { mutate: join } = useJoinContestConversation();

  useEffect(() => {
    const submitted = submissions;

    if (submitted) setIsSubmitted(true);
  }, [challenge._id, submissions]);

  useEffect(() => {
    const formatteDate = getDeadlineDifference(challenge.deadline);
    setDeadline(formatteDate);
  }, [challenge.deadline]);

  const toggleModal = () => setModalOpen((prev) => !prev);

  const handleregiser = () => {
    registerMutate();
    join({ contestId: challenge._id, userId: user._id });
  };

  return (
    <Card>
      <div className="py-6 px-11 flex justify-center">
        <div className="flex flex-col items-center pb-3">
          <div className="flex flex-col items-center">
            {challenge.price > 0 ? (
              <>
                <h5 className="text-xl text-zinc-500 font-medium pb-2">
                  Contest Price
                </h5>
                <div className="flex gap-1">
                  <p className="text-3xl font-bold pb-6 dark:text-white">
                    {challenge?.price}
                  </p>
                </div>
              </>
            ) : (
              <>
                <h5 className="text-xl text-zinc-500 font-medium pb-2">
                  Contest Type
                </h5>
                <p className="text-3xl font-bold pb-6 dark:text-white">
                  Recrutement
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl text-zinc-500 font-medium pb-4">
              Contest ending in
            </p>
            <p className="text-xl font-bold text-black dark:text-white">
              {deadline}
            </p>
          </div>
        </div>
      </div>

      {!isOwner && !challenge?.start && (
        <div className="flex flex-col gap-2">
          {user.role === "user" &&
          deadline !== "0 Days 0 Hours 0 Minutes" &&
          !isSubmitted ? (
            <div className="space-x-1 flex flex-col gap-4">
              {isRegistered ? (
                <button
                  className={`px-5 py-3 text-white w-full bg-purple-500 h-16 hover:bg-green-600 rounded-full animate-pulse ${
                    isloadingun ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={unRegisterMutate}
                  disabled={isloadingun}
                >
                  {isloadingun ? <LoadingSpinner /> : "Unregister"}
                </button>
              ) : (
                <div>
                  {challenge.users.length < challenge.nbruser ? (
                    <button
                      onClick={handleregiser}
                      className={`px-5 py-3 rounded-full bg-green-500 h-16 text-white w-full  ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? <LoadingSpinner /> : "Register"}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              )}
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
            </div>
          ) : null}
        </div>
      )}

      <SubmitModal
        open={modalOpen}
        handleClose={toggleModal}
        setIsSubmitted={setIsSubmitted}
        isRegistered={isRegistered}
      />
    </Card>
  );
};

export default ClientCard;
