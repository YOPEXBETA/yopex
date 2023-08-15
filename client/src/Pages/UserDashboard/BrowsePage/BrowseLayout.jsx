import { Grid, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import BrowseContentPage from "./Content/BrowseContentPage";
import BrowseContestsHeader from "./Header/BrowseContestsHeader";
import BrowseJobsHeader from "./Header/BrowseJobsHeader";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    margin: "1rem 10rem",
    [theme.breakpoints.down("lg")]: {
      margin: "1rem 2rem",
    },
    [theme.breakpoints.down("md")]: {
      margin: "1rem 1rem",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "1rem 1rem",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "1rem 1rem",
    },
  },
}));
const BrowseLayout = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [contestQuery, setContestQuery] = useState("");
  const [jobQuery, setJobQuery] = useState("");

  const changeValue = (e, params) => setValue(params);

  return (
    <>
      <Stack rowGap={2}>
        {value === 0 && (
          <BrowseContestsHeader
            value={value}
            setContestQuery={setContestQuery}
            changeValue={changeValue}
          />
        )}
        {value === 1 && (
          <BrowseJobsHeader
            value={value}
            setJobQuery={setJobQuery}
            changeValue={changeValue}
          />
        )}

        <Grid item xs={12} mt={2} className={classes.gridItem}>
          <BrowseContentPage
            jobQuery={jobQuery}
            contestQuery={contestQuery}
            value={value}
          />
        </Grid>
      </Stack>
    </>
  );
};

export default BrowseLayout;
