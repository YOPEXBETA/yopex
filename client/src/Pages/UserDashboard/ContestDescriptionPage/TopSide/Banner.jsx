import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import challengeBanner from "../../../../assets/images/challengeBanner.jpg";
import {
  useChallengeById,
  useRegisterChallenge,
  useUnregisterChallenge,
  useUserChallenges,
  useUserSubmission,
} from "../../../../hooks/react-query/useChallenges";
import getDeadlineDifference from "../../../../utils/deadlineModif";
import ChallengeNavigationTab from "../../../../Components/Tabs/ChallengeNavigtionTab";
import { useJoinContestConversation } from "../../../../hooks/react-query/useContestConversation";
import SubmissionIcon from "../../../../Components/icons/SubmissionIcon";
import UsersIcon from "../../../../Components/icons/UsersIcon";
import CalendarIcon from "../../../../Components/icons/CalendarIcon";

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
    const submitted = submissions;

    if (submitted) setIsSubmitted(true);
  }, [challenge._id, submissions]);

  useEffect(() => {
    const formatteDate = getDeadlineDifference(challenge.deadline);
    setDeadline(formatteDate);
  }, [challenge.deadline]);

  useEffect(() => {
    if (!data) return;
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
    <div className="w-full" key={challenge._id}>
      <div className="relative z-20 mb-4 h-[300px] overflow-hidden  md:h-[400px]">
        <img
          src={challengeBanner}
          alt="image"
          className="h-full w-full object-cover object-center rounded-lg"
        />
        <div className="absolute top-0 left-0 z-10 flex h-full w-full items-end bg-gradient-to-t from-dark-700 to-transparent">
          <div className="flex flex-wrap items-center p-4 pb-4 md:px-8">
            <div className="mb-4 mr-5 flex items-center md:mr-10">
              <div className="mr-4 h-10 w-10 overflow-hidden rounded-full">
                <img
                  src={challenge?.company?.companyLogo}
                  alt="image"
                  className="w-full object-cover"
                />
              </div>
              <p className="text-base font-medium text-white">
                By
                <a
                  href={`/company/${challenge?.company?._id}`}
                  className="text-white hover:opacity-70"
                >
                  {" "}
                  {challenge?.company?.companyName}
                </a>
              </p>
            </div>
            <div className="mb-4 flex items-center gap-4">
              <div className="text-white flex items-center">
                <CalendarIcon />
                <p className="text-sm font-medium text-white">
                  {new Date(challenge?.deadline).toLocaleString()}
                </p>
              </div>
              <div className="text-white flex items-center gap-2">
                <SubmissionIcon />
                <p className="text-sm font-medium text-white">
                  {challenge?.submissions?.length}
                </p>
              </div>
              <div className="text-white flex items-center gap-2">
                <UsersIcon />
                <p className="text-sm font-medium text-white">
                  {challenge?.users?.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
