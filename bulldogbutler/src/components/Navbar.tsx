'use client';
import Image from 'next/image';
import logo from '../app/favicon.ico';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getLoggedIn, setLoggedIn } from '../auth';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedInState] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const hideLogin = pathname === '/login' || pathname === '/signup';

  useEffect(() => {
    setIsLoggedInState(getLoggedIn());
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    setIsLoggedInState(false);
    router.push('/login');
  };

  return (
    <nav className='bg-red-700 border-b-1 border-white'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <Link className='flex items-center' href='/'>
            <Image className='h-10 w-auto' src={logo} alt='UGA arch logo' />
            <span className='hidden md:block text-white text-2xl font-bold ml-2'>
              BulldogButler
            </span>
          </Link>

          <div className='hidden md:flex space-x-4'>
            <Link href='/' className='text-white px-3 py-2 rounded-md hover:bg-gray-800'>Home</Link>
            <Link href='/about' className='text-white px-3 py-2 rounded-md hover:bg-gray-800'>About</Link>
            <Link href='/contact' className='text-white px-3 py-2 rounded-md hover:bg-gray-800'>Contact</Link>
            {isLoggedIn && (
              <Link href='/request' className='text-white px-3 py-2 rounded-md hover:bg-gray-800'>Create Request</Link>
            )}
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
