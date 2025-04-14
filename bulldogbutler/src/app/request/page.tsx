'use client';

import { useState } from 'react';

export default function MakeRequestPage() {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="min-h-screen bg-white py-10 px-6">
      <h1 className="text-2xl font-bold text-center text-red-700 mb-8">Make A Request</h1>

      <form className="max-w-xl mx-auto bg-gray-100 p-6 rounded-xl shadow-md space-y-5">

        <div>
          <label className="block text-sm font-semibold text-black mb-1">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <option value="">Select your location</option>
            <option>Myers Hall</option>
            <option>Creswell Hall</option>
            <option>East Campus Village</option>
            <option>Oglethorpe House</option>
            <option>Russell Hall</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-1">Service</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <option value="">Select your service below</option>
            <option>Trash</option>
            <option>Laundry</option>
            <option>Groceries</option>
            <option>Room Cleaning</option>
            <option>Bathroom Cleaning</option>
            <option>Moving Furniture</option>
            <option>Tech Help</option>
            <option>Other</option>
          </select>
        </div>

        <div>
            <label className="block text-sm font-semibold text-black mb-1">Description</label>
            <input
              type="text"
              placeholder="Write description here"
              className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
            />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">Photos</label>
          <div className="w-full border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-black">
            <label className="cursor-pointer flex flex-col items-center">
              <input type="file" className="hidden" />
              <div className="bg-gray-200 px-4 py-2 rounded-md font-medium text-blue-700 hover:underline mb-1">
                Select a file
              </div>
              <p>or</p>
              <p className="text-xs mt-1 text-gray-600">Drag and drop a file here</p>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-black mb-1">Deadline</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-black mb-1">Price</label>
            <input
              type="text"
              placeholder="$25"
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

