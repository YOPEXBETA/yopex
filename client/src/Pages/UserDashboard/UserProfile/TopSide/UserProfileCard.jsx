import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
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
import Card from "../../../../Components/Cards";
import Tag from "../../../../Components/tags/Index";
import { useCreateConversation } from "../../../../hooks/react-query/useConversations";

const UserProfileCard = () => {
  const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const { data: levelsData, isLoading: levelsLoading } = useGetLevels();
  const { data: userProfile, isLoading: userLoading } = useUserById(userId);
  const { mutate, isLoading } = useFollowUser(user._id, userId);
  const { data: reviews } = useUserReviews(userId);
  const { mutate: contact } = useCreateConversation(user._id);
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
      <Card>
        <div className=" p-6 flex flex-col items-center gap-6">
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
                  <p className="dark:text-white">{"LV " + userLevel?.level}</p>
                ) : (
                  <LoadingSpinner />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 truncate w-80">
            <div className="flex items-center justify-center gap-2 truncate w-80">
              {userProfile ? (
                <p className="text-2xl font-bold truncate dark:text-gray-200">
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
            <p className="text-base text-gray-700 dark:text-white flex items-center">
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

            <div className="flex items-center">
              <p className="ms-2 text-lg font-bold dark:text-white me-2">
                {rating}
              </p>
              <svg
                className="w-5 h-5 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div>
          </div>

          <div className="w-full ">
            {userId === user._id ? (
              <a href="/settings" className="block">
                <button className="cursor-pointer capitalize font-medium hover:scale-105 bg-green-500 py-3 px-4 rounded-full w-full text-white">
                  Edit Your Profile
                </button>
              </a>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <button
                  className={
                    userProfile.followers.includes(user._id)
                      ? "cursor-pointer capitalize font-medium hover:scale-105 border border-zinc-600 py-3 px-4 rounded-full w-full text-gray-600 dark:text-white dark:border-white"
                      : "cursor-pointer capitalize font-medium hover:scale-105 bg-green-500 py-3 px-4 rounded-full w-full text-white"
                  }
                  onClick={mutate}
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

                <button
                  onClick={() =>
                    contact({ senderId: user._id, receiverId: userId })
                  }
                  className="cursor-pointer capitalize hover:scale-105 bg-green-100 text-green-500 border-green-500 border-[1px] font-medium py-3 px-4 rounded-full w-full"
                >
                  Contact Me
                </button>
              </div>
            )}
          </div>

          {/* <div className="w-full">
            <HighlightSection challengesDone={userProfile?.challengesDone} />
          </div>*/}
          <div className="space-y-4 w-full">
            {selectedPlatforms && selectedPlatforms.length > 0 && (
              <div className="w-full flex flex-col">
                <h5 className="mb-3 text-left font-medium text-xs dark:text-white uppercase">
                  Social Links
                </h5>
                <div className="flex gap-2">
                  {selectedPlatforms.map((link, index) => (
                    <a key={index} href={link?.url} target="_blank">
                      {getIconByPlatform(link?.platform)}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h5 className="mb-3 text-left font-medium text-xs dark:text-white uppercase">
                Skills
              </h5>
              {userProfile?.skills && userProfile.skills.length > 0 ? (
                <div className="w-full flex flex-col">
                  <div className="flex flex-wrap gap-2">
                    {userProfile?.skills?.map((skill, index) => (
                      <Tag key={index}>{skill?.name}</Tag>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed dark:text-white">
                  No Skills Found.
                </p>
              )}
            </div>
            <div>
              <h5 className="mb-3 text-left font-medium text-xs dark:text-white uppercase">
                ABOUT
              </h5>
              <p className="text-sm leading-relaxed">
                {userProfile?.userDescription || "No Description."}
              </p>
            </div>
            {userProfile?.organizations?.length !== 0 && (
              <div className="w-full ">
                <h5 className="mb-3 text-left font-medium text-xs dark:text-white uppercase">
                  Organizations
                </h5>
                <ul className="flex justify-start gap-2">
                  {userProfile?.organizations?.map((organization, index) => (
                    <Link key={index} to={`/organization/${organization?._id}`}>
                      {organization?.organizationLogo ? (
                        <img
                          src={organization?.organizationLogo}
                          alt={`Organization ${index + 1}`}
                          className="rounded-lg w-11 h-11 cursor-pointer object-cover border-2 border-zinc-200"
                        />
                      ) : (
                        <div>No organization logo available</div>
                      )}
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
};

export default UserProfileCard;
