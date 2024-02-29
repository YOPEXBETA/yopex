
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../../../../hooks/react-query/useChallenges";
import RemovedParticipant from "./RemovedParticipant";

const Removed = ({isOwner}) => {
  const { id: challengeId } = useParams();
  const { data: challenge } = useChallengeById(challengeId);

  if (challenge)
    return (
      <div>
        <div>
          <div className="overflow-hidden dark:bg-zinc-800">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50 dark:bg-zinc-900">
                  <tr>
                    <div className="flex items-center gap-x-3">
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400"
                      >
                        Participant N
                      </th>
                    </div>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400"
                    >
                      Username
                    </th>
                    {isOwner && (<th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal  rtl:text-right text-zinc-500 dark:text-zinc-400 text-right"
                    >
                      Status
                    </th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {challenge.banned
                    .map((user, index) => {
                      return (
                        <RemovedParticipant
                          key={user._id}
                          index={index}
                          user={user}
                          isOwner={isOwner}
                        />
                      );
                    })}
                    
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Removed;
