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
import { BsThreeDots } from "react-icons/bs";

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
      <div>
        <button
          data-ripple-light="true"
          data-popover-target="menu"
          onClick={toggleOpen}
        >
          <BsThreeDots />
        </button>
        {isOpen && (
          <ul
            role="menu"
            data-popover="menu"
            data-popover-placement="bottom"
            className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
          >
            <li
              onClick={() => deleteChallenge(challenge._id)}
              role="menuitem"
              className="block w-full hover:bg-gray-300 cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              Delete challenge
            </li>
            <li
              onClick={handleClickEdit}
              role="menuitem"
              className="block w-full cursor-pointer hover:bg-gray-300 select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              Edit Challenge
            </li>
          </ul>
        )}
        <EditChallengeModal
          open={openEdit}
          handleClose={handleCloseEdit}
          challenge={challenge}
        />
      </div>
    </React.Fragment>
  );
};

export default ChallengeMenuIcon;
