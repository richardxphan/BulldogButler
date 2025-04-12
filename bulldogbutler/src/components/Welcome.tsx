'use client';
import Link from 'next/link';
import Image from 'next/image';
import ugaDormImg from '../assets/test.jpg';

const Welcome = () => {
  return (
    <div className="min-h-screen font-sans">
      <section className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={ugaDormImg}
          alt="UGA dorm building"
          fill
          quality={100}
          className="object-cover object-bottom brightness-75 scale-x-[-1]"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start px-10 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Too Busy? Another Dawg’s <br />
            <span className="text-red-400">Got Your Back.</span>
          </h2>
          <p className="text-lg md:text-xl mb-6 max-w-xl">
            Your solution for quick, reliable help with everyday tasks, provided by fellow UGA students.
          </p>
          <Link href="/login">
            <button className="bg-black px-6 py-3 rounded-md text-white hover:bg-gray-800 text-lg">
              Get Started
            </button>
          </Link>
        </div>
      </section> 
    </div>



  );
};

export default Welcome;