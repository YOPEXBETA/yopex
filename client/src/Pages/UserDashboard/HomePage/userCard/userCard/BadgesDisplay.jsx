import React from "react";
import { Avatar, Box, Grid } from "@mui/material";

const BadgesDisplay = ({ badges }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        {badges.map((badge, index) => (
          <Grid item key={index}>
            <Avatar
              alt={badge.badgeName}
              src={badge.badgeImg}
              sx={{ width: 40, height: 40 }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BadgesDisplay;
