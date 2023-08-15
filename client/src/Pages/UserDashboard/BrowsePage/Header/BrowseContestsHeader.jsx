import React, { useEffect } from "react";
import { Typography, Stack, Grid, CardMedia, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
// import browseBackground from "../../../../assets/images/browseBackground.png";
import BrowseNavigationTab from "../Content/BrowseNavigationTabs/BrowseNavigationTab";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 200,
    padding: "0rem 10rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",

    backgroundColor: `${theme.palette.secondary.darker}`,
    [theme.breakpoints.down("sm")]: {
      padding: "0% 2%",
    },
  },
  media: {
    position: "relative",
    height: 200,
    backgroundColor: "#f5f5f5",
  },
  title: {
    color: `${theme.palette.secondary.lighter}`,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  gridItem: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const BrowseChallengesHeader = ({ changeValue, value, setContestQuery }) => {
  const classes = useStyles();

  return (
    <div>
      <Box className={classes.root}>
        <Box>
          <Stack
            spacing={1}
            alignItems={"flex-Start"}
            justifyContent={"flex-end"}
          >
            <Typography fontSize={25} fontWeight={"bold"} color={"white"}>
              Browse Contests
            </Typography>
            <TextField
              placeholder="Search for Contests"
              variant="outlined"
              fullWidth
              onChange={(e) => setContestQuery(e.currentTarget.value)}
              inputProps={{
                style: { color: "white" },
              }}
            />
            <BrowseNavigationTab changeValue={changeValue} value={value} />
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default BrowseChallengesHeader;
