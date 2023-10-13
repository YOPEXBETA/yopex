import React from "react";
import { useUserById } from "../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";
import yopexPointIcon from "../../../assets/icons/yopexPointIcon.png";

const MoneyBalance = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: userProfile } = useUserById(user._id);

  return (
    <div>
      <div className="rounded p-4 py-6 bg-white dark:bg-zinc-800 dark:shadow-green-600 dark:shadow-sm  border-green-500 border-b-2 shadow-md">
        <div className="flex justify-between">
          <h4 className="text-xl font-medium dark:text-gray-200">Balance</h4>
          <div className="flex items-center gap-1">
            <h4 className="text-lg text-primary font-bold text-green-500">
              {userProfile?.balance || 0}
            </h4>
            <img src={yopexPointIcon} className="w-8 h-8" />
          </div>
        </div>
      </div>  
    </div>
  );
};

export default MoneyBalance;
