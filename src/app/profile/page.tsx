import React from 'react';
import Image from 'next/image';
import PP from '../../assets/botPP.jpeg';
import room from '../../assets/dirtydorm.webp';
import grocery from '../../assets/groceries.jpg';



export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Profile Image Section */}
        <div className="flex flex-col items-center mt-10">
          <div className="relative">
          <Image className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg' src={PP} alt='Profile' />

            <button className="absolute bottom-0 right-2 bg-white rounded-full p-1 shadow">
             ✏️     
            </button>
          </div>
        

       {/* Form Section */}
       <form className="w-full max-w-2xl mt-8 space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <input
            type="text"
            placeholder="Add a bio"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <div className="flex space-x-4">
            <input
              type="email"
              placeholder="youremail@gmail.com"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="tel"
              placeholder="XXX-XXX-XXXX"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <button className="bg-blue-500 text-white w-full border rounded-full text-lg">Confirm</button>

        </form>
      </div>

{/* Your Requests Section */}
<div className="max-w-5xl mx-auto mt-16 px-4">
        <h2 className="text-xl font-semibold mb-4">Your request</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Request Card 1 */}
          <div className="bg-white shadow-md rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="font-medium">Task: Room Cleaning</p>
              <button className="bg-black text-white px-3 py-1 rounded-full text-sm">Edit</button>
            </div>
            <div className="flex flex-row items-start space-x-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Deadline: 3/23/25</p>
                <p className="text-sm text-gray-600">Location: Russell Hall</p>
                <p className="text-sm text-gray-600">Price: $15</p>
              </div>
              <Image
                src={room}
                alt="Task"
                className="w-24 h-24 object-cover rounded-md"
              />
            </div>
          </div>

          {/* Request Card 2 */}
          <div className="bg-white shadow-md rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="font-medium">Task: Grocery</p>
              <button className="bg-black text-white px-3 py-1 rounded-full text-sm">Edit</button>
            </div>
            <div className="flex flex-row items-start space-x-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Deadline: 4/5/25</p>
                <p className="text-sm text-gray-600">Location: Kroger</p>
                <p className="text-sm text-gray-600">Price: $20</p>
              </div>
              <Image
                src={grocery}
                alt="Task"
                className="w-24 h-24 object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
