'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AARRRFunnelBar, FunnelData } from '@/components/AARRRFunnelBar';
import { StageNav, stages } from '@/components/StageNav';
import { DataDashboard } from '@/components/DataDashboard';
import { DecisionPanel } from '@/components/DecisionPanel';
import { ConsequencePanel } from '@/components/ConsequencePanel';
import { NovaChat } from '@/components/NovaChat';
import { KOVA_ARCHETYPE, KOVA_NOVA_PROMPTS } from '@/data/pathfinder-kova';

export default function PathfinderStage({ params }: { params: { archetype: string, stage: string } }) {
  const router = useRouter();
  const { stage, archetype } = params;

  const stageData = KOVA_ARCHETYPE[stage as keyof typeof KOVA_ARCHETYPE] as any;
  const initialFunnel: FunnelData = JSON.parse(JSON.stringify(KOVA_ARCHETYPE.funnelHealth));

  const [funnelData, setFunnelData] = useState<FunnelData>(initialFunnel);
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [lockedDecisionIdx, setLockedDecisionIdx] = useState<number>(-1);
  const [showConsequence, setShowConsequence] = useState(false);
  const [impactedStages, setImpactedStages] = useState<string[]>([]);

  useEffect(() => {
    // Basic verification
    if (archetype !== 'kova') router.replace('/');
    if (!stages.includes(stage) && stage !== 'completion') router.replace('/pathfinder/kova/acquisition');
  }, [stage, archetype, router]);

  const handleLockDecision = (idx: number) => {
    setLockedDecisionIdx(idx);
    setShowConsequence(true);
    
    // Apply funnel impacts
    const consequence = stageData.decision.options[idx].consequence;
    const impacts = consequence.funnelImpact;
    
    const newFunnel = { ...funnelData };
    const changed: string[] = [];

    Object.keys(impacts).forEach((key) => {
      if (impacts[key] !== '0%') {
        newFunnel[key as keyof FunnelData].impact = impacts[key];
        changed.push(key);
      }
    });

    setFunnelData(newFunnel);
    setImpactedStages(changed);
  };

  const handleContinue = () => {
    setShowConsequence(false);
    if (!completedStages.includes(stage)) {
      setCompletedStages([...completedStages, stage]);
    }
    
    const currentIdx = stages.indexOf(stage);
    if (currentIdx < stages.length - 1) {
      router.push(`/pathfinder/${archetype}/${stages[currentIdx + 1]}`);
    } else {
      router.push(`/pathfinder/${archetype}/completion`);
    }
  };

  if (stage === 'completion') {
    return (
      <div className="flex flex-col h-screen bg-background text-white p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-4">Simulation Complete</h1>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl">You have completed all 5 stages of the AARRR funnel for Kova. Below is a summary of your impact.</p>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Final Funnel State</h2>
           {/* In a real scenario we'd accumulate the state globally, here we just show the final projected bar */}
          <AARRRFunnelBar data={funnelData} />
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-white/5">
           <h2 className="text-xl font-semibold mb-4">Final Debrief</h2>
           <p className="text-gray-300 italic">{KOVA_NOVA_PROMPTS.revenue.postConsequence}</p>
        </div>
      </div>
    );
  }

  if (!stageData) return null;

  return (
    <div className="flex flex-col h-screen bg-background text-white overflow-hidden">
      <AARRRFunnelBar data={funnelData} impactedStages={showConsequence ? impactedStages : []} />
      <StageNav currentStage={stage} completedStages={completedStages} archetype={archetype} />
      
      <div className="flex flex-grow overflow-hidden">
        <div className="w-[65%] h-full">
          <DataDashboard stage={stage} />
        </div>
        
        <div className="w-[35%] h-full bg-surface">
          {!showConsequence && (
            <DecisionPanel stage={stage} onLockDecision={handleLockDecision} />
          )}
        </div>
      </div>

      {showConsequence && (
        <ConsequencePanel 
          consequence={stageData.decision.options[lockedDecisionIdx]?.consequence} 
          onContinue={handleContinue} 
        />
      )}

      {/* Provide an appropriate initial prompt based on the state */}
      <NovaChat 
        stage={stage} 
        initialPrompt={
          showConsequence 
            ? (KOVA_NOVA_PROMPTS as any)[stage].postConsequence 
            : (KOVA_NOVA_PROMPTS as any)[stage].entry
        } 
      />
    </div>
  );
}
