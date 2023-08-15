import React from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Stack, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  badges: {
    width: 30,
    height: 30,
  },
  badgesModal: {
    width: 60,
    height: 60,
  },
}));

const Badge = ({ badge }) => {
  const classes = useStyles();
  return (
    <Stack key={badge._id} flexDirection={"row"} alignItems={"center"} gap={2}>
      <Avatar
        key={badge._id}
        className={classes.badgesModal}
        src={badge.badgeImg}
      />
      <Stack>
        <Typography variant="h5">{badge.badgeName}</Typography>
        <Typography>Description: {badge.badgeDescription}</Typography>
      </Stack>
    </Stack>
  );
};

export default Badge;
