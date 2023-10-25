import React from "react";
import { useSelector } from "react-redux";
//import { useUserById } from "../../../hooks/react-query/useUsers";
import { formatDistance } from "date-fns";
import { useApplyJob } from "../../../hooks/react-query/useJobs";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const JobOfferModal = ({ open, handleClose, job }) => {
  // Global states |  @redux/toolkit
  const { user } = useSelector((state) => state.auth);
  const { mutate: applyToJob } = useApplyJob(job, user?._id);

  // React-hook-form
  const onclick = () => {
    applyToJob();
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"}`}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-transparent absolute inset-0 flex justify-center items-center">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl w-full h-full">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-8 md:col-span-9 lg:col-span-8 xl:col-span-8">
                {" "}
                <div className="p-4 border col-span-8 sm:col-span-4">
                  <div className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={job?.company?.companyLogo}
                          alt="Icon"
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-lg font-bold dark:text-gray-200">
                            {job.title}
                          </p>
                          <p className="dark:text-gray-200">
                            By {job?.company?.companyName}
                          </p>
                        </div>
                      </div>
                      <button
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                    </div>

                    <hr className="my-4 border-t" />
                    <div>
                      <p className="text-md font-semibold dark:text-gray-200 mb-4">
                        Job Description
                      </p>
                      <div
                        className="text-md dark:text-white mb-4"
                        dangerouslySetInnerHTML={{ __html: job?.description }}
                      />
                    </div>
                    <hr className="my-4 border-t" />

                    <div className="flex justify-between">
                      <p className="text-md font-semibold dark:text-gray-200">
                        Posted from
                      </p>
                      <p className="text-md font-normal text-green-500">
                        {formatDistance(new Date(job?.createdAt), new Date(), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <hr className="my-2" />
                </div>
              </div>
              <div className="hidden sm:block border col-span-4 md:col-span-3 lg:col-span-4 xl:col-span-4">
                <div className="flex flex-col items-center justify-center gap-4 mt-8">
                  <img
                    src={job?.company?.companyLogo}
                    alt="Icon"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="dark:text-gray-200">
                      By {job?.company?.companyName}
                    </p>
                  </div>
                  <div className="flex dark:bg-zinc-800 justify-between px-4 py-2 bg-white">
                    <Link to={`/company/${job.company._id}`}>
                      <button className="bg-green-500 hover:bg-green-700 text-white px-6 py-4 rounded w-96">
                        <div className="flex items-center justify-center">
                          <FaEye className="mr-2" />
                          <p>View Profile</p>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="flex dark:bg-zinc-800 justify-between px-4 py-2 bg-white">
                  {user && !user.companies.includes(job.company._id) && (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
                      onClick={onclick}
                    >
                      Apply
                    </button>
                  )}
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
