import StarIcon from "@mui/icons-material/Star";
import {
  Button,
  Card,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import React from "react";
import { Link, useParams } from "react-router-dom";
import getDeadlineDifference from "./../../getDeadlineDifference";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 120,
    height: 120,
    margin: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: "15px",
  },
}));

const ChallengeCard = ({ challenge }) => {
  const classes = useStyles();

  const isChallengeInProgress = (challenge) => {
    if (
      getDeadlineDifference(challenge?.deadline) === "0 Days 0 Hours 0 Minutes"
    )
      return false;
    return true;
  };

  return (
    <div>
      <Divider />
      <Link to={`/browse/contestDetails/${challenge._id}`}>
        <div className="shadow-md border-green-500 border-b-2 rounded-lg flex hover:scale-105">
          <img
            src={challenge.company?.companyLogo}
            className="object-cover  bg-gray-400 h-40 w-40"
          />
          <div className={classes.content}>
            <div className=" p-5">
              <Stack spacing={2}>
                <div>
                  <h5 className=" text-lg font-semibold mb-2">
                    {challenge.title}
                  </h5>
                  <p
                    variant="body1"
                    color="textSecondary"
                    whiteSpace={"normal"}
                  >
                    {challenge.description}
                  </p>
                </div>

                <Stack
                  flexDirection={"row"}
                  alignItems={"flex-end"}
                  columnGap={"1rem"}
                >
                  <Stack
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"flex-end"}
                  >
                    <Rating
                      name={`rating-${challenge._id}`}
                      value={challenge.totatlStars}
                      precision={0.5}
                      readOnly
                      icon={<StarIcon className={classes.icon} />}
                    />
                    <p>({challenge.totalStars})</p>
                  </Stack>

                  <Stack flexDirection={"row"} columnGap={"0.3rem"}>
                    <p className="text-green-500 font-bold">
                      {challenge.price}$
                    </p>
                    <p className="text-green-500">Prize</p>
                  </Stack>
                  <Stack flexDirection={"row"} columnGap={"0.3rem"}>
                    <Typography variant="subtitle1">
                      {challenge.users.length}
                    </Typography>
                    <p>Participants</p>
                  </Stack>
                  <Button
                    color={
                      isChallengeInProgress(challenge) ? "success" : "error"
                    }
                    className={classes.gridItem}
                    style={{ padding: 0 }}
                  >
                    {isChallengeInProgress(challenge)
                      ? "In Progress"
                      : "Finished"}
                  </Button>
                </Stack>
              </Stack>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChallengeCard;
