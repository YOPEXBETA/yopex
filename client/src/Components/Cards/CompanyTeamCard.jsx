import React, {useState} from "react";
import Card from ".";
import {useUsersData} from "../../hooks/react-query/useUsers";

const CompanyTeamCard = ({ company, extra }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const { data: usersData, isLoading, isError } = useUsersData(page, searchQuery);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users</p>;
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  console.log(usersData);
  return (
    <div>
      <Card extra={`p-3 ${extra}`}>
        <div className="flex flex-col items-center w-full">
          <div className="mt-2 mb-8 w-full">
            <p className="px-2 text-lg font-bold dark:text-white">
              {company?.organizationName} Team ({company.organizationMembers.length})
            </p>
          </div>

          <span className="text-gray-600">
            You haven't added any team members to your squad yet.
          </span>
          <div className="flex flex-row w-full mt-4">
            <input
              type="text"
              className="rounded-md flex-grow border border-gray-400 focus:border-red-400"
              placeholder="Search for members"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="ml-4 px-4 rounded-black border-black border rounded-md bg-red-400 text-white border-0 hover:bg-red-600 transition-all ease-in-out">
              Send Invitation
            </button>
          </div>
          <span className="text-sm text-gray-600 mt-4 w-full align-left tracking-wider">
            RECOMMENDED TEAM MEMBERS
          </span>
          <div className="grid grid-cols-2 mt-4 w-full gap-4">
            {usersData?.users.map((user) => (
                <div key={user._id} className="flex flex-row rounded-full w-full border border-black p-2 gap-4 items-center">
                  <div className="flex-shrink w-12 h-12 bg-black rounded-full"></div>
                  <div className="flex-grow flex flex-col">
                    <span className="text-lg text-gray-800">{user.firstname}</span>
                    <span className="text-base text-gray-600">{user.lastname}</span>
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CompanyTeamCard;
