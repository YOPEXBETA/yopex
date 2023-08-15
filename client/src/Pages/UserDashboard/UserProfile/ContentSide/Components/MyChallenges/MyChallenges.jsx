import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useUserById,
  useUserChallenges,
} from "../../../../../../hooks/react-query/useUsers";
import getDeadlineDifference from "../../../../ContestDescriptionPage/TopSide/deadlineModif";
import ChallengeCard from "../../../../../../Components/shared/cards/ChallengeCard";

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

const CustomLink = styled(Link)((theme) => ({
  textDecoration: "none",
}));

const MyChallenges = () => {
  const classes = useStyles();
  const { userId } = useParams();
  const { data: userProfile } = useUserById(userId);
  const { data } = useUserChallenges(userId);

  const isChallengeInProgress = (challenge) => {
    if (
      getDeadlineDifference(challenge?.deadline) === "0 Days 0 Hours 0 Minutes"
    )
      return false;
    return true;
  };

  if (data)
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-11 py-5">
          {data.challenges.length > 0 ? (
            data.challenges?.map((challenge) => (
              <ChallengeCard
                key={challenge._id}
                Challenges={data.challenges}
                challenge={challenge}
              />
            ))
          ) : (
            <p>No challenge found.</p>
          )}
        </div>
      </div>
    );
};

export default MyChallenges;
