'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AARRRSidebar, FunnelData } from '@/components/AARRRSidebar';
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

  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    // Basic verification
    if (archetype !== 'kova') router.replace('/');
    if (!stages.includes(stage) && stage !== 'completion') router.replace('/pathfinder/kova/acquisition');
    
    if (stage === 'completion') {
      const stored = JSON.parse(sessionStorage.getItem('pathfinder_decisions') || '[]');
      setHistory(stored);
    }
  }, [stage, archetype, router]);

  const handleLockDecision = (idx: number) => {
    setLockedDecisionIdx(idx);
    setShowConsequence(true);
    
    // Apply funnel impacts
    const option = stageData.decision.options[idx];
    const consequence = option.consequence;
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

    // Save decision to history
    const storedDecisions = JSON.parse(sessionStorage.getItem('pathfinder_decisions') || '[]');
    const currentDecision = {
      stage,
      decisionAction: option.shortDescription,
      impact: consequence.kpiDeltas,
    };
    sessionStorage.setItem('pathfinder_decisions', JSON.stringify([...storedDecisions, currentDecision]));
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
      <div className="flex h-screen bg-background text-white overflow-hidden">
        <AARRRSidebar data={funnelData} />
        <div className="flex-1 flex flex-col p-12 overflow-y-auto relative">
          <div className="absolute inset-0 bg-glass-gradient opacity-30 pointer-events-none" />
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Simulation Complete</h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl">You have completed all 5 stages of the AARRR funnel for Kova. Your final funnel state is shown on the left.</p>
          
          <div className="glass p-8 rounded-2xl mb-6">
             <h2 className="text-2xl font-bold mb-4 text-accent">Decision History & Impact</h2>
             <div className="flex flex-col gap-4">
               {history.map((h, i) => (
                 <div key={i} className="flex flex-col md:flex-row justify-between bg-surface/50 border border-white/5 p-4 rounded-xl">
                   <div className="mb-2 md:mb-0">
                     <span className="text-xs uppercase text-accent font-bold tracking-wider">{h.stage}</span>
                     <p className="font-semibold mt-1 text-white">{h.decisionAction}</p>
                   </div>
                   <div className="flex flex-wrap gap-2 items-center">
                     {Object.entries(h.impact || {}).map(([k, v]: any) => (
                       <span key={k} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded uppercase text-gray-300 whitespace-nowrap">
                         {k}: <strong className="text-white">{v}</strong>
                       </span>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="glass p-8 flex-1 rounded-2xl">
             <h2 className="text-2xl font-bold mb-4 text-accent">Final Debrief</h2>
             <p className="text-gray-200 leading-relaxed text-lg italic">{KOVA_NOVA_PROMPTS.revenue.postConsequence}</p>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button 
              onClick={() => { sessionStorage.removeItem('pathfinder_decisions'); router.push('/'); }}
              className="bg-accent text-[#060e17] px-6 py-3 rounded-lg font-bold hover:bg-accent/80 transition-colors"
            >
              Restart Simulation
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!stageData) return null;

  return (
    <div className="flex h-screen bg-background text-white overflow-hidden selection:bg-accent/30 selection:text-white">
      <AARRRSidebar data={funnelData} impactedStages={showConsequence ? impactedStages : []} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-glass-gradient opacity-30 pointer-events-none" />
        
        <div className="relative z-10 border-b border-white/5 bg-surface/50 backdrop-blur-md">
          <StageNav currentStage={stage} completedStages={completedStages} archetype={archetype} />
        </div>
        
        <div className="flex flex-grow overflow-hidden relative z-10 p-6 gap-6">
          <div className="w-[60%] h-full overflow-y-auto pr-2 custom-scrollbar">
             <div className="glass-panel p-6 rounded-2xl min-h-full">
               <DataDashboard stage={stage} />
             </div>
          </div>
          
          <div className="w-[40%] h-full flex flex-col">
            <div className="glass-panel rounded-2xl flex-1 flex flex-col overflow-hidden">
              {!showConsequence && (
                <DecisionPanel stage={stage} onLockDecision={handleLockDecision} />
              )}
              {showConsequence && (
                <div className="p-6 h-full overflow-y-auto">
                  <ConsequencePanel 
                    consequence={stageData.decision.options[lockedDecisionIdx]?.consequence} 
                    onContinue={handleContinue} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <NovaChat 
          stage={stage} 
          initialPrompt={
            showConsequence 
              ? (KOVA_NOVA_PROMPTS as any)[stage].postConsequence 
              : (KOVA_NOVA_PROMPTS as any)[stage].entry
          } 
        />
      </div>
    </div>
  );
}
