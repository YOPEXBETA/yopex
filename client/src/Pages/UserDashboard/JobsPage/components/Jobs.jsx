import React, { useState } from "react";
import { useJobs } from "../../../../hooks/react-query/useJobs";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import JobCard from "../../../../Components/Cards/JobCard";
import WorkCard from "../../../../Components/Cards/WorkCard";

const Jobs = ({
  searchQuery,
  selectedSkill,
  selectedJobType,
  selectedOfferType,
}) => {
  // ==============================|| JOB CARD MODAL ||============================== //
  const [openJobModal, setOpenJobModal] = useState(false);

  const handleClickOpenModalJob = () => {
    setOpenJobModal(true);
  };

  const { data: jobs, isLoading } = useJobs(
    searchQuery,
    selectedSkill,
    selectedJobType,
    selectedOfferType
  );

  const sortedJobs = jobs
    ? jobs.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-2 xl:grid-cols-1 mb-16 xl:mb-4">
        {isLoading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-2">
            {sortedJobs?.length > 0 ? (
              sortedJobs?.map((job) => (
                <div key={job._id} onClick={() => handleClickOpenModalJob(job)}>
                  <WorkCard job={job} />
                </div>
              ))
            ) : (
              <p className="dark:text-white">No job found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
