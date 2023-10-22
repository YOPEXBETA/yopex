import React from "react";

const LinearProgress = () => (
  <div className="fixed top-0 left-0 z-50 w-full">
    <div className="mb-5 h-1 overflow-hidden rounded-full bg-gray-200">
      <div className="h-1 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-green-500"></div>
    </div>
  </div>
);

export default LinearProgress;
