import React from "react";
import { useState } from "react";

import { Typography, Avatar, Button, DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/system";
import { Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import {
  useApplyJob,
  useUnapplyJob,
} from "../../../../../hooks/react-query/useJobs";
import AlertContainer from "../../../../../Components/alerts";
import AlertSuccess from "../../../../../Components/successalert";

const JobOfferModal = ({ open, handleClose, job }) => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    mutate: apply,
    isSuccess: isSuccessfullyApplied,
    isError: isApplyError,
    error: applyError,
  } = useApplyJob(job, user._id);
  const {
    mutate: unapply,
    isSuccess: isSuccessfullyUnapplied,
    isError: isUnapplyError,
    error: unapplyError,
  } = useUnapplyJob(job, user._id);

  console.log(applyError);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
    setSnackbarSeverity("");
  };

  return (
    <>
      {isApplyError && <AlertContainer error={applyError} />}
      {isUnapplyError && <AlertContainer error={unapplyError} />}

      {isSuccessfullyApplied && (
        <AlertSuccess message="You applied successfully!" />
      )}

      {isSuccessfullyUnapplied && (
        <AlertSuccess message="You unapplied successfully!" />
      )}

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="responsive-dialog-title" variant="h5">
          <Stack flexDirection={"row"} alignItems={"center"} columnGap={1}>
            <Avatar src={job.company.picturePath} />
            <Typography variant="h5">{job.company.companyName}</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText Wrap>{job.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={unapply}>
            Unapply
          </Button>
          <Button onClick={apply} autoFocus variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};

export default JobOfferModal;
