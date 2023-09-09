import React from "react";
import { useParams } from "react-router-dom";
import { useJobById } from "../../../../../../hooks/react-query/useJobs";
import JobCard from "../../../../../../Components/shared/cards/JobCard";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";

const MyCompanyJobs = () => {
  const { companyId } = useParams();
  console.log(companyId);
  const { data: companyJobs, isLoading } = useJobById(companyId);
  console.log("companyJobs", companyJobs);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5">
        {companyJobs.length > 0 ? (
          companyJobs.map((job) => (
            <JobCard key={job._id} companyJobs={companyJobs} job={job} />
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};
export default MyCompanyJobs;
