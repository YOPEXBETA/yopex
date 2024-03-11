import React, { useState } from "react";
import { MdBlock } from "react-icons/md";
import axios from "axios";

import { useMutation, useQueryClient } from "react-query";
import { cn } from "../../utils/utils";
import TrashIcon from "../icons/TrashIcon";

const AdminUserTableMenuItem = ({ userId, accountStatus }) => {
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

  const handleDelete = () => onDelete();
  const handleBan = () => onBan();
  const handleDisable = () => onDisable();
  const handleActivate = () => onActivate();

  return (
    <div>
      <ul className="absolute right-0 z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white dark:bg-zinc-700 p-2 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
        {accountStatus === "active" && (
          <li
            onClick={handleBan}
            className="px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none w-full"
          >
            <div className="flex items-center gap-2">
              <MdBlock className="h-5 w-5 mr-2 text-primary text-red-500" />
              <p className="font-medium"> Ban</p>
            </div>
          </li>
        )}

        <li
          onClick={accountStatus === "active" ? handleDisable : handleActivate}
          className="px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none w-full"
        >
          <div className="flex items-center gap-2">
            <MdBlock
              className={cn(
                "h-5 w-5 mr-2 text-primary",
                accountStatus === "active" ? "text-red-500" : "text-green-500"
              )}
            />
            <p className="font-medium">
              {accountStatus === "active" ? "Disable" : "Activate"}
            </p>
          </div>
        </li>

        <li
          onClick={handleDelete}
          className="px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none w-full"
        >
          <div className="flex items-center gap-2">
            <TrashIcon />
            <p className="font-medium ">Delete User</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AdminUserTableMenuItem;
