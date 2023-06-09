'use client';
import React, { useState, ChangeEvent } from 'react';
import Switch from "react-switch";
import Select from "react-select";

const options = [
  { value: '1_week', label: '1 week' },
  { value: '2_weeks', label: '2 weeks' },
  { value: '1_month', label: '1 month' },
  { value: '3_months', label: '3 months' },
  { value: 'custom', label: 'Custom' },
];

const Dashboard: React.FC = () => {
  const [notify, setNotify] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSwitchChange = (checked: boolean) => {
    setNotify(checked);
  };

  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-md shadow-sm max-w-md mx-auto">
      <div className="flex justify-between items-center">
        <label htmlFor="notify-switch" className="text-lg text-slate-400">Notify Users of Waiver Expiration</label>
        <Switch
          onChange={handleSwitchChange}
          checked={notify}
          id="notify-switch"
          offColor="#767676"
          onColor="#1890ff"
          height={20}
          width={48}
          uncheckedIcon={false}
          checkedIcon={false}
        />
      </div>
      {notify && (
        <div className="mt-4">
          <label htmlFor="notification-period" className="text-lg">Notify Users Before:</label>
          <Select
            id="notification-period"
            options={options}
            className="mt-2"
            value={selectedOption}
            onChange={handleSelectChange}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;

