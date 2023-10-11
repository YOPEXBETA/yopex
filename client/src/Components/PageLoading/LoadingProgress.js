import React from "react";

const LinearProgress = () => (
  <div className="fixed top-0 left-0 z-50 w-full">
    <div className="bg-gray-300 h-1">
      <div className="bg-green-500 h-1" style={{ width: "50%" }}></div>
    </div>
  </div>
);

export default LinearProgress;
