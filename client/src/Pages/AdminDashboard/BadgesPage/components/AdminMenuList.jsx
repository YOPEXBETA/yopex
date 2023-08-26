import React, { useState } from "react";
import { AddBadgeModal } from "../../../../Components/shared/Modals/AddBadgeModal";

const AdminMenuList = () => {
  const [openWorkModal, setOpenWorkModal] = useState(false);

  const handleClickOpenModalWork = () => {
    setOpenWorkModal(true);
  };

  const handleCloseModalWork = () => {
    setOpenWorkModal(false);
  };

  return (
    <div>
      <div
        className="grid justify-items-end mt-4"
        onClick={handleClickOpenModalWork}
      >
        <button
          type="submit"
          className="bg-zinc-800 rounded-full text-white px-6 py-2"
        >
          Add Badge
        </button>
      </div>
      <AddBadgeModal open={openWorkModal} handleClose={handleCloseModalWork} />
    </div>
  );
};

export default AdminMenuList;
