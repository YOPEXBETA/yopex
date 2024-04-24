import React from "react";
import Card from "./index";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useUserChallenges } from "../../hooks/react-query/useUsers";
import ChallengeCardSkeleton from "../SkeletonLoading/ChallengeCardSkeleton";
import ChallengeCard from "./ChallengeCard";
import Tag from "../tags/Index";
import ExperienceCard from "./ExperienceCard";

const UserInfoCard = ({ userProfile, extra }) => {
  const { userId } = useParams();
  const { data, isLoading } = useUserChallenges(userId);

  if (isLoading) {
    return <ChallengeCardSkeleton />;
  }

  return (
    <Card extra={`w-full h-full p-6 ${extra}`}>
      {/* Header */}

      <div>
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        <p className="text-sm leading-relaxed">
          {userProfile?.userDescription ||
            "Please Enter Your Summary Informations."}
        </p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Experience</h3>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 py-2">
          {data.challenges.length > 0 ? (
            data.challenges?.map((challenge) => (
              <ExperienceCard
                key={challenge._id}
                Challenges={data.challenges}
                challenge={challenge}
                type={"small"}
              />
            ))
          ) : (
            <p className="text-sm leading-relaxed dark:text-white">
              No Challenge Found.
            </p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2 dark:text-white ">Skills</h3>
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
    </Card>
  );
};

export default UserInfoCard;
