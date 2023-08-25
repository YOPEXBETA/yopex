import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Divider, Grid, Stack, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import storage from "../../../../config/firebase";
// import { submitChallenge } from "../../../../redux/actions/ChallengeAction";
import { useSubmitToChallenge } from "../../../../hooks/react-query/useChallenges";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px 10%",
    [theme.breakpoints.down("lg")]: {
      padding: "40px 6%",
    },
    [theme.breakpoints.down("md")]: {
      padding: "40px 4%",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "40px 2%",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "40px 2%",
    },
  },
  uploadFilesArea: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    height: "250px",
    border: "1px dotted black",
    margin: "1rem 2rem",
    [theme.breakpoints.down("lg")]: {
      margin: "1rem 0rem",
    },
    [theme.breakpoints.between("sm", "md")]: {
      margin: "1rem 0rem",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const maxSize = 5 * 1024 * 1024; // 5 megabytes

const SubmissionDialog = ({ open, handleClose, setIsSubmitted }) => {
  const classes = useStyles();
  const [filesSelected, setFilesSelected] = useState([]);
  const [SubmissionTitle, setSubmissionTitle] = useState("");
  const [SubmissionDescription, setSubmissionDescription] = useState("");
  const [filesPaths, setFilesPaths] = useState([]);

  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { mutate, isSuccess } = useSubmitToChallenge(id);

  const handleFileUpload = async (file) => {
    const storageRef = ref(storage);
    const fileRef = ref(storageRef, `files/${user._id}+${id}+${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    try {
      await uploadTask;
      const url = await getDownloadURL(fileRef);
      setFilesPaths((prev) => [...prev, url]);
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  // const dispatch = useDispatch();

  const handleSubmit = async () => {
    mutate({
      challengeId: id,
      userId: user._id,
      title: SubmissionTitle,
      description: SubmissionDescription,
      filesPaths: filesPaths,
    });
    // const data = dispatch(
    //   submitChallenge({
    //     challengeId: id,
    //     userId: user._id,
    //     title: SubmissionTitle,
    //     description: SubmissionDescription,
    //     filesPaths: filesPaths,
    //   })
    // ).catch((err) => {
    //   console.log(err);
    // });
    if (isSuccess) {
      setIsSubmitted(true);
      handleClose();
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // const files = e.dataTransfer.files;
  };

  const validFiles = [];
  const invalidFiles = [];

  const handleFileSelect = async (event) => {
    const files = event.target.files;
    handleFiles(files);
    for (const file of validFiles) {
      file.url = await handleFileUpload(file);
      setFilesSelected([...filesSelected, file]);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (
        (file.type === "application/zip" ||
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif" ||
        file.type === "video/mp4" ||
        file.type === "video/avi") &&
        file.size <= maxSize
      ) {
        validFiles.push(file);
        setFilesSelected([...filesSelected, file]);
      } else {
        invalidFiles.push(file);
      }
    }

    console.log("Valid files:", validFiles);
    console.log("Invalid files:", invalidFiles);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ flex: 1 }} variant="h6" component="div">
              SUBMIT YOUR WORK
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List className={classes.root}>
          <Grid container rowGap={2} alignItems="flex-start">
            <Grid item lg={12}>
              <Stack spacing={2}>
                <Typography variant="h3">
                  Need a logo for an ecommerce business
                </Typography>
                <Divider />
              </Stack>
            </Grid>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Stack spacing={3}>
                  <TextField
                    label="Enter your Submission Title"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => {
                      setSubmissionTitle(e.target.value);
                    }}
                  />
                  <TextField
                    label="Describe your submission"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={6}
                    variant="outlined"
                    onChange={(e) => {
                      setSubmissionDescription(e.target.value);
                    }}
                  />
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    {filesSelected.length > 0 &&
                      filesSelected.map((file) => {
                        return (
                          <Typography key={file.name}>
                            {" "}
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.name}
                            </a>
                          </Typography>
                        );
                      })}
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    onClick={handleSubmit}
                    disabled={
                      (SubmissionTitle === "" || SubmissionDescription === "")?true:false 
                    }
                  >
                    Submit your work
                  </Button>
                </Stack>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box className={classes.uploadFilesArea} onDrop={handleDrop}>
                  <Stack spacing={2} alignItems={"center"}>
                    <Typography>
                      Drag and drop your files here or click to upload
                    </Typography>
                    <input
                      hidden
                      accept=".jpg,.jpeg,.png,.gif,.mp4,.avi,.zip,application/*"
                      type="file"
                      id="fileInput"
                      onChange={handleFileSelect}
                      multiple
                    />
                    <label htmlFor="fileInput">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Upload Your Files
                      </Button>
                    </label>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </List>
      </Dialog>
    </div>
  );
};

export default SubmissionDialog;
