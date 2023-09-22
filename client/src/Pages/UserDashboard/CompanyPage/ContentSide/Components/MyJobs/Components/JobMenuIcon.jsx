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
import { useDeleteJob } from "../../../../../../../hooks/react-query/useJobs";
import { EditJobModal } from "../../../../../../../Components/shared/Modals/EditJobModal";
import { DialogActions, DialogContentText, DialogTitle , Dialog , DialogContent , Button } from "@mui/material";


const PostMenuIcon = ({ post }) => {
  const { user } = useSelector((state) => state.auth);

  const {mutate : deleteJob} = useDeleteJob();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    // Show the confirmation dialog
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete action
    deleteJob(post._id);

    // Close the confirmation dialog
    setConfirmationDialogOpen(false);
  };

  const handleCancelDelete = () => {
    // Close the confirmation dialog without deleting
    setConfirmationDialogOpen(false);
  };  

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
        <Tooltip title="Job settings">
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
        <MenuItem onClick={handleDeleteClick} >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete Job
        </MenuItem>

        <MenuItem onClick={handleClickEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit Job
        </MenuItem>
      </Menu>
      <EditJobModal open={openEdit} handleClose={handleCloseEdit} job={post}  />
      {/* Confirmation Dialog */}
      {confirmationDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this job?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 ml-2 bg-green-500 text-white hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

     
    </React.Fragment>
  );
};

export default PostMenuIcon;
