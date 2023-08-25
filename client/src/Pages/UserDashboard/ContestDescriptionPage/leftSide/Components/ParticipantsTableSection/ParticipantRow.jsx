import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Avatar, TableCell, TableRow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import ParticipantsDialog from "./ParticipantsDialog";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
}));

const ParticipantRow = ({ user, index }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <TableRow key={user._id} hover onClick={toggleOpen}>
      <TableCell>
        <Stack flexDirection={"row"} alignItems={"flex-end"} columnGap={1}>
          <EmojiEventsIcon />
          <Typography variant="h5">{index + 1} </Typography>
        </Stack>
      </TableCell>

      <TableCell>
        <Stack flexDirection={"row"} alignItems={"center"} columnGap={2}>
          {<Avatar src={user.user.picturePath} className={classes.avatar} />}
          <Stack flexDirection={"row"} columnGap={1}>
            <Typography variant="h6">{user.user.firstname}</Typography>
            <Typography variant="h6">{user.user.lastname}</Typography>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography variant="h6">{user.submissionDate}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6" align="right">
          {user.registrationDate}
        </Typography>
      </TableCell>

      <ParticipantsDialog
        open={isOpen}
        participant={user}
        handleClose={toggleOpen}
      />
    </TableRow>
  );
};

export default ParticipantRow;
