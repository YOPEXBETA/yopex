import React from 'react';
import { useUserById } from "../../hooks/react-query/useUsers";
import {useAcceptApplier} from "../../hooks/react-query/useJobs";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";
import {
    FaFacebook,
    FaTwitter,
    FaGithub,
    FaInstagram,
    FaBehance,
    FaDribbble,
    FaLinkedinIn,
    FaLinkedin
} from 'react-icons/fa';

const ApplicantInfoCard = ({ applicantId, onClose, job, status }) => {
    const { data: applicant } = useUserById(applicantId);
    const jobId = job._id;
    const acceptApplier = useAcceptApplier(jobId); // Call the hook

    const handleAccept = async () => {
            await acceptApplier.mutateAsync(applicantId);
    };
    console.log('applicant', applicant);
    const icons = {
        github: <FaGithub className="h-8 w-8" />,
        linkedin: <FaLinkedin className="h-8 w-8" />,
        behance: <FaBehance className="h-8 w-8" />,
        dribbble: <FaDribbble className="h-8 w-8" />,
        instagram: <FaInstagram className="h-8 w-8" />,
    };

    const platformColors = {
        github: 'bg-gray-800 hover:bg-gray-700',
        linkedin: 'bg-blue-700 hover:bg-blue-500',
        behance: 'bg-blue-500 hover:bg-blue-400',
        dribbble: 'bg-pink-500 hover:bg-pink-400',
        instagram: 'bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-500 hover:from-pink-400 hover:via-purple-400 hover:to-yellow-400',
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div
                className="relative font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover"
            >
                <div className="max-w-5xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-12  lg:my-0">
                    {/* Main Column */}
                    <div
                        id="profile"
                        className="relative w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none opacity-90 bg-white mx-6 lg:mx-0"
                    >
                        {/* X Button for Closing */}
                        <button
                            className="absolute top-4 right-4 bg-red-500 text-white rounded-full h-6 w-6"
                            onClick={onClose}
                        >
                            X
                        </button>

                        <div
                            className="block lg:hidden rounded-full shadow-xl mx-auto -mt-46 h-48 w-48 bg-cover bg-center">
                            <img
                                src={applicant?.picturePath || AvatarProfile}
                                alt="Profile picture"
                                className="w-full h-full rounded-full object-cover"
                            />
                            <h1 className="text-xl font-bold my-2">About Me</h1>
                            <p className="pt-4 text-base text-gray-600 break-words overflow-y-auto"
                               style={{maxHeight: 'calc(100% - 56px)'}}
                            >
                                {applicant?.userDescription || "No description available ."}
                            </p>
                        </div>
                        <div className="p-4 md:p-12 text-center lg:text-left">
                            {/* Image for mobile view */}
                            <div
                                className="block lg:hidden rounded-full mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                                style={{backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')"}}
                            ></div>

                            <h1 className="text-3xl font-bold pt-8 lg:pt-0">
                                {applicant?.firstname} {applicant?.lastname}
                            </h1>
                            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>

                            {/* Occupation, Country, Score, and Rank */}
                            <div className="flex flex-col items-center lg:items-start">
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                                    <svg
                                        className="h-4 fill-current text-green-700 pr-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"
                                        />
                                    </svg>
                                    {applicant?.occupation?.name || "Job Seeker"}
                                </p>

                                <p className="pt-2 text-base font-semibold lg:text-sm flex items-center justify-center lg:justify-start">
                                    <svg
                                        className="h-4 fill-current text-green-700 pr-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z"
                                        />
                                    </svg>
                                    {applicant?.country}
                                </p>

                                <div className="flex flex-col items-center lg:items-start">
                                    {/* Score */}
                                    <p className="pt-2 text-xs lg:text-sm flex items-center">
                                        <svg
                                            className="h-4 fill-current text-green-700 pr-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2a10 10 0 110 20 10 10 0 010-20zm1 5h-2v6h6v-2h-4V7z"/>
                                        </svg>
                                        <strong className="text-base">Score: </strong> {applicant?.score || "N/A"}
                                    </p>

                                    {/* Rank */}
                                    <p className="pt-2 text-xs lg:text-sm flex items-center">
                                        <svg
                                            className="h-4  fill-current text-green-700 pr-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 2l3.09 6.26L22 9.27l-5 4.87L17.18 22 12 18.9 6.82 22 8 14.14l-5-4.87 6.91-1.01L12 2z"/>
                                        </svg>
                                        <strong className="text-base">Rank:</strong> {applicant?.rank || "N/A"}
                                    </p>

                                    {/* Challenges */}
                                    <p className="pt-2 text-xs lg:text-sm flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor"
                                             className="h-4 text-green-700 pr-4">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"/>
                                        </svg>
                                        <strong
                                            className="text-base">Challenges:</strong> {applicant?.challenges?.length + applicant?.teamChallenges?.length || "N/A"}
                                    </p>
                                </div>

                            </div>

                            {/* Skills and Challenges */}
                            <div className="pt-4 text-sm mb-3">
                                <h3 className="font-bold">Skills:</h3>
                                <ul className="list-disc list-inside">
                                    {applicant?.skills?.map((skill, index) => (
                                        <li key={index}>{skill?.name}</li>
                                    )) || "No skills listed"}
                                </ul>
                            </div>
                            <div
                                className="mt-4 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between"
                            >
                                {applicant?.socialMediaLinks?.map((link) => (
                                    <a
                                        key={link.platform}
                                        href={link.url || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group w-12 hover:w-44 h-12  relative ${platformColors[link.platform] || 'bg-gray-700 hover:bg-gray-600'} rounded-md text-neutral-50 duration-700 before:duration-700 before:hover:500 font-bold flex justify-start pl-2 items-center before:absolute before:-z-10 before:left-8 before:hover:left-40 `}
                                        data-tippy-content={`@${link.platform}`}
                                    >
                                        {icons[link.platform] || <span className="text-neutral-500">?</span>}

                                        <span
                                            className="absolute left-8 opacity-0 group-hover:opacity-100 px-1 transition-opacity duration-300 border-l-2 transform translate-x-4"
                                        >
                                        {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                                        </span>
                                        <span
                                            className={`absolute inset-0 ${platformColors[link.platform] || 'bg-gray-700'} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                        ></span>
                                    </a>
                                ))}
                            </div>

                        </div>
                        {status === "Pending" ?
                            (<div className=" pb-6 text-center">
                                <button
                                    className="bg-green-700 mr-20 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
                                    onClick={handleAccept}>
                                    Accept
                                </button>
                                <button
                                    className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full">
                                    Refuse
                                </button>
                            </div>) : status === "Accepted" ? (
                                    <div className=" pb-6 text-center">
                                <p className="pt-4 pb-2 text-green-700 font-bold">
                                    Applicant Already Accepted
                                </p>
                                    </div>
                            ) : null}
                    </div>

                    {/* Image Container */}
                    <div
                        className=" hidden lg:block w-full lg:w-2/5 bg-white shadow-[rgba(0,0,15,0.5)_-5px_0px_8px_0px] relative flex-col items-center justify-between lg:rounded-lg overflow-hidden"
                        style={{minHeight: '80vh'}}
                    >
                        <div className="w-full h-full flex flex-col">
                            <div className="flex-grow flex items-center justify-center">
                                <img
                                    src={applicant?.picturePath || AvatarProfile}
                                    alt="Profile picture"
                                    className="w-full h-full object-cover lg:rounded-t-lg"
                                    style={{minHeight: '60%'}}
                                />
                            </div>

                            {/* About Me Section - occupies 1/3 of the space */}
                            <div className="flex-shrink-0 flex flex-col justify-end bg-white lg:rounded-b-lg p-2">
                                <h1 className="text-xl font-bold my-2">About Me</h1>
                                <p className="pt-4 text-base text-gray-600 break-words overflow-y-auto"
                                   style={{maxHeight: 'calc(100% - 56px)'}}
                                >
                                    {applicant?.userDescription || "No description available ."}
                                </p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ApplicantInfoCard;
