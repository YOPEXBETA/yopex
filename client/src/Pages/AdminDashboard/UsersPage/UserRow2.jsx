import React from "react";
import UserTableMenuItem from "./components/UserTableMenuItem";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";
import { Link } from "react-router-dom";
import { cn } from "../../../utils/utils";

const UserRow2 = ({ user }) => {
  return (
    <tr key={user?._id} className="hover:bg-zinc-200 dark:hover:bg-zinc-700">
      <td className="py-4 px-4">
        <Link to={`/profile/${user?._id}`} className="flex items-center">
          <div className="lg:w-1/6">
            {user?.picturePath ? (
              <img
                alt="picture"
                src={user?.picturePath}
                className="rounded-full  object-cover w-10 h-10"
              />
            ) : (
              <img
                alt="default"
                src={AvatarProfile}
                className="rounded-full object-cover w-10 h-10"
              />
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm dark:text-gray-200">
              {user?.firstname}
            </span>
            <span className="text-sm dark:text-gray-200">{user?.lastname}</span>
          </div>
        </Link>
      </td>
      <td className="text-sm text-left dark:text-gray-200">{user?.email}</td>

      <td
        className={cn(
          "font-bold text-white text-xs mt-5 py-2 px-3 rounded-full inline-block",
          user?.status === "active" && "bg-green-500",
          user?.status === "disabled" && "bg-gray-500",
          user?.status === "banned" && "bg-red-500"
        )}
      >
        {user?.status}
      </td>

      <td className="py-4 px-4 text-right dark:text-gray-200">
        <UserTableMenuItem userId={user?._id} accountStatus={user?.status} />
      </td>
    </tr>
  );
};

export default UserRow2;
