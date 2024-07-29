import React from "react";
import { useParams } from "react-router-dom";
import { useJobById } from "../../../../../../hooks/react-query/useJobs";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import WorkCard from "../../../../../../Components/Cards/WorkCard";

const MyCompanyJobs = () => {
  const { organizationId } = useParams();
  const { data: organizationJobs, isLoading } = useJobById(organizationId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4">
        {organizationJobs?.length > 0 ? (
          organizationJobs?.map((job) => (
            <WorkCard key={job?._id} organizationJobs={organizationJobs} job={job} />
          ))
        ) : (
          <p className="dark:text-white">No jobs found.</p>
        )}
      </div>
    </div>
  );
};
export default MyCompanyJobs;
