'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Activity, Users, Zap, Heart, Share2, DollarSign } from 'lucide-react';
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
  if (sentiment === 'pos') return 'text-accent border-accent/40 bg-accent/10 shadow-[0_0_15px_rgba(0,240,255,0.15)]';
  if (sentiment === 'neu') return 'text-amber-400 border-amber-400/40 bg-amber-400/10 shadow-[0_0_15px_rgba(251,191,36,0.15)]';
  return 'text-error border-error/40 bg-error/10 shadow-[0_0_15px_rgba(255,51,102,0.15)]';
};

const formatValue = (value: number, unit: string) => {
  if (unit === 'sessions' || value > 1000) return value.toLocaleString();
  if (unit === '%') return `${value}%`;
  if (unit === 'x') return `${value}x`;
  return value.toString();
};

const stageIcons: Record<string, React.ReactNode> = {
  acquisition: <Users size={16} />,
  activation: <Zap size={16} />,
  retention: <Heart size={16} />,
  referral: <Share2 size={16} />,
  revenue: <DollarSign size={16} />,
};

export const AARRRSidebar = ({ data, impactedStages = [] }: { data: FunnelData, impactedStages?: string[] }) => {
  const stages = [
    { key: 'acquisition', title: 'Acquisition' },
    { key: 'activation', title: 'Activation' },
    { key: 'retention', title: 'Retention' },
    { key: 'referral', title: 'Referral' },
    { key: 'revenue', title: 'Revenue' },
  ];

  return (
    <div className="w-[300px] flex-shrink-0 h-full border-r border-white/5 glass p-6 overflow-y-auto flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2 font-bold text-lg text-white">
        <Activity size={20} className="text-accent" /> Live Funnel
      </div>
      
      <div className="relative flex flex-col gap-4">
        {/* Connecting Line */}
        <div className="absolute left-[23px] top-8 bottom-8 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent -z-10" />

        {stages.map((stg, i) => {
          const item = data[stg.key as keyof FunnelData];
          const isImpacted = impactedStages.includes(stg.key);
          
          return (
            <motion.div
              key={stg.key}
              initial={false}
              animate={{ 
                scale: isImpacted ? [1, 1.05, 1] : 1, 
                borderColor: isImpacted ? 'var(--accent)' : '' 
              }}
              transition={{ duration: 0.5 }}
              className={clsx(
                "relative flex items-start gap-4 p-4 rounded-xl border backdrop-blur-md transition-colors",
                getSentimentColor(item.sentiment)
              )}
            >
              {/* Icon Circle */}
              <div className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border",
                "bg-surface/50 border-white/10"
              )}>
                {stageIcons[stg.key]}
              </div>

              <div className="flex flex-col flex-1">
                <div className="text-xs uppercase tracking-wider opacity-70 font-semibold flex justify-between">
                  <span>{stg.title}</span>
                  {item.impact && item.impact !== '0%' && (
                    <span className="flex items-center font-bold">
                      {item.impact.startsWith('-') ? <ArrowDownRight size={12} className="text-error mr-1"/> : <ArrowUpRight size={12} className="text-accent mr-1"/>}
                      <span className={item.impact.startsWith('-') ? "text-error" : "text-accent"}>{item.impact}</span>
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <div className="text-2xl font-bold tracking-tight text-white">{formatValue(item.value, item.unit)}</div>
                  <div className="text-xs opacity-70 mt-0.5">{item.label}</div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 text-[10px] uppercase opacity-50 flex justify-between">
                  <span>Benchmark</span>
                  <span>{formatValue(item.benchmark, item.unit)}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
