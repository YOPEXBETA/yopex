import TokenIcon from "@mui/icons-material/Token";
import React, { useState } from "react";
import Badge from "./Badge";

const Badges = ({ userProfile }) => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prev) => !prev);

  return (
    <div>
      <div className="flex flex-row space-x-2 items-end">
        {userProfile?.badgesEarned?.map((badge) => (
          <img
            key={badge._id}
            src={badge.badgeImg}
            className="w-10 h-10"
            alt="Badge"
          />
        ))}

        <div className={`fixed ${openModal ? "block" : "hidden"}`}>
          <div className="bg-white p-4 w-full">
            <div className="flex flex-row items-center space-x-1">
              <TokenIcon />
            </div>
            <hr className="my-4" />
            <div className="space-y-2">
              <div className="space-y-2">
                {userProfile?.badgesEarned?.map((badge) => (
                  <Badge key={badge._id} badge={badge} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badges;
