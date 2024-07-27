import React from "react";
import OrganizationDescriptionCard from "../../../../Components/Cards/OrganizationDescriptionCard";
import PostJobCard from "../../../../Components/Cards/PostJobCard";
import PostChallengeCard from "../../../../Components/Cards/PostChallengeCard";
import TeamMembersListCard from "../../../../Components/Cards/TeamMembersListCard";
import MyOrganizationJobs from "./MyJobs/MyOrganizationJobs";

const OrganizationPageContent = ({ changeValue, value,currentOrganization }) => {
  return (
    <div className="mx-auto container">
      {value === 0 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full my-4">
          <OrganizationDescriptionCard currentOrganization={currentOrganization}/>
          </div>
        </div>
      )}

      {value === 1 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full my-4">
           <MyOrganizationJobs/>
          </div>
        </div>
      )}
      {value === 2 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full my-4">
            <PostChallengeCard/>
          </div>
        </div>
      )}
      {value === 3 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full my-4">
            <TeamMembersListCard currentOrganization={currentOrganization}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationPageContent;
