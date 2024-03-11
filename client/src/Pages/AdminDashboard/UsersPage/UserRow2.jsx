import React from "react";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";
import AdminUserTableMenuItem from "../../../Components/MenuIcons/AdminUserTableMenuItem";
import Dropdown from "../../../Components/dropdown";
import { Link } from "react-router-dom";
import { cn } from "../../../utils/utils";
import HorizontalDotsIcon from "../../../Components/icons/HorizontalDotsIcon";

const UserRow2 = ({ user }) => {
  return (
    <tr key={user?._id} className="hover:bg-zinc-200 dark:hover:bg-zinc-700">
      <td className="py-4 px-4">
        <Link to={`/profile/${user?._id}`} className="flex items-center gap-2">
          <div>
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

      <td className="px-4 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 text-right">
        <Dropdown
          button={
            <div className="absolute right-0">
              <HorizontalDotsIcon className="cursor-pointer text-center" />
            </div>
          }
          animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
          children={
            <AdminUserTableMenuItem
              userId={user?._id}
              accountStatus={user?.status}
            />
          }
          classNames={"py-2 top-4 right-0"}
        />
      </td>
    </tr>
  );
};

export default UserRow2;
