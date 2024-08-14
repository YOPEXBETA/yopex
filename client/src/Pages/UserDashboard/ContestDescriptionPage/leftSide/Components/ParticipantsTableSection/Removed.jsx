
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../../../../hooks/react-query/useChallenges";
import RemovedParticipant from "./RemovedParticipant";
import ParticipantRow from "./ParticipantRow";
import TeamRow from "./TeamRow";
import RemovedTeam from "./RemovedTeam";

const Removed = ({isOwner, challenge, type}) => {
  const isChallengeType = type === "challenge";
    return (
      <div>
        <div>
          <div className="overflow-hidden dark:bg-zinc-800">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50 dark:bg-zinc-900">
                <tr>
                  <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Participant N
                  </th>
                  {isChallengeType ? (
                      <>
                        <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Username
                        </th>
                        {isOwner && (
                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400 text-right"
                            >
                              Status
                            </th>
                        )}
                      </>
                  ) : (
                      <>
                        <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Team Name
                        </th>
                        {isOwner && (
                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400 text-right"
                            >
                              Status
                            </th>
                        )}
                      </>
                  )}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {challenge &&
                    (isChallengeType
                        ? challenge.banned.map((user, index) => (
                            <RemovedParticipant
                                key={user._id}
                                index={index}
                                user={user}
                                isOwner={isOwner}
                            />
                        ))
                        : challenge.banned.map((team, index) => (
                            <RemovedTeam
                                key={team._id}
                                index={index}
                                team={team}
                                challenge={challenge}
                                isOwner={isOwner}
                            />
                        )))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Removed;
