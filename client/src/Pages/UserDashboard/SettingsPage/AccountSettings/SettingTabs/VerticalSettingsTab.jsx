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
    <div className="flex  md:h-max flex-col bg-white mt-8 dark:bg-zinc-800">
      <button
        className={`w-full py-3 px-4 focus:outline-none ${
          value === 0
            ? "bg-green-500 text-white border border-green-500 rounded-2xl"
            : "text-gray-500 dark:text-gray-200  dark:border-zinc-600 "
        }`}
        onClick={() => changeValue(0)}
      >
        General Information
      </button>
      <button
        className={`w-full py-3 px-4 focus:outline-none ${
          value === 1
            ? "bg-green-500 text-white border border-green-500 rounded-2xl"
            : "text-gray-500 dark:text-gray-200  dark:border-zinc-600  "
        }`}
        onClick={() => changeValue(1)}
      >
        Privacy
      </button>
      <button
        className={`w-full py-3 px-4 focus:outline-none ${
          value === 2
            ? "bg-green-500 text-white border border-green-500 rounded-2xl"
            : "text-gray-500 dark:text-gray-200   dark:border-zinc-600  "
        }`}
        onClick={() => changeValue(2)}
      >
        Billing
      </button>
    </div>
  );
};

export default VerticalSettingsTab;
