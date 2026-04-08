'use client';

import React from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

export const stages = ['acquisition', 'activation', 'retention', 'referral', 'revenue'];

export const StageNav = ({ currentStage, completedStages, archetype }: { currentStage: string, completedStages: string[], archetype: string }) => {
  return (
    <div className="flex items-center gap-2 p-4 border-b border-surface bg-background overflow-x-auto">
      {stages.map((stage, idx) => {
        const isActive = stage === currentStage;
        const isCompleted = completedStages.includes(stage);
        
        return (
          <React.Fragment key={stage}>
            <Link 
              href={isCompleted || isActive ? `/pathfinder/${archetype}/${stage}` : '#'}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                isActive ? "bg-accent/20 text-accent border border-accent/50" : 
                isCompleted ? "bg-surface text-gray-300 hover:bg-surface/80" : 
                "bg-transparent text-gray-600 border border-surface cursor-not-allowed"
              )}
              onClick={(e) => {
                if (!isCompleted && !isActive) e.preventDefault();
              }}
            >
              {isCompleted ? (
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-[#0B1F35]">
                  <Check size={14} strokeWidth={3} />
                </div>
              ) : (
                <div className={clsx(
                  "w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border",
                  isActive ? "border-accent text-accent" : "border-gray-600 text-gray-600"
                )}>
                  {idx + 1}
                </div>
              )}
              <span className="capitalize">{stage}</span>
            </Link>
            {idx < stages.length - 1 && (
              <div className="w-8 h-[2px] rounded-full bg-surface" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
