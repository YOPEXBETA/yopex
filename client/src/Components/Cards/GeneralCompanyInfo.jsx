import React from "react";
import Card from "./index";
import {FaBehance, FaDribbble, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa";
import LinkIcon from "../icons/LinkIcon";

const GeneralCompanyInfo = ({ company }) => {
  const iconMapping = {
    Linkedin: <FaLinkedin className="text-blue-600" size={30} />,
    Instagram: <FaInstagram className="text-pink-600" size={30} />,
    Facebook: <FaFacebook className="text-blue-800" size={30} />,
    Twitter: <FaTwitter className="text-blue-400" size={30} />,
    Behance: <FaBehance className="text-black" size={30} />,
    Dribbble: <FaDribbble className="text-pink-400" size={30} />,
    Github: <FaGithub className="text-gray-900" size={30} />
  };
  return (
      <Card extra={"w-full p-3"}>
        {/* Header */}
        <div className="mt-2 mb-8 h-32 w-full">
          <h4 className="px-2 text-lg font-bold dark:text-white">Overview</h4>
          <p className="mt-2 mx-3 px-2 text-base dark:text-white break-words">
            {company?.organizationDescription}
          </p>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2">
          <div
              className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
            <p className="text-base font-bold dark:text-white">Address</p>
            <p className="text-base font-medium text-gray-700 dark:text-white">
              {company?.address}
            </p>
          </div>

          <div
              className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
            <p className="text-base font-bold dark:text-white">Country</p>
            <p className="text-base font-medium text-gray-700 dark:text-white">
              {company?.country}
            </p>
          </div>

          <div
              className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
            <p className="text-base font-bold dark:text-white">Website</p>
            <a
                className="text-base font-medium text-gray-700 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-500"
                href={company?.websiteURL}
                target="_blank"
                rel="noopener noreferrer"
            >
              {company?.websiteURL}
            </a>
          </div>

          <div
              className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
            <p className="text-base font-bold dark:text-white">Phone Number</p>
            <p className="text-base font-medium text-gray-700 dark:text-white">
              {company?.PhoneNumber || "N/A"}
            </p>
          </div>
          <div
              className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
            <p className="text-base font-bold dark:text-white">Date of Foundation</p>
            <p className="text-base font-medium text-gray-700 dark:text-white">
              {company?.dateOfFoundation ? new Date(company.dateOfFoundation).toLocaleDateString() : "N/A"}
            </p>
          </div>


          {company?.organizationType === "Company" && (
              <>
                <div
                    className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
                  <p className="text-base font-bold dark:text-white">Sector of Activity</p>
                  <p className="text-base font-medium text-gray-700 dark:text-white">
                    {company?.sectorOfActivity || "N/A"}
                  </p>
                </div>
              </>
          )}

          <div
              className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
            <p className="text-base font-bold dark:text-white">Social Links</p>
            <div className="flex space-x-4">
              {company?.socialMediaLinks.map((link) =>
                  link.url ? (
                      <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center text-base font-medium text-gray-700 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-500"
                      >
                        <div className="h-10 w-10">
                          {iconMapping[link.platform] || <LinkIcon />}
                        </div>
                      </a>
                  ) : null
              )}
            </div>
          </div>
        </div>
      </Card>
  );
};

export default GeneralCompanyInfo;
