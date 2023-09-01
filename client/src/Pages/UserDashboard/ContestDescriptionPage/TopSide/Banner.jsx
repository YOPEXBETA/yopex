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

const Banner = () => {
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

  return (
    <div className="bg-black w-full h-48 p-6 lg:px-8 xl:px-36 flex flex-col justify-between">
      <React.Fragment key={challenge._id}>
        <div className="grid grid-cols-12">
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
                    className="px-5 py-3 text-white w-full"
                    onClick={unRegisterMutate}
                    disabled={isloadingun}
                  >
                    {isloadingun ? <LoadingSpinner /> : "Unregister"}
                  </button>
                ) : (
                  <button
                    onClick={registerMutate}
                    className="px-5 py-3 rounded-lg bg-green-500 text-white w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? <LoadingSpinner /> : "Register"}
                  </button>
                )}
                <button
                  className={`px-5 py-3 rounded-lg w-full ${
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
        </div>
        <div className="grid grid-cols-12">
          <div className="lg:col-span-9 md:col-span-9 sm:col-span-9 col-span-12">
            <button className="border border-green-500 px-2 py-1 text-green-500 w-full xl:w-60 hover:bg-green-500 hover:text-white transition-transform transform hover:scale-105">
              {deadline}
            </button>
          </div>
          <div className="lg:col-span-3 md:col-span-3 sm:col-span-3 col-span-12 lg:flex lg:justify-end">
            <div className="space-x-1 flex">
              <button className="border border-green-500 px-2 py-1 text-green-500 w-full xl:w-36 hover:bg-green-500 hover:text-white transition-transform transform hover:scale-105">
                Prize: {challenge.price}
              </button>
            </div>
          </div>
        </div>

        <SubmitModal
          open={modalOpen}
          handleClose={toggleModal}
          setIsSubmitted={setIsSubmitted}
        />
      </React.Fragment>
    </div>
  );
};

export default Banner;
