import React from "react";
import { useSelector } from "react-redux";
import { usePayment } from "../../../hooks/react-query/useUsers";
import StorePointCard from "../../../Components/shared/cards/StorePointCard";

const Store = () => {
  const { user } = useSelector((state) => state.auth);
  const { mutate, isLoading } = usePayment();

  const pointItems = [
    { points: 50, amount: 50 },
    { points: 100, amount: 100 },
    { points: 200, amount: 200 },
    { points: 350, amount: 350 },
    { points: 500, amount: 500 },
    { points: 1000, amount: 1000 },
  ];

  if (user?.companies?.length === 0) {
    return <h1>Unauthorized</h1>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mx-0 lg:mx-16 md:mx-6 mt-0 md:mt-8 gap-5 ">
      {pointItems.map((item, index) => (
        <StorePointCard
          key={index}
          points={item.points}
          amount={item.amount}
          onClick={() => mutate(item.points)}
        />
      ))}
    </div>
  );
};

export default Store;
