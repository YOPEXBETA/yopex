import React from "react";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../../../../hooks/react-query/useChallenges";

const TasksDescription = () => {
  const { id: challengeId } = useParams();
  const { data: challenge } = useChallengeById(challengeId);
  console.log(challenge.category);

  if (challenge)
    return (
      <div className="">
        <div className="mb-4 game-title">
          <h4 className="text-xl font-semibold uppercase">Description</h4>
        </div>
        <hr className="my-2 game-divider" />
        <div className="mb-4 game-description">
          <p className="text-md">{challenge.description}</p>
        </div>
        <div className="mb-4 game-category">
          <h4 className="text-xl font-semibold uppercase">Categories</h4>
        </div>
        <hr className="my-4 " />
        <div className="mb-4">
          <div className="flex flex-row space-x-2 game-skill-icons">
            {challenge.category.map((cat, i) => (
              <span
                key={i}
                className="px-2 py-1 font-bold  text-md border-2 border-gray-300 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
        <hr className="my-2" />
        <div className="mb-4 game-skills">
          <h4 className="text-xl font-semibold uppercase">
            Recommended Skills
          </h4>
        </div>
        <hr className="my-2" />
        <div className="flex flex-row space-x-2 game-skill-icons">
          {challenge.RecommendedSkills.map((skill, i) => (
            <span key={i} className="px-2 py-1  text-md">
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
};

export default TasksDescription;
