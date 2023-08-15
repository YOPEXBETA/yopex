import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../hooks/react-query/useChallenges";
import Banner from "./TopSide/Banner";
import LeftSide from "./leftSide/LeftSide";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2% 8%",
    [theme.breakpoints.down("md")]: {
      padding: "2% 4%",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "2% 2%",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "2% 0%",
    },
  },
}));

const ContestDetails = () => {
  const classes = useStyles();

  const { id: challengeId } = useParams();
  const { data: challenge } = useChallengeById(challengeId);

  if (challenge)
    return (
      <div>
        <Box>
          <Grid item xs={12}>
            <Banner />
          </Grid>

          <Grid
            container
            columns={{ xs: 2, md: 12 }}
            columnSpacing={4}
            className={classes.root}
          >
            <Grid item xs={12}>
              <Grid item xs={12}>
                <LeftSide />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
};

export default ContestDetails;
