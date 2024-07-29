import React from "react";
import { useParams } from "react-router-dom";
import { useJobById } from "../../../../../hooks/react-query/useJobs";
import LoadingSpinner from "../../../../../Components/LoadingSpinner";
import WorkCard from "../../../../../Components/Cards/WorkCard";
import PostJobCard from "../../../../../Components/Cards/PostJobCard";

const MyOrganizationJobs = () => {
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
      <div>
        {organizationJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4">
            {organizationJobs.map((job) => (
              <WorkCard key={job?._id} job={job} />
            ))}
          </div>
        ) : (
          <div>
            <PostJobCard />
          </div>
        )}
      </div>
  </div>
  );
};
export default MyOrganizationJobs;
