import React, { useState } from "react";
import { MdBlock, MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";

import { useMutation, useQueryClient } from "react-query";
import { cn } from "../../../../utils/utils";

const UserTableMenuItem = ({ userId, accountStatus }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const url = process.env.REACT_APP_API_ENDPOINT;

  const { mutate: onDelete } = useMutation({
    mutationFn: async () => {
      await axios.delete(`${url}/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin/users"] });
    },
  });

  const { mutate: onBan } = useMutation({
    mutationFn: async () => {
      await axios.put(`${url}/admin/users/${userId}/ban`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin/users"] });
    },
  });

  const { mutate: onActivate } = useMutation({
    mutationFn: async () => {
      await axios.put(`${url}/admin/users/${userId}/activate`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin/users"] });
    },
  });

  const { mutate: onDisable } = useMutation({
    mutationFn: async () => {
      await axios.put(`${url}/admin/users/${userId}/disable`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin/users"] });
    },
  });

  const handleClick = (event) => setOpen(!open);
  const handleDelete = () => onDelete();
  const handleBan = () => onBan();
  const handleDisable = () => onDisable();
  const handleActivate = () => onActivate();

  return (
    <div className="relative inline-block text-left">
      <button onClick={handleClick}>
        <BsThreeDotsVertical className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {accountStatus === "active" && (
            <button
              onClick={handleBan}
              className="px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none w-full"
            >
              <MdBlock className="h-5 w-5 mr-2 text-primary text-red-500" />
              Ban
            </button>
          )}

          <button
            onClick={
              accountStatus === "active" ? handleDisable : handleActivate
            }
            className="px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none w-full"
          >
            <MdBlock
              className={cn(
                "h-5 w-5 mr-2 text-primary",
                accountStatus === "active" ? "text-red-500" : "text-green-500"
              )}
            />
            {accountStatus === "active" ? "Disable" : "Activate"}
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
