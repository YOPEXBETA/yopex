import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ParticipantRow from "./ParticipantRow";
import TeamRow from "./TeamRow"; // Ensure you import the TeamRow component

const ParticipantsTable = ({ isOwner, challenge, type }) => {
  // Determine if we should render ParticipantRow or TeamRow
  const isChallengeType = type === "challenge";
  return (
      <div>
        <div>
          <div className="overflow-hidden dark:bg-zinc-800">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
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
                        <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Registration Date
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Submission Date
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
                        <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Registration Date
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Submission Date
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
                        ? challenge.users.map((user, index) => (
                            <ParticipantRow
                                key={user._id}
                                index={index}
                                user={user}
                                challenge={challenge}
                                isOwner={isOwner}
                            />
                        ))
                        : challenge.teams.map((team, index) => (
                            <TeamRow
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
          {/*<div className="flex items-center justify-between py-2 px-4 text-black bg-white border-t dark:bg-zinc-800 dark:text-white">
            <div className="flex items-center gap-3">
              <span className="text-sm">Rows per page:</span>
              <select
                className="mx-2 px-2 py-1 border rounded-md text-black "
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm">
                {page * rowsPerPage + 1} -{" "}
                {Math.min((page + 1) * rowsPerPage, challenge?.length || 0)} of{" "}
                {challenge?.length || 0}
              </span>
              <button
                className="px-2 py-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
                onClick={() => handleChangePage(page - 1)}
              >
                <FaChevronLeft />
              </button>
              <button
                className="px-2 py-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
                onClick={() => handleChangePage(page + 1)}
              >
                <FaChevronRight />
              </button>
            </div>
                  </div>*/}
        </div>
      </div>
  );
};

export default ParticipantsTable;
