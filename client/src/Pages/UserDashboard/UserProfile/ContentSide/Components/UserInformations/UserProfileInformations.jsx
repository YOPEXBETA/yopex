import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useUserById } from "../../../../../../hooks/react-query/useUsers";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import UserInfoCard from "../../../../../../Components/Cards/UserInfoCard";

const UserProfileInformations = () => {
  const { userId } = useParams();
  const { data: userProfile, isLoading } = useUserById(userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <UserInfoCard userProfile={userProfile} />
    </div>
  );
};

export default UserProfileInformations;
