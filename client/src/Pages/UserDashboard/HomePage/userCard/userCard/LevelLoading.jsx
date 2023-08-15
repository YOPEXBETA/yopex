import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { getUserLevelData } from "../../../../../utils";
import { useUserById } from "../../../../../hooks/react-query/useUsers";

const useStyles = makeStyles((theme) => ({
  color: {
    color: theme.palette.primary.main,
  },
}));

function LinearProgressWithLabel(props) {
  const classes = useStyles();

  return (
    <Box sx={{ display: { xs: "none", lg: "block", md: "block" } }}>
      <Stack spacing={1}>
        <Stack flexDirection={"column"}>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <Box sx={{ minWidth: 30, mr: 1 }}>
              <p>lvl {props.level} </p>
            </Box>{" "}
            <Box sx={{ width: "100%" }}>
              <LinearProgress variant="determinate" value={props.value} />
            </Box>
            <Box sx={{ minWidth: 28, ml: 1 }}>
              <p>lvl {props.level + 1}</p>
            </Box>
          </Stack>
          <Stack flexDirection={"row"} columnGap={1}>
            <Typography variant="body1" color={"GrayText"}>
              You need
            </Typography>
            <Typography variant="body1" className={classes.color}>
              {props.difference} points
            </Typography>
            <Typography color={"GrayText"}>to reach lvl</Typography>
            <Typography variant="body1" className={classes.color}>
              {props.level + 1}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const LevelLoading = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: userProfile } = useUserById(user._id);

  const { level, percentage, difference } = getUserLevelData(
    userProfile?.score || 0
  );
  return (
    <Box>
      <LinearProgressWithLabel
        value={percentage}
        level={level}
        difference={difference}
      />
    </Box>
  );
};

export default LevelLoading;
