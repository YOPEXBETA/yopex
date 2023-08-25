import { Avatar, Box, Card, Divider, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";
import getDeadlineDifference from "../../../ContestDescriptionPage/TopSide/deadlineModif";
import getTimeLeft from "./getTimeLeft";

const CustomizedCard = styled(Card)((theme) => ({
  padding: 15,
  borderRadius: "0.5rem",
}));

const BoxContentUser = styled(Box)((theme) => ({
  flexDirection: "row",
  display: "flex",
  columnGap: "0.5rem",
  alignItems: "center",
}));

const useStyles = makeStyles((theme) => ({
  Avatar: {
    width: 45,
    height: 45,
    border: `2px solid ${theme.palette.primary.light}`,
  },
}));

const getChallenges = async (userId) => {
  const { data } = await axios.get("http://localhost:8000/user/challenges", {
    params: {
      userId: userId,
    },
    withCredentials: true,
  });
  return data;
};

const MyContestLists = () => {
  const classes = useStyles();

  const { user } = useSelector((state) => state.auth);
  const { data } = useQuery({
    queryKey: ["challenges", user._id],
    queryFn: () => getChallenges(user._id),
  });

  const [inProgress, setInProgress] = useState([]);

  const handleProgress = (card) => {
    if (getDeadlineDifference(card?.deadline) === "0 Days 0 Hours 0 Minutes")
      return false;
    return true;
  };

  // filter out finished challenges
  useEffect(() => {
    if (!data) return;
    setInProgress(
      data.challenges?.filter((challenge) => handleProgress(challenge))
    );
    
  }, [data]);
  console.log(inProgress);
  return (
    <div>
      {inProgress?.length > 0 && (
        <CustomizedCard elevation={0} variant="outlined">
          <Stack spacing={2}>
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h5">My Contests</Typography>
            </Stack>
            <Divider />
            {inProgress.slice(0, 2).map((user) => (
              <Box
                key={user._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <BoxContentUser>
                  <Avatar className={classes.Avatar} src={user.company.companyLogo} />
                  <Stack>
                    <Stack>
                      <Typography variant="h6" fontWeight={"bold"}>
                        {user?.company.companyName}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" noWrap color={"primary"}>
                      {getTimeLeft(user.deadline)}
                    </Typography>
                  </Stack>
                </BoxContentUser>
              </Box>
            ))}
          </Stack>
        </CustomizedCard>
      )}
    </div>
  );
};

export default MyContestLists;
