import VerifiedIcon from "@mui/icons-material/Verified";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import React, { useState } from "react";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import {
  useAcceptApplier,
  useUnapplyJob,
} from "../../../../../../hooks/react-query/useJobs";

const ApplierMenuIcon = ({ Applier, job }) => {
  const { mutate: accepteMutate } = useAcceptApplier(job);
  const { mutate: deleteMutate } = useUnapplyJob(job, Applier._id);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(open ? null : event.currentTarget);
  };

  return (
    <React.Fragment>
      <div className="relative inline-block text-center">
        <button
          onClick={handleClick}
          className="hover:bg-gray-100 px-2 py-2 rounded-full bg-white dark:bg-zinc-700"
        >
          <IoEllipsisHorizontalOutline className="text-gray-600 text-lg" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 z-10 bg-white border dark:bg-zinc-700 border-gray-200 shadow-lg rounded-lg">
            <ul>
              <li>
                <button
                  onClick={() => accepteMutate(Applier._id)}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 w-full dark:text-white"
                >
                  <VerifiedIcon className="text-gray-500 mr-2" />
                  Accept Applier
                </button>
              </li>
              <li>
                <button
                  onClick={() => deleteMutate()}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 w-full dark:text-white"
                >
                  <DoNotDisturbOnIcon className="text-gray-500 mr-2" />
                  Delete Applier
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ApplierMenuIcon;
