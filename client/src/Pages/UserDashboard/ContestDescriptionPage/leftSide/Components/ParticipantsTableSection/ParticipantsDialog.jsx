import CloseIcon from "@mui/icons-material/Close";
import { Card, CardContent, Divider, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import CardHeader from "@mui/material/CardHeader";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useUserSubmission } from "../../../../../../hooks/react-query/useChallenges";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ParticipantsDialog = ({ open, toggleOpen, participant }) => {
  const { id: challengeId } = useParams();
  const { data: submissions } = useUserSubmission(challengeId, participant);
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={toggleOpen}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ flex: 1 }} variant="h6" component="div">
              PARTICIPANT SUBMISSION
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleOpen}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <List>
          {submissions && submissions.length > 0 && (
            <Card>
              <CardHeader
                title={
                  <Typography component="div" variant="h4">
                    User :{" "}
                    <Link to={`/profile/${participant.user._id}`}>
                      {participant.user.firstname +
                        " " +
                        participant.user.lastname}
                    </Link>
                  </Typography>
                }
              />
              <Divider />

              <CardHeader
                title={
                  <Typography component="div" variant="h4">
                    Title
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="body1">
                    {submissions[0].title}
                  </Typography>
                </Stack>
              </CardContent>
              <CardHeader
                title={
                  <Typography component="div" variant="h4">
                    Description
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="body1">
                    {submissions[0].description}
                  </Typography>
                </Stack>
              </CardContent>
              {submissions[0].filesPaths &&
                submissions[0].filesPaths.length > 0 && (
                  <>
                    <Divider />
                    <CardHeader
                      title={
                        <Typography component="div" variant="h4">
                          Files Attached
                        </Typography>
                      }
                    />
                    <Divider />
                    <CardContent>
                      <Stack spacing={2}>
                        {submissions[0].filesPaths.map((file, i) => (
                          <Typography key={i} variant="body1">
                            <a
                              href={file}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              File{" " + i}
                            </a>
                          </Typography>
                        ))}
                      </Stack>
                    </CardContent>
                  </>
                )}
              {submissions[0].links && submissions[0].links.length > 0 && (
                <>
                  <Divider />
                  <CardHeader
                    title={
                      <Typography component="div" variant="h4">
                        Links Attached
                      </Typography>
                    }
                  />
                  <Divider />
                  <CardContent>
                    <Stack spacing={2}>
                      {submissions[0].links.map((item, i) => (
                        <Typography key={i} variant="body1">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.platform + " link"}
                          </a>
                        </Typography>
                      ))}
                    </Stack>
                  </CardContent>
                </>
              )}
            </Card>
          )}
        </List>
      </Dialog>
    </div>
  );
};
export default ParticipantsDialog;
