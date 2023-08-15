import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useState } from "react";

export const CompanyNavigationTab = ({ changeValue, value }) => {
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={changeValue}>
            <Tab label="My Posts" />
            <Tab label="My Jobs" />
            <Tab label="My Challenges" />
          </Tabs>
        </Box>
      </Box>
    </div>
  );
};
