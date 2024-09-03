import React from "react";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../../../../hooks/react-query/useChallenges";
import Card from "../../../../../../Components/Cards";
import Tag from "../../../../../../Components/tags/Index";
import YouTube from "react-youtube";

const TasksDescription = ({challenge, type}) => {
  const opts = {
    width: "100%",
    height: "450",
    borderRadius: "2rem",
    playerVars: {
      autoplay: 1,
    },
  };

  if (challenge)
    return (
      <Card>
        <div className="p-4">
          <h2 className="mb-6 text-2xl font-bold text-dark dark:text-white  sm:text-3xl md:text-[35px] md:leading-[1.28]">
            {challenge?.title}
          </h2>

          <div
            className="mb-4 text-base text-body-color dark:text-dark-6"
            style={{ whiteSpace: "pre-line" }}
          >
            <div className="my-6">
              {challenge?.YoutubeLink ? (
                <div
                  style={{
                    borderRadius: "1rem",
                    overflow: "hidden",
                  }}
                >
                  <YouTube
                    videoId={challenge.YoutubeLink.split("v=")[1].split("&")[0]}
                    opts={opts}
                  />
                </div>
              ) : null}
            </div>
            <div
              className="text-md dark:text-white mb-4 break-words overflow-ellipsis overflow-hidden"
              dangerouslySetInnerHTML={{ __html: challenge?.description }}
            />
          </div>
          <hr className="my-4" />
          <div className="mb-4">
            <div className="mb-4 flex gap-2">
            <strong>Objective: </strong>
              <h1>{challenge.objective}</h1>
            </div>
            { challenge.paid && (
                <div className="mb-4 flex gap-2">
                  <strong>Price: </strong>
                  <h1>{challenge.price}</h1>
                </div>
            )}
            <div className="mb-4">
              <strong>Skills: </strong>
              <div className="flex flex-wrap gap-2">
                {challenge.skills.map((skill, index) => (
                    <Tag key={index}>{skill.name}</Tag>
                ))}
              </div>
            </div>
            <strong>Categories: </strong>
            <div className="flex flex-wrap gap-2">
              {challenge.categories.map((category, index) => (
                  <Tag key={index}>{category.name}</Tag>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
};

export default TasksDescription;
