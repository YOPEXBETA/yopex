import React from "react";
import axios from "axios";
import {
  Typography,
  Modal,
  Fade,
  CardHeader,
  Button,
  CardContent,
  Divider,
} from "@mui/material";
import { useState } from "react";

import { Stack } from "@mui/system";
import { Snackbar } from "@mui/material";

const JobPopup = ({
  open,
  handleClose,
  title,
  description,
  username,
  jobId,
  userId,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const handleApply = async (userId) => {
    try {
      const response = await axios.put(
        `http://yopex-api.tabaani.co/job/jobs/${jobId}/apply/${userId}`
      );
      setSnackbarMessage(response.data);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(err.response.data);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleUnapply = async (userId) => {
    try {
      const response = await axios.put(
        `http://yopex-api.tabaani.co/job/jobs/${jobId}/unapply/${userId}`
      );
      setSnackbarMessage(response.data);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(err.response.data);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
    setSnackbarSeverity("");
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Fade in={open}>
          <div>
            <CardHeader
              title={<Typography variant="h4">{username}</Typography>}
              action={
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    sx={{
                      width: "114.49px",
                      height: "33.76px",
                      borderRadius: "25px",
                      bgcolor: "#8F00FF",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#7a00cc",
                      },
                    }}
                    onClick={() => handleApply(userId)}
                  >
                    Apply
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      width: "114.49px",
                      height: "33.76px",
                      borderRadius: "25px",
                      bgcolor: "#ff1744",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#d50000",
                      },
                    }}
                    onClick={() => handleUnapply(userId)}
                  >
                    Unapply
                  </Button>
                </Stack>
              }
            />
            <Divider />
            <CardContent>
              <Stack spacing={38}>
                <Stack spacing={2}>
                  <Stack
                    flexDirection={"row"}
                    columnGap={"0.3rem"}
                    alignItems={"flex-end"}
                  >
                    <Stack
                      flexDirection={"row"}
                      alignItems={"center"}
                      columnGap={"0.3rem"}
                    >
                      <Typography variant="h4">Job Title :</Typography>
                    </Stack>
                    <Typography variant="h4">{title}</Typography>
                  </Stack>
                  <Divider />
                  <Stack>
                    <Typography variant="h5">About the work offer:</Typography>
                    <Typography variant="body1" Wrap>
                      {description}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </div>
        </Fade>
      </Modal>
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

export default JobPopup;
