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
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import ChallengeNavigationTab from "../../../../Components/Tabs/ChallengeNavigtionTab";
import { useJoinContestConversation } from "../../../../hooks/react-query/useContestConversation";

const Banner = ({ changeValue, value }) => {
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
    const submitted = submissions

    if (submitted) setIsSubmitted(true);
  }, [challenge._id, submissions]);

  useEffect(() => {
    const formatteDate = getDeadlineDifference(challenge.deadline);
    setDeadline(formatteDate);
  }, [challenge.deadline]);

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
    <div className="pt-8 px-6 lg:px-8 xl:px-32 flex flex-col justify-end bg-black">
      <div className="space-y-8 items-start" key={challenge._id}>
        <div className="grid grid-cols-12 mb-11">
          <div className="lg:col-span-8 md:col-span-8 sm:col-span-8 col-span-12">
            <h3 className="text-2xl text-white truncate w-96">
              {challenge.title}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-12"></div>
        <div>
          <ChallengeNavigationTab
            changeValue={changeValue}
            value={value}
            isRegistered={isRegistered}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
