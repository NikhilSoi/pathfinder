'use client';

import { useRouter } from 'next/navigation';
import { ARCHETYPE_CARDS } from '@/data/archetypes';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-white p-6 md:p-12 flex flex-col">
      <div className="max-w-5xl mx-auto flex-1">
        {/* Header with VectorEd brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-lg bg-[#2D8B6F] flex items-center justify-center text-white font-bold text-lg">
            V
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-none">Pathfinder</h1>
            <span className="text-xs text-gray-500 tracking-wide">powered by VectorEd</span>
          </div>
        </div>

        <p className="text-lg text-gray-400 mb-10 max-w-2xl">Select a business archetype to begin your AARRR funnel simulation. Each scenario presents a different strategic challenge.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ARCHETYPE_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => router.push(`/pathfinder/${card.id}/acquisition`)}
              className="p-6 bg-surface border border-white/10 rounded-xl hover:border-white/30 cursor-pointer transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold group-hover:text-white transition-colors">{card.name}</h2>
                <span
                  className="text-xs px-2 py-1 rounded-full border whitespace-nowrap"
                  style={{ backgroundColor: `${card.color}20`, color: card.color, borderColor: `${card.color}50` }}
                >
                  {card.type}
                </span>
              </div>
              <p className="text-sm text-gray-300 italic mb-3">&ldquo;{card.tagline}&rdquo;</p>
              <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full pt-12 pb-4 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#2D8B6F] flex items-center justify-center text-white font-bold text-[10px]">V</div>
          <span>VectorEd</span>
        </div>
        <span>hello@vectored.co</span>
      </div>
    </div>
  );
}
