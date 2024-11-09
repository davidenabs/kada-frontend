import React from "react";

function FarmGalleySkeleton() {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
        <svg
          className="w-16 h-16 text-muted-foreground/30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 16L8.293 10.707C8.68342 10.3166 9.31658 10.3166 9.707 10.707L15 16"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 14L15.293 11.707C15.6834 11.3166 16.3166 11.3166 16.707 11.707L21 16"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="15.5"
            cy="7.5"
            r="1.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default FarmGalleySkeleton;
