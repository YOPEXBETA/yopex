import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  usePayment,
  useVerifyPayment,
} from "../../../hooks/react-query/useUsers";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import StorePointCard from "../../../Components/Cards/StorePointCard";

const Store = () => {
  const { user } = useSelector((state) => state.auth);
  const { mutate, isLoading } = usePayment();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get("payment_id");
  const { mutate: verify, data } = useVerifyPayment();

  useEffect(() => {
    if (!paymentId) return;
    verify(paymentId);
  }, [paymentId]);

  useEffect(() => {
    if (!data) return;
    if (data.result.status === "SUCCESS") {
      toast.success("Payment Success!");
    } else {
      toast.error("Payment Failed!");
    }
  }, [data]);

  const pointItems = [
    { points: 50, amount: 50 },
    { points: 100, amount: 100 },
    { points: 200, amount: 200 },
    { points: 350, amount: 350 },
    { points: 500, amount: 500 },
    { points: 1000, amount: 1000 },
  ];

  return (
    <div className="md:mx-6 mx-4 pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-0 md:mt-8 gap-5">
        {pointItems.map((item, index) => (
          <StorePointCard
            key={index}
            points={item.points}
            amount={item.amount}
            onClick={() => {
              mutate(item.points);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Store;
