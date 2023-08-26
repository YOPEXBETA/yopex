import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAdminCompanies } from "../../../hooks/react-query/useCompany";
import CompanyRow from "./CompanyRow";

const CompanyPage = () => {
  const { data } = useAdminCompanies();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // TODO: Move this logic to useCompany
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
    <div>
      <div className="rounded-xl shadow-lg">
        <table className="w-full">
          <thead className="text-white">
            <tr className="bg-zinc-800 h-11">
              <th className="py-2 px-4 text-left">COMPANY</th>
              <th className="py-2 text-left">JOBS</th>
              <th className="py-2  text-left">CHALLENGES</th>
              <th className="py-2 px-4 text-right">STATUS</th>
              <th className="py-2 px-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((company) => (
                <CompanyRow key={company._id} company={company} />
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
    </div>
  );
};

export default CompanyPage;
