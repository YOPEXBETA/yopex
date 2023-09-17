import { MoreVert } from "@mui/icons-material";
import VerifiedIcon from '@mui/icons-material/Verified';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { useAcceptApplier } from "../../../../../../hooks/react-query/useJobs";

const ApplierMenuIcon = ({ Applier , job }) => {

  const { mutate } = useAcceptApplier(job)
  const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
  
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
            <IoEllipsisHorizontalOutline size={20} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="post-menu"
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
        <MenuItem onClick={()=>mutate(Applier._id)}>
          <ListItemIcon>
            <VerifiedIcon fontSize="small" />
          </ListItemIcon>
          Accept Applier
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <DoNotDisturbOnIcon fontSize="small" />
          </ListItemIcon>
          Delete Applier
        </MenuItem>
      </Menu>
  
    </React.Fragment>
  );
};

export default ApplierMenuIcon;
