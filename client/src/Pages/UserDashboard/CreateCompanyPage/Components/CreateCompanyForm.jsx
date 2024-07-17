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
    websiteURL: "",
    address: "",
    phoneNumber: "",
    country: "",
    organizationDocument: [],
    invitations: [], // Array to store invitations
  });
  const uploadedFile = watch("organizationLogo");
  const uploadedFiledoc = watch("organizationDocument");

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
      updateFormData(data); // Update formData state with current form data
      let updatedData = { ...formData };
      // Handle file uploads
      let logo = "";
      let doc = "";
      if (formData.organizationLogo && formData.organizationLogo.length > 0) {
        const logoFormData = new FormData();
        logoFormData.append("file", formData.organizationLogo[0]);
        logoFormData.append("type", "organizationLogo");
        const response = await fileUploadMutation.mutateAsync(logoFormData);
        logo = response.data.downloadURL;
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
      } = updatedData;

      // Call createCompany mutation
      const createCompanyResponse = await createCompany({
        userId: user._id,
        organizationName: name,
        organizationDescription: description,
        organizationLogo: logo || "", // Ensure it's a string
        organizationDocument: doc || "", // Ensure it's a string
        organizationType: organizationTypeS,
        sectorOfActivity,
        address,
        phoneNumber, // Check the correct field name based on backend expectations
        websiteURL,
        country,
      });

      console.log("Create company response:", createCompanyResponse); // Log entire response to debug

      if (createCompanyResponse) {
        const { organizationId } = createCompanyResponse; // Destructure organizationId from response

        console.log("Created organizationId:", organizationId);

        // Send invitations
        console.log("roles", formData.invitations);
        formData.invitations.forEach((invitation) => {
          sendInvitationMutation.mutate({
            organizationId: organizationId,
            userId: invitation.userId,
            roleName: invitation.roleName,
          });
        });
        setTimeout(() => {
          navigate(`/company/${organizationId}`);
        }, 1000);
      } else {
        console.error("Create company response is undefined.");
      }
    } catch (error) {
      console.error("Error creating company or sending invitations:", error);
    }
  };
  const getButtonLabel = () => {
    if (
      step === 4 &&
      (!formData.organizationDocument ||
        formData.organizationDocument.length === 0)
    ) {
      return "Skip";
    } else if (
      step === 5 &&
      (!formData.invitations || formData.invitations.length === 0)
    ) {
      return "Skip";
    } else {
      return "Next";
    }
  };

  return (
    <div>
      <p className=" text-gray-700 text-base">Step {step}/6</p>
      {step < 7 && step > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center w-full">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && <OrganizationTypeStep onNext={handleType} />}
              {step === 2 && (
                <div>
                  <div className="text-center mb-10">
                    <h2 className="text-3xl mt-6 font-bold text-left dark:text-white">
                      Create your {organizationTypeS} workspace
                    </h2>
                  </div>
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
                  <div className="text-center mb-10">
                    <h2 className="text-3xl mt-6 font-bold text-left dark:text-white">
                      Create your {organizationTypeS} workspace
                    </h2>
                  </div>
                  <AdditionalDetailsStep
                    control={control}
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                </div>
              )}
              {step === 4 && (
                <div>
                  <div className="text-center mb-10">
                    <h2 className="text-3xl mt-6 font-bold text-left dark:text-white">
                      Create your {organizationTypeS} workspace
                    </h2>
                  </div>
                  <VerifyDocumentsStep
                    control={control}
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                </div>
              )}
              {step === 5 && (
                <div>
                  <div className="text-center mb-10">
                    <h2 className="text-3xl mt-6 font-bold text-left dark:text-white">
                      Create your {organizationTypeS} workspace
                    </h2>
                  </div>
                  <InvitationsStep
                    control={control}
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                </div>
              )}
              {step === 6 && (
                <div>
                  <div className="text-center mb-10">
                    <h2 className="text-3xl mt-6 font-bold text-left dark:text-white">
                      Create your {organizationTypeS} workspace
                    </h2>
                  </div>
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
                        <FaChevronLeft />
                        <span className="text-lg font-medium dark:text-white">
                          Previous
                        </span>
                      </div>
                    </button>
                  </div>
                )}
                {step < 6 && step > 1 && (
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
                        <FaChevronRight />
                      </div>
                    </button>
                  </div>
                )}
                {step === 6 && (
                  <button
                    type="button"
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
          {step < 6 && step > 0 && (
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
    </div>
  );
};

export default CreateCompanyForm;
