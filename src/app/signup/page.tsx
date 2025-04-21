'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar'; 

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.message || 'Signup failed');
    }
  };

  const inputStyles = 'w-full border rounded-lg px-4 py-3 text-sm md:text-base text-black placeholder-gray-700 caret-black focus:outline-none focus:ring-2 focus:ring-red-800';

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-center text-red-800 mb-2">Create Account</h1>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Sign up to start using BulldogButler
          </p>

          {error && <p className="text-center text-sm text-red-600 mb-4">{error}</p>}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                className={inputStyles}
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                className={inputStyles}
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className={inputStyles}
                placeholder="email12345@uga.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className={inputStyles}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-800 text-white py-2 rounded-lg hover:bg-red-900 transition font-semibold tracking-wide"
            >
              Sign Up
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-red-700 hover:underline">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
