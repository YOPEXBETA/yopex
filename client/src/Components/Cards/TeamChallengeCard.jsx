import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from ".";
import { Link } from "react-router-dom";
import ChallengeMenuIcon from "../MenuIcons/ChallengeMenuIcon";
import challengeBanner from "../../assets/images/challengeBanner.jpg";

const TeamChallengeCard = ({ teamChallenge, extra }) => {
    const { user } = useSelector((state) => state.auth);
    const { currentOrganization } = useSelector(state => state.organization);

    const currentWorkspace = user.currentWorkspace.label


    const baseUrl = currentWorkspace === "Organization"
        ? `/organization/${currentOrganization._id}/challenges/challengeDetails/`
        : `/challenges/challengeDetails/`;
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function calculateTimeRemaining() {
        const deadlineTime = new Date(teamChallenge?.deadline).getTime();
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
            <Card extra={`${extra}`}>
            <div>
      <div className="max-w-sm mx-auto  overflow-hidden sm:max-w-md md:max-w-lg lg:max-w-xl">
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src={
            teamChallenge?.organization?.organizationLogo
                ? teamChallenge?.organization?.organizationLogo
                : challengeBanner
        }
          alt="Hackathon"
        />
        <span className="absolute top-4 left-4 bg-purple-500 text-white text-sm px-2 py-1 rounded">
        {teamChallenge?.start ? timeRemaining : "Upcoming Challenge"}
        </span>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2 dark:text-white text-black">{ teamChallenge?.title}</h2>
        <p className="text-sm font-light text-gray-400 mb-6 overflow-hidden whitespace-nowrap text-ellipsis">
          { teamChallenge?.description}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-400">Organized by</p>
            <p className="text-base dark:text-white text-black">{ teamChallenge.organization?.organizationName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Prize</p>
            <p className="text-base dark:text-white text-black">{ teamChallenge.price > 0 ? `${teamChallenge?.price} pts` : "Free"}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div>
            <p className="text-sm text-gray-400">Open To</p>
            <p className="text-base dark:text-white text-black">Everyone</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Participants</p>
            <p className="text-base dark:text-white text-black">{teamChallenge.teams?.length} | {teamChallenge.teamSize}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Objective</p>
            <p className="text-base dark:text-white text-black">{ teamChallenge?.objective}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
        <Link
        to={
            teamChallenge
                ? `${baseUrl}${teamChallenge._id}?type=teamChallenge`
                : "#"
        }          
        className="block"
        >
          <button className="bg-transparent border border-gray-400 text-gray-400 px-4 py-2 rounded hover:bg-gray-700 transition">
            Details
          </button>
        </Link>

        {(user?.organizations?.includes(teamChallenge?.organization?._id) ||
                teamChallenge?.owner === user?._id) && (
            <div onClick={(e) => e.preventDefault()}>
                <ChallengeMenuIcon challenge={teamChallenge} type="TeamChallenge"/>
            </div>
            )}
        </div>
      </div>
    </div>
    </div>
            </Card>
        </div>
    );
};

export default TeamChallengeCard;
