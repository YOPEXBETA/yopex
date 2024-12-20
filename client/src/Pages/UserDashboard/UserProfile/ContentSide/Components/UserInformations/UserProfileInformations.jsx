import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useUserById } from "../../../../../../hooks/react-query/useUsers";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import UserInfoCard from "../../../../../../Components/Cards/UserInfoCard";
import AdditionalUserInfoCard from "../../../../../../Components/Cards/AdditionalUserInfoCard";

const UserProfileInformations = () => {
  const { userId } = useParams();
  const { data: userProfile, isLoading } = useUserById(userId);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <UserInfoCard userProfile={userProfile} isLoading={isLoading} />
      <AdditionalUserInfoCard  userProfile={userProfile} isLoading={isLoading}/>
    </div>
  );
};

export default UserProfileInformations;
