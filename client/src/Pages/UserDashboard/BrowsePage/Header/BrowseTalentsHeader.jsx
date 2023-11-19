import React from "react";
import BrowseNavigationTab from "../Content/BrowseNavigationTabs/BrowseNavigationTab";

const BrowseTalentsHeader = ({ changeValue, value }) => {
  return (
    <div className="h-56 px-6 lg:px-8 xl:px-40 flex flex-col justify-end dark:bg-zinc-900 border-b from-black w-full to-purple-900 bg-gradient-to-tr">
      <div className="space-y-2 items-start">
        <div>
          <h4 class="max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
            Browse Talents
          </h4>
          <p class="mb-2 max-w-full text-base font-medium text-zinc-400 md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
            Embark on an adventure of challenges and growth.
          </p>
        </div>
        <input
          type="text"
          placeholder="Search for talents"
          className=" w-full py-2 px-3 outline-none rounded border dark:bg-zinc-700 border-white text-white bg-black hover:border-green-500"
        />
        <BrowseNavigationTab changeValue={changeValue} value={value} />
      </div>
    </div>
  );
};

export default BrowseTalentsHeader;
