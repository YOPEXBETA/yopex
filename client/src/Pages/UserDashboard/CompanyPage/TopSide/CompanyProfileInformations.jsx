import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useCompanyById } from "../../../../hooks/react-query/useCompany";
import { CompanyNavigationTab } from "./CompanyNavigationTab";
import { useFollowCompany } from "../../../../hooks/react-query/useUsers";
import { useDeleteCompany } from "../../../../hooks/react-query/useCompany";
import { EditCompanyModal } from "../../../../Components/shared/Modals/EditCompanyModal";

import { FaUserMinus, FaTrash, FaEdit, FaUserPlus } from "react-icons/fa";

const CompanyProfileInformations = ({ changeValue, value }) => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const { companyId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { mutate, isLoadinge } = useFollowCompany(user._id, companyId);
  const deleteCompanyMutation = useDeleteCompany();
  const handleDeleteCompany = async () => {
    try {
      await deleteCompanyMutation.mutateAsync(company._id);
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };
  const { data: company, isLoading, isError } = useCompanyById(companyId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading company data.</p>;
  }
  const toggleModal = () => {
    setOpenPostModal(!openPostModal);
  };

  return (
    <div>
      <div className="pt-10 px-16 flex flex-col justify-end bg-white">
        <div className="space-y-6">
          <div className="flex flex-row items-center justify-between md:flex md:flex-row md:justify-between sm:flex-col sm:justify-stretch sm:gap-25">
            <div className="flex lg:flex-row flex-col items-center gap-6">
              <div className="w-40 h-40">
                <img
                  alt="Profile picture"
                  src={company.companyLogo}
                  className="object-cover w-full h-full rounded-xl bg-gray-400"
                />
              </div>

              <div className=" space-y-5">
                <div className="flex items-center gap-3">
                  <p className="text-xl font-semibold">{company.companyName}</p>

                  <button
                    className="flex items-center gap-1"
                    disabled={!company.verified}
                  >
                    <FaCheckCircle
                      className={`text-${
                        company.verified ? "green" : "gray"
                      }-500 w-5 h-5 mb-[0.15rem] ${
                        !company.verified ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    />
                  </button>
                </div>
                <div className=" flex justify-between gap-4 w-72">
                  <div className=" flex items-center gap-2 justify-between">
                    <p className="text-zinc-500 text-md">Posts</p>
                    <p className="text-lg font-bold">{company?.posts.length}</p>
                  </div>
                  <div className=" flex items-center gap-2 justify-between">
                    <p className="text-zinc-500 text-md">Challenges</p>
                    <p className="text-lg font-bold">
                      {company?.challenges.length}
                    </p>
                  </div>
                  <div className=" flex items-center gap-2 justify-between">
                    <p className="text-zinc-500 text-md">Jobs</p>
                    <p className="text-lg font-bold">{company?.jobs.length}</p>
                  </div>
                </div>
                <p className="truncate w-[1000px]">
                  {company?.companyDescription}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="#" className="block">
                <button
                  className="cursor-pointer capitalize font-medium hover:scale-105  bg-green-500 p-4 rounded-full text-white"
                  onClick={
                    company && company.user === user._id ? toggleModal : mutate
                  }
                >
                  {company && company.user === user._id ? (
                    <FaEdit className="w-6 h-6" />
                  ) : user.followings.includes(company._id) ? (
                    <FaUserMinus className="w-6 h-6" />
                  ) : (
                    <FaUserPlus className="w-6 h-6" />
                  )}
                </button>
              </a>
              {company && company.user === user._id && (
                <a href="/feed">
                  <button
                    onClick={handleDeleteCompany}
                    className="cursor-pointer capitalize font-medium hover:scale-105  bg-red-500 p-4 rounded-full text-white"
                  >
                    <FaTrash className="w-6 h-6" />
                  </button>
                </a>
              )}
            </div>
          </div>
          <EditCompanyModal
            open={openPostModal}
            handleClose={toggleModal}
            company={company}
          />

          <CompanyNavigationTab changeValue={changeValue} value={value} />
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileInformations;
