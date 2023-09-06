import React from "react";
import { Link } from "react-router-dom";

const UserRow = ({ user }) => {
  return (
    <tr key={user._id} className="hover:bg-gray-50 bg-white">
      <td className=" py-4 px-4 font-bold text-md">{user.rank}</td>
      <td className="py-4 px-4">
        <div className="flex items-center">
          <Link to={`/profile/${user._id}`} className="flex items-center gap-4">
            <div className="">
              <img
                alt={`${user.firstname} ${user.lastname}`}
                src={user.picturePath}
                className="w-10 h-10 rounded-full object-cover bg-green-500"
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm">{user.firstname}</span>
              <span className="text-sm">{user.lastname}</span>
            </div>
          </Link>
        </div>
      </td>
      <td className="text-sm text-left py-4 px-4">{user.country}</td>
      <td className="text-sm text-right py-4 px-4">{user.score}</td>
    </tr>
  );
};

export default UserRow;
