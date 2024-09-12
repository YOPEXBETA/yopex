import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from ".";
import { Link } from "react-router-dom";
import ChallengeMenuIcon from "../MenuIcons/ChallengeMenuIcon";
import challengeBanner from "../../assets/images/challengeBanner.jpg";

const NewChallengeCard = ({ challenge, type, extra }) => {
  const { user } = useSelector((state) => state.auth);
  const { currentOrganization } = useSelector((state) => state.organization);

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  const currentWorkspace = user?.currentWorkspace?.label;

  const baseUrl =
    currentWorkspace === "Organization"
      ? `/organization/${currentOrganization?._id}/challenges/challengeDetails/`
      : `/challenges/challengeDetails/`;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeRemaining() {
    const deadlineTime = new Date(challenge?.deadline).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = Math.max(deadlineTime - currentTime, 0);
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
      2,
      "0"
    )} : ${String(seconds).padStart(2, "0")}`;
  }

  return (
    <div>
      <div className="max-w-sm mx-auto dark:bg-zinc-800 dark:text-white rounded-lg shadow-lg overflow-hidden sm:max-w-md md:max-w-lg lg:max-w-xl">
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src={
            challenge?.organization?.organizationLogo
              ? challenge.organization.organizationLogo
              : challengeBanner
          }
          alt="Hackathon"
        />
        <span className="absolute top-4 left-4 bg-purple-500 text-white text-sm px-2 py-1 rounded">
        {challenge?.start ? timeRemaining : "Upcoming Challenge"}
        </span>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2 dark:text-white text-black">{challenge?.title}</h2>
        <p className="text-sm font-light text-gray-400 mb-6 overflow-hidden whitespace-nowrap text-ellipsis">
          {challenge?.description}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-400">Organized by</p>
            <p className="text-base dark:text-white text-black">{challenge.organization?.organizationName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Prize</p>
            <p className="text-base dark:text-white text-black">{challenge.price > 0 ? `${challenge?.price} pts` : "Free"}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div>
            <p className="text-sm text-gray-400">Open To</p>
            <p className="text-base dark:text-white text-black">Everyone</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Participants</p>
            <p className="text-base dark:text-white text-black">{challenge?.users?.length} | {challenge?.nbruser}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Objective</p>
            <p className="text-base dark:text-white text-black">{challenge?.objective}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
        <Link
          to={challenge ? `${baseUrl}${challenge._id}?type=challenge` : "#"}
          className="block"
        >
          <button className="bg-transparent border border-gray-400 text-gray-400 px-4 py-2 rounded hover:bg-gray-700 transition">
            Details
          </button>
        </Link>

          {(user?.organizations?.includes(challenge?.organization?._id) ||
                challenge?.owner === user?._id) && (
                <div onClick={(e) => e.preventDefault()}>
                  <ChallengeMenuIcon challenge={challenge} type="Challenge" />
                </div>
            )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default NewChallengeCard;
