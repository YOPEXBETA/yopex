import React from "react";
import { useParams } from "react-router-dom";
import {useAppliers} from "../../../../hooks/react-query/useJobs";

const ApplicantsTable = () => {
    const { jobId } = useParams();  // Get jobId from URL parameters
    const { data: appliers = [], isLoading, isError, error } = useAppliers(jobId);
console.log('appliers', appliers)
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4">
            {/* Title */}
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                List of Applicants
            </h1>

            {/* Table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Applicant
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Skills
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {appliers.length > 0 ? (
                        appliers.map((applicant) => (
                            <tr key={applicant._id}
                                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={applicant.picturePath || 'https://via.placeholder.com/40'}
                                            alt={applicant.firstname}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {applicant.firstname} {applicant.lastname}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {applicant.skills.map(skill => skill.name).join(', ')}
                                </td>
                                <td className="px-6 py-4">
                                    {applicant.email}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 hover:text-blue-900">View</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4" colSpan="4">
                                No applicants available.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicantsTable;
