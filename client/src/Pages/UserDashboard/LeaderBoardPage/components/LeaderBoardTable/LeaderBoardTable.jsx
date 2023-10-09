import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import UserRow from "./UserRow";

const LeaderbordTable = ({ data, query }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const [rankedUsers, setRankedUsers] = useState([]);
  console.log("rankedUsers", rankedUsers);

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

  const handleChangePage = (newPage) => {
    if (newPage >= 0 && newPage <= Math.ceil(data?.length / rowsPerPage)) {
      setPage(newPage);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="text-black">
              <tr className="bg-white h-11">
                <th className="py-2 px-4 text-left">RANK</th>
                <th className="py-2 px-4 text-left">USER</th>
                <th className="py-2 px-4 text-left">COUNTRY</th>
                <th className="py-2 px-4 text-right">POINTS</th>
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
      </div>
      <div className="flex items-center justify-between py-2 px-4 text-black bg-white border-2">
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
            {Math.min((page + 1) * rowsPerPage, data?.length || 0)} of{" "}
            {data?.length || 0}
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
      </div>
    </div>
  );
};

export default LeaderbordTable;
