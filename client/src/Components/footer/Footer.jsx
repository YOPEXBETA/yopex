import React from "react";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-zinc-800 to-black dark:text-white py-4">
      <div className="mx-24 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <p className="text-white font-bold text-2xl">YOPEX</p>
          <div className="h-10 bg-green-400 w-[1px]"></div>
          <p className="text-white">
            Copyright &copy; {new Date().getFullYear()} YOPEX Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
