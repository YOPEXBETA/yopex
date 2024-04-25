import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from ".";
import { Link } from "react-router-dom";
import ChallengeMenuIcon from "../MenuIcons/ChallengeMenuIcon";
import challengeBanner from "../../assets/images/challengeBanner.jpg";

const NewChallengeCard = ({ challenge, type, extra }) => {
  const { user } = useSelector((state) => state.auth);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

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
      <Card extra={`p-4 h-full ${extra}`}>
        <Link
          to={
            challenge ? `/challenges/challengeDetails/${challenge?._id}` : "#"
          }
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={
                    challenge?.company?.companyLogo
                      ? challenge?.company?.companyLogo
                      : challengeBanner
                  }
                  alt="Icon"
                  className="w-16 h-16 rounded-lg object-cover border hidden md:block lg:block"
                />
                <p className="mt-1 font-medium dark:text-zinc-400 md:mt-2">
                  {challenge.company?.companyName}
                </p>
              </div>
              <div className="flex items-center justify-start gap-2">
                {(user?.companies?.includes(challenge?.company?._id) ||
                  challenge?.owner === user?._id) && (
                  <div onClick={(e) => e.preventDefault()}>
                    <ChallengeMenuIcon challenge={challenge} />
                  </div>
                )}
              </div>
            </div>
            <div className="mb-3 flex items-center justify-between px-1 md:items-start">
              <div className="mb-2">
                <p className="text-lg md:truncate md:w-96 w-full font-semibold">
                  {challenge.title}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-sm flex gap-1 items-center text-purple-700 bg-purple-100  px-3 py-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                    <p className="">{challenge.users.length}</p>
                    <div className="">/</div>
                    <p className=" ">{challenge.nbruser}</p>
                  </span>
                  <span className="bg-amber-100 text-amber-600 rounded-full px-3 py-1 text-sm">
                    {challenge.price > 0 ? (
                      <div className="flex gap-1">
                        <p className="">{challenge.price} pts</p>
                      </div>
                    ) : (
                      <p>Free</p>
                    )}
                  </span>
                  <span className="bg-green-100 text-emerald-700 rounded-full px-3 py-1 text-sm">
                    {challenge.objective}
                  </span>
                </div>
              </div>
            </div>

            <div className="border px-4 py-3 rounded-2xl dark:bg-zinc-700">
              <p className="text-center font-bold text-lg dark:text-emerald-400">
                {challenge?.start ? timeRemaining : "Open"}
              </p>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default NewChallengeCard;
