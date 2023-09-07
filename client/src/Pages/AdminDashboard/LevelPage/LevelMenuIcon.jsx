import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

import { useSelector } from "react-redux";
import { useDeletePost } from "../../../hooks/react-query/usePosts";
import { EditLevelModal } from "./EditLevelModal";
import { EditPostModal } from "../../../Components/shared/Modals/EditPostModal";
import { useDeleteLevel } from "../../../hooks/react-query/useLevels";

const LevelMenuIcon = ({ level }) => {
 


  const [openPostModal, setOpenPostModal] = useState(false);
  const toggleModal = () => setOpenPostModal((prev) => !prev);

  const { user } = useSelector((state) => state.auth);
 
  const { mutate : deleteLevelMutate } =useDeleteLevel();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(open ? null : event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
   const [levelToEdit, setLevelToEdit] = useState(null);

 const handleEditLevel = (levelData) => {
   
    setLevelToEdit(levelData);
    toggleModal();
  };


  const handleDeleteClick = (id) => {
    deleteLevelMutate(id);
    handleClose();
  };

  return (
    <div>
    <div className="relative inline-block text-center z-20">
      <button
        onClick={handleClick}
        className="hover:bg-gray-100 px-2 py-2 rounded-full"
      >
        <HiDotsVertical className="text-gray-600 text-lg" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
          <ul>
            <li>
              <button
                onClick={()=>handleDeleteClick(level._id)}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
              >
                <FaTrash className="text-gray-500 mr-2" />
                Delete Level
              </button>
            </li>
            <li>
              <button
                onClick={()=>handleEditLevel()}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
              >
                <FaEdit className="text-gray-500 mr-2" />
                Edit Level
              </button>
            </li>
          </ul>
        </div>
      )}</div>


        <EditLevelModal
          open={openPostModal}
          handleClose={() => setOpenPostModal(false)}
          levelData={level  }
        />
   
  
    </div>
    
  );
};

export default LevelMenuIcon;