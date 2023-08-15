// PostModal.jsx
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useUserNotifications } from "../../../../../../../hooks/react-query/useUsers";
import { timeSince } from "../../../../../../../utils";

export const NotificationsModal = ({ open, handleClose }) => {
  const { user } = useSelector((state) => state.auth);
  const { data: notifications } = useUserNotifications(user._id);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <DialogTitle variant="h5">Notifications</DialogTitle>
      </Stack>
      <Divider />
      <DialogContent sx={{ paddingTop: 0 }}>
        <List>
          {notifications?.map((notification) => (
            <React.Fragment key={notification._id}>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar
                    src={
                      notification?.job
                        ? notification?.job.company?.picturePath
                        : user.picturePath
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography variant="h5">
                        {notification.job
                          ? notification?.job.company?.companyName
                          : user.firstname}
                      </Typography>
                      <Typography variant="body1" noWrap>
                        {notification.message}
                        <Typography component="span" fontWeight="bold">
                          {notification.job ? notification.job.title : ""}
                        </Typography>
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Box>{`sent ${timeSince(
                        notification.createdAt
                      )} ago`}</Box>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};
