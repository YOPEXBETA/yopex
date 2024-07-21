import React, { useState } from "react";
import OrganizationTypeStep from "./OrganizationTypeStep";
import NameDescriptionStep from "./NameDescriptionStep";
import AdditionalDetailsStep from "./AdditionalDetailsStep";
import VerifyDocumentsStep from "./VerifyDocumentsStep";
import { useForm } from "react-hook-form";
import useStep from "../../../../hooks/react-query/useStep";
import {
  useFileUpload,
  useUserById,
} from "../../../../hooks/react-query/useUsers";
import {
  useCreateCompany,
  useSendInvitation,
} from "../../../../hooks/react-query/useCompany";
import { useSelector } from "react-redux";
import Card from "../../../../Components/Cards";
import InvitationsStep from "./InviteMembersStep";
import LogoPlaceholder from "../../../../assets/images/LogoPlaceholder.jpg";
import {
  FaChevronLeft,
  FaChevronRight,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PreviewCard from "./PreviewCard";
import SocialMediaInfoStep from "./SocialMediaInfoStep";
import LoadingSpinner from "../../../../Components/LoadingSpinner";

const CreateCompanyForm = () => {
  const { step, next, back } = useStep(1);
  const { handleSubmit, control, reset, watch } = useForm();
  const fileUploadMutation = useFileUpload();
  const { mutateAsync: createCompany, isLoading } = useCreateCompany();
  const sendInvitationMutation = useSendInvitation();
  const { user } = useSelector((state) => state.auth);
  const { data: userProfile } = useUserById(user._id);
  const navigate = useNavigate();

  const [organizationTypeS, setOrganizationTypeS] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    organizationType: "",
    sectorOfActivity: "",
    organizationLogo: [],
    organizationBanner: [],
    websiteURL: "",
    address: "",
    phoneNumber: "",
    country: "",
    organizationDocument: [],
    invitations: [], // Array to store invitations
    socialMediaLinks: []
  });
  const uploadedFile = watch("organizationLogo");
  const uploadedFiledoc = watch("organizationDocument");
  const [loading, setLoading] = useState(false);

  // Handlers to update form data
  const updateFormData = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data,
    }));
    console.log("Updated formData:", formData);
  };

  const handleType = (type) => {
    setOrganizationTypeS(type);
    console.log("type", organizationTypeS);
    next(); // Move to the next step after setting organization type
  };

  const handleNext = (data) => {
    console.log("type", organizationTypeS);
    updateFormData(data);
    next(); // Move to the next step
  };

  const handlePrevious = () => {
    back(); // Move to the previous step
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      updateFormData(data); // Update formData state with current form data
      let updatedData = { ...formData };
      // Handle file uploads
      let banner = "";
      let logo = "";
      let doc = "";
      if (formData.organizationLogo && formData.organizationLogo.length > 0) {
        const logoFormData = new FormData();
        logoFormData.append("file", formData.organizationLogo[0]);
        logoFormData.append("type", "organizationLogo");
        const response = await fileUploadMutation.mutateAsync(logoFormData);
        logo = response.data.downloadURL;
      }
      if (formData.organizationBanner && formData.organizationBanner.length > 0) {
        const bannerFormData = new FormData();
        bannerFormData.append("file", formData.organizationBanner[0]);
        bannerFormData.append("type", "organizationLogo");
        const response = await fileUploadMutation.mutateAsync(bannerFormData);
        banner = response.data.downloadURL;
      }
      if (
        formData.organizationDocument &&
        formData.organizationDocument.length > 0
      ) {
        const docFormData = new FormData();
        docFormData.append("file", formData.organizationDocument[0]);
        docFormData.append("type", "organizationDocument");
        const response = await fileUploadMutation.mutateAsync(docFormData);
        doc = response.data.downloadURL;
      }
      const {
        name,
        description,
        organizationType,
        sectorOfActivity,
        address,
        phoneNumber,
        websiteURL,
        country,
        socialMediaLinks
      } = updatedData;

      // Call createCompany mutation
      const createCompanyResponse = await createCompany({
        userId: user._id,
        organizationName: name,
        organizationDescription: description,
        organizationLogo: logo || "", // Ensure it's a string
        organizationBanner: banner || "", // Ensure it's a string
        organizationDocument: doc || "", // Ensure it's a string
        organizationType: organizationTypeS,
        sectorOfActivity,
        address,
        PhoneNumber: phoneNumber,
        websiteURL,
        country,
        socialMediaLinks : socialMediaLinks,
      });

      console.log("Create company response:", createCompanyResponse); // Log entire response to debug

      if (createCompanyResponse) {
        const { organizationId } = createCompanyResponse; // Destructure organizationId from response

        console.log("Created organizationId:", organizationId);

        // Send invitations
        console.log("roles", formData.invitations);
        formData.invitations.forEach(invitation => {
          const { userId, email, roleName } = invitation;
          if (userId) {
            sendInvitationMutation.mutate({
              organizationId: organizationId,
              userId: userId,
              roleName: roleName,
            });
          } else if (email) {
            sendInvitationMutation.mutate({
              organizationId: organizationId,
              email: email,
              roleName: roleName,
            });
          }
        });
        setTimeout(() => {
          navigate(`/company/${organizationId}`);
        }, 1000);
      } else {
        console.error("Create company response is undefined.");
      }
    } catch (error) {
      console.error("Error creating company or sending invitations:", error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };
  const getButtonLabel = () => {
    if (
      step === 5 &&
      (!formData.organizationDocument ||
        formData.organizationDocument.length === 0)
    ) {
      return "Skip";
    } else if (
      step === 6 &&
      (!formData.invitations || formData.invitations.length === 0)
    ) {
      return "Skip";
    } else {
      return "Next";
    }
  };
  const progressPercentage = ((step - 1) / 6) * 100; // Updated calculation

  return (
      <div>
        <p className=" text-gray-700 text-base">Step {step}/7</p>
        <div className="w-full bg-gray-200  rounded-full dark:bg-gray-700">
          <div
              className="bg-green-400 text-xs font-medium text-green-100 text-center p-0.5
              leading-none rounded-full"
              style={{width: `${progressPercentage}%`}}
          >
            {`${Math.round(progressPercentage)}%`}
          </div>
        </div>
        {step < 8 && step > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10
            items-center w-full">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)} >
                  {step === 1 && <OrganizationTypeStep onNext={handleType}/>}
                  {step === 2 && (
                      <div>
                        <NameDescriptionStep
                            control={control}
                            formData={formData}
                            organization={organizationTypeS}
                            updateFormData={updateFormData}
                        />
                      </div>
                  )}
                  {step === 3 && (
                      <div>
                        <AdditionalDetailsStep
                            control={control}
                            formData={formData}
                            updateFormData={updateFormData}
                        />
                      </div>
                  )}
                  {step === 4 && (
                      <div>
                        <SocialMediaInfoStep
                            control={control}
                            formData={formData}
                            updateFormData={updateFormData}
                        />
                      </div>
                  )}
                  {step === 5 && (
                      <div>
                        <VerifyDocumentsStep
                            control={control}
                            formData={formData}
                            updateFormData={updateFormData}
                        />
                      </div>
                  )}
                  {step === 6 && (
                      <div>
                        <InvitationsStep
                            control={control}
                            formData={formData}
                            updateFormData={updateFormData}
                        />
                      </div>
                  )}
                  {step === 7 && (
                      <div>
                        <PreviewCard
                            formData={formData}
                            organizationTypeS={organizationTypeS}
                        />
                      </div>
                  )}
                  <div className="mt-8 flex gap-4 items-start">
                    {step > 1 && (
                        <div className="cursor-pointer" onClick={handlePrevious}>
                          <button
                              type="button"
                              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-black transition bg-gray-100 rounded-full shadow ripple hover:shadow-lg hover:bg-gray-200 focus:outline-none"
                          >
                            <div className="flex items-center justify-between flex-1 gap-4">
                              <FaChevronLeft/>
                              <span className="text-lg font-medium dark:text-white">
                          Previous
                        </span>
                            </div>
                          </button>
                        </div>
                    )}
                    {step < 7 && step > 1 && (
                        <div
                            className="cursor-pointer"
                            onClick={handleSubmit(handleNext)}
                        >
                          <button
                              type="button"
                              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white transition bg-black rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-black"
                          >
                            <div className="flex items-center justify-between flex-1 gap-4">
                        <span className="text-lg font-medium text-white">
                          {getButtonLabel()}
                        </span>
                              <FaChevronRight/>
                            </div>
                          </button>
                        </div>
                    )}
                    {step === 7 && (
                        <button
                            type="submit"
                            className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white transition bg-green-500 rounded-full shadow ripple hover:shadow-lg hover:bg-green-200 focus:outline-none"
                        >
                          <div className="flex items-center justify-between flex-1 gap-4">
                      <span className="text-lg font-medium dark:text-white">
                        Submit
                      </span>
                          </div>
                        </button>
                    )}
                  </div>
                </form>
              </div>
              {step < 7 && step > 0 && (
                  <div className="lg:col-span-1">
                    <div>
                      <PreviewCard
                          formData={formData}
                          organizationTypeS={organizationTypeS}
                      />
                    </div>
                  </div>
              )}
            </div>
        )}
        {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-white bg-opacity-80">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center">
                  <LoadingSpinner/>
                </div>
                <h1 className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-200">
                  Submitting your organization ...
                </h1>
              </div>
            </div>
        )}
      </div>
  );
};

export default CreateCompanyForm;
