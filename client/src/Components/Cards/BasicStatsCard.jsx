import React from "react";

const BasicStatsCard = ({ title, value }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );
};

export default BasicStatsCard;
