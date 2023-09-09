import React, { useState } from "react";
import { useJobs } from "../../../../../hooks/react-query/useJobs";
import JobCard from "../../../../../Components/shared/cards/JobCard";

const Jobs = ({ jobQuery , selectedCategory }) => {
  // ==============================|| JOB CARD MODAL ||============================== //
  const [openJobModal, setOpenJobModal] = useState(false);

  const handleClickOpenModalJob = () => {
    setOpenJobModal(true);
  };

  const { data: jobs } = useJobs();
  console.log("jobs", jobs);
 console.log(selectedCategory);
  return (
    <div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 lg:grid-cols-3"
        onClick={handleClickOpenModalJob}
      >
        {jobs?.map(
          (job) =>
            // job.company._id !== user._id &&
           
            job.title.toLowerCase().includes(jobQuery.toLowerCase()) &&
             (selectedCategory === '' || job.category === selectedCategory) &&
             (
              <div key={job._id}>
                <JobCard job={job} />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Jobs;
