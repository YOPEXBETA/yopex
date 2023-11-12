import React, { useEffect, useState } from "react";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";

const Leaderboard = ({ data, query, onSelect }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [rankedUsers, setRankedUsers] = useState([]);

  const searchQ = query.toLowerCase();
  useEffect(() => {
    if (!data) return;
    const res = data
      ?.sort((a, b) => (a.score > b.score ? -1 : a.score < b.score ? 1 : 0))
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }))
      .filter(
        (user) =>
          user.firstname.toLowerCase().includes(searchQ) ||
          user.lastname.toLowerCase().includes(searchQ)
      );
    setRankedUsers(res);
  }, [data, searchQ]);

  const handleChangePage = (newPage) => {
    if (newPage >= 0 && newPage <= Math.ceil(data?.length / rowsPerPage)) {
      setPage(newPage);
    }
  };
  const totalPages = Math?.ceil(data?.length / rowsPerPage);
  const displayedPages = Math?.min(10, totalPages);

  return (
    <section className="container mx-auto">
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-zinc-500 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-500">
                <thead className="bg-gray-50 dark:bg-zinc-900">
                  <tr>
                    <div className="flex items-center gap-x-3">
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Rank
                      </th>
                    </div>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Country
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal  rtl:text-right text-gray-500 dark:text-gray-400 text-right"
                    >
                      Points
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 dark:divide-zinc-500 dark:bg-zinc-800">
                  {rankedUsers
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => onSelect(item)}
                        className="hover:bg-zinc-200 dark:hover:bg-zinc-700"
                      >
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap ">
                          <div className="inline-flex items-center gap-x-3">
                            <span>{item.rank}</span>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className="flex items-center gap-x-3">
                            {item.picturePath ? (
                              <img
                                alt="picture"
                                src={item.picturePath}
                                className="hidden lg:block md:block w-10 h-10 rounded-full object-cover border-2"
                              />
                            ) : (
                              <img
                                alt="default"
                                src={AvatarProfile}
                                className="hidden lg:block md:block w-10 h-10 rounded-full object-cover border-2"
                              />
                            )}
                            <span>
                              {item?.firstname} {item?.lastname}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-gray-300 whitespace-nowrap">
                          {item.country || "N/A"}
                        </td>

                        <td className="px-4 py-4 text-sm font-medium text-zinc-500 whitespace-nowrap text-right">
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-green-500 bg-green-100/60 dark:bg-gray-800`}
                          >
                            {item.score}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <a
          onClick={() => handleChangePage(page - 1)}
          className="flex items-center px-5 py-2 text-sm text-zinc-500 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-200 dark:border-zinc-700 dark:hover:bg-zinc-800"
          disabled={page === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <span>previous</span>
        </a>
        <div className="items-center hidden md:flex gap-x-3">
          {Array.from({ length: displayedPages }, (_, index) => page + index)
            .filter((pageNumber) => pageNumber < totalPages)
            .map((pageNumber) => (
              <a
                key={pageNumber}
                onClick={() => handleChangePage(pageNumber)}
                className={`px-2 py-1 text-sm rounded-md ${
                  pageNumber === page
                    ? "text-green-500 bg-green-100/60"
                    : "text-gray-500 dark:hover:bg-zinc-800 dark:text-gray-300 hover:bg-gray-100"
                }`}
              >
                {pageNumber + 1}
              </a>
            ))}
        </div>

        <a
          onClick={() => handleChangePage(page + 1)}
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          disabled={page === Math.ceil(data?.length / rowsPerPage) - 1}
        >
          <span>Next</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Leaderboard;
