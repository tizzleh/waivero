import React from 'react';
import Link from 'next/link';
import { List, Edit2, Eye, Settings, User, Home } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="p-6 bg-sky-800 w-64 min-h-screen">
        <h1 className="text-2xl mb-4 text-grey-600">Organization Dashboard</h1>
        <nav>
          <ul>
            <li className="mb-1 hover:bg-sky-600 p-2 rounded flex items-center">
              <Home size={18} className="mr-2" />
              <Link href="/org/dashboard">Dashboard</Link>
            </li>
            <li className="mb-1 hover:bg-sky-600 p-2 rounded flex items-center">
              <List size={18} className="mr-2" />
              <br />
              <Link href="/org/waivers">Waivers</Link>
            </li>
            <li className="mb-1 hover:bg-sky-600 p-2 rounded flex items-center">
              <Edit2 size={18} className="mr-2" />
              <Link href="/org/create-waiver">Add Location</Link>
            </li>
            <li className="mb-1 hover:bg-sky-600 p-2 rounded flex items-center">
              <Edit2 size={18} className="mr-2" />
              <Link href="/org/create-waiver">Create Waiver</Link>
            </li>
            <li className="mb-1 hover:bg-sky-600 p-2 rounded flex items-center">
              <Edit2 size={18} className="mr-2" />
              <Link href="/org/create-waiver">Create Event</Link>
            </li>
            <li className="mb-1 hover:bg-sky-600 p-2 rounded flex items-center">
              <Settings size={18} className="mr-2" />
              <Link href="/org/settings">Settings</Link>
            </li>
            <li className="mb-1 hover:bg-sky-600 p-2 rounded flex items-center">
              <User size={18} className="mr-2" />
              <Link href="/org/account">Account</Link>
            </li>
          </ul>
        </nav>
      </div>

      <main className="p-6 grow">
        <h2 className="text-xl text-black mb-4">Welcome to your dashboard</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Replace these divs with your card components */}
          <div className="bg-white p-4 rounded shadow">
            <h3>Card 1</h3>
            <h3>Your locations</h3>
            <p>You don't seem to have any locations, please add your facility. If you're collecting waivers
            for an event with no fixed venue, please select "Create Event"</p>
            <p>Organization should be able to view the waivers that have been signed...</p>
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

