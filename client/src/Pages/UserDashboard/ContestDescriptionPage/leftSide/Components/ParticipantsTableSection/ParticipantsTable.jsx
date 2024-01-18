import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useChallengeById } from "../../../../../../hooks/react-query/useChallenges";
import ParticipantRow from "./ParticipantRow";

const ParticipantsTable = ({isOwner}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { id: challengeId } = useParams();
  const { data: challenge } = useChallengeById(challengeId);
  const handleChangePage = (newPage) => {
    if (newPage >= 0 && newPage <= Math.ceil(challenge.length / rowsPerPage)) {
      setPage(newPage);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400"
                    >
                      Registration Date
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal  rtl:text-right text-zinc-500 dark:text-zinc-400 text-right"
                    >
                      Submission Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {challenge.users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => {
                      return (
                        <ParticipantRow
                          key={user._id}
                          index={index}
                          user={user}
                          challenge={challenge}
                          isOwner={isOwner}
                        />
                      );
                    })}
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
