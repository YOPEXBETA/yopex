import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import { useParams } from "react-router-dom";
import { useUserReviews } from "../../../../../hooks/react-query/useReviews";
import { useUserById } from "../../../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";

export const ProfileNavigationTab = ({ changeValue, value }) => {
  const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const { data: userProfile } = useUserById(userId);
  const { data: reviews } = useUserReviews(userId);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={changeValue}
            aria-label="basic tabs example"
          >
            <Tab label="My Posts" />
            <Tab label="My Challenges" />

            <Tab label="Followers" />
            <Tab label="Followings" />
            <Tab label={`Feedbacks (${reviews?.length || 0})`} />
            {/*userProfile.role === "company" && <Tab label="Posted Jobs" />*/}
            {userId==user._id?<Tab label="Bookmarks" />:""}
          </Tabs>
        </Box>
      </Box>
    </div>
  );
};
