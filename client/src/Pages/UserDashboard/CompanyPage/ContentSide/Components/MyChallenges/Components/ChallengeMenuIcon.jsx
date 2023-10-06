import { MoreVert } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { useDeleteChallenge } from "../../../../../../../hooks/react-query/useChallenges";
import { EditChallengeModal } from "../../../../../../../Components/shared/Modals/EditChallengeModal";

const ChallengeMenuIcon = ({ challenge }) => {

  const { user } = useSelector((state) => state.auth);
  const { mutate: deleteChallenge } = useDeleteChallenge();

  const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
  const [anchorE2, setAnchorE2] = useState(null);
 const openEdit = Boolean(anchorE2);
  
 const handleClickEdit = (event) => {
    setAnchorE2(openEdit ? null : event.currentTarget);
  };
 
  const handleCloseEdit = () => setAnchorE2(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Challenge settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "post-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
             <MoreVert />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="challenge-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
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
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={()=>deleteChallenge(challenge._id)} >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete Challenge
        </MenuItem>

        <MenuItem onClick={handleClickEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit Challenge
        </MenuItem>
      </Menu>
      <EditChallengeModal open={openEdit} handleClose={handleCloseEdit} challenge={challenge}/>

     
    </React.Fragment>
  );
};

export default ChallengeMenuIcon;