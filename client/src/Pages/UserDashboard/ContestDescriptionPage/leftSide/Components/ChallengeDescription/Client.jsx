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

const ClientCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
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

  useEffect(() => {
    if (!data) return;
    console.log("data", data.challenges);
    const registered = data.challenges.find(
      (item) => item._id === challenge._id
    );
    setIsRegistered(registered ? true : false);
  }, [challenge, data]);

  const handleregiser = () => {
    registerMutate();
    join({ contestId: challenge._id, userId: user._id });
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-zinc-200 rounded-xl py-4 px-11 flex justify-center ">
        {/*<div className="space-y-3">
        <div className="space-y-4">
          <h4 className="text-xl font-bold">About the client</h4>
          <hr className="border-t border-gray-200" />
        </div>
        <div className="flex flex-row space-x-4 items-center">
          <img
            src={challenge?.company.companyLogo}
            alt="Client Logo"
            className="bg-secondary w-12 h-12 rounded-lg object-cover"
          />
          <div className="space-y-1">
            <div className="flex flex-row items-center space-x-1">
              <h5 className="text-lg font-md">
                {challenge?.company.companyName}
              </h5>
            </div>
          </div>
        </div>
  </div>*/}
        <div className="flex flex-col items-center pb-3">
          <div className="flex flex-col items-center">
            <h5 className="text-lg text-gray-400 pb-2">Contest Prize</h5>
            <p className="text-3xl font-bold pb-6">{challenge.price}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg text-gray-400 pb-3">Contest ending in</p>
            <p className="text-xl font-bold text-black">{deadline}</p>
          </div>
        </div>
      </div>

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

      <SubmitModal
        open={modalOpen}
        handleClose={toggleModal}
        setIsSubmitted={setIsSubmitted}
        isRegistered={isRegistered}
      />
    </div>
  );
};

export default ClientCard;
