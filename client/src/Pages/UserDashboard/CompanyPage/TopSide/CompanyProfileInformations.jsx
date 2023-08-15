import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import { useCompanyById } from "../../../../hooks/react-query/useCompany";
import { CompanyNavigationTab } from "./CompanyNavigationTab";

const CompanyProfileInformations = ({ changeValue, value }) => {
  const { companyId } = useParams();

  const { data: company, isLoading, isError } = useCompanyById(companyId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading company data.</p>;
  }

  return (
    <div>
      <div className="pt-10 px-11 flex flex-col justify-end bg-white">
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

                  {/*<button className="flex items-center gap-1">
                    <span className="text-xl font-bold text-green-500 ">5</span>
                    <FaStar className="text-green-500 w-5 h-5 mb-[0.15rem]" />
                  </button>*/}
                </div>
                <div className=" flex justify-between gap-4">
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
                <p>.</p>
              </div>
            </div>
            <a href="/settings" className="block">
              <button className="cursor-pointer capitalize font-medium hover:scale-105  bg-green-500 py-2 px-4 rounded-lg text-white w-36">
                Follow
              </button>
            </a>
          </div>

          <CompanyNavigationTab changeValue={changeValue} value={value} />
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileInformations;
