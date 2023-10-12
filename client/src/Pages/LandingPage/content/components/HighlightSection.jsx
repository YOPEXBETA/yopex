import React from "react";
import { useUsers } from "../../../../hooks/react-query/useUsers";
import { useAdminCompanies } from "../../../../hooks/react-query/useCompany";
import { useJobs } from "../../../../hooks/react-query/useJobs";
import { useFindChallenges } from "../../../../hooks/react-query/useChallenges";

const HighlightSection = () => {
  const { data: users } = useUsers();
  const { data: jobs } = useJobs();
  const { data: companies } = useAdminCompanies();
  const { data: challenges } = useFindChallenges();

  return (
    <div>
      <div className="mx-auto py-4 lg:px-24 md:px-11 bg-cover border-b-[1px] bg-white border-gray-500">
        <div className="text-center text-black flex flex-col items-center gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 items-center lg:gap-48 gap-10 md:gap-32">
            <div className="p-4 flex flex-col items-center gap-2">
              <div>
                <h4 className=" text-5xl font-semibold mb-1 text-green-500">
                  {users?.length}
                </h4>
                <p className="text-2xl font-medium">users</p>
              </div>
            </div>
            <div className="p-4 flex flex-col items-center gap-2">
              <div>
                <h4 className="text-5xl font-semibold mb-1 text-green-500">
                  {" "}
                  {companies?.length}
                </h4>
                <p className="text-2xl font-medium">Companies</p>
              </div>
            </div>

            <div className="p-4 flex flex-col items-center gap-2">
              <div>
                <h4 className="text-5xl font-semibold mb-1 text-green-500 ">
                  {jobs?.length}
                </h4>
                <p className="text-2xl font-medium">Jobs</p>
              </div>
            </div>
            <div className="p-4 flex flex-col items-center gap-2">
              <div>
                <h4 className="text-5xl font-semibold mb-1 text-green-500 ">
                  {challenges?.length}
                </h4>
                <p className="text-2xl font-medium">Challenges</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightSection;
