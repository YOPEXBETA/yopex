import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import MonthlyBarChart from "./components/MonthlyBarChart";
import UsersHistoryChart from "./components/UsersHistoryChart";

const DashboardSecondRow = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} lg={8}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Stack spacing={2}>
                <Typography variant="h6">User Analytics</Typography>
              </Stack>
              <Grid item xs={12}>
                <UsersHistoryChart />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Stack spacing={2}>
                <Typography variant="h6"> Year Statistics</Typography>
              </Stack>
              <Grid item xs={12}>
                <MonthlyBarChart />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardSecondRow;
