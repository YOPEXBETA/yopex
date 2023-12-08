import React from "react";
import Card from "./index";

const StorePointCard = ({ points, amount, onClick, extra }) => {
  return (
    <Card extra={`p-6 ${extra}`}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h5 className="mb-2 text-3xl font-semibold ">{points} Points</h5>
          <p className="font-normal text-gray-500">{amount} TND</p>
        </div>
        <button
          type="button"
          className="bg-green-500 dark:bg-purple-500 dark:text-white text-gray-900 font-semibold py-3 px-4 mt-4 rounded-full hover:bg-purple-500 focus:outline-none hover:text-white"
          onClick={() => {
            onClick();
          }}
          disabled={true}
        >
          Coming soon
        </button>
      </div>
    </Card>
  );
};

export default StorePointCard;
