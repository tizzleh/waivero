import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, CheckCircle, FileText } from 'lucide-react';

interface WaiverCardProps {
  activeWaivers?: number;
  expiredWaivers?: number;
  totalWaivers?: number;
}

const WaiverCard: React.FC<WaiverCardProps> = ({ activeWaivers = 0, expiredWaivers = 0, totalWaivers = 0 }) => {

  return (
    <div className="bg-white shadow-lg rounded-md p-6 w-full mx-auto max-w-sm relative border border-gray-200">
      <Image src="/path/to/logo.svg" alt="Company Logo" width={50} height={50} className="absolute top-2 left-2" />
      <h1 className="text-lg font-bold mb-4">Stone Age Midtown</h1>
      <hr className="my-4" />
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span>Active Waivers:</span>
          <span>{activeWaivers}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Expired Waivers:</span>
          <span>{expiredWaivers}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Total Waivers:</span>
          <span>{totalWaivers}</span>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-around items-center">
        <button className="flex items-center space-x-1">
          <Eye size={18} />
          <span>Delete</span>
        </button>
        <button className="flex items-center space-x-1">
          <CheckCircle size={18} />
          <span>Select</span>
        </button>
        <button className="flex items-center space-x-1">
          <FileText size={18} />
          <span>Templates</span>
        </button>
      </div>
      <div className="flex justify-around items-center mt-3">
        <button className="flex items-center space-x-1">
          <Eye size={18} />
          <span>View</span>
        </button>
        <button className="flex items-center space-x-1">
          <CheckCircle size={18} />
          <span>Edit</span>
        </button>
        <button className="flex items-center space-x-1">
          <FileText size={18} />
          <span>Create</span>
        </button>
      </div>
    </div>
  );
}

export default WaiverCard;

