import React, {useState} from "react";
import { useParams } from "react-router-dom";
import {useAppliers, useAppliersWithStatus, useJobByJobId} from "../../../../hooks/react-query/useJobs";
import {FaUsers, FaCheckCircle, FaClock, FaTag, FaBriefcase, FaDollarSign, FaStar} from 'react-icons/fa';
import ApplicantInfoCard from "../../../../Components/Cards/ApplicantInfoCard";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";

const ApplicantsTable = () => {
    const { jobId } = useParams();
    const { data: job, isLoading: jobLoading, isError: jobError, error: jobErrorMessage } = useJobByJobId(jobId);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedApplicantId, setSelectedApplicantId] = useState(null);
    const [selectedApplicantStatus, setSelectedApplicantStatus] = useState(null);
    const { data: appliersWithStatus, isLoading, isError, error } = useAppliersWithStatus(jobId);
    if (jobLoading || isLoading) return <p>Loading...</p>;
    if (jobError || isError) return <p>Error: {jobError ? jobErrorMessage.message : error.message}</p>;

    const filteredAppliers = appliersWithStatus
        .filter(applicant =>
            `${applicant.firstname} ${applicant.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(applicant =>
            filter === "All" || applicant.status === filter
        );
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleFilterClick = (status) => {
        setFilter(status);
        setIsDropdownOpen(false); // Close the dropdown after selection
    };
    const handleViewApplicant = (applicantId, status) => {
        setSelectedApplicantId(applicantId);
        setSelectedApplicantStatus(status)// Set the selected applicant ID
    };
    return (
        <div className="p-4">
            <div className=" flex items-center justify-between mb-4 p-2 bg-white dark:bg-gray-900 rounded-lg shadow-md">

                <div className="flex items-center">
                    {job.organization ? (
                        <>
                            <img
                                src={job.organization.organizationLogo || AvatarProfile}
                                alt={job.organization.organizationName}
                                className="w-28 h-28 rounded-lg border border-gray-300 dark:border-gray-600 mr-4"
                            />
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{job.title}</h1>
                                <p className="text-sm mt-4 text-gray-600 dark:text-gray-400">
                                    {job.organization.organizationName}
                                </p>
                            </div>
                        </>
                    ) : job.owner ? (
                        <>
                            <img
                                src={job.owner.picturePath || 'https://via.placeholder.com/50'}
                                alt={job.owner.firstname}
                                className="w-28 h-28 rounded-lg border border-gray-300 dark:border-gray-600 mr-4"
                            />
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{job.title}</h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {job.owner.firstname} {job.owner.lastname}
                                </p>
                            </div>
                        </>
                    ) : null}
                </div>
                <div className="flex-col items-end">
                    <div className="text-sm flex items-center text-gray-600 dark:text-gray-400 mb-2 p-2 rounded bg-gray-300
                        transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-4px_0px_0px_#424242]">
                        <FaUsers className="text-gray-800 dark:text-gray-300 mr-2"/>
                        <span className="font-semibold text-gray-900 dark:text-gray-200">Total Applicants:</span>
                        <span className="ml-2 text-gray-800 dark:text-gray-300">{appliersWithStatus.length}</span>
                    </div>
                    <div className="text-sm flex items-center dark:text-gray-400 mb-2 p-2 rounded bg-green-200
                transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-4px_0px_0px_#2E7D32]">
                        <FaCheckCircle className="text-green-800 dark:text-green-300 mr-2"/>
                        <span className="font-semibold text-green-600 dark:text-green-400">Accepted:</span>
                        <span
                            className="ml-2 text-green-800 dark:text-green-300">{appliersWithStatus.filter(applier => applier.status === 'Accepted').length}</span>
                    </div>
                    <div className="text-sm flex items-center text-gray-600 dark:text-gray-400 p-2 rounded bg-red-200
                transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-4px_0px_0px_#C62828]">
                        <FaClock className="text-red-800 dark:text-red-300 mr-2"/>
                        <span className="font-semibold text-red-600 dark:text-red-400">Pending:</span>
                        <span
                            className="ml-2 text-red-800 dark:text-red-300">{appliersWithStatus.filter(applier => applier.status === 'Pending').length}</span>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 mb-2 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="flex items-center">
                        <div>
                            <div className="flex items-center">
                                <FaDollarSign className="text-gray-600 dark:text-gray-400 mr-1"/>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">Salary Range:</span>
                            </div>
                            <div className="text-gray-600 ml-5 dark:text-gray-400">
                                {job.paid ? `${job.salaryRange.min} - ${job.salaryRange.max} ${job.salaryRange.currency}` : 'Unpaid'}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div>
                            <div className="flex items-center">
                                <FaBriefcase className="text-gray-600 dark:text-gray-400 mr-1"/>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">Job Type:</span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 ml-5">
                                {job.jobType}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div>
                            <div className="flex items-center">
                                <FaTag className="text-gray-600 dark:text-gray-400 mr-1"/>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">Offer Type:</span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 ml-5">
                                {job.offerType}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div>
                            <div className="flex items-center">
                                <FaCheckCircle className="text-gray-600 dark:text-gray-400 mr-1"/>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">Paid:</span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 ml-5">
                                {job.paid ? 'Yes' : 'No'}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div>
                            <div className="flex items-center">
                                <FaStar className="text-gray-600 dark:text-gray-400 mr-1"/>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">Skills Required:</span>
                            </div>
                            <div className="flex flex-wrap gap-2 ml-5">
                                {job.skills.map((skill, index) => (
                                    <div
                                        className="rounded bg-gray-300 transition relative duration-300 cursor-pointer
                            hover:translate-y-[3px] hover:shadow-[0_-4px_0px_0px_#097969]"
                                        key={index}
                                    >
                                        <p className="px-3 py-1 text-md text-gray-800 dark:text-gray-200">
                                            {skill.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div>
                            <div className="flex items-center">
                                <FaUsers className="text-gray-600 dark:text-gray-400 mr-1"/>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">Max Applicants:</span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 ml-5">
                                {job.appliersNumber}
                            </div>
                        </div>
                    </div>
                </div>

                <hr className=" border-gray-300 dark:border-gray-700"/>

                <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 my-2">Description:</h2>
                    <div className="text-sm text-gray-700 dark:text-gray-300"
                         dangerouslySetInnerHTML={{__html: job.description}}/>
                </div>
            </div>


            <h2 className="text-2xl font-bold mx-2 text-gray-900 dark:text-white">
                List of Applicants
            </h2>

            <div
                className="flex  p-4 items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="inline-flex items-center w-44 justify-center text-gray-500 bg-white border border-gray-300 focus:outline-none
                hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800
                dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                    >
                        Filter
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div
                            className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 divide-y divide-gray-100 text-sm text-gray-700 dark:text-gray-200">
                                <li>
                                    <button
                                        onClick={() => handleFilterClick("All")}
                                        className="block  w-full px-2 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        All Applicants
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleFilterClick("Accepted")}
                                        className="block w-full px-2 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Accepted Applicants
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleFilterClick("Pending")}
                                        className="block w-full px-2 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Pending Applicants
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div
                        className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for applicants"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            {selectedApplicantId && (
                <ApplicantInfoCard
                    applicantId={selectedApplicantId}
                    onClose={() => setSelectedApplicantId(null)}
                    job={job}
                    status={selectedApplicantStatus}
                />
            )}
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
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredAppliers.length > 0 ? (
                        filteredAppliers.map((applicant) => (
                            <tr key={applicant._id}
                                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={applicant.picturePath || AvatarProfile}
                                            alt={applicant.firstname}
                                            className="w-10 h-10 object-cover rounded-full"
                                        />
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {applicant.firstname} {applicant.lastname}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {applicant.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {applicant.skills.map(skill => skill.name).join(', ')}
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`flex items-center`}>
                                        <div
                                            className={`h-2.5 w-2.5 rounded-full ${applicant.status === 'Accepted' ? 'bg-green-500' : 'bg-gray-500'} me-2`}></div>
                                        {applicant.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        className="text-blue-600 hover:text-blue-900"
                                        onClick={() => handleViewApplicant(applicant._id, applicant.status)}
                                    >
                                        View
                                    </button>

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
