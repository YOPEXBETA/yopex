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
      <div className="grid grid-cols-12 mt-4 md:mt-0 gap-4">
        <div className="lg:col-span-8 md:col-span-8 sm:col-span-12 col-span-12">
          <CreateChallengeForm
            selectedOption={selectedOption}
            handleCardClick={handleCardClick}
          />
        </div>
        <div className="lg:block md:block lg:col-span-4 md:col-span-4 sm:col-span-12 col-span-12 mb-20">
          <div>
            <CompanyInfoCard
              selectedOption={selectedOption}
              handleCardClick={handleCardClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
