import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
import {useTeamChallengeById} from "../../../../hooks/react-query/useTeamChallenge";

const Banner = ({ changeValue, value , type}) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [challenge, setChallenge] = useState(null); // Track the current challenge data
  const { id: challengeId } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { data: challengeData, isLoading: isChallengeLoading } = useChallengeById(challengeId);
  const { data: teamChallengeData, isLoading: isTeamChallengeLoading } = useTeamChallengeById(challengeId);
  const currentChallenge = type === 'challenge' ? challengeData : type === 'teamChallenge' ? teamChallengeData : null;
  useEffect(() => {
    setChallenge(currentChallenge);
  }, [currentChallenge]);

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
  }, [challenge?._id, submissions]);

  useEffect(() => {
    const formatteDate = getDeadlineDifference(challenge?.deadline);
    setDeadline(formatteDate);
  }, [challenge?.deadline]);

  useEffect(() => {
    if (!data) return;
    const registered = data?.challenges.find(
      (item) => item?._id === challenge?._id
    );
    setIsRegistered(registered ? true : false);
  }, [challenge, data]);

  const handleregiser = () => {
    registerMutate();
    join({ contestId: challenge?._id, userId: user._id });
  };

  return (
    <div className="w-full" key={challenge?._id}>
      <div className="relative z-20 mb-4 h-[300px] overflow-hidden  md:h-[400px]">
        <img
            src={challenge?.picturePath || challengeBanner}
            alt="image"
            className="h-full w-full object-cover object-center rounded-lg"
        />
        <div
            className="absolute top-0  left-0 z-10 flex h-full w-full items-end bg-gradient-to-t from-dark-700 to-transparent">
          <div className="flex flex-wrap bg-opacity-50 bg-white mb-4 rounded-r-lg items-center p-2 md:px-8">
            <Link
                className=" mr-5 flex items-center md:mr-10 hover:opacity-70"
                to={
                  challenge?.organization?.organizationLogo
                      ? `/organization/${challenge?.organization?._id}`
                      : `/profile/${challenge?.owner?._id}`
                }
            >
              <div className="mr-4 overflow-hidden rounded-full">
                <img
                    src={
                      challenge?.organization?.organizationLogo
                          ? challenge?.organization.organizationLogo
                          : challenge?.owner?.picturePath
                    }
                    alt="image"
                    className="object-cover h-10 w-10"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-black">
                  By{" "}
                  {challenge?.organization?.organizationName
                      ? challenge?.organization?.organizationName
                      : challenge?.owner?.firstname +
                      " " +
                      challenge?.owner?.lastname}
                </p>
              </div>
            </Link>
            <div className=" flex items-center gap-4">
              <div className="text-black flex items-center">
                <CalendarIcon/>
                <p className="text-sm font-medium text-black">
                  {challenge?.deadline
                      ? new Date(challenge?.deadline).toLocaleString()
                      : "Open"}
                </p>
              </div>
              <div className="text-black flex items-center gap-2">
                <SubmissionIcon/>
                <p className="text-sm font-medium text-black">
                  {challenge?.submissions?.length}
                </p>
              </div>
              <div className="text-black flex items-center gap-2">
                <UsersIcon/>
                <p className="text-sm font-medium text-black">
                  {type === 'challenge'
                      ? challenge?.users?.length
                      : challenge?.teams?.length}
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
