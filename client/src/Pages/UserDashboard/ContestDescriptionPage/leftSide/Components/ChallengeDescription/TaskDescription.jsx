import React from "react";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../../../../hooks/react-query/useChallenges";

const TasksDescription = () => {
  const { id: challengeId } = useParams();
  const { data: challenge } = useChallengeById(challengeId);

  if (challenge)
    return (
      <div>
        <div className="mb-4 dark:text-white ">
          <h4 className="text-xl font-semibold">Description</h4>
        </div>
        <hr className="my-2 mb-2" />
        <div className="mb-4" style={{ wordWrap: "break-word" }}>
          <div
            className="text-md dark:text-white mb-8"
            dangerouslySetInnerHTML={{ __html: challenge.description }}
          />
        </div>
        <div className="mb-4  dark:text-white">
          <h4 className="text-xl font-semibold">Categories</h4>
        </div>
        <hr className="my-4" />
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {challenge.category.map((cat, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-green-200 text-green-700 rounded-full text-sm"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
        <hr className="my-2" />
        <div className="mb-4 game-skills">
          <h4 className="text-xl font-semibold dark:text-white">
            Recommended Skills
          </h4>
        </div>
        <hr className="my-4" />
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {challenge.RecommendedSkills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-green-200 text-green-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
};

export default TasksDescription;
