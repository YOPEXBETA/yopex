import {
  Avatar,
  Grid,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import UserTableMenuItem from "./components/UserTableMenuItem";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
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

const UserRow2 = ({ user }) => {
  const classes = useStyles();

  return (
    <TableRow key={user._id} hover>
      <TableCell>
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid item lg={2}>
            <Avatar
              alt={`${user.firstname} ${user.lastname}`}
              src={user.picturePath}
              className={classes.avatar}
            />
          </Grid>
          <Grid item lg={10}>
            <Stack flexDirection={"row"} columnGap={1}>
              <Typography variant="body1">{user.firstname}</Typography>
              <Typography variant="body1">{user.lastname}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </TableCell>

      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Typography
          className={classes.status}
          style={{
            backgroundColor:
              (user?.status === "active" && "green") ||
              (user?.status === "disabled" && "red") ||
              (user?.isActive && "green") ||
              (user?.isActive && "red"),
          }}
        >
          {user.status ? user.status : user.isActive ? "active" : "disabled"}
        </Typography>
      </TableCell>
      <TableCell>
        <UserTableMenuItem
          userId={user._id}
          accountStatus={user.status ? user.status : user.isActive}
        />
      </TableCell>
    </TableRow>
  );
};

export default UserRow2;
