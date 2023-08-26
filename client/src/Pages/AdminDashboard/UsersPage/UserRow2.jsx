import React from "react";
import UserTableMenuItem from "./components/UserTableMenuItem";

const UserRow2 = ({ user }) => {
  return (
    <tr key={user._id} className="hover:bg-gray-50 bg-white">
      <td className="py-4 px-4">
        <div className="flex items-center">
          <div className="lg:w-1/6">
            <img
              alt={`${user.firstname} ${user.lastname}`}
              src={user.picturePath}
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm">{user.firstname}</span>
            <span className="text-sm">{user.lastname}</span>
          </div>
        </div>
      </td>
      <td className="text-sm text-left">{user.email}</td>

      <td
        className={`font-bold text-white text-xs mt-5 py-2 px-3 rounded-full inline-block ${
          user?.status === "active"
            ? "bg-green-500"
            : user?.status === "disabled"
            ? "bg-gray-500"
            : user?.isActive
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      >
        {user.status ? user.status : user.isActive ? "active" : "disabled"}
      </td>

      <td className="py-4 px-4 text-right">
        <UserTableMenuItem
          userId={user._id}
          accountStatus={user.status ? user.status : user.isActive}
        />
      </td>
    </tr>
  );
};

export default UserRow2;
