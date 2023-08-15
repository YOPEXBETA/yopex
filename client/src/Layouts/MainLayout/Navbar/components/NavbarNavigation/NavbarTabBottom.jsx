import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const tabStyles = { p: 3 };

const NavbarTabBottom = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: { xs: "block", md: "block", alignItems: "center" },
      }}
    >
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label="Home"
          component={Link}
          to="/feed"
          sx={{ ...tabStyles }}
          value={0}
        />

        <Tab
          label="Browse"
          component={Link}
          to="/browse"
          sx={{ ...tabStyles }}
          value={2}
        />
        <Tab
          label="Leaderboard"
          component={Link}
          to="/leaderboard"
          sx={{ ...tabStyles }}
          value={3}
        />
      </Tabs>
    </Box>
  );
};

export default NavbarTabBottom;
