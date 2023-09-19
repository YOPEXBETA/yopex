import VerifiedIcon from "@mui/icons-material/Verified";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import React, { useState } from "react";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { useAcceptApplier } from "../../../../../../hooks/react-query/useJobs";

const ApplierMenuIcon = ({ Applier, job }) => {
  const { mutate } = useAcceptApplier(job);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(open ? null : event.currentTarget);
  };

  return (
    <React.Fragment>
      <div className="relative inline-block text-center z-20 bg-green-500">
        <button
          onClick={handleClick}
          className="hover:bg-gray-100 px-2 py-2 rounded-full"
        >
          <IoEllipsisHorizontalOutline className="text-gray-600 text-lg" />
        </button>

        {open && (
          <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
            <ul>
              <li>
                <button
                  onClick={() => mutate(Applier._id)}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
                >
                  <VerifiedIcon className="text-gray-500 mr-2" />
                  Accept Applier
                </button>
              </li>
              <li>
                <button className="flex items-center px-4 py-2 hover:bg-gray-100 w-full">
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
