import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const FollowersCard = ({ follower }) => {
  return (
    <div>
      <Link
        to={`/profile/${follower._id}`}
        key={follower._id}
        style={{ textDecoration: "none" }}
      >
        <Card
          variant="outlined"
          sx={{
            border: "1px solid rgba(58, 53, 65, 0.12)",
          }}
        >
          <CardContent>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Avatar
                alt="yourphoto"
                src={follower.picturePath}
                sx={{
                  width: 113,
                  height: 113,
                  border: "3px solid white",
                }}
              />
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Stack flexDirection={"row"} gap={"0.3rem"}>
                  <Typography variant="h5">{follower.firstname}</Typography>
                  <Typography variant="h5">{follower.lastname}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default FollowersCard;
