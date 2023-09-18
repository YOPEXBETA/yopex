import React from "react";
import { useSelector } from "react-redux";
import LevelLoading from "./LevelLoading";

const UserProgressCard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="rounded-lg px-6 py-[1.15rem] bg-white border-green-500 border-b-2 h-full shadow-md">
        <div className="flex flex-col space-y-5">
          <div className="flex items-center gap-4">
            <img
              src={user.picturePath}
              alt="photo"
              className="w-20 h-20 rounded-full object-cover border-2"
            />
            <div className=" space-y-1">
              <p className="text-lg font-md">
                {`${user.firstname} ${user.lastname}`}
              </p>
              <p className="text-md font-md text-zinc-500">{user.country}</p>
            </div>
          </div>

          <LevelLoading />
        </div>
      </div>
    </div>
  );
};

export default UserProgressCard;
