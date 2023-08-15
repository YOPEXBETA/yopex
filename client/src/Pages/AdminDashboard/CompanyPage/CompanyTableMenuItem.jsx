import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  // Delete as DeleteIcon,
} from "@mui/icons-material";
import AddTaskIcon from "@mui/icons-material/AddTask";
// import { useDispatch } from "react-redux";
// import { approveCompany } from "../../../redux/actions/AdminAction";
import { useApproveCompany } from "../../../hooks/react-query/useCompany";

const CompanyTableMenuItem = ({ companyId }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { mutate } = useApproveCompany();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const dispatch = useDispatch();
  const handleApprove = () => {
    mutate(companyId);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleApprove}>
          <AddTaskIcon color="primary" />
          Approve
        </MenuItem>
      </Menu>
    </>
  );
};

export default CompanyTableMenuItem;
