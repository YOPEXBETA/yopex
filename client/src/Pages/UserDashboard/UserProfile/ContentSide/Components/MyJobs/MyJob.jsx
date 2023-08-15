import { formatDistance } from "date-fns";
import React, { useState } from "react";
import Appliers from "./Appliers";
import {
  Avatar,
  Card,
  CardActionArea,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const MyJob = ({ userProfile, job }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  const { user } = useSelector((state) => state.auth);

  return (
    <Grid item xs={12} sm={6} md={4} onClick={toggleOpen}>
      <Card elevation={0} variant="outlined">
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar
                sx={{ width: 40, height: 40 }}
                src={userProfile.picturePath}
              />
            }
            title={
              <Typography variant="h6" fontWeight={"bold"}>
                {userProfile.companyName}
              </Typography>
            }
            subheader={
              <Typography variant="subtitle" color={"text.secondary"}>
                {job.place}
              </Typography>
            }
          />
          <Stack sx={{ paddingLeft: 2, paddingRight: 2 }} spacing={3}>
            <Stack spacing={0.5}>
              <Typography variant="h6" fontWeight={"bold"}>
                {job.title}
              </Typography>
              <Typography variant="body1" color={"grey"} noWrap>
                {job.description}
              </Typography>
            </Stack>
            <Typography variant="subtitle2" color={"grey"}>
              {formatDistance(new Date(job.createdAt), new Date(), {
                addSuffix: true,
              })}
            </Typography>
          </Stack>

          <Divider variant="fullWidth" sx={{ pt: "1rem", pb: 0 }} />
        </CardActionArea>
      </Card>

      {user.role === "admin" && user._id === userProfile._id && (
        <Appliers job={job} open={isOpen} toggleOpen={toggleOpen} />
      )}
    </Grid>
  );
};

export default MyJob;
