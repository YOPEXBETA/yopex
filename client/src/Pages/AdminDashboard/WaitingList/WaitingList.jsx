import React, { useState, useEffect } from "react";
import axios from "axios";

const WaitingList = () => {
    const [page, setPage] = useState(1);
    const [waitingLists, setWaitingLists] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchWaitingLists = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/waitingList/waitingLists"
                );
                setWaitingLists(response.data);
                setTotalPages(response.data.length);
            } catch (error) {
                console.error("Error fetching waiting lists:", error);
            }
        };
        fetchWaitingLists();
    }, [page]);

    const handleValidateUser = (userId) => {
        console.log(`Validated user with ID: ${userId}`);
    };

    return (
        <div className="h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Waiting List</h1>
            <table className="w-full table-auto border-collapse">
                <thead className="bg-gray-50 dark:bg-zinc-900">
                    <tr>
                        <th className="py-3.5 px-4 text-m font-semibold text-left text-gray-700 dark:text-gray-300">
                            Users
                        </th>
                        <th className="py-3.5 px-12 text-m font-semibold text-right text-gray-700 dark:text-gray-300">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-zinc-500 dark:bg-zinc-800">
                    {waitingLists.map((waitingList) =>
                        waitingList.users.map((user) => (
                            <tr key={user._id}>
                                <td className="py-4 px-4 text-gray-700 dark:text-gray-200">
                                    {user.firstname} {user.lastname}
                                </td>
                                <td className="py-4 px-4 text-right">
                                    <button
                                        onClick={() => handleValidateUser(user._id)}
                                        className="bg-green-600 text-white font-medium px-4 py-2 rounded hover:bg-green-700 transition"
                                    >
                                        Validate
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="flex justify-between mt-6">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
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
                    {Array.from({ length: Math.min(10, totalPages) }, (_, index) => page + index)
                        .filter((pageNumber) => pageNumber <= totalPages)
                        .map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => setPage(pageNumber)}
                                className={`px-2 py-1 text-sm rounded-md ${pageNumber === page
                                        ? "text-gray-400 bg-white-100"
                                        : "text-gray-500 dark:hover:bg-zinc-800 dark:text-gray-100 hover:bg-gray-100"
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        ))}
                </div>
                
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
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

export default WaitingList;
