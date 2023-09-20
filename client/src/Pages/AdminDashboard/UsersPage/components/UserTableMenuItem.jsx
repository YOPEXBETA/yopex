import React, { useState } from "react";
import { MdBlock, MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";

import { useMutation, useQueryClient } from "react-query";

const UserTableMenuItem = ({ userId, accountStatus }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: onDelete } = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `https://yopex-api.tabaani.co/admin/delUsers/${userId}`,
        {
          
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { mutate: onBan } = useMutation({
    mutationFn: async () => {
      await axios.get(`https://yopex-api.tabaani.co/user/ban/${userId}`, );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleClick = (event) => setOpen(!open);

  const handleDelete = () => {
    onDelete();
  };

  const handleBan = () => {
    onBan();
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={handleClick}>
        <BsThreeDotsVertical className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <button
            onClick={handleBan}
            className="px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none w-full"
          >
            <MdBlock className="h-5 w-5 mr-2 text-primary text-green-500" />
            {accountStatus === "active" || accountStatus === true
              ? "Ban"
              : "Activate"}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none w-full"
          >
            <MdDelete className="h-5 w-5 mr-2 text-primary text-green-500" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTableMenuItem;
