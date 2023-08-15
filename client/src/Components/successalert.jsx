import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";

const AlertSuccess = ({ message }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Alert
      variant="filled"
      severity="success"
      sx={{
        position: "fixed",
        top: "32%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        opacity: open ? 1 : 0,
        transition: "opacity 1s ease-out",
        color: "white",
      }}
    >
      <strong>Successfully </strong>
      {message} !
    </Alert>
  );
};

export default AlertSuccess;
