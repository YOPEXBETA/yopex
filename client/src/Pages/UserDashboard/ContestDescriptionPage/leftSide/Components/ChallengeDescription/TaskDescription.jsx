import React from "react";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../../../../hooks/react-query/useChallenges";

const TasksDescription = () => {
  const { id: challengeId } = useParams();
  const { data: challenge } = useChallengeById(challengeId);
  console.log(challenge.category);

  if (challenge)
    return (
      <div>
        <div className="mb-4 dark:text-white ">
          <h4 className="text-xl font-semibold uppercase">Description</h4>
        </div>
        <hr className="my-2 game-divider" />
        <div className="mb-4" style={{ wordWrap: "break-word" }}>
          <p className="text-md dark:text-white">{challenge.description}</p>
        </div>
        <div className="mb-4  dark:text-white">
          <h4 className="text-xl font-semibold uppercase">Categories</h4>
        </div>
        <hr className="my-4" />
        <div className="mb-4">
          <div className="flex flex-row flex-wrap space-x-2 md:space-x-0 space-y-2 md:space-y-0 w-full">
            {challenge.category.map((cat, i) => (
              <span
                key={i}
                className="px-2 py-1 dark:text-white font-bold text-md border-2 border-gray-300 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
        <hr className="my-2" />
        <div className="mb-4 game-skills">
          <h4 className="text-xl font-semibold uppercase dark:text-white">
            Recommended Skills
          </h4>
        </div>
        <hr className="my-4" />
        <div className="mb-4">
          <div className="flex flex-row space-x-2">
            {challenge.RecommendedSkills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 dark:text-white font-bold  text-md border-2 border-gray-300 rounded-full"
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
