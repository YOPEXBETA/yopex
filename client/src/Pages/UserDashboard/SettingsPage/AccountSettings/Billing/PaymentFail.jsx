import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const PaymentFail = () => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2} mt={2}>
      <Alert onClose={() => {}}>Fail!</Alert>
    </Stack>
  );
};
export default PaymentFail;
