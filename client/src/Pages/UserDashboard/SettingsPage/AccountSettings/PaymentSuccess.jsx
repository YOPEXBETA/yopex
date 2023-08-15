import React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const PaymentSuccess = () => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2} mt={2}>
      <Alert onClose={() => {}}>Successfull Payement!</Alert>
    </Stack>
  );
};
export default PaymentSuccess;
