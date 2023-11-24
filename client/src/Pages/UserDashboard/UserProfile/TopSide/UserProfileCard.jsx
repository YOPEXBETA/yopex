import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";

import LoadingSkeleton from "react-loading-skeleton";
import LoadingSpinner from "../../../../Components/LoadingSpinner";

import {
  useFollowUser,
  useUserById,
} from "../../../../hooks/react-query/useUsers";
import { useUserReviews } from "../../../../hooks/react-query/useReviews";
import { useGetLevels } from "../../../../hooks/react-query/useLevels";
import HighlightSection from "./HighlightSection/HighlightSection";
import getIconByPlatform from "../../../../utils/getIconByPlatform";

const UserProfileCard = () => {
  const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const { data: levelsData, isLoading: levelsLoading } = useGetLevels();
  const { data: userProfile, isLoading: userLoading } = useUserById(userId);
  const { mutate, isLoading } = useFollowUser(user._id, userId);
  const { data: reviews } = useUserReviews(userId);
  const selectedPlatforms = userProfile?.socialMediaLinks?.filter(
    (link) => link?.url
  );

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

  if (userLoading) {
    return <LoadingSpinner />;
  }

  if (userProfile)
    return (
      <div className="bg-white dark:bg-zinc-800 border p-6 md:rounded-lg flex flex-col items-center gap-6 xl:mr-11 divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-lgdark:border-zinc-500 dark:border text-gray-600  mr-0 ">
        <div className="relative">
          <div>
            {userProfile.picturePath ? (
              <img
                alt="picture"
                src={userProfile.picturePath}
                className="object-cover rounded-full w-40 h-40 border-4 border-green-500"
              />
            ) : (
              <img
                alt="default"
                src={AvatarProfile}
                className="object-cover rounded-full w-40 h-40 border-4 border-green-500"
              />
            )}
          </div>
          <div className="absolute bottom-0 right-0">
            <div className="flex items-center justify-center rounded-full bg-green-500 w-11 h-11 text-white">
              {userLevel ? (
                <p className="dark:text-white">
                  {"LV " + parseInt(userLevel?.name.replace("Level ", ""))}
                </p>
              ) : (
                <LoadingSpinner />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 truncate w-80">
          <div className="flex items-center justify-center gap-2 truncate w-80">
            {userProfile ? (
              <p className="text-2xl font-semibold text-black truncate dark:text-zinc-200">
                {`${userProfile.firstname} ${userProfile.lastname}`}
              </p>
            ) : (
              <LoadingSkeleton width={160} height={24} />
            )}
          </div>
          {userProfile ? (
            <p className="text-md whitespace-normal dark:text-gray-200">
              {userProfile.occupation || "No occupation selected"}
            </p>
          ) : (
            <LoadingSkeleton width={120} height={16} />
          )}
        </div>

        <div className="flex items-center gap-6">
          <p className="text-base text-navy-700 dark:text-white flex items-center">
            <FaMapMarkerAlt className="inline-block mr-2 text-green-500" />
            {userProfile ? (
              <p className="text-md whitespace-normal dark:text-gray-200">
                {userProfile?.country || "N/A"}
              </p>
            ) : (
              <LoadingSkeleton width={120} height={16} />
            )}
          </p>
          <div className="h-6 border-l border-solid border-zinc-500"></div>
          <button className="flex items-center gap-1">
            <span className="text-lg font-semibold dark:text-yellow-300 ">
              {rating}
            </span>
            <FaStar className="text-yellow-500 dark:text-yellow-300 w-5 h-5" />
          </button>
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
        <div className="w-full flex flex-col">
          <h5 className="mb-3 text-left font-medium text-sm dark:text-white uppercase">
            Contact
          </h5>
          <ul className="flex flex-col gap-4">
            <li className="dark:text-green-500 hover:underline">
              <span>Email: {userProfile?.email}</span>
            </li>
            <li>
              <span>
                <a
                  href={`tel:${userProfile?.phoneNumber}`}
                  className="dark:text-green-500 hover:underline"
                >
                  Phone: {userProfile?.phoneNumber}
                </a>
              </span>
            </li>
            <li>
              <span>
                <a
                  href={userProfile?.websiteURL}
                  className="dark:text-green-500 hover:underline"
                >
                  Website: {userProfile?.websiteURL || "N/A"}
                </a>
              </span>
            </li>
          </ul>
        </div>
        <div className="w-full flex flex-col">
          <h5 className="mb-3 text-left font-medium text-sm dark:text-white uppercase">
            SKILLS
          </h5>
          <div>
            {userProfile?.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill, index) => (
                  <span
                    className="px-2 py-1 bg-white border rounded-full"
                    key={index}
                  >
                    {skill?.value}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-base dark:text-white">No skill selected</p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col">
          <h5 className="mb-3 text-left font-medium text-sm dark:text-white uppercase">
            Social Links
          </h5>
          <div className="flex gap-2">
            {selectedPlatforms?.length === 0 ? (
              <p>No links selected</p>
            ) : (
              selectedPlatforms.map((link, index) => (
                <a key={index} href={link?.url} target="_blank">
                  {getIconByPlatform(link?.platform)}
                </a>
              ))
            )}
          </div>
        </div>

        <hr className="border-zinc-800 border w-full" />

        {userProfile?.companies?.length !== 0 && (
          <div className="w-full ">
            <h5 className="mb-3 text-left font-medium text-sm dark:text-white uppercase">
              Companies
            </h5>
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
