import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";

const Badge = ({ badge }) => {
  return (
    <Stack key={badge._id} flexDirection={"row"} alignItems={"center"} gap={2}>
      <Avatar key={badge._id} src={badge.badgeImg} />
      <Stack>
        <Typography variant="h5">{badge.badgeName}</Typography>
        <Typography>Description: {badge.badgeDescription}</Typography>
      </Stack>
    </Stack>
  );
};

export default Badge;
