import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useUserById } from "../../../../../../hooks/react-query/useUsers";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import UserInfoCard from "../../../../../../Components/Cards/UserInfoCard";

const UserProfileInformations = () => {
  const { userId } = useParams();
  const { data: userProfile, isLoading } = useUserById(userId);

  return (
    <div>
      <UserInfoCard userProfile={userProfile} isLoading ={isLoading}/>
    </div>
  );
};

export default UserProfileInformations;
