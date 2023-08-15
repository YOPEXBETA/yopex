import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/system";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../../../redux/auth/authSlice";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 32,
    height: 32,
  },
  menu: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    width: "100%",
    minWidth: 260,
    maxWidth: 300,
    mt: 1.5,
    borderRadius: "10px",
    "& .MuiAvatar-root": {
      width: 50,
      height: 50,
      ml: -0.5,
      mr: 1,
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
  name: {
    fontSize: 14,
  },
  title: {
    color: theme.palette.text.secondary,
  },
}));

// ==============================|| CODE ||============================== //

const ProfileMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <React.Fragment>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar className={classes.avatar} src={user.picturePath}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
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
        <MenuItem
          component={Link}
          to={`/profile/${user._id}`}
          sx={{ display: "flex", alignItems: "center", columnGap: "0.6rem" }}
        >
          <Avatar src={user.picturePath} />
          <Stack>
            {user.role === "user" || user.role === "admin" ? (
              <div>
                <Typography variant="h5">
                  {user.firstname + " " + user.lastname}
                </Typography>
                <Typography variant="body1" color={"text.secondary"}>
                  {user.fieldOfStudy}
                </Typography>
              </div>
            ) : (
              <Typography variant="h5">{user.companyName}</Typography>
            )}
          </Stack>
        </MenuItem>
        <Divider />
        {user.role === "admin" ? (
          <MenuItem component={Link} to="/adminDashboard">
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            Admin Dashboard
          </MenuItem>
        ) : null}
        <MenuItem component={Link} to="/settings">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem component={Link} to="/login" onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default ProfileMenu;
