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

const UserProfileInfoCard = ({extra }) => {

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
    <div>
      <section className="relative pt-40">
        <img
          src="https://pagedone.io/asset/uploads/1705473378.png"
          alt="cover-image"
          className="w-full absolute top-0 left-0 z-0 h-60 rounded-xl"
        />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">

            {userProfile.picturePath ? (
                <img
                  alt="picture"
                  src={userProfile.picturePath}
                  className="object-cover rounded-full w-40 h-40"
                />
              ) : (
                <img
                  alt="default"
                  src={AvatarProfile}
                  className="object-cover rounded-full w-40 h-40"
                />
              )}
          </div>
          <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
            <div className="block">
              <h3 className="font-manrope font-bold text-2xl dark:text-white mb-1">{`${userProfile.firstname} ${userProfile.lastname}`}</h3>
              <div className="flex items-center gap-4">
                <p className="leading-7 text-gray-600  text-base">{userProfile?.country || "N/A"}</p>
                <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="leading-7 text-gray-600 text-base">{rating}</p>
              </div>
              </div>
            </div>
            <button className="rounded-full py-2.5 px-4 bg-gray-100 flex items-center group transition-all duration-500 hover:bg-indigo-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  className="stroke-gray-700 transition-all duration-500 group-hover:stroke-indigo-600"
                  d="M14.1667 11.6666V13.3333C14.1667 14.9046 14.1667 15.6903 13.6785 16.1785C13.1904 16.6666 12.4047 16.6666 10.8333 16.6666H7.50001C5.92866 16.6666 5.14299 16.6666 4.65483 16.1785C4.16668 15.6903 4.16668 14.9047 4.16668 13.3333V11.6666M16.6667 9.16663V13.3333M11.0157 10.434L12.5064 9.44014C14.388 8.18578 15.3287 7.55861 15.3287 6.66663C15.3287 5.77466 14.388 5.14749 12.5064 3.89313L11.0157 2.8993C10.1194 2.3018 9.67131 2.00305 9.16668 2.00305C8.66205 2.00305 8.21393 2.3018 7.31768 2.8993L5.82693 3.89313C3.9454 5.14749 3.00464 5.77466 3.00464 6.66663C3.00464 7.55861 3.9454 8.18578 5.82693 9.44014L7.31768 10.434C8.21393 11.0315 8.66205 11.3302 9.16668 11.3302C9.67131 11.3302 10.1194 11.0315 11.0157 10.434Z"
                  stroke="#374151"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <span className="px-2 font-medium text-sm leading-5 text-gray-700 transition-all duration-500 group-hover:text-indigo-600">
              {userProfile.occupation?.name || "No occupation selected"}
              </span>
            </button>
          </div>
          <div className="flex flex-col lg:flex-row max-lg:gap-5 items-center justify-between py-0.5">
            <div className="flex items-center gap-4">
                  <div className="w-full ">
                    {userId === user?._id ? (
                      <a href="/settings" className="block">
                        <button className="cursor-pointer capitalize font-medium hover:scale-105 bg-green-500 py-3 px-4 rounded-full w-full text-white">
                          Edit Profile
                        </button>
                      </a>
                    ) : (
                  <div className="flex items-center gap-2">
                    <button
                      className={
                        userProfile.followers.includes(user?._id)
                          ? "py-3.5 px-5 rounded-full bg-white dark:bg-zinc-800 dark:text-white border-[1px] text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-100 hover:bg-indigo-700"
                          : "py-3.5 px-5 cursor-pointer capitalize font-medium hover:scale-105 bg-indigo-600 rounded-full w-full text-white"
                      }
                      onClick={mutate}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div>
                          <LoadingSpinner />
                        </div>
                      ) : userProfile.followers.includes(user?._id) ? (
                        "Unfollow"
                      ) : (
                        "Follow"
                      )}
                    </button>

                    <button
                      onClick={() =>
                        contact({ senderId: user?._id, receiverId: userId })
                      }
                      className="py-3.5 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-100"
                    >
                      Message
                    </button>
                  </div>
                )}
              </div>
            </div>

            {userProfile?.organizations?.length !== 0 && (

            <div className="flex flex-col md:flex-row items-center gap-6">
              <p className="flex items-center gap-2 font-medium text-sm leading-5 text-gray-400">
                Organizations
              </p>
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
      </section>
    </div>
  );
};

export default UserProfileInfoCard;
