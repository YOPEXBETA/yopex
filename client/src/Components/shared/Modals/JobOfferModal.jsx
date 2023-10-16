import React from "react";
import { useSelector } from "react-redux";
//import { useUserById } from "../../../hooks/react-query/useUsers";
import { formatDistance } from "date-fns";
import { useApplyJob } from "../../../hooks/react-query/useJobs";

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
      onClick={handleClose}
    >
      <div className="flex justify-center  items-center min-h-screen">
        <div className="bg-transparent  absolute inset-0 flex justify-center items-center">
          <div className="bg-white dark:bg-zinc-800  rounded-lg shadow-xl w-full max-w-lg">
            <div className="p-8">
              <div className="flex items-center gap-4">
                <img
                  src={job?.company?.companyLogo}
                  alt="Icon"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="text-lg font-bold dark:text-gray-200">{job.title}</p>
                  <p className="dark:text-gray-200">By {job?.company?.companyName}</p>
                </div>
              </div>

              <hr className="my-4 border-t" />

              <p className="mb-4 dark:text-gray-200">{job?.description}</p>

              <hr className="my-4 border-t" />

              <div className="flex justify-between">
                <p className="text-md font-semibold dark:text-gray-200">Posted from</p>
                <p className="text-md font-normal text-green-500">
                  {formatDistance(new Date(job?.createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <hr className="my-2" />

            <div className="flex dark:bg-zinc-800 justify-between px-4 py-2 bg-white">
              <button
                className="border-2 border-green-500 dark:hover:bg-green-500 dark:text-gray-200 hover:bg-gray-200 text-green-500 px-4 py-2 rounded"
                onClick={handleClose}
              >
                Cancel
              </button>
              {user && !user.companies.includes(job.company._id) && (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
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
  );
};

export default JobOfferModal;
