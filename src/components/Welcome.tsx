'use client';
import Link from 'next/link';
import Image from 'next/image';
import ugaDormImg from '../assets/test.jpg';
import teamPhoto from "../assets/team-photo.jpg";

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
            <span className="text-[#b34f4f]">Got Your Back.</span>
          </h2>
          <p className="text-lg md:text-xl mb-6 max-w-xl">
            Your solution for quick, reliable help with everyday tasks, provided by fellow UGA students.
          </p>
          <Link href="/signup">
            <button className="bg-black px-6 py-3 rounded-md text-white hover:bg-gray-800 text-lg">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      <section id="how" className="bg-[#e8dfdf] py-12 px-6 md:px-20 text-[#551919]">
        <h2 className="text-3xl font-bold underline mb-6 text-center">How it Works</h2>
        <ul className="space-y-4 text-lg text-center">
          <li className="font-bold">
            You want something done? Place a request!
            <ul className="pl-6 list-none font-light">
              <li>Input how much you’ll pay & when you want it done by</li>
            </ul>
          </li>
          <li className="font-bold">
            You want to make some money? Fill requests!
            <ul className="pl-6 list-none font-light">
              <li>Have a car? Grab someone groceries!</li>
              <li>Don’t? No worries, clean a room!</li>
            </ul>
          </li>
          <li>We securely handle all transactions through Stripe so you don’t need to worry about handling the money!</li>
          <li>Make your life easier or make a quick buck :D</li>
        </ul>
      </section> 

      <section id="about" className="bg-[#b34f4f] py-12 px-6 md:px-20 text-white">
        <h2 className="text-3xl font-bold underline mb-6 text-center">About Us</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
          <p className="text-lg leading-relaxed max-w-2xl">
            We are four UGA students who started this off as a mere class project, but saw the vision and utility it could provide our college community. We decided to use our love for our Athens community to implement something to optimize people’s lives and provide a side hustle for those looking to make a quick buck.
          </p>
          <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-white">
            <Image
              src={teamPhoto}
              alt="Team photo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>



  );
};

export default Welcome;