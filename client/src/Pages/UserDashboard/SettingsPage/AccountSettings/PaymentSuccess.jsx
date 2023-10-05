import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";
import { useVerifyPayment } from "../../../../hooks/react-query/useUsers";

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get('payment_id');
  const {mutate} = useVerifyPayment();

  useEffect(() => {
    mutate(paymentId);
  }, [paymentId]);
  return (
    <Stack sx={{ width: "100%" }} spacing={2} mt={2}>
      <Alert onClose={() => {}}>Successfull Payement!</Alert>
    </Stack>
  );
};
export default PaymentSuccess;
