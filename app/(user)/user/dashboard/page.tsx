import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="p-6 bg-white w-64 min-h-screen">
        <h1 className="text-2xl mb-4 text-blue-600">Dashboard</h1>
        <nav>
          <ul>
            <li className="mb-1 hover:bg-gray-200 p-2 rounded">
              <a href="#waivers">Waivers</a>
            </li>
            <li className="mb-1 hover:bg-gray-200 p-2 rounded">
              <a href="#settings">Settings</a>
            </li>
            {/* Add more links here */}
          </ul>
        </nav>
      </div>

      <main className="p-6 grow">
        <h2 className="text-xl mb-4">Welcome to your dashboard</h2>

        <div className="grid grid-cols-3 gap-4">
          {/* Replace these divs with your card components */}
          <div className="bg-white p-4 rounded shadow">
            <h3>Card 1</h3>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3>Card 2</h3>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3>Card 3</h3>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

