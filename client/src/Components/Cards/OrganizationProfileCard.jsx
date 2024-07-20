import React from "react";
import Card from "./index";

const OrganizationProfileCard = ({ extra, currentOrganization }) => {
  return (
    <Card extra={`${extra}`}>    
      <div className="relative flex h-48 w-full justify-center rounded-xl bg-cover">
        
        <img
          src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
          className="absolute flex h-48 w-full justify-center rounded-t-xl bg-cover"
          alt="Banner"
        />
        <div className="absolute -bottom-12 left-10 flex h-32 w-32 items-center justify-center rounded-lg border-[4px] border-white">
          <img
            className="h-full w-full rounded-lg"
            src={currentOrganization?.organizationLogo}
            alt="Avatar"
          />
        </div>
      </div>
      <div className="mt-2 mb-8 flex items-center justify-start pl-44">
        <h4 className="text-2xl font-bold dark:text-white">
          {currentOrganization?.organizationName}
        </h4>
      </div>
    </Card>
  );
};

export default OrganizationProfileCard;
