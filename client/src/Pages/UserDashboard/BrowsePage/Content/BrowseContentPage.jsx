import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ContestsFilters from "./ContestCards/ContestFilters";
import Jobs from "./JobCards/Jobs";
import Challenges from "./ContestCards/Challenges";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const BrowseContentPage = ({ value, contestQuery, jobQuery }) => {
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);

  return (
    <div>
      <Stack spacing={2}>
        {value === 0 && (
          <Grid container columns={{ xs: 2, md: 12 }} rowSpacing={2}>
            <Grid
              item
              lg={3}
              md={3}
              sm={12}
              xs={12}
              sx={{
                display: { xs: "block", sm: "block" },
                pr: { lg: 4, md: 4 },
              }}
            >
              <ContestsFilters
                setMinAmount={setMinAmount}
                setMaxAmount={setMaxAmount}
              />
            </Grid>

            <Grid item lg={9} md={9} xs={12}>
              <Challenges
                minAmount={minAmount}
                maxAmount={maxAmount}
                searchQuery={contestQuery}
              />
            </Grid>
          </Grid>
        )}

        {value === 1 && (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Jobs jobQuery={jobQuery} />
          </Grid>
        )}
      </Stack>
    </div>
  );
};

export default BrowseContentPage;
