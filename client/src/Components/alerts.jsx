import React, { useState, useEffect } from "react";

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
    <div
      className={`bg-red-500 text-white rounded-lg px-4 py-2 fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      {typeof error === "string"
        ? error
        : error?.response?.data ||
          error?.error ||
          error?.response?.data?.error?.msg}{" "}
      <strong>Check it out!</strong>
    </div>
  );
};

export default AlertContainer;
