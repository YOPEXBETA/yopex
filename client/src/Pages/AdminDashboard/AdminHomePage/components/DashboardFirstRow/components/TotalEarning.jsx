import React from "react";
import { useSelector } from "react-redux";

const TotalEarning = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className=" px-4 py-6 h-full bg-gradient-to-t from-green-800 to-green-500 rounded-xl shadow-md border text-white">
      <div className=" space-y-3">
        <div className=" flex gap-3 items-center">
          <p className=" text-md items-end text-xl">Total Earning</p>
        </div>
        <p className=" font-bold text-2xl"> {user.balance}</p>
      </div>
    </div>
  );
};
export default TotalEarning;
