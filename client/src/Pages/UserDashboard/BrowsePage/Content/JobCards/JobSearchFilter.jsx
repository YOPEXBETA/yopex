import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import React from "react";

const JobSearchFilter = () => {
  return (
    <Paper variant="outlined" square component="form">
      <InputBase placeholder="search for job opportunities" />
      <IconButton type="button" aria-label="search for job opportunities">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default JobSearchFilter;
