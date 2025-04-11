'use client';
import Link from 'next/link';
import Image from 'next/image';
/*
const Welcome = () => { 
    
    return (
        <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="w-[779.794px] text-[82px] leading-[96px] font-bold text-[#2E2F35] font-[Inter]">Notes by STUDENTS, for STUDENTS</h1>
        <div className="mt-12">
            <Link
                     href="/show-items"
                     className="inline-block px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition rounded"
          >
                     Show Item List
        </Link>
        </div>
        </div>
    </div>
    )};
export default Welcome;
*/

const Welcome = () => { 
    return (
        <div className="min-h-screen font-sans bg-white">
          {/* Navbar */}
          <header className="flex justify-between items-center px-8 py-6 border-b shadow-sm bg-white">
            <h1 className="text-3xl font-script">BulldogButler</h1>
            <nav className="flex gap-6 text-sm font-medium">
              <a href="#how-it-works" className="hover:underline">How it Works</a>
              <a href="#about" className="hover:underline">About Us</a>
              <button className="bg-black text-white px-4 py-2 rounded-md hover:opacity-90">
                Log In | Sign Up
              </button>
            </nav>
          </header>
    
          {/* Hero Section */}
          <section className="relative bg-cover bg-center" style={{ backgroundImage: `url('/your-image-path.jpg')` }}>
            <div className="absolute inset-0 bg-white bg-opacity-70" />
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-left">
              <h2 className="text-4xl font-bold mb-4">
                Too Busy? Another Dawg’s <span className="text-red-600">Got Your Back.</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Your solution for quick, reliable help with everyday tasks, provided by fellow UGA students.
              </p>
              <button className="bg-black text-white px-6 py-3 rounded-md text-md hover:bg-gray-800">
                Get Started
              </button>
            </div>
          </section>
        </div>
      );
};

export default Welcome;
