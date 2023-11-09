import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {
  useFollowUser,
  useUserById,
} from "../../../../hooks/react-query/useUsers";
import HighlightSection from "./HighlightSection/HighlightSection";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";
import { useUserReviews } from "../../../../hooks/react-query/useReviews";
import { useGetLevels } from "../../../../hooks/react-query/useLevels";
import LoadingSpinner from "../../../../Components/LoadingSpinner";

const UserProfileCard = () => {
  const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const { data: levelsData, isloading } = useGetLevels();
  const { data: userProfile } = useUserById(userId);
  const { mutate, isLoading } = useFollowUser(user._id, userId);
  const { data: reviews } = useUserReviews(userId);

  const userLevel = levelsData
    ? levelsData.find(
        (level) =>
          level.minScore <= userProfile?.score &&
          level.maxScore >= userProfile?.score
      )
    : null;

  const rating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((prev, current) => current.star + prev, 0);
    return sum / reviews.length;
  }, [reviews]);

  if (userProfile)
    return (
      <div className="bg-white dark:bg-zinc-800 p-6 md:rounded-lg flex flex-col items-center gap-6 xl:mr-11 divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-lg shadow-md dark:border-zinc-500 dark:border text-gray-600  mr-0">
        <div className="relative">
          <div>
            {userProfile.picturePath ? (
              <img
                alt="picture"
                src={userProfile.picturePath}
                className="object-cover rounded-full border-2 border-gray-200 w-36 h-36"
              />
            ) : (
              <img
                alt="default"
                src={AvatarProfile}
                className="object-cover rounded-full border-2 border-gray-200 w-36 h-36"
              />
            )}
          </div>
          <div className="absolute bottom-0 right-0">
            <div className="flex items-center justify-center rounded-full bg-green-500 w-11 h-11 text-white">
              {"LV " + parseInt(userLevel?.name.replace("Level ", ""))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 truncate w-80">
          <div className="flex items-center justify-center gap-2 truncate w-80">
            <p className="text-xl font-semibold truncate dark:text-zinc-200">
              {`${userProfile.firstname} ${userProfile.lastname}`}
            </p>
            <button className="flex items-center gap-1">
              <span className="text-xl font-bold text-yellow-500 dark:text-yellow-300 ">
                {rating}
              </span>
              <FaStar className="text-yellow-500 dark:text-yellow-300 w-5 h-5 mb-[0.15rem]" />
            </button>
          </div>
          <p className="text-md whitespace-normal dark:text-gray-200">
            {userProfile.occupation || "No occupation selected"}
          </p>
        </div>

        <div className="w-full">
          {userId === user._id ? (
            <a href="/settings" className="block">
              <button className="cursor-pointer capitalize font-medium hover:scale-105 bg-green-500 py-3 px-4 rounded-full w-full text-white">
                Edit Profile
              </button>
            </a>
          ) : (
            <button
              className={
                userProfile.followers.includes(user._id)
                  ? "cursor-pointer capitalize font-medium hover:scale-105 border border-zinc-600 py-3 px-4 rounded-full w-full text-zinc-600 dark:text-white dark:border-white"
                  : "cursor-pointer capitalize font-medium hover:scale-105 bg-green-500 py-3 px-4 rounded-full w-full text-white"
              }
              onClick={mutate}
              sx={{ height: "2rem" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div>
                  <LoadingSpinner />
                </div>
              ) : userProfile.followers.includes(user._id) ? (
                "Unfollow"
              ) : (
                "Follow"
              )}
            </button>
          )}
        </div>

        <div className="w-full">
          <HighlightSection />
        </div>

        <hr className="border-zinc-800 border w-full" />

        {userProfile?.companies?.length !== 0 && (
          <div className="w-full ">
            <p className="mb-3 text-left  uppercase font-bold dark:text-white">
              Companies
            </p>
            <ul className="flex justify-start gap-2">
              {userProfile?.companies?.map((company, index) => (
                <Link key={index} to={`/company/${company?._id}`}>
                  {company?.companyLogo ? (
                    <img
                      src={company?.companyLogo}
                      alt={`Company ${index + 1}`}
                      className="rounded-lg w-11 h-11 cursor-pointer object-cover border-2 border-zinc-200"
                    />
                  ) : (
                    <div>No company logo available</div>
                  )}
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
};

export default UserProfileCard;
