import React, { useState } from "react";
import { useParams } from "react-router-dom";

import {
  useAppliers,
  useJobById,
} from "../../../../../../hooks/react-query/useJobs";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import JobAppliersCard from "../../../../../../Components/shared/cards/Jobs/JobAppliersCard";
import JobAppliersModal from "../../../../../../Components/shared/cards/Jobs/JobAppliersModal";

const JobAppliers = () => {
  const { companyId } = useParams();
  const { data: jobData, isLoading: jobsLoading } = useJobById(companyId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  if (jobsLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:md:grid-cols-3 lg:md:grid-cols-3 md:grid-cols-2 gap-4 py-2">
      {jobData?.length > 0 ? (
        jobData.map((job) => (
          <JobAppliersCard
            key={job._id}
            job={job}
            onCardClick={handleCardClick}
          />
        ))
      ) : (
        <p className="dark:text-white p-3">No job application found.</p>
      )}
      {isModalOpen && (
        <JobAppliersModal
          jobId={selectedJob?._id}
          onClose={() => setIsModalOpen(false)}
          isModalOpen={() => setIsModalOpen(true)}
        />
      )}
    </div>
  );
};
export default JobAppliers;
