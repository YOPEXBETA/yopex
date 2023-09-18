import React from "react";
import { useUserById } from "../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";

const MoneyBalance = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: userProfile } = useUserById(user._id);

  return (
    <div>
      <div className="rounded p-4 py-6 bg-white border-green-500 border-b-2 shadow-md">
        <div className="flex justify-between">
          <h4 className="text-xl font-medium">Balance</h4>
          <div className="flex items-center gap-2">
            <h4 className="text-lg text-primary font-bold text-green-500">
              {userProfile?.balance || 0}
            </h4>
            <p className="text-lg text-green-500 italic font-bold">XP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyBalance;
