import React from "react";
import MTable from "./Components/ParticipantsTableSection/ParticipantsTable";
import ChooseWinner from "./Components/Winner/winner";
import CompanyCard from "./Components/ChallengeDescription/Client";
import TasksDescription from "./Components/ChallengeDescription/TaskDescription";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetContestConversation } from "../../../../hooks/react-query/useContestConversation";
import ChallengeConversation from "./Components/ChallengeConversation";
import Start from "./Components/ChallengeDescription/Start";
import Removed from "./Components/ParticipantsTableSection/Removed";
import Submission from "./Components/ParticipantsTableSection/Submission";

const ContentSide = ({ value, isOwner, start, isRegistered }) => {
  const { id: challengeId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data: conversation } = useGetContestConversation(challengeId);

  if (user && conversation)
    return (
      <div className="">
        <div className="space-y-2 ">
          {value === 0 && (
            <div className="grid grid-cols-12 md:gap-10 mt-4 md:mt-0">
              <div className="lg:col-span-8 md:col-span-12 sm:col-span-12 col-span-12">
                <TasksDescription />
              </div>
              <div className="lg:block md:block lg:col-span-4 md:col-span-12 sm:col-span-12 col-span-12  mb-20">
                <CompanyCard isRegistered={isRegistered} isOwner={isOwner} />
                {isOwner && !start && <Start />}
              </div>
            </div>
          )}
          {value === 1 && (
            <div className="lg:col-span-12 md:col-span-12 mt-4 md:mt-0">
              <MTable isOwner={isOwner} />
            </div>
          )}
          {value === 2 && (
            <div className="lg:col-span-12 md:col-span-12">
              <ChooseWinner />
            </div>
          )}
          {value === 3 && (
            <div className="lg:col-span-12 md:col-span-12">
              <ChallengeConversation
                conversationId={challengeId}
                id={conversation.id}
              />
            </div>
          )}
          {value === 4 && (
            <div className="lg:col-span-12 md:col-span-12">
              <Removed isOwner={isOwner} />
            </div>
          )}
          {value === 5 && (
            <div className="lg:col-span-12 md:col-span-12">
              <Submission isOwner={isOwner} />
            </div>
          )}
        </div>
      </div>
    );
};

export default ContentSide;
