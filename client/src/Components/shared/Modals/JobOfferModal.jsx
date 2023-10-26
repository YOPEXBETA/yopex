import React from "react";
import { useSelector } from "react-redux";
import { formatDistance } from "date-fns";
import { useApplyJob } from "../../../hooks/react-query/useJobs";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";

const JobOfferModal = ({ open, handleClose, job }) => {
  // Global states |  @redux/toolkit
  const { user } = useSelector((state) => state.auth);
  const { mutate: applyToJob } = useApplyJob(job, user?._id);

  // React-hook-form
  const onclick = () => {
    applyToJob();
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"}`}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-transparent absolute inset-0 flex justify-center items-center">
          <button
            className="text-gray-400 absolute bg-zinc-900 rounded-full right-4 top-4  hover:bg-gray-200 hover:text-gray-900 text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl md:w-5/6 md:h-5/6 border h-screen w-screen overflow-y-auto max-h-full">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                <div className="flex flex-col items-center justify-center gap-4 mt-8">
                  <img
                    src={job?.company?.companyLogo}
                    alt="Icon"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-2xl font-bold dark:text-gray-200 mb-2">
                      {job.title}
                    </p>
                    <p className="dark:text-gray-200">
                      By {job?.company?.companyName}
                    </p>
                  </div>
                  <div className="flex dark:bg-zinc-800 items-center bg-white">
                    <Link to={`/company/${job.company._id}`}>
                      <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
                        <div className="flex items-center justify-center">
                          <FaEye className="mr-2" />
                          <p>View Profile</p>
                        </div>
                      </button>
                    </Link>
                    <div className="flex dark:bg-zinc-800 justify-between px-4 py-2 bg-white">
                      {user && !user.companies.includes(job.company._id) && (
                        <button
                          className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded"
                          onClick={onclick}
                        >
                          <div className="flex items-center justify-center">
                            <p className="mr-2">Apply Now</p>
                            <IoIosArrowForward />
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="mt-8 border-b" />
              </div>

              <div className="col-span-12  md:col-span-12 lg:col-span-8 xl:col-span-8">
                <div className="p-4 col-span-8 sm:col-span-4">
                  <div className="px-8">
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold dark:text-gray-200 mb-4">
                        Job Description
                      </p>
                      <div
                        className="text-md dark:text-white mb-4"
                        style={{ whiteSpace: "pre-line" }}
                        dangerouslySetInnerHTML={{ __html: job?.description }}
                      />
                    </div>

                    <hr className="my-4 border-t" />
                    <div className="flex flex-col justify-between my-4">
                      <p className="textlg font-semibold dark:text-gray-200 mb-2">
                        Recommended Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job?.RecommendedSkills?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-200 text-green-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <hr className="my-2" />
                    <div className="flex flex-col justify-between my-4">
                      <p className="text-lg font-semibold dark:text-gray-200 mb-2">
                        Categories
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job?.category?.map((category, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-200 text-green-700 rounded-full text-sm"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    <hr className="my-2" />
                  </div>

                  <div className="flex md:block lg:hidden w-full dark:bg-zinc-800 justify-between px-4 py-2 bg-white">
                    {user && !user.companies.includes(job.company._id) && (
                      <button
                        className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded  w-full"
                        onClick={onclick}
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden lg:block md:col-span-0 lg:col-span-4 xl:col-span-4 ">
                <div className="border mx-8 rounded-lg  px-8 py-2 flex flex-col gap-4">
                  <h2 className="text-lg font-semibold dark:text-gray-200 mt-2">
                    Job Overview
                  </h2>
                  <div className="flex gap-2">
                    <div className="rounded-full bg-green-200 w-12 h-12 text-lg flex items-center justify-center text-green-500">
                      <FaUsers />
                    </div>
                    <div>
                      <h2 className="text-left dark:text-white text-sm font-semibold">
                        Appliers
                      </h2>
                      <p className="dark:text-white">
                        {job?.appliers?.length} applier
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="rounded-full bg-green-200 w-12 h-12 text-lg flex items-center justify-center text-green-500">
                      <FaCalendarAlt />
                    </div>
                    <div className="mb-2">
                      <h2 className="text-left dark:text-white text-sm font-semibold">
                        Job Posted
                      </h2>
                      <p className="dark:text-white">
                        {formatDistance(new Date(job?.createdAt), new Date(), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOfferModal;
