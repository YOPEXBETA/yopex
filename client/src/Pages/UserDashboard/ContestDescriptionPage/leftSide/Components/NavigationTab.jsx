import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import getDeadlineDifference from "../../TopSide/deadlineModif";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

export const NavigationTab = ({ changeValue, value }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data } = useQuery({
    queryKey: ["challenges", user._id],
    queryFn: async () => {
      const { data } = await axios.get(
        ` http://localhost:8000/company/get/${user._id}`,
        {
          withCredentials: true,
        }
      );
      return data;
    },
  });

  let challenge = data?.challenges.find((item) => item._id === id);
  const isOwner = challenge ? true : false;

  const handleProgress = (card) => {
    if (getDeadlineDifference(card?.deadline) === "0 Days 0 Hours 0 Minutes")
      return true;
    return false;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={changeValue}
          aria-label="basic tabs example"
        >
          <Tab label="Description" />
          <Tab label="Participants" />
          {isOwner && handleProgress(challenge) && !challenge?.winner && (
            <Tab
              label="Choose Winner"
              style={{
                marginLeft: "auto",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "red",
                border: "1px solid red",
              }}
            />
          )}
        </Tabs>
      </Box>
    </Box>
  );
};
