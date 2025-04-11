'use client';
import Link from 'next/link';

const Welcome = () => { 
    return (
        <div className="min-h-screen font-sans">
          {/* Hero Section */}
          <section className="relative bg-cover bg-center">
            <div className="absolute inset-0 bg-opacity-70" />
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-left">
              <h2 className="text-4xl font-bold mb-4">
                Too Busy? Another Dawg’s <span className="text-red-600">Got Your Back.</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Your solution for quick, reliable help with everyday tasks, provided by fellow UGA students.
              </p>
              <Link href="/login">
                <button className="bg-black text-white px-6 py-3 rounded-md text-md hover:bg-gray-800">
                    Get Started
                </button>
              </Link>
              
            </div>
          </section>
        </div>
      );
};

export default Welcome;