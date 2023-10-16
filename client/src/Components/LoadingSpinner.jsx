import React from "react";

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5 mr-3 dark:text-green-500  "
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor "
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.875 3.172 8.008l2.83-2.717zm12.658-2.175A7.962 7.962 0 0120 12h4c0 4.418-3.582 8-8 8v-4.172l2.828 2.717z"
    ></path>
  </svg>
);

export default LoadingSpinner;
