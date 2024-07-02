import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-64 flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-gray-500"></div>
    </div>
  );
};

export default LoadingSpinner;
