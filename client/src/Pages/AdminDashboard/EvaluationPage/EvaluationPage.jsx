import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAdminUsers } from "../../../hooks/react-query/useUsers";
import { useGetLevels } from "../../../hooks/react-query/useLevels";

const EvaluationPage = () => {
  const { data } = useAdminUsers();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: levelsData, isloading } = useGetLevels();
  console.log(levelsData);

  const handleChangePage = (newPage) => {
    if (newPage >= 0 && newPage <= Math.ceil(data.length / rowsPerPage)) {
      setPage(newPage);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="rounded-xl shadow-lg">
      <table className="w-full">
        <thead className="text-white">
          <tr className="bg-zinc-800 h-11">
            <th className="py-2 px-4 text-left ">USERNAME</th>
            <th className="py-2 px-4 text-left ">LEVEL</th>
            <th className="py-2 px-4 text-left ">COMPLETED CHALLENGES</th>
            <th className="py-2 px-4 text-left ">CHALLENGES WON</th>
            <th className="py-2 px-4 text-left">SCORE</th>
          </tr>
        </thead>
        <tbody>
          {data
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, index) => (
              <tr key={index} className="hover:bg-gray-50 bg-white">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="lg:w-1/6">
                      <img
                        alt={`${user.firstname} ${user.lastname}`}
                        src={user.picturePath}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div className="">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{user.firstname}</span>
                        <span className="text-sm">{user.lastname}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4"></td>
                <td className="py-4 px-4">{user.challengesDone}</td>
                <td className="py-4 px-4">{user.challengesWon}</td>
                <td className="py-4 px-4">{user.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between py-2 px-4 text-white bg-zinc-800">
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

export default EvaluationPage;
