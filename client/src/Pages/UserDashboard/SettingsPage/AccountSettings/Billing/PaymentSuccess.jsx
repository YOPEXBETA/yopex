import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useVerifyPayment } from "../../../../../hooks/react-query/useUsers";

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get("payment_ref");
  const { mutate } = useVerifyPayment();

  useEffect(() => {
    mutate(paymentId);
  }, [paymentId]);
  return (
    <div></div>
  );
};
export default PaymentSuccess;
