import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Avatar, TableCell, TableRow, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const UserRow = ({ user, index }) => {
  return (
    <TableRow key={user._id} hover>
      <TableCell>
        <Stack flexDirection={"row"} alignItems={"flex-end"} columnGap={1}>
          <EmojiEventsIcon />
          <Typography variant="h5">{user.rank}</Typography>
        </Stack>
      </TableCell>

      <TableCell>
        <Link
          to={`/profile/${user._id}`}
          style={{ textDecoration: "none", color: "#000000" }}
        >
          <Stack flexDirection={"row"} alignItems={"center"} columnGap={2}>
            <img
              src={user.picturePath}
              width={30}
              className="rounded-full object-cover bg-green-500 border-2 h-16 w-16"
            />
            <div className=" flex gap-2">
              <p className="">{user.firstname}</p>
              <p className="">{user.lastname}</p>
            </div>
          </Stack>
        </Link>
      </TableCell>

      <TableCell>
        <p className="">{user.country}</p>
      </TableCell>
      <TableCell>
        <h6 className="text-right pr-4">{user.score}</h6>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
