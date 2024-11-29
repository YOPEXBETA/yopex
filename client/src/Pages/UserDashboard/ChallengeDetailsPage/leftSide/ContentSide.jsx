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
import TeamChallengeConversation from "./Components/TeamChallengeConversations/TeamChallengeConversation";
import ConversationTabs from "./Components/TeamChallengeConversations/ConversationsTabs";

const ContentSide = ({ value, isOwner, start, isRegistered,challenge, type, team }) => {
  const { id: challengeId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data: conversation } = useGetContestConversation(challengeId);
  if (user )
    return (
      <div className="">
        <div className="space-y-2 ">
          {value === 0 && (
            <div className="grid grid-cols-12 md:gap-10 mt-4 md:mt-0">
              <div className="lg:col-span-8 md:col-span-12 sm:col-span-12 col-span-12">
                <TasksDescription challenge={challenge} type={type} />
              </div>
              <div className="lg:block md:block lg:col-span-4 md:col-span-12 sm:col-span-12 col-span-12  mb-20">
                <CompanyCard isRegistered={isRegistered} isOwner={isOwner} challenge={challenge} type={type}/>
                {isOwner && !start && <Start challenge={challenge} type={type}/>}
              </div>
            </div>
          )}
          {value === 1 && (
            <div className="lg:col-span-12 md:col-span-12 mt-4 md:mt-0">
              <MTable isOwner={isOwner} challenge={challenge} type={type} />
            </div>
          )}
          {value === 2 && (
            <div className="lg:col-span-12 md:col-span-12">
              <ChooseWinner challenge={challenge} type={type} />
            </div>
          )}
          {value === 3 && (
            <div className="lg:col-span-12 md:col-span-12">
                {type === "challenge"  && (
                    <ChallengeConversation
                        conversationId={challengeId}
                        id={challengeId}
                    />
                )}
                {type === "teamChallenge" &&  (
                    <ConversationTabs
                        challenge={challenge}
                        user={user}
                        isOwner={isOwner}
                        isRegistered={isRegistered}
                        team={team}
                    />
                )}
            </div>
          )}
          {value === 4 && (
            <div className="lg:col-span-12 md:col-span-12">
              <Removed isOwner={isOwner} challenge={challenge} type={type}/>
            </div>
          )}
          {value === 5 && (
            <div className="lg:col-span-12 md:col-span-12">
              <Submission isOwner={isOwner} challenge={challenge} type={type} />
            </div>
          )}
        </div>
      </div>
    );
};

export default ContentSide;
