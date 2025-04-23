'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { setLoggedIn } from '../../auth';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(false);
    signOut({ callbackUrl: '/login' }); // Properly clears session cookie
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">You've successfully logged out!</h1>
      <div className="space-x-4">
        <button
          onClick={() => router.push('/')}
          className="bg-stone-950 text-white px-4 py-2 rounded hover:bg-gray-300"
        >
          Go Home
        </button>
        <button
          onClick={() => router.push('/login')}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Log In
        </button>
      </div>
    </div>
  );
}
