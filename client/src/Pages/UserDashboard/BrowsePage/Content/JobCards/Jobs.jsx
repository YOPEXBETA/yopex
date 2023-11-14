import React, { useState } from "react";
import { useJobs } from "../../../../../hooks/react-query/useJobs";
import JobCard from "../../../../../Components/shared/cards/JobCard";
import LoadingSpinner from "../../../../../Components/LoadingSpinner";

const Jobs = ({ jobQuery, selectedCategory, selectedSkill }) => {
  // ==============================|| JOB CARD MODAL ||============================== //
  const [openJobModal, setOpenJobModal] = useState(false);

  const handleClickOpenModalJob = () => {
    setOpenJobModal(true);
  };

  const { data: jobs, isLoading } = useJobs();
  console.log(jobs);

  const sortedJobs = jobs
    ? jobs.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  const filteredJobs = sortedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(jobQuery.toLowerCase()) &&
      (selectedCategory?.length === 0 ||
        selectedCategory?.some((Category) =>
          job.category.includes(Category)
        )) &&
      (selectedSkill?.length === 0 ||
        selectedSkill?.some((skill) => job.RecommendedSkills.includes(skill)))
  );

  console.log("Fetched Jobs:", jobs); // Check the fetched jobs
  console.log("Sorted Jobs:", sortedJobs);
  console.log("Filtered Jobs:", filteredJobs);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-2 xl:grid-cols-1 mb-16 xl:mb-4">
        {isLoading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1  md:grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3 mb-20">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job._id} onClick={() => handleClickOpenModalJob(job)}>
                  <JobCard job={job} />
                </div>
              ))
            ) : (
              <p className="dark:text-white">No jobs found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
