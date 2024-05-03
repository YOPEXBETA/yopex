import React from "react";
import Card from ".";

const CompanyTeamCard = ({ company, extra }) => {
  console.log(company);
  return (
    <div>
      <Card extra={`p-3 ${extra}`}>
        <div className="flex flex-col items-center w-full">
          <div className="mt-2 mb-8 w-full">
            <p className="px-2 text-lg font-bold dark:text-white">
              {company?.companyName} Team ({company.user.length})
            </p>
          </div>

          <span className="text-gray-600">
            You haven't added any team members to your squad yet.
          </span>
          <div className="flex flex-row w-full mt-4">
            <input
              type="text"
              className="rounded-md flex-grow border border-gray-400 focus:border-red-400"
            />
            <button className="ml-4 px-4 rounded-black border-black border rounded-md bg-red-400 text-white border-0 hover:bg-red-600 transition-all ease-in-out">
              Send Invitation
            </button>
          </div>
          <span className="text-sm text-gray-600 mt-4 w-full align-left tracking-wider">
            RECOMMENDED TEAM MEMBERS
          </span>
          <div className="grid grid-cols-2 mt-4 w-full gap-4">
            <div className="flex flex-row rounded-full w-full border border-black p-2 gap-4 items-center">
              <div className="flex-shrink w-12 h-12 bg-black rounded-full"></div>
              <div className="flex-grow flex flex-col">
                <span className="text-lg text-gray-800">Robert Downey Jr.</span>
                <span className="text-base text-gray-600">
                  Founder of Stark
                </span>
              </div>
              <div className="flex-shrink w-12 h-12 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-row rounded-full w-full border border-black p-2 gap-4 items-center">
              <div className="flex-shrink w-12 h-12 bg-black rounded-full"></div>
              <div className="flex-grow flex flex-col">
                <span className="text-lg text-gray-800">
                  Benedict Cumberbatch
                </span>
                <span className="text-base text-gray-600">Dr. Strange</span>
              </div>
              <div className="flex-shrink w-12 h-12 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CompanyTeamCard;
