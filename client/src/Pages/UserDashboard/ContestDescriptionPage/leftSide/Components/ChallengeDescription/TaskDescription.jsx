import React from "react";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../../../../hooks/react-query/useChallenges";
import Card from "../../../../../../Components/Cards";
import Tag from "../../../../../../Components/tags/Index";

const TasksDescription = () => {
  const { id: challengeId } = useParams();
  const { data: challenge } = useChallengeById(challengeId);

  if (challenge)
    return (
      <Card>
        <div className="p-4">
          <h2 className="mb-6 text-2xl font-bold text-dark dark:text-white  sm:text-3xl md:text-[35px] md:leading-[1.28]">
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
                <Tag key={index}>{skill}</Tag>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
};

export default TasksDescription;
