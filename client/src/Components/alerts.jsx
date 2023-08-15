import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";

const AlertContainer = ({ error }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) setOpen(true);
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <Alert
      variant="filled"
      severity="error"
      sx={{
        position: "fixed",
        top: "32%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        opacity: open ? 1 : 0,
        transition: "opacity 1s ease-out",
      }}
    >
      {typeof error === "string"
        ? error
        : error?.response?.data ||
          error?.error ||
          error?.response?.data?.error?.msg}{" "}
      <strong>Check it out!</strong>
    </Alert>
  );
};

export default AlertContainer;
