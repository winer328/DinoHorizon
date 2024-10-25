'use client'

import { main_character } from '@/images';
import Image from 'next/image';
import Link from 'next/link';

// Home component: Main landing page of the application
export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#000000] ">
      <div className="w-full max-w-xl text-white flex flex-col items-center ">
        <div className="w-64 h-64 rounded-full circle-outer p-2 mb-8">
          <div className="w-full h-full rounded-full circle-inner overflow-hidden relative">
            <Image
              src={main_character}
              alt="Main Character"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'scale(1.05) translateY(10%)'
              }}
            />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 Dark_owl">Dino Horizon</h1>
        <p className="text-xl mb-2"> <Link href="/clicker" className="neon">Start Game</Link></p>        
      </div>
    </div>
  );
}
