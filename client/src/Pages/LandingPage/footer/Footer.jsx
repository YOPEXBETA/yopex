import React from "react";

const Footer = () => {
  return (
    <div className="bg-white text-black py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <p className="text-green-500 font-bold text-2xl">YOPEX</p>
          <div className="h-10 bg-green-500 w-[1px]"></div>
          <p>
            Copyright &copy; {new Date().getFullYear()} YOPEX Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
