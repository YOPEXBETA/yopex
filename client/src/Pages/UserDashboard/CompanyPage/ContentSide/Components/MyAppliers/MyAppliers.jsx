import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import {  useUserChallenges } from "../../../../../../hooks/react-query/useChallenges";
import ChallengeCard from "../../../../../../Components/shared/cards/ChallengeCard";
import { useAppliers, useJobById, useJobs } from "../../../../../../hooks/react-query/useJobs";
import ApplierCard from "../../../../../../Components/shared/cards/ApplierCard";
import { useAcceptedAppliers } from "../../../../../../hooks/react-query/useJobs";

const MyAppliersJob = () => {
    const { companyId } = useParams();
  const { data: jobData, isLoading: jobsLoading } = useJobById(companyId);
  const jobIds = jobData?.map((job) => job._id) ;
  console.log(jobIds);
  const { data: appliersChallenges, isLoading: appliersLoading } = useAppliers(jobIds);
  const { data: AcceptedAppliers, isLoading: AcceptedApplierLoading } = useAcceptedAppliers(jobIds);
  const Accepted = AcceptedAppliers?.map((Accepted)=> Accepted.user)
  console.log(Accepted);
  
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + 1);

  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(currentTime.getHours() - 24);

  
  

 if (jobsLoading || appliersLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-5">
      {appliersChallenges?.length > 0 ? (
  jobData.map((job) => (
    appliersChallenges
      .flat()
      .filter((applier) => {
        const acceptedApplier = AcceptedAppliers?.find(
          (accepted) => accepted.user === applier._id
        );
          const date = new Date();
          const acceptedDate = new Date (acceptedApplier?.dateAccepted)
          acceptedDate.setHours(acceptedDate.getHours()-1)
    
        const isAccepted = acceptedApplier && date.getTime() - acceptedDate.getTime() >=   24 * 60 * 60 * 1000;

        return !isAccepted ; // Filter out the appliers who have been accepted or whose dateAccepted is more than 24 hours ago
      })
      .filter((applier) =>
        Array.isArray(applier.jobs) && applier.jobs.includes(job._id)
      )
      .map((applier) => (
        <ApplierCard key={applier._id} Applier={applier} jobId={job} />
      ))
  ))
) : (
  <p>No Appliers found.</p>
)}
      </div>
    </div>
  );
};
export default MyAppliersJob;
