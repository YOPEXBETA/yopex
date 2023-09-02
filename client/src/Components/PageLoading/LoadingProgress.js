import React, { useState, useEffect } from "react";

const LoadingProgress = ({ duration, backgroundColor }) => {
  const [loadingWidth, setLoadingWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingWidth((prevWidth) => (prevWidth < 300 ? prevWidth + 1 : 300));
    }, duration);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div>
      <div spacing={1}>
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div
              className={`w-[300px] rounded-full bg-${backgroundColor} border-2 border-gray-200`}
            >
              <div
                className={`h-[0.35rem] bg-green-500 rounded-full`}
                style={{ width: `${loadingWidth}px` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-xs text-center p-0.5 leading-none rounded-full">
              <span className="text-black font-medium">
                {Math.floor((loadingWidth / 300) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingProgress;
