'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import clsx from 'clsx';

export interface StageHealth {
  value: number;
  label: string;
  benchmark: number;
  unit: string;
  sentiment: string;
  impact?: string; // e.g. "+28%"
}

export interface FunnelData {
  acquisition: StageHealth;
  activation: StageHealth;
  retention: StageHealth;
  referral: StageHealth;
  revenue: StageHealth;
}

const getSentimentColor = (sentiment: string) => {
  if (sentiment === 'pos') return 'text-accent border-accent/30 bg-accent/10';
  if (sentiment === 'neu') return 'text-amber-400 border-amber-400/30 bg-amber-400/10';
  return 'text-red-400 border-red-400/30 bg-red-400/10';
};

const formatValue = (value: number, unit: string) => {
  if (unit === 'sessions' || value > 1000) return value.toLocaleString();
  if (unit === '%') return `${value}%`;
  if (unit === 'x') return `${value}x`;
  return value.toString();
};

export const AARRRFunnelBar = ({ data, impactedStages = [] }: { data: FunnelData, impactedStages?: string[] }) => {
  const stages = [
    { key: 'acquisition', title: 'Acquisition' },
    { key: 'activation', title: 'Activation' },
    { key: 'retention', title: 'Retention' },
    { key: 'referral', title: 'Referral' },
    { key: 'revenue', title: 'Revenue' },
  ];

  return (
    <div className="w-full bg-[#0a1626] border-b border-surface p-4 flex items-center justify-between gap-4 overflow-x-auto">
      {stages.map((stg, i) => {
        const item = data[stg.key as keyof FunnelData];
        const isImpacted = impactedStages.includes(stg.key);
        
        return (
          <motion.div
            key={stg.key}
            initial={false}
            animate={{ scale: isImpacted ? [1, 1.05, 1] : 1, borderColor: isImpacted ? '#3A9E82' : '' }}
            transition={{ duration: 0.5 }}
            className={clsx(
              "flex-1 min-w-[200px] flex flex-col p-3 rounded-lg border",
              getSentimentColor(item.sentiment)
            )}
          >
            <div className="text-xs uppercase tracking-wider opacity-70 mb-1 font-semibold flex justify-between">
              <span>{stg.title}</span>
              {item.impact && item.impact !== '0%' && (
                <span className="text-accent flex items-center">
                  {item.impact.startsWith('-') ? <ArrowDownRight size={12} className="text-red-400"/> : <ArrowUpRight size={12}/>}
                  {item.impact}
                </span>
              )}
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold">{formatValue(item.value, item.unit)}</div>
                <div className="text-sm opacity-80">{item.label}</div>
              </div>
            </div>
            <div className="mt-2 text-xs opacity-60">
              Benchmark: {formatValue(item.benchmark, item.unit)}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
