'use client';

import Image from 'next/image';
import logo from '../app/favicon.ico';
import logonoBG from '../assets/BDnoBG.png';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getLoggedIn } from '../auth';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedInState] = useState(false);
  const [firstName, setFirstName] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const hideLogin = pathname === '/login' || pathname === '/signup';

  useEffect(() => {
    setIsLoggedInState(getLoggedIn());

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

    if (getLoggedIn()) {
      fetchUserName();
    }

    const handleStorageChange = () => {
      setIsLoggedInState(getLoggedIn());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    router.push('/logout'); // let the /logout page handle logout logic and UI
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

          <div>
            {isLoggedIn && (
              <div className="flex items-center space-x-2 ml-4">
                <span className='hidden md:block text-white text-2xl font-bold ml-4'>|</span>
                <span className='hidden md:block text-white text-2xl font-bold ml-4'>
                  Welcome, {firstName}
                </span>
                <span className='hidden md:block text-white text-2xl font-bold ml-4'>|</span>
              </div>
            )}
          </div>

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
