import React from "react";
import { IoWalletOutline } from "react-icons/io5";

const StorePointCard = ({ points, amount, onClick }) => {
  return (
    <div className="w-full bg-white z-10 rounded-lg p-6 shadow-md hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h5 className="mb-2 text-3xl font-semibold ">{points} Points</h5>
          <p className="font-normal text-gray-500">{amount} TND</p>
        </div>
        <button
          type="button"
          className="bg-green-500 text-gray-900 font-semibold py-3 px-4 mt-4 rounded-full hover:bg-purple-500 focus:outline-none hover:text-white"
          //onClick={()=>{onClick()}}
          disabled={true}
        >
          Comming soon
        </button>
      </div>
    </div>
  );
};

export default StorePointCard;
