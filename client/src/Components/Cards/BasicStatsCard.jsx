import React from "react";

const BasicStatsCard = ({ title, value }) => {
    return (
        <div className="px-4 py-6 h-full bg-gradient-to-t from-green-800 to-green-500 rounded-xl shadow-md text-white transform hover:scale-105 transition-transform duration-300">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-md text-xl font-semibold tracking-wide">
            {title}
            </p>
          </div>
          <p className="font-bold text-3xl">{value}</p>
        </div>
        </div>
    );
};

export default BasicStatsCard;
