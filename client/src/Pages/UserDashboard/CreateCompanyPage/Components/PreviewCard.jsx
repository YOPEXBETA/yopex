import React from "react";
import OrganizationTypeCard from "../../../../Components/Cards/OrganizationTypeCard";
import { FaGlobe, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import Card from "../../../../Components/Cards";
import ImagePlaceholder from "../../../../Components/icons/ImagePlaceholder";

const PreviewCard = ({ formData, organizationTypeS, extra }) => {
  return (
    <Card extra={`p-4 ${extra}`}>
      <div className="flex items-center gap-3 mb-4">
        {formData.organizationLogo && formData.organizationLogo.length > 0 ? (
          <img
            src={URL.createObjectURL(formData.organizationLogo[0])}
            alt="Organization Logo"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div role="status" className="animate-pulse">
            <div className="flex items-center justify-center w-24 h-24 bg-gray-300 rounded-full dark:bg-gray-700">
              <ImagePlaceholder />
            </div>
          </div>
        )}

        <div className="flex-1">
          {formData.name ? (
            <p className="text-lg break-words overflow-ellipsis overflow-hidden font-bold">
              {formData.name}
            </p>
          ) : (
            <div role="status" className="animate-pulse">
              <div className="text-lg text-gray-500 rounded-full font-bold dark:bg-gray-700 mb-2">
                Organization Name
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start mb-2 pl-12">
        <div className="flex items-center">
          <FaGlobe className="mr-2 text-gray-400 dark:text-gray-600" />
          {formData.websiteURL ? (
            <p className="text-gray-700 overflow-hidden overflow-ellipsis text-center">
              {formData.websiteURL}
            </p>
          ) : (
            <div role="status" className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-56 mb-2"></div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start mb-2 pl-12">
        <div className="flex items-center">
          <FaMapMarkerAlt className="mr-2 text-gray-400 dark:text-gray-600" />
          {formData.address && formData.country ? (
            <p className="text-gray-700 overflow-hidden overflow-ellipsis text-center">
              {formData.country}, {formData.address}
            </p>
          ) : (
            <div role="status" className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-56 mb-2"></div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start mb-2 pl-12">
        <div className="flex items-center">
          <FaPhone className="mr-2 text-gray-400 dark:text-gray-600" />
          {formData.phoneNumber ? (
            <p className="text-gray-700 overflow-hidden overflow-ellipsis text-center">
              {formData.phoneNumber}
            </p>
          ) : (
            <div role="status" className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-56 mb-2"></div>
            </div>
          )}
        </div>
      </div>
      {formData.description ? (
        <p className="text-sm h-24 break-words overflow-ellipsis overflow-hidden">
          {formData.description}
        </p>
      ) : (
        <div role="status" className="animate-pulse">
          <div className="h-24 bg-gray-300 rounded-lg dark:bg-gray-700"></div>
        </div>
      )}
    </Card>
  );
};

export default PreviewCard;
