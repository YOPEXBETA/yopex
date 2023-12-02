import React from "react";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../../../../hooks/react-query/useChallenges";

const TasksDescription = () => {
  const { id: challengeId } = useParams();
  const { data: challenge } = useChallengeById(challengeId);

  if (challenge)
    return (
      <div>
        <h2 className="mb-8 text-2xl font-bold text-dark dark:text-white sm:text-3xl md:text-[35px] md:leading-[1.28]">
          {challenge?.title}
        </h2>
        <div
          className="mb-6 text-base text-body-color dark:text-dark-6"
          style={{ whiteSpace: "pre-line" }}
        >
          <div
            className="text-md dark:text-white mb-8"
            dangerouslySetInnerHTML={{ __html: challenge?.description }}
          />
        </div>

        <hr className="my-4" />
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {challenge.RecommendedSkills.map((skill, index) => (
              <span
                key={index}
                className="block rounded-md bg-primary/[0.08] py-[5px] px-[14px] text-base text-dark dark:text-white hover:bg-primary hover:text-white"
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
