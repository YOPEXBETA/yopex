import { Stack } from "@mui/system";
import React from "react";
import ScrollableTabs from "./ScrollableTab/ScrollableTab";
import SocialPosts from "./SocialMediaPosts/SocialPosts";

const Content = () => {
  return (
    <div>
      <Stack spacing={2}>
        <ScrollableTabs />
        <SocialPosts />
      </Stack>
    </div>
  );
};

export default Content;
