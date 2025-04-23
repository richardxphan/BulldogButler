'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { setLoggedIn } from '../../auth';

export default function LogoutPage() {
  useEffect(() => {
    setLoggedIn(false);
    signOut({ redirect: false }); // no auto-redirect
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">You've successfully logged out!</h1>
      <div className="space-x-4">
        <button
          onClick={() => window.location.href = '/'}
          className="bg-stone-950 text-white px-4 py-2 rounded hover:bg-gray-300"
        >
          Go Home
        </button>
        <button
          onClick={() => window.location.href = '/login'}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Log In
        </button>
      </div>
    </div>
  );
}