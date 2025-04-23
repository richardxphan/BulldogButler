'use client';

import Image from 'next/image';
import logonoBG from '../assets/BDnoBG.png';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [firstName, setFirstName] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const hideLogin = pathname === '/login' || pathname === '/signup';

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          setFirstName(data.firstName);
        }
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    };

    if (session?.user?.email) {
      fetchUserName();
    }
  }, [session]);

  const isLoggedIn = !!session;

  const handleLogout = () => {
    router.push('/logout');
  };

  return (
    <nav className='bg-red-700 border-b-1 border-white'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <Link className='flex items-center' href='/'>
            <Image className='h-10 w-auto bg-white rounded' src={logonoBG} alt='UGA in a Suit' />
            <span className='hidden md:block text-white text-2xl font-bold ml-4'>
              BulldogButler
            </span>
          </Link>

          <div className='hidden md:flex space-x-4'>
            <Link href='/' className='text-white px-3 py-2 rounded-md hover:bg-gray-800'>Home</Link>
            {isLoggedIn && (
              <Link href='/request' className='text-white px-3 py-2 rounded-md hover:bg-gray-800'>Create Request</Link>
            )}
            {isLoggedIn && (
              <Link href='/dashboard' className='text-white px-3 py-2 rounded-md hover:bg-gray-800'>Dashboard</Link>
            )}
            {isLoggedIn && (
              <Link href='/profile' className='text-white px-3 py-2 rounded-md hover:bg-gray-800'>Profile</Link>
            )}
            <Link href='/contact' className='text-white px-3 py-2 rounded-md hover:bg-gray-800'>Contact</Link>
          </div>

          {isLoggedIn && (
            <div className="flex items-center space-x-2 ml-4">
              <span className='hidden md:block text-white text-2xl font-bold'>
                Welcome, {firstName}
              </span>
            </div>
          )}

          {!isLoggedIn && !hideLogin && (
            <Link href='/login' className='text-white bg-gray-400 hover:bg-gray-500 px-3 py-2 rounded-md'>
              Login | Register
            </Link>
          )}

          {isLoggedIn && (
            <button onClick={handleLogout} className='text-white bg-gray-400 hover:bg-gray-500 px-3 py-2 rounded-md'>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
