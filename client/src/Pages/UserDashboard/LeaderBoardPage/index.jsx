import React from "react";
import ContentSide from "./components/ContentSide";

const LeaderBoardLayout = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12 xl:px-48 lg:px-20 md:px-6 px-0 pb-16 md:pb-10 md:py-11 py-2 bg-white h-screen mb-24">
      <div className="col-span-12">
        <ContentSide />
      </div>
    </div>
  );
};
export default LeaderBoardLayout;
