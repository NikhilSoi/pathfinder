'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const ConsequencePanel = ({ consequence, onContinue }: { consequence: any, onContinue: () => void }) => {
  if (!consequence) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-6 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-surface border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl"
      >
        <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center text-2xl mb-6">
          ➔
        </div>
        <h1 className="text-3xl font-bold mb-4 text-white">{consequence.title}</h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">{consequence.description}</p>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(consequence.kpiDeltas).map(([kpi, delta]: [string, any], idx) => (
            <div key={idx} className="bg-background rounded-lg p-3 border border-white/5 flex flex-col items-center">
              <span className="text-xs text-gray-400 uppercase tracking-wide mb-1">{kpi}</span>
              <span className="text-lg font-bold text-accent">{delta}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={onContinue}
          className="px-8 py-3 bg-accent text-[#0B1F35] font-bold rounded-lg hover:bg-accent/90 transition-colors"
        >
          CONTINUE TO NEXT STAGE
        </button>
      </motion.div>
    </div>
  );
};
