import React from "react";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 m-4 w-full md:w-3/4 lg:w-1/2">
        <h1 className="text-green-500 text-2xl md:text-3xl font-bold text-center mb-4">Success!</h1>
        <p className="text-gray-700 text-center mb-8">
          Your waiver has been successfully signed. Thank you!
        </p>
        <div className="flex items-center justify-center">
          <svg className="h-12 w-12 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex justify-center mt-6">
          <button className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">Continue</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

