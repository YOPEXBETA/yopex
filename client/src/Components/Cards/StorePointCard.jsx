import React from "react";
import Card from "./index";
import CustomButton from "../CustomButton";

const StorePointCard = ({ points, amount, onClick, extra }) => {
  return (
    <Card extra={`p-6 ${extra}`}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h5 className="mb-2 text-3xl font-semibold ">{points} Points</h5>
          <p className="font-normal text-gray-500">{amount} TND</p>
        </div>
        <CustomButton
          type="button"
          extra={`w-full px-5 py-3 mt-4 px-4 ${extra}`}
          onClick={() => {
            onClick();
          }}
          disabled={true}
        >
          Coming soon
        </CustomButton>
      </div>
    </Card>
  );
};

export default StorePointCard;
