import React from "react";
import MTable from "./Components/ParticipantsTableSection/ParticipantsTable";
import ChooseWinner from "./Components/Winner/winner";
import CompanyCard from "./Components/ChallengeDescription/Client";
import TasksDescription from "./Components/ChallengeDescription/TaskDescription";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetContestConversation } from "../../../../hooks/react-query/useContestConversation";
import ChallengeConversation from "./Components/ChallengeConversation";

const ContentSide = ({ value, changeValue }) => {
  const { id: challengeId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data: conversation } = useGetContestConversation(challengeId);

  if (user && conversation)
    return (
      <div className="">
        <div className="space-y-2">
          {value === 0 && (
            <div className="grid grid-cols-12 gap-2">
              <div className="lg:col-span-8 md:col-span-8 sm:col-span-12 col-span-12 lg:pr-6">
                <TasksDescription />
              </div>
              <div className="lg:block md:block lg:col-span-4 md:col-span-4 sm:col-span-12 col-span-12 xl:pl-16 mb-20">
                <CompanyCard />
              </div>
            </div>
          )}
          {value === 1 && (
            <div className="lg:col-span-12 md:col-span-12">
              <MTable />
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
        </div>
      </div>
    );
};

export default ContentSide;
