import React from "react";
import ContentSide from "./components/ContentSide";

const LeaderBoardLayout = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12 px-48 py-11">
      <div className="col-span-12">
        <ContentSide />
      </div>
    </div>
  );
};
export default LeaderBoardLayout;
