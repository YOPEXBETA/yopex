import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { useJobById } from "../../../../../../hooks/react-query/useJobs";
import JobCard from "../../../../../../Components/shared/cards/JobCard";

const MyCompanyJobs = () => {
  const { companyId } = useParams();
  console.log(companyId);
  const { data: companyJobs, isLoading } = useJobById(companyId);
  console.log("companyJobs",companyJobs);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-11 py-5">
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
