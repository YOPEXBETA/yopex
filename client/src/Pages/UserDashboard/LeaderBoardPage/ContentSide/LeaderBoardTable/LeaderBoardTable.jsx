import React, { useEffect, useState } from "react";
import UserRow from "./UserRow";

const LeaderbordTable = ({ data, query }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const [rankedUsers, setRankedUsers] = useState([]);

  useEffect(() => {
    if (!data) return;
    const res = data
      ?.sort((a, b) => (a.score > b.score ? -1 : a.score < b.score ? 1 : 0))
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }));
    setRankedUsers(res);
    console.log(res);
  }, [data]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 8));
    setPage(0);
  };

  return (
    <div>
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-md font-medium text-green-500 uppercase tracking-wider"
              >
                RANK
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-md font-medium text-green-500 uppercase tracking-wider"
              >
                USER
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-md font-medium text-green-500 uppercase tracking-wider"
              >
                COUNTRY
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-md font-medium text-green-500 uppercase tracking-wider"
              >
                POINTS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rankedUsers
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(
                (user) =>
                  (user.firstname.includes(query) ||
                    user.lastname.includes(query)) && (
                    <UserRow user={user} key={user._id} />
                  )
              )}
          </tbody>
        </table>
      </div>
      <div className="p-2 flex justify-between items-center">
        <div className="text-sm">
          Showing {page * rowsPerPage + 1} to{" "}
          {Math.min((page + 1) * rowsPerPage, data?.length || 0)} of{" "}
          {data?.length || 0} entries
        </div>
        <div className="space-x-2">
          <select
            name="rowsPerPage"
            id="rowsPerPage"
            className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-500"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={100}>100</option>
          </select>
          <div className="text-sm text-gray-500">rows per page</div>
        </div>
      </div>
    </div>
  );
};

export default LeaderbordTable;
