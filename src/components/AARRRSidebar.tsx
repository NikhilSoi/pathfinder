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

const formatValue = (value: number, unit: string) => {
  if (unit === 'sessions' || value > 1000) return value.toLocaleString();
  if (unit === '%') return `${value}%`;
  if (unit === 'x') return `${value}x`;
  return value.toString();
};

const stageIcons: Record<string, React.ReactNode> = {
  acquisition: <Users size={14} />,
  activation: <Zap size={14} />,
  retention: <Heart size={14} />,
  referral: <Share2 size={14} />,
  revenue: <DollarSign size={14} />,
};

const stageColors: Record<string, string> = {
  acquisition: '#3A9E82',
  activation: '#4ABFAA',
  retention: '#F59E0B',
  referral: '#E8553A',
  revenue: '#8B5CF6',
};

export const AARRRSidebar = ({ data, impactedStages = [] }: { data: FunnelData, impactedStages?: string[] }) => {
  const stages = [
    { key: 'acquisition', title: 'Acquisition' },
    { key: 'activation', title: 'Activation' },
    { key: 'retention', title: 'Retention' },
    { key: 'referral', title: 'Referral' },
    { key: 'revenue', title: 'Revenue' },
  ];

  // Funnel widths — each tier narrows
  const funnelWidths = [100, 84, 66, 50, 36];

  return (
    <div className="w-[300px] flex-shrink-0 h-full border-r border-white/5 bg-surface/30 backdrop-blur-md p-5 overflow-y-auto flex flex-col">
      <div className="flex items-center gap-2 mb-6 font-bold text-sm text-white">
        <Activity size={16} className="text-accent" /> LIVE FUNNEL
      </div>

      {/* Funnel visualization */}
      <div className="flex flex-col items-center gap-0 flex-1">
        {stages.map((stg, i) => {
          const item = data[stg.key as keyof FunnelData];
          const isImpacted = impactedStages.includes(stg.key);
          const width = funnelWidths[i];
          const color = stageColors[stg.key];
          const isNeg = item.sentiment === 'neg';
          const isPos = item.sentiment === 'pos';

          return (
            <motion.div
              key={stg.key}
              initial={false}
              animate={{
                scale: isImpacted ? [1, 1.03, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center w-full"
            >
              {/* Funnel tier — trapezoid shape */}
              <div
                className="relative group cursor-default transition-all duration-300"
                style={{ width: `${width}%` }}
              >
                <div
                  className="relative overflow-hidden rounded-sm"
                  style={{
                    background: `linear-gradient(135deg, ${color}30, ${color}15)`,
                    borderLeft: `2px solid ${color}60`,
                    borderRight: `2px solid ${color}60`,
                    borderTop: i === 0 ? `2px solid ${color}60` : 'none',
                    borderBottom: i === stages.length - 1 ? `2px solid ${color}60` : 'none',
                  }}
                >
                  {/* Animated fill bar showing value vs benchmark */}
                  <div
                    className="absolute inset-0 opacity-20 transition-all duration-700"
                    style={{
                      background: color,
                      width: `${Math.min((item.value / item.benchmark) * 100, 100)}%`,
                    }}
                  />

                  <div className="relative px-3 py-3 flex items-center gap-2">
                    {/* Icon */}
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${color}25`, color: color }}
                    >
                      {stageIcons[stg.key]}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color }}>{stg.title}</span>
                        {item.impact && item.impact !== '0%' && (
                          <span className="flex items-center text-[10px] font-bold">
                            {item.impact.startsWith('-')
                              ? <><ArrowDownRight size={10} className="text-red-400" /><span className="text-red-400">{item.impact}</span></>
                              : <><ArrowUpRight size={10} className="text-emerald-400" /><span className="text-emerald-400">{item.impact}</span></>
                            }
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-lg font-bold text-white leading-none">{formatValue(item.value, item.unit)}</span>
                        <span className="text-[9px] text-gray-500 truncate">{item.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Benchmark indicator */}
                  <div className="px-3 pb-2 flex justify-between text-[9px] text-gray-500">
                    <span>vs {formatValue(item.benchmark, item.unit)}</span>
                    <span className={clsx(
                      "font-semibold",
                      isPos ? "text-emerald-400" : isNeg ? "text-red-400" : "text-amber-400"
                    )}>
                      {isPos ? 'Above' : isNeg ? 'Below' : 'At'} benchmark
                    </span>
                  </div>
                </div>
              </div>

              {/* Connector between tiers */}
              {i < stages.length - 1 && (
                <div className="relative w-full flex justify-center">
                  <svg
                    width={`${Math.max(width, funnelWidths[i + 1])}%`}
                    height="12"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                    className="overflow-visible"
                  >
                    <path
                      d={`M ${(100 - width) / 2} 0 L ${(100 - funnelWidths[i + 1]) / 2} 12 L ${(100 + funnelWidths[i + 1]) / 2} 12 L ${(100 + width) / 2} 0 Z`}
                      fill={`${stageColors[stages[i + 1].key]}10`}
                      stroke={`${stageColors[stages[i + 1].key]}30`}
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-x-4 gap-y-1 text-[9px] text-gray-500">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Above</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> At</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Below</span>
      </div>
    </div>
  );
};
