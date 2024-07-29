import React from "react";
import Card from "./index";
import { useParams } from "react-router-dom";
import Tag from "../tags/Index";


const UserInfoCard = ({ userProfile, extra, isLoading }) => {
  
  return (
    <Card extra={`w-full h-full p-6 ${extra}`}>
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold mb-2">About me</h3>
        <p className="text-sm leading-relaxed">
          {userProfile?.userDescription ||
            "Please Enter Your Summary Informations."}
        </p>
      </div>
    </Card>
  );
};

export default UserInfoCard;
