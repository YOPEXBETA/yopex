import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import UserRow from "./UserRow";

const LeaderbordTable = ({ data, query }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const [rankedUsers, setRankedUsers] = useState([]);
  //
  const searchQ = query.toLowerCase();
  
  useEffect(() => {
    if (!data) return;
    const res = data
      ?.sort((a, b) => (a.score > b.score ? -1 : a.score < b.score ? 1 : 0))
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      })).filter((user) => user.firstname.toLowerCase().includes(searchQ) || user.lastname.toLowerCase().includes(searchQ));
    setRankedUsers(res);
  }, [data,searchQ]);

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
      <div className="  overflow-hidden  bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y  divide-gray-200">
            <thead className="text-black">
              <tr className="bg-white dark:bg-zinc-700  h-11">
                <th className="py-2 px-4 text-left dark:text-gray-200">RANK</th>
                <th className="py-2 px-4 text-left dark:text-gray-200">USER</th>
                <th className="py-2 px-4 text-left dark:text-gray-200">COUNTRY</th>
                <th className="py-2 px-4 text-right dark:text-gray-200">POINTS</th>
              </tr>
            </thead>
            <tbody className="divide-y  divide-gray-200">
              {rankedUsers
                ?.map(
                  (user) =>(
                      <UserRow user={user} key={user._id} />
                    )
                ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between dark:bg-zinc-700 py-2 px-4 text-black dark:border-transparent rounded-md bg-white border-2">
        <div className="flex items-center gap-3">
          <span className="text-sm dark:text-gray-200">Rows per page:</span>
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
          <span className="text-sm dark:text-gray-200">
            {page * rowsPerPage + 1} -{" "}
            {Math.min((page + 1) * rowsPerPage, data?.length || 0)} of{" "}
            {data?.length || 0}
          </span>
          <button
            className="px-2 py-1 rounded-full hover:bg-gray-700 dark:hover:bg-green-500 transition-colors duration-200"
            onClick={() => handleChangePage(page - 1)}
          >
            <FaChevronLeft className="dark:text-gray-200 " />
          </button>
          <button
            className="px-2 py-1 rounded-full hover:bg-gray-700 dark:hover:bg-green-500 transition-colors duration-200"
            onClick={() => handleChangePage(page + 1)}
          >
            <FaChevronRight className="dark:text-gray-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderbordTable;
