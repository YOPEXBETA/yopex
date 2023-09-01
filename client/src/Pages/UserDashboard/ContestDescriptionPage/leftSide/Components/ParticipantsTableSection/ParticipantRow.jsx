import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Avatar, TableCell, TableRow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import ParticipantsDialog from "./ParticipantsDialog";
import { useSelector } from "react-redux";
import ParticipantsDialogModal from "../../../../../../Components/shared/Modals/ParticipantsDialogModal";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
}));

const ParticipantRow = ({ user, index, challenge }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  const { user: currentUser } = useSelector((state) => state.auth);
  const isOwner = currentUser.companies.find(
    (company) => company === challenge.company._id
  )
    ? true
    : false;

  return (
    <TableRow key={user._id} hover onClick={isOwner ? toggleOpen : null}>
      <TableCell>
        <Stack flexDirection={"row"} alignItems={"flex-end"} columnGap={1}>
          <EmojiEventsIcon />
          <Typography variant="h5">{index + 1} </Typography>
        </Stack>
      </TableCell>

      <TableCell>
        <Stack flexDirection={"row"} alignItems={"center"} columnGap={2}>
          {<Avatar src={user?.user?.picturePath} className={classes.avatar} />}
          <Stack flexDirection={"row"} columnGap={1}>
            <Typography variant="h6">{user?.user?.firstname}</Typography>
            <Typography variant="h6">{user?.user?.lastname}</Typography>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography variant="h6">{user?.registrationDate}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6" align="right">
          {user?.submissionDate}
        </Typography>
      </TableCell>

      {user && (
        <ParticipantsDialogModal
          open={isOpen}
          participant={user}
          handleClose={toggleOpen}
        />
      )}
    </TableRow>
  );
};

export default ParticipantRow;
