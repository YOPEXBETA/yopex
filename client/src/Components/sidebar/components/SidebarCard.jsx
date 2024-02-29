import { useState } from "react";
import PlusIcon from "../../icons/PlusIcon";
import CustomButton from "../../CustomButton";

const SidebarCard = ({
  isRouteWithSpecificWidth,
  handleCreateClick,
  extra,
}) => {
  return (
    <div>
      <div>
        {isRouteWithSpecificWidth ? (
          <CustomButton
            onClick={handleCreateClick}
            type="button"
            extra={`p-4 ${extra}`}
          >
            <PlusIcon />
            <span className="sr-only">Create</span>
          </CustomButton>
        ) : (
          <CustomButton
            extra={`w-[256px] px-5 py-3 ${extra}`}
            onClick={handleCreateClick}
          >
            Create
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default SidebarCard;
