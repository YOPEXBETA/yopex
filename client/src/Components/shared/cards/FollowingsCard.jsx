import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const FollowingsCard = ({ following }) => {
  return (
    <div>
      <Link
        to={`/profile/${following._id}`}
        key={following._id}
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
                src={following.picturePath}
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
                  <Typography variant="h5">{following.firstname}</Typography>
                  <Typography variant="h5">{following.lastname}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default FollowingsCard;
