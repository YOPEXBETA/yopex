import React from "react";
import MTable from "./Components/ParticipantsTableSection/ParticipantsTable";
import ChooseWinner from "./Components/Winner/winner";
import CompanyCard from "./Components/ChallengeDescription/Client";
import TasksDescription from "./Components/ChallengeDescription/TaskDescription";

const ContentSide = ({ value, changeValue }) => {
  return (
    <div className="space-y-2">
      {value === 0 && (
        <div className="grid grid-cols-12 gap-2">
          <div className="lg:col-span-8 md:col-span-8 sm:col-span-12 col-span-12">
            <TasksDescription />
          </div>
          <div className="hidden lg:block md:block lg:col-span-4 md:col-span-4 sm:col-span-12 col-span-12">
            <CompanyCard />
          </div>
        </div>
      )}
      {value === 1 && (
        <div className="lg:col-span-12 md:col-span-12">
          <MTable />
        </div>
      )}
      {value === 2 && (
        <div className="lg:col-span-12 md:col-span-12">
          <ChooseWinner />
        </div>
      )}
    </div>
  );
};

export default ContentSide;
