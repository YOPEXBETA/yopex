import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useUserNotifications } from "../../../../../../../hooks/react-query/useUsers";
import { NotificationsModal } from "./NotificationsModal";
import { timeSince } from "../../../../../../../utils";

const NotificationBell = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: notifications } = useUserNotifications(user._id);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Badge badgeContent={notifications?.length} color="primary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            minWidth: 320,
            maxWidth: 380,
            "& .MuiAvatar-root": {
              width: 45,
              height: 45,
              mr: 1.5,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <List>
          <ListItem>
            <ListItemText
              primary={
                <Stack flexDirection={"row"} columnGap={1}>
                  <Typography variant="h4">Notifications</Typography>
                </Stack>
              }
            />
          </ListItem>
          <Divider />
          {notifications?.map((notification) => (
            <React.Fragment key={notification._id}>
              <ListItemButton onClick={handleClose}>
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
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                pb: 1,
              }}
              onClick={toggleOpen}
            >
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <Typography
                      color="primary"
                      variant="body1"
                      sx={{
                        textDecoration: "none",
                      }}
                    >
                      View all notifications
                    </Typography>
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Menu>
      <NotificationsModal open={isOpen} handleClose={toggleOpen} />
    </div>
  );
};

export default NotificationBell;
