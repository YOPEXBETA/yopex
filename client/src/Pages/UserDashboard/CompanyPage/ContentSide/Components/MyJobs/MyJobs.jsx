import React from "react";
import { useParams } from "react-router-dom";
import { useJobById } from "../../../../../../hooks/react-query/useJobs";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import JobCard from "../../../../../../Components/Cards/JobCard";

const MyCompanyJobs = () => {
  const { companyId } = useParams();
  const { data: companyJobs, isLoading } = useJobById(companyId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 gap-4 py-5">
        {companyJobs?.length > 0 ? (
          companyJobs?.map((job) => (
            <JobCard key={job?._id} companyJobs={companyJobs} job={job} />
          ))
        ) : (
          <p className="dark:text-white">No jobs found.</p>
        )}
      </div>
    </div>
  );
};
export default MyCompanyJobs;
