import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {
  useFollowUser,
  useUserById,
} from "../../../../hooks/react-query/useUsers";
import Badges from "./Badges/Badges";
import HighlightSection from "./HighlightSection/HighlightSection";

import { useUserReviews } from "../../../../hooks/react-query/useReviews";
import { getUserLevelData } from "../../../../utils";

const UserProfileCard = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("rojla", user);
  const { userId } = useParams();

  const { data: userProfile } = useUserById(userId);
  const { mutate, isLoading } = useFollowUser(user._id, userId);
  const { data: reviews } = useUserReviews(userId);
  console.log(userProfile);
  const rating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((prev, current) => current.star + prev, 0);
    return sum / reviews.length;
  }, [reviews]);

  if (userProfile)
    return (
      <div className="bg-white p-6 rounded-lg flex flex-col items-center gap-6 xl:mr-11 shadow-md border-green-500 border-b-2 mr-0">
        <div className="relative">
          <div className="w-36 h-36">
            <img
              alt="Profile picture"
              src={userProfile.picturePath}
              className="object-cover w-full h-full rounded-full bg-green-500"
            />
          </div>
          <div className="absolute bottom-0 right-0">
            <div className="flex items-center justify-center rounded-full bg-green-500 w-11 h-11 text-white">
              Lv {getUserLevelData(userProfile.score).level}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xl font-md">
            {`${userProfile.firstname} ${userProfile.lastname}`}
          </p>

          <button className="flex items-center gap-1">
            <span className="text-xl font-bold text-yellow-500 ">{rating}</span>
            <FaStar className="text-yellow-500 w-5 h-5 mb-[0.15rem]" />
          </button>
        </div>

        <p className="text-md whitespace-normal">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters
        </p>

        <div className="w-full">
          {userId === user._id ? (
            <a href="/settings" className="block">
              <button className="cursor-pointer capitalize font-medium hover:scale-105  bg-green-500 py-2 px-4 rounded-lg w-full text-white">
                Edit Profile
              </button>
            </a>
          ) : (
            <button
              className="cursor-pointer capitalize font-medium hover:scale-105  bg-green-500 py-2 px-4 rounded-lg w-full text-white"
              onClick={mutate}
              sx={{ height: "2rem" }}
              disabled={isLoading}
            >
              {userProfile.followers.includes(user._id) ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        <div className="w-full">
          <HighlightSection />
        </div>
        <hr className=" border-zinc-400 w-full h-2" />
        {userProfile?.badges?.length === 0 && (
          <div className="w-full">
            <Badges userProfile={userProfile} />
          </div>
        )}
        <div className="w-full ">
          <p className="mb-2 text-left text-gray-500">Companies</p>
          <ul className="flex justify-start gap-2">
            {userProfile.companies.map((company, index) => (
              <Link key={index} to={`/company/${company._id}`}>
                <img
                  src={company.companyLogo}
                  alt={`Company ${index + 1}`}
                  className="rounded-lg w-11 h-11 cursor-pointer object-cover border-2 border-zinc-200"
                />
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
};

export default UserProfileCard;
