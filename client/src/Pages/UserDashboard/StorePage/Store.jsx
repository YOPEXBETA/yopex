import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  usePayment,
  useVerifyPayment,
} from "../../../hooks/react-query/useUsers";
import { useLocation } from "react-router-dom";
import StorePointCard from "../../../Components/shared/cards/StorePointCard";
import toast from "react-hot-toast";

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
          onClick={() => {
            mutate(item.points);
          }}
        />
      ))}
    </div>
  );
};

export default Store;
