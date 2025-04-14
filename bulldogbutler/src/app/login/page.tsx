'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { setLoggedIn } from '../../auth';


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/dashboard'); // route to protected page
    }

  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-center text-red-800 mb-2">Welcome Back</h1>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Sign in to access BulldogButler
          </p>

          {error && <p className="text-center text-sm text-red-600 mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-3 text-sm md:text-base placeholder-gray-500 caret-black focus:outline-none focus:ring-2 focus:ring-red-800" placeholder="email12345@uga.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full border rounded-lg px-4 py-3 text-sm md:text-base placeholder-gray-500 caret-black focus:outline-none focus:ring-2 focus:ring-red-800" placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-800 text-white py-2 rounded-lg hover:bg-red-900 transition font-semibold tracking-wide"
            >
              Sign In
            </button>

            <a href="/dashboard"
              className="w-full bg-red-800 text-white text-center py-2 rounded-lg hover:bg-red-900 transition font-semibold tracking-wide"
            >
              Temp Sign In
            </a>
          </form>

          <p className="text-xs text-center text-gray-500 mt-6">
            Don't have an account?{' '}
            <a href="/signup" className="text-red-700 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
