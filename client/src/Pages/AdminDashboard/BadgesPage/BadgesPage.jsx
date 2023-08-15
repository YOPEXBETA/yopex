import { Grid, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import {
  useBadges,
  useDeleteBadge,
} from "../../../hooks/react-query/useBadges";

const BadgesPage = () => {
  const { data } = useBadges();
  const { mutate } = useDeleteBadge();

  return (
    <div>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {data
          ?.filter((badge) => badge.badgeName)
          .map(
            (badgeData) =>
              badgeData && (
                <Grid item key={badgeData._id} lg={3} md={6} xs={12}>
                  <Card>
                    <CardContent>
                      <Stack spacing={2} alignItems={"center"}>
                        <Avatar
                          sx={{ width: 110, height: 110 }}
                          src={badgeData.badgeImg}
                        />
                        <Typography variant="h5" noWrap color={"primary"}>
                          {badgeData.badgeName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" Wrap>
                          {badgeData.badgeDescription}
                        </Typography>
                      </Stack>

                      <button onClick={() => mutate(badgeData._id)}>
                        Delete
                      </button>
                    </CardContent>
                  </Card>
                </Grid>
              )
          )}
      </Grid>
    </div>
  );
};

export default BadgesPage;
