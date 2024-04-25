import React from "react";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-600  to-emerald-800 text-black py-4 dark:bg-zinc-800">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <p className="text-white font-bold text-2xl">YOPEX</p>
          <div className="h-10 bg-amber-400 w-[1px]"></div>
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
