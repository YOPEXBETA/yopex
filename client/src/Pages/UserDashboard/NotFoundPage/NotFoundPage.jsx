import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="bg-gradient-to-b from-purple-500 to-purple-700 min-h-screen flex justify-center items-center  h-[100vh]">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-4">
          The page you’re looking for doesn’t exist.
        </h2>
        <Link
          to="/"
          className="bg-green-600 text-white px-4 py-2 rounded-full text-lg hover:bg-green-800 transition duration-300 ease-in-out"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
