import React from 'react';

const SamplePage: React.FC = () => {
    const currentDate = new Date().toLocaleDateString();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-4 bg-white rounded shadow-xl">
                <h1 className="text-2xl mb-4 text-blue-600">Hello, welcome to the Sample Page!</h1>
                <p className="text-gray-800">Today's date is {currentDate}</p>
            </div>
        </div>
    );
};

export default SamplePage;

