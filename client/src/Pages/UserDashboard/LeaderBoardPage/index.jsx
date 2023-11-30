import React, { useState } from "react";
import { useUsers } from "../../../hooks/react-query/useUsers";
import LeaderboardDetailCard from "./components/LeaderboardDetailCard";
import ContentSide from "./components/ContentSide";

const LeaderBoardLayout = () => {
  const { data, isLoading } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRowSelect = (user) => {
    setSelectedUser(user);
  };
  return (
    <div className="mx-auto container dark:bg-zinc-800">
      <div className="grid grid-cols-12 xl:gap-2 lg:gap-4 md:gap-2 xl:py-6 py-0 xl:mx-16 ">
        <div className="xl:col-span-4 lg:col-span-12 md:col-span-12 col-span-12">
          <LeaderboardDetailCard data={selectedUser} />
        </div>
        <div className="xl:col-span-8 lg:col-span-12 md:col-span-12  col-span-12 xl:space-y-2 lg:space-y-2 md:space-y-2 ">
          <ContentSide
            data={data}
            onSelect={handleRowSelect}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
export default LeaderBoardLayout;
