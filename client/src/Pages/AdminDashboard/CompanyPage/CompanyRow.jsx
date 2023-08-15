import {
  Avatar,
  Grid,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import CompanyTableMenuItem from "./CompanyTableMenuItem";
import ChallengeDialog from "./challengeDialog";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

const CompanyRow = ({ company }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  const classes = useStyles();
  return (
    <TableRow
      key={company._id}
      hover
      onClick={(event) => {
        if (
          !(
            event.target.closest("td") === event.currentTarget.cells[0] ||
            event.target.closest("td") === event.currentTarget.cells[1] ||
            event.target.closest("td") === event.currentTarget.cells[2]
          )
        ) {
          return; // exit the function if the click is not on the first three cells
        }
        toggleOpen();
      }}
    >
      <TableCell>
        <Grid
          container
          spacing={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item lg={2}>
            <Avatar
              alt={`${company.companyName}`}
              src={company.companyLogo}
              className={classes.avatar}
            />
          </Grid>
          <Grid item lg={10}>
            <Stack flexDirection={"row"} columnGap={1}>
              <Typography
                className={classes.name}
                color="textSecondary"
                variant="body1"
              >
                {company.companyName}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <Typography
          className={classes.name}
          color="textSecondary"
          variant="body1"
        >
          {company.jobs.length}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          className={classes.name}
          color="textSecondary"
          variant="body1"
        >
          {company.challenges.length}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          className={classes.status}
          style={{
            backgroundColor:
              (company.verified === true && "green") ||
              (company.verified === false && "red"),
          }}
        >
          {company.verified ? "Verified" : "Not Verified"}
        </Typography>
      </TableCell>
      <TableCell>
        <CompanyTableMenuItem companyId={company._id} />
      </TableCell>
      <ChallengeDialog
        open={isOpen}
        handleClose={toggleOpen}
        company={company}
      />
    </TableRow>
  );
};

export default CompanyRow;
