import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useChallengeById,
  useRegisterChallenge,
  useUnregisterChallenge,
  useUserChallenges,
  useUserSubmission,
} from "../../../../hooks/react-query/useChallenges";
import getDeadlineDifference from "../../../../utils/deadlineModif";
import SubmitModal from "../../../../Components/shared/Modals/SubmitModal";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import ChallengeNavigationTab from "../../../../Components/Tabs/ChallengeNavigtionTab";
import { useJoinContestConversation } from "../../../../hooks/react-query/useContestConversation";

const Banner = ({ changeValue, value }) => {
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
  const {mutate:join} = useJoinContestConversation()

  useEffect(() => {
    const submitted = submissions?.find(
      (item) => item.challengeId === challenge._id
    );

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
    join({contestId:challenge._id,userId:user._id})
    
  }

  return (
    <div className="pt-8 px-6 lg:px-8 xl:px-32 flex flex-col justify-end bg-black">
      <div className="space-y-8 items-start" key={challenge._id}>
        <div className="grid grid-cols-12 mb-11">
          <div className="lg:col-span-8 md:col-span-8 sm:col-span-8 col-span-12">
            <h3 className="text-2xl text-white truncate w-96">
              {challenge.title}
            </h3>
          </div>
          <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12 lg:flex lg:justify-end">
            {user.role === "user" &&
            deadline !== "0 Days 0 Hours 0 Minutes" &&
            !isSubmitted ? (
              <div className="space-x-1 flex">
                {isRegistered ? (
                  <button
                    className={`px-5 py-3 text-white w-full bg-purple-500 hover:bg-green-600 rounded-full animate-pulse ${
                      isloadingun ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={unRegisterMutate}
                    disabled={isloadingun}
                  >
                    {isloadingun ? <LoadingSpinner /> : "Unregister"}
                  </button>
                ) : (
                  <div>
                  { (challenge.users.length < challenge.nbruser )? (<button
                    onClick={handleregiser}
                    className={`px-5 py-3 rounded-full bg-green-500 text-white w-full animate-bounce ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? <LoadingSpinner /> : "Register"}
                  </button>):""}
                </div>)}
                <button
                  className={`px-5 py-3 rounded-full w-full ${
                    isRegistered
                      ? "bg-green-500 text-white animate-bounce"
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
        </div>
        <div className="grid grid-cols-12">
          <div className="lg:col-span-9 md:col-span-9 sm:col-span-9 col-span-12">
            <button
              className={`border border-green-500 px-4 py-2 text-green-500 bg-black hover:bg-green-500 hover:text-white w-full xl:w-60 transform transition-transform hover:scale-105 animate-pulse`}
            >
              {deadline}
            </button>
          </div>
          <div className="lg:col-span-3 md:col-span-3 sm:col-span-3 col-span-12 lg:flex lg:justify-end">
            <div className="space-x-1 flex">
              <button
                className={`border border-green-500 px-4 py-2 text-green-500 bg-black hover:bg-green-500 hover:text-white w-full xl:w-36 transform transition-transform hover:scale-105 animate-pulse`}
              >
                Prize: {challenge.price}
              </button>
            </div>
          </div>
        </div>
        <div>
          <ChallengeNavigationTab changeValue={changeValue} value={value} isRegistered={isRegistered} />
        </div>

        <SubmitModal
          open={modalOpen}
          handleClose={toggleModal}
          setIsSubmitted={setIsSubmitted}
        />
      </div>
    </div>
  );
};

export default Banner;
