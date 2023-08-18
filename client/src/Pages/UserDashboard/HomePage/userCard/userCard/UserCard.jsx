import React from "react";
import { useSelector } from "react-redux";
import LevelLoading from "./LevelLoading";

const UserCard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="rounded-lg p-5 bg-white border-green-500 border-b-2 h-full shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <img
              src={user.picturePath}
              alt=""
              className="w-24 h-24 rounded-full object-cover bg-green-500"
            />
            <p className="text-xl font-md">
              {`${user.firstname} ${user.lastname}`}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <LevelLoading />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
