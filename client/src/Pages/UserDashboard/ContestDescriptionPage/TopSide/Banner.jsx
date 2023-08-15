import { Card, Grid, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useChallengeById,
  useRegisterChallenge,
  useUnregisterChallenge,
  useUserChallenges,
  useUserSubmission,
} from "../../../../hooks/react-query/useChallenges";
import SubmissionDialog from "./SubmissionDialog";
import getDeadlineDifference from "./deadlineModif";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 200,
    padding: "2% 8%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
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

const Banner = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(null);
  const [deadline, setDeadline] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const { id: challengeId } = useParams();
  const { data: challenge } = useChallengeById(challengeId);
  const { data } = useUserChallenges(user);

  const { data: submissions } = useUserSubmission(challengeId, user);
  const { mutate: unRegisterMutate } = useUnregisterChallenge(challenge, user);
  const { mutate: registerMutate } = useRegisterChallenge(challenge, user);

  // Check if the user has submitted something
  useEffect(() => {
    if (!user.role === "user") return;
    const submitted = submissions?.find(
      (item) => item.challengeId === challenge._id
    );
    if (submitted) setIsSubmitted(true);
  }, [challenge._id, submissions, user.role]);

  useEffect(() => {
    const formatteDate = getDeadlineDifference(challenge.deadline);
    setDeadline(formatteDate);
  }, [challenge.deadline]);

  const toggleModal = () => setModalOpen((prev) => !prev);

  // Check if the user is registered
  useEffect(() => {
    if (!data) return;
    const registered = data.challenges.find(
      (item) => item._id === challenge._id
    );
    setIsRegistered(registered ? true : false);
  }, [challenge, data]);

  return (
    <Card className={classes.root} variant="outlined">
      <React.Fragment key={challenge._id}>
        <Grid container>
          <Grid item lg={9} md={9} sm={9} xs={12}>
            <Typography gutterBottom variant="h3" className={classes.title}>
              {challenge.title}
            </Typography>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={3}
            xs={12}
            sx={{
              display: { sm: "flex" },
            }}
            justifyContent={"flex-end"}
          >
            {user.role === "user" &&
            deadline !== "0 Days 0 Hours 0 Minutes" &&
            !isSubmitted ? (
              <Stack columnGap={1} flexDirection={"row"}>
                {isRegistered ? (
                  <Button
                    variant="outlined"
                    onClick={unRegisterMutate}
                    className={classes.gridItem}
                  >
                    Unregister
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={registerMutate}
                    className={classes.gridItem}
                  >
                    Register
                  </Button>
                )}
                <Button
                  variant="contained"
                  disabled={!isRegistered}
                  className={classes.gridItem}
                  onClick={toggleModal}
                >
                  Submit
                </Button>
              </Stack>
            ) : null}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={9} md={9} sm={9} xs={12}>
            <Button variant="outlined" className={classes.gridItem}>
              {deadline}{" "}
            </Button>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={3}
            xs={12}
            sx={{
              display: { sm: "flex" },
            }}
            justifyContent={"flex-end"}
          >
            <Stack columnGap={1} flexDirection={"row"}>
              <Button variant="outlined" className={classes.gridItem}>
                Prize : {challenge.price}$
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <SubmissionDialog
          open={modalOpen}
          handleClose={toggleModal}
          setIsSubmitted={setIsSubmitted}
        />
      </React.Fragment>
    </Card>
  );
};

export default Banner;
