'use client';

import { useRouter } from 'next/navigation';
import { KOVA_ARCHETYPE } from '@/data/pathfinder-kova';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    // In a real app we might create a user session here, generate an ID, and save to Firebase
    router.push('/pathfinder/kova/acquisition');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-white p-6">
      <div className="max-w-xl w-full bg-surface border border-white/10 rounded-2xl p-8 flex flex-col gap-6">
        <h1 className="text-4xl font-bold mb-2">Pathfinder</h1>
        <p className="text-lg text-gray-400">Select an archetype to begin your business simulation.</p>
        
        <div 
          onClick={handleStart}
          className="p-6 border border-white/10 rounded-xl hover:border-accent hover:bg-accent/5 cursor-pointer transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{KOVA_ARCHETYPE.name}</h2>
            <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full border border-accent/30">{KOVA_ARCHETYPE.type}</span>
          </div>
          <p className="text-sm text-gray-300 italic mb-4">"{KOVA_ARCHETYPE.tagline}"</p>
          <p className="text-sm text-gray-400">{KOVA_ARCHETYPE.description}</p>
        </div>
      </div>
    </div>
  );
}
