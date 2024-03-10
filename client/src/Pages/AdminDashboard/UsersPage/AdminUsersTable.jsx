import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAdminUsers } from "../../../hooks/react-query/useUsers";
import UserRow2 from "./UserRow2";
import TableSkeleton from "../../../Components/SkeletonLoading/TableSkeleton";

const AdminUsersTable = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const handleChangePage = (newPage) => {
    if (newPage <= totalPages && newPage > 0) {
      setPage(newPage);
    }
  };

  const { data, isLoading } = useAdminUsers(page, query);
  const totalPages = Math?.ceil(data?.userCount / 6);
  const displayedPages = Math?.min(10, totalPages);

  if (isLoading) {
    return <TableSkeleton />;
  }
  return (
    <div>
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-zinc-900">
          <tr>
            <div className="flex items-center gap-x-3">
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Username
              </th>
            </div>

            <th
              scope="col"
              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              Status
            </th>

            <th
              scope="col"
              className="px-4 py-3.5 text-sm font-normal  rtl:text-right text-gray-500 dark:text-gray-400 text-right"
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 dark:divide-zinc-500 dark:bg-zinc-800">
          {data?.users?.map((user) => (
            <UserRow2 key={user._id} user={user} />
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => handleChangePage(page - 1)}
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          disabled={page === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>Previous</span>
        </button>

        <div className="items-center hidden md:flex gap-x-3">
          {Array.from({ length: displayedPages }, (_, index) => page + index)
            .filter((pageNumber) => pageNumber <= totalPages)
            .map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handleChangePage(pageNumber)}
                className={`px-2 py-1 text-sm rounded-md ${
                  pageNumber === page
                    ? "text-green-500 bg-green-100"
                    : "text-gray-500 dark:hover:bg-zinc-800 dark:text-gray-100 hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            ))}
        </div>

        <button
          onClick={() => handleChangePage(page + 1)}
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          disabled={page === totalPages}
        >
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AdminUsersTable;
