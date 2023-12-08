import { useState } from "react";
import CreateJobOfferForm from "../../../Components/forms/CreateJobOfferForm";
import JobOfferHeader from "./components/JobOfferHeader";
import { useUserById } from "../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";
import CompanyInfoCard from "../../../Components/Cards/CompanyInfoCard";

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
      {/* Header (12 columns) */}
      <div className="col-span-12 mb-4">
        <JobOfferHeader
          selectedOption={selectedOption}
          handleCardClick={handleCardClick}
          userProfile={userProfile}
        />
      </div>

      <div className="my-8">
        <div className="grid grid-cols-12 mt-4 md:mt-0 gap-4">
          <div className="lg:col-span-8 md:col-span-8 sm:col-span-12 col-span-12">
            <CreateJobOfferForm
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
    </div>
  );
};

export default Index;
