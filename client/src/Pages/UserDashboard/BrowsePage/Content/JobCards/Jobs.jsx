import React, { useState } from "react";
import { useJobs } from "../../../../../hooks/react-query/useJobs";
import JobCard from "../../../../../Components/shared/cards/JobCard";


const Jobs = ({ jobQuery , selectedCategory ,selectedSkill }) => {
  // ==============================|| JOB CARD MODAL ||============================== //
  const [openJobModal, setOpenJobModal] = useState(false);
  
  const handleClickOpenModalJob = () => {
    setOpenJobModal(true);
  };
  

  const { data: jobs } = useJobs();

  return (
    <div>
     
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 lg:grid-cols-3"
        onClick={handleClickOpenModalJob}
      >
      
        {jobs?.filter((job) =>
      job.title.toLowerCase().includes(jobQuery.toLowerCase()) &&
      (selectedCategory?.length === 0  || selectedCategory?.some((Category)=> job.category.includes(Category))) &&
      (selectedSkill?.length === 0 || selectedSkill?.some((skill) => job.RecommendedSkills.includes(skill)))
        ).length > 0 ? (
          jobs.map((job) =>
            job.title.toLowerCase().includes(jobQuery.toLowerCase()) &&   
            (selectedCategory?.length === 0  || selectedCategory?.some((Category)=> job.category.includes(Category))) &&
            (selectedSkill.length === 0 || selectedSkill.some((skill) => job.RecommendedSkills.includes(skill))) ? (
              <div key={job._id}>
                <JobCard job={job} />
              </div>
            ) : null
          )
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
