import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";

const UserInfoCard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div class="w-full mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-4 transform transition-transform hover:scale-105">
        <div class="flex items-center justify-center">
          {user.picturePath ? (
            <img
              alt="picture"
              src={user.picturePath}
              className="w-28 h-28 rounded-full object-cover border-2"
            />
          ) : (
            <img
              alt="default"
              src={AvatarProfile}
              className="w-28 h-28 rounded-full object-cover border-2"
            />
          )}
        </div>
        <div class="text-center mt-4">
          <h2 class="text-2xl font-semibold">
            {" "}
            {`${user.firstname} ${user.lastname}`}
          </h2>
          <p class="text-gray-600">{user.country}</p>
        </div>
        <div class="text-center mt-4">
          <div class="flex items-center justify-around space-x-2">
            <div class="text-green-500">
              <span class="text-xl font-semibold">75%</span>
              <span class="block text-sm">Progress</span>
            </div>
            <div class="text-gray-600">
              <span class="text-xl font-semibold">350</span>
              <span class="block text-sm">Followers</span>
            </div>
            <div class="text-gray-600">
              <span class="text-xl font-semibold">280</span>
              <span class="block text-sm">Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
