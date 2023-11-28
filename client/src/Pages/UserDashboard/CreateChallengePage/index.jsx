import React, { useState } from "react";
import ChallengeHeader from "./components/ChallengeHeader";
import CreateChallengeForm from "../../../Components/forms/CreateChallengeForm";
import CompanyInfoCard from "../../../Components/Cards/CompanyInfoCard";
import { useUserById } from "../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";

const Index = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleCardClick = (companyId) => {
    setSelectedOption(companyId);
  };
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const { data: userProfile, isLoading } = useUserById(userId);
  return (
    <div>
      <div className="col-span-12 mb-4">
        <ChallengeHeader
          selectedOption={selectedOption}
          handleCardClick={handleCardClick}
          userProfile={userProfile}
        />
      </div>
      <div className="grid grid-cols-8 gap-4 md:mx-32">
        <div className="col-span-8 md:col-span-8 lg:col-span-6">
          <CreateChallengeForm
            selectedOption={selectedOption}
            handleCardClick={handleCardClick}
          />
        </div>
        <div className="col-span-8 md:col-span-4 lg:col-span-2 hidden md:block">
          <CompanyInfoCard
            selectedOption={selectedOption}
            handleCardClick={handleCardClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
