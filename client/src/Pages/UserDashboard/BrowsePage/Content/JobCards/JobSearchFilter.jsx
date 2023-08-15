import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "2px 10px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "0 auto",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: "5px",
  },
  SearchIconColor: {
    color: "#7C7C7A",
  },
}));

const JobSearchFilter = () => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" square component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="search for job opportunities"
      />
      <IconButton
        type="button"
        className={classes.iconButton}
        aria-label="search for job opportunities"
      >
        <SearchIcon className={classes.SearchIconColor} />
      </IconButton>
    </Paper>
  );
};

export default JobSearchFilter;
