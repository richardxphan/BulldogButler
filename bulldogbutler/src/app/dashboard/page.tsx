'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLoggedIn } from '../../auth';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!getLoggedIn()) {
      router.push('/login');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-700">Welcome to BulldogButler Dashboard</h1>
    </div>
  );
}
