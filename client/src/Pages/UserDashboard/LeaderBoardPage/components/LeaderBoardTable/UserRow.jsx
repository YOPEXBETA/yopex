import React from "react";
import { Link } from "react-router-dom";
import AvatarProfile from "../../../../../assets/images/AvatarProfile.jpg";

const UserRow = ({ user }) => {
  return (
    <tr
      key={user?._id}
      className="hover:bg-gray-50 dark:hover:bg-zinc-800 bg-white dark:bg-zinc-600"
    >
      <td className=" py-4 px-4 font-bold text-md dark:text-gray-200">
        {user?.rank}
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center">
          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center gap-4"
          >
            <div className="">
              {user.picturePath ? (
                <img
                  alt="picture"
                  src={user.picturePath}
                  className="hidden lg:block md:block w-10 h-10 rounded-full object-cover border-2"
                />
              ) : (
                <img
                  alt="default"
                  src={AvatarProfile}
                  className="hidden lg:block md:block w-10 h-10 rounded-full object-cover border-2"
                />
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm dark:text-gray-200">
                {user?.firstname}
              </span>
              <span className="text-sm dark:text-gray-200">
                {user?.lastname}
              </span>
            </div>
          </Link>
        </div>
      </td>
      <td className="text-sm text-left py-4 px-4 dark:text-gray-200">
        {user?.country}
      </td>
      <td className="text-sm text-right py-4 px-4 dark:text-gray-200">
        {user?.score}
      </td>
    </tr>
  );
};

export default UserRow;
