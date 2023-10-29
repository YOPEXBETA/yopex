import React from "react";
import ContentSide from "./components/ContentSide";

const LeaderBoardLayout = () => {
  return (
    <div className=" lg:h-screen dark:bg-zinc-800  min-h-screen ">
      <div className="grid dark:bg-zinc-800   grid-cols-2 md:grid-cols-12 xl:px-48 lg:px-20 md:px-6 px-0 pb-16 md:pb-10 md:py-11 py-2 bg-white mb-24">
        <div className="col-span-12">
          <ContentSide />
        </div>
      </div>
    </div>
  );
};
export default LeaderBoardLayout;
