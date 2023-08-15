import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const ITEM_HEIGHT = 48;

const UserTableMenuItem = ({ userId, accountStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const queryClient = useQueryClient();

  const { mutate: onDelete } = useMutation({
    mutationFn: async () => {
      await axios.delete(`http://localhost:8000/admin/delUsers/${userId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { mutate: onBan } = useMutation({
    mutationFn: async () => {
      await axios.get(`http://localhost:8000/user/ban/${userId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  const handleBan = () => {
    onBan();
    handleClose();
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleBan}>
          {accountStatus === "active" || accountStatus === true
            ? "Ban"
            : "Activate"}
        </MenuItem>
        <MenuItem onClick={handleDelete}>delete</MenuItem>
      </Menu>
    </div>
  );
};

export default UserTableMenuItem;
