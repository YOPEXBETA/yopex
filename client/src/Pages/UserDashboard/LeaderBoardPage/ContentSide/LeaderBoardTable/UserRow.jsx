import React from "react";
import { Link } from "react-router-dom";

const UserRow = ({ user }) => {
  return (
    <tr key={user._id} className="hover:bg-gray-50 bg-white">
      <td colSpan="4">
        {/* Set colSpan to the number of columns in your table */}
        <div className="flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-60">
            <span className="text-sm">{user.rank}</span>
            <Link
              to={`/profile/${user._id}`}
              className="flex items-center gap-4"
            >
              <div className="">
                <img
                  alt={`${user.firstname} ${user.lastname}`}
                  src={user.picturePath}
                  className="w-10 h-10 rounded-full bg-green-500"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">{user.firstname}</span>
                <span className="text-sm">{user.lastname}</span>
              </div>
            </Link>
          </div>
          <div className="text-sm text-left">{user.country}</div>
          <div className="text-sm text-right">{user.score}</div>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
