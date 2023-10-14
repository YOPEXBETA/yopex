import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";




function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const VerticalSettingsTab = ({ changeValue, value }) => {
  return (
    <div className="flex flex-col bg-white mt-8 dark:bg-zinc-800  h-screen">
      <button
        className={`w-full py-3 px-4 focus:outline-none ${
          value === 0
            ? "bg-green-500 text-white border border-green-500"
            : "text-gray-500 dark:text-gray-200 border-b dark:border-zinc-600 "
        }`}
        onClick={() => changeValue(0)} // Pass 0 to changeValue for the first tab
      >
        General Information
      </button>
      <button
        className={`w-full py-3 px-4 focus:outline-none ${
          value === 1
            ? "bg-green-500 text-white border border-green-500"
            : "text-gray-500 dark:text-gray-200  border-b dark:border-zinc-600  "
        }`}
        onClick={() => changeValue(1)} // Pass 1 to changeValue for the second tab
      >
        Privacy
      </button>
      <button
        className={`w-full py-3 px-4 focus:outline-none ${
          value === 2
            ? "bg-green-500 text-white border border-green-500"
            : "text-gray-500 dark:text-gray-200  border-b dark:border-zinc-600  "
        }`}
        onClick={() => changeValue(2)} // Pass 2 to changeValue for the third tab
      >
        Billing
      </button>
      
    </div>
  );
};


export default VerticalSettingsTab;
