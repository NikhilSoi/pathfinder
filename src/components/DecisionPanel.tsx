'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { KOVA_ARCHETYPE } from '@/data/pathfinder-kova';

const SliderMechanic = ({ options, totalBudget, onUpdate }: { options: any[], totalBudget: number, onUpdate: (valid: boolean, finalIdx: number) => void }) => {
  const [allocations, setAllocations] = useState<number[]>(options.map(() => 0));

  const totalAllocated = allocations.reduce((a, b) => a + b, 0);
  const remaining = totalBudget - totalAllocated;

  const handleSliderChange = (idx: number, val: number) => {
    const newAlloc = [...allocations];
    newAlloc[idx] = val;
    const newTotal = newAlloc.reduce((a, b) => a + b, 0);
    if (newTotal <= totalBudget) {
      setAllocations(newAlloc);
    } else {
      // clip to max available
      newAlloc[idx] = totalBudget - (newTotal - val);
      setAllocations(newAlloc);
    }
  };

  useEffect(() => {
    // determine winning option (the one with the largest allocation)
    if (totalAllocated === totalBudget) {
      const maxAlloc = Math.max(...allocations);
      const winnerIdx = allocations.indexOf(maxAlloc);
      onUpdate(true, winnerIdx);
    } else {
      onUpdate(false, -1);
    }
  }, [allocations, totalAllocated, totalBudget]);

  const maxAlloc = Math.max(...allocations);
  let leadingIdx = -1;
  if (maxAlloc > 0 && totalAllocated > 0) {
    leadingIdx = allocations.indexOf(maxAlloc);
  }

  return (
    <div className="flex flex-col gap-4">
      {leadingIdx !== -1 && (
        <div className="mb-4 bg-[#0B1F35] border border-accent/20 p-4 rounded-xl shadow-lg">
          <h4 className="text-xs text-accent uppercase tracking-wider mb-2 font-bold">Live Projection</h4>
          <div className="font-semibold text-white mb-2">{options[leadingIdx].consequence.title}</div>
          <div className="flex gap-2">
            {Object.entries(options[leadingIdx].consequence.kpiDeltas).slice(0, 2).map(([k, v]: any) => (
              <span key={k} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded uppercase text-gray-300">
                {k}: <strong className="text-white">{v}</strong>
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1 text-gray-300">
          <span>Remaining Budget:</span>
          <span>£{remaining.toLocaleString()}</span>
        </div>
        <div className="w-full bg-background rounded-full h-2">
          <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${(totalAllocated / totalBudget) * 100}%` }} />
        </div>
      </div>
      {options.map((opt, idx) => (
        <div key={idx} className="flex flex-col gap-2 p-3 bg-background border border-white/5 rounded-lg">
          <label className="text-sm font-medium">{opt.shortDescription}</label>
          <input
            type="range"
            min="0"
            max={totalBudget}
            step="100"
            value={allocations[idx]}
            onChange={(e) => handleSliderChange(idx, Number(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="text-xs text-accent text-right">£{allocations[idx].toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};

const RankingMechanic = ({ options, onUpdate }: { options: any[], onUpdate: (valid: boolean, finalIdx: number) => void }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    onUpdate(selectedIdx !== null, selectedIdx ?? -1);
  }, [selectedIdx]);

  return (
    <div className="flex flex-col gap-3">
      {options.map((opt, idx) => (
        <div
          key={idx}
          onClick={() => setSelectedIdx(idx)}
          className={clsx(
            "p-4 rounded-lg border cursor-pointer transition-all",
            selectedIdx === idx ? "border-accent bg-accent/10" : "border-white/10 hover:border-white/20 bg-background"
          )}
        >
          <div className="font-semibold text-sm mb-1">{opt.shortDescription}</div>
          <div className="text-xs text-gray-400">{opt.label}</div>
        </div>
      ))}
    </div>
  );
};

const TileMechanic = ({ options, onUpdate }: { options: any[], onUpdate: (valid: boolean, finalIdx: number) => void }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    onUpdate(selectedIdx !== null, selectedIdx ?? -1);
  }, [selectedIdx]);

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt, idx) => (
        <div
          key={idx}
          onClick={() => setSelectedIdx(idx)}
          className={clsx(
            "p-4 rounded-lg border cursor-pointer transition-all flex flex-col justify-between min-h-[120px]",
            selectedIdx === idx ? "border-accent bg-accent/10" : "border-white/10 hover:border-white/20 bg-background"
          )}
        >
          <div className="font-semibold text-sm">{opt.shortDescription}</div>
        </div>
      ))}
    </div>
  );
};

export const DecisionPanel = ({ stage, onLockDecision }: { stage: string, onLockDecision: (idx: number) => void }) => {
  const stageData = KOVA_ARCHETYPE[stage as keyof typeof KOVA_ARCHETYPE] as any;
  const decision = stageData?.decision;
  const [isValid, setIsValid] = useState(false);
  const [finalIdx, setFinalIdx] = useState(-1);

  if (!decision) return null;

  return (
    <div className="flex flex-col h-full bg-transparent overflow-y-auto w-full">
      <div className="mb-6">
        <div className="bg-background rounded-full px-4 py-1 text-xs text-accent border border-accent/20 w-max">
          Decision Stage
        </div>
      </div>
      <h2 className="text-xl font-bold mb-6 text-white leading-tight">{decision.question}</h2>
      
      <div className="flex-grow">
        {decision.mechanic === 'sliders' && (
          <SliderMechanic options={decision.options} totalBudget={decision.totalBudget} onUpdate={(v, idx) => { setIsValid(v); setFinalIdx(idx); }} />
        )}
        {decision.mechanic === 'ranking' && (
          <RankingMechanic options={decision.options} onUpdate={(v, idx) => { setIsValid(v); setFinalIdx(idx); }} />
        )}
        {decision.mechanic === 'tiles' && (
          <TileMechanic options={decision.options} onUpdate={(v, idx) => { setIsValid(v); setFinalIdx(idx); }} />
        )}
      </div>

      <div className="mt-8 pt-4 border-t border-white/10">
        <button
          disabled={!isValid}
          onClick={() => onLockDecision(finalIdx)}
          className={clsx(
            "w-full py-3 rounded-lg font-bold text-sm tracking-wide transition-colors",
            isValid ? "bg-accent text-[#0B1F35] hover:bg-accent/90" : "bg-white/5 text-gray-500 cursor-not-allowed"
          )}
        >
          LOCK DECISION
        </button>
      </div>
    </div>
  );
};
