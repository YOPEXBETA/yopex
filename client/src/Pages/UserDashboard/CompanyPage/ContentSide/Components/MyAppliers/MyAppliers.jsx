import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

import {
  useAppliers,
  useJobById,
} from "../../../../../../hooks/react-query/useJobs";
import ApplierCard from "../../../../../../Components/shared/cards/ApplierCard";
import { useAcceptedAppliers } from "../../../../../../hooks/react-query/useJobs";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";

const MyAppliersJob = () => {
  const [searchAppliers, setSearchAppliers] = useState("");

  const { companyId } = useParams();
  const { data: jobData, isLoading: jobsLoading } = useJobById(companyId);
  const jobIds = jobData?.map((job) => job?._id);
  const { data: appliersChallenges, isLoading: appliersLoading } =
    useAppliers(jobIds);
  const { data: AcceptedAppliers } = useAcceptedAppliers(jobIds);

  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + 1);

  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(currentTime.getHours() - 24);

  if (appliersLoading || jobsLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Find applier"
        className=" w-full p-3 border mt-2 rounded-full focus:outline-none dark:placeholder-gray-100  dark:bg-zinc-700 dark:border-zinc-800 dark:text-gray-100 dark:focus:border-green-600 focus:border-green-300 text-[#000000] bg-gray-100"
        onChange={(e) => setSearchAppliers(e.currentTarget.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-5">
        {appliersChallenges?.length > 0 ? (
          jobData.map((job) =>
            appliersChallenges
              .flat()
              .filter((applier) => {
                const acceptedApplier = AcceptedAppliers?.find(
                  (accepted) => accepted.user === applier._id
                );
                const date = new Date();
                const acceptedDate = new Date(acceptedApplier?.dateAccepted);
                acceptedDate.setHours(acceptedDate.getHours() - 1);

                const isAccepted =
                  acceptedApplier &&
                  date.getTime() - acceptedDate.getTime() >=
                    24 * 60 * 60 * 1000;

                return !isAccepted; // Filter out the appliers who have been accepted or whose dateAccepted is more than 24 hours ago
              })
              .filter(
                (applier) =>
                  Array.isArray(applier.jobs) && applier.jobs.includes(job._id)
              )
              .filter(
                (applier) =>
                  applier.firstname.toLowerCase().includes(searchAppliers) ||
                  applier.lastname.toLowerCase().includes(searchAppliers)
              )
              .map((applier) => (
                <ApplierCard key={applier._id} Applier={applier} jobId={job} />
              ))
          )
        ) : (
          <p className="dark:text-white p-3">No Applier found.</p>
        )}
      </div>
    </div>
  );
};
export default MyAppliersJob;
