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
      label: option.label,
      decisionAction: option.shortDescription,
      consequenceTitle: consequence.title,
      consequenceDescription: consequence.description,
      funnelImpact: consequence.funnelImpact,
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
    const stageLabels: Record<string, string> = {
      acquisition: 'Acquisition', activation: 'Activation', retention: 'Retention', referral: 'Referral', revenue: 'Revenue',
    };
    const funnelKeys = ['acquisition', 'activation', 'retention', 'referral', 'revenue'];

    // Calculate cumulative funnel impact from all decisions
    const cumulativeImpact: Record<string, number> = { acquisition: 0, activation: 0, retention: 0, referral: 0, revenue: 0 };
    history.forEach((h: any) => {
      if (h.funnelImpact) {
        Object.entries(h.funnelImpact).forEach(([key, val]: [string, any]) => {
          const num = parseFloat(String(val).replace('%', '').replace('+', ''));
          if (!isNaN(num)) cumulativeImpact[key] = (cumulativeImpact[key] || 0) + num;
        });
      }
    });

    // Separate what worked vs what didn't per decision
    const workedDecisions = history.filter((h: any) => {
      if (!h.funnelImpact) return false;
      const positives = Object.values(h.funnelImpact).filter((v: any) => parseFloat(String(v).replace('%', '').replace('+', '')) > 0).length;
      const negatives = Object.values(h.funnelImpact).filter((v: any) => parseFloat(String(v).replace('%', '').replace('+', '')) < 0).length;
      return positives > negatives;
    });
    const tradeoffDecisions = history.filter((h: any) => {
      if (!h.funnelImpact) return false;
      const negatives = Object.values(h.funnelImpact).filter((v: any) => parseFloat(String(v).replace('%', '').replace('+', '')) < 0).length;
      return negatives >= 2;
    });

    return (
      <div className="flex h-screen bg-background text-white overflow-hidden">
        <AARRRSidebar data={funnelData} />
        <div className="flex-1 flex flex-col p-8 md:p-12 overflow-y-auto relative">
          <div className="absolute inset-0 bg-glass-gradient opacity-30 pointer-events-none" />

          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">Simulation Debrief</h1>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl">Your decisions across all 5 AARRR stages shaped Kova&apos;s trajectory. Here&apos;s what the data says.</p>

            {/* Cumulative Funnel Impact */}
            <div className="glass p-6 rounded-2xl mb-6">
              <h2 className="text-xl font-bold mb-4 text-white">Net Funnel Impact</h2>
              <div className="grid grid-cols-5 gap-3">
                {funnelKeys.map((key) => {
                  const val = cumulativeImpact[key];
                  const isPositive = val > 0;
                  const isNegative = val < 0;
                  return (
                    <div key={key} className="bg-surface/60 border border-white/5 rounded-xl p-4 text-center">
                      <span className="text-xs uppercase text-gray-400 tracking-wider block mb-2">{stageLabels[key]}</span>
                      <span className={`text-2xl font-bold block ${isPositive ? 'text-emerald-400' : isNegative ? 'text-red-400' : 'text-gray-400'}`}>
                        {isPositive ? '+' : ''}{val}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Decision-by-Decision Breakdown */}
            <div className="glass p-6 rounded-2xl mb-6">
              <h2 className="text-xl font-bold mb-4 text-white">Decision Breakdown</h2>
              <div className="flex flex-col gap-4">
                {history.map((h: any, i: number) => {
                  const positiveImpacts = h.funnelImpact ? Object.entries(h.funnelImpact).filter(([, v]: any) => parseFloat(String(v).replace('%', '').replace('+', '')) > 0) : [];
                  const negativeImpacts = h.funnelImpact ? Object.entries(h.funnelImpact).filter(([, v]: any) => parseFloat(String(v).replace('%', '').replace('+', '')) < 0) : [];

                  return (
                    <div key={i} className="bg-surface/50 border border-white/5 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs uppercase text-accent font-bold tracking-wider bg-accent/10 px-2 py-1 rounded">
                          {stageLabels[h.stage] || h.stage}
                        </span>
                        <span className="text-sm font-semibold text-white">{h.consequenceTitle || h.decisionAction}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{h.consequenceDescription || h.decisionAction}</p>

                      <div className="flex flex-wrap gap-4">
                        {positiveImpacts.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {positiveImpacts.map(([k, v]: any) => (
                              <span key={k} className="text-xs px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400">
                                {stageLabels[k] || k} {v}
                              </span>
                            ))}
                          </div>
                        )}
                        {negativeImpacts.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {negativeImpacts.map(([k, v]: any) => (
                              <span key={k} className="text-xs px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-red-400">
                                {stageLabels[k] || k} {v}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* What Worked / What Didn't */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="glass p-6 rounded-2xl">
                <h2 className="text-xl font-bold mb-4 text-emerald-400">What Worked</h2>
                {workedDecisions.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {workedDecisions.map((h: any, i: number) => (
                      <div key={i} className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3">
                        <span className="text-xs uppercase text-accent tracking-wider block mb-1">{stageLabels[h.stage]}</span>
                        <p className="text-sm text-white font-medium">{h.consequenceTitle || h.decisionAction}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {Object.entries(h.impact || {}).map(([k, v]: any) => (
                            <span key={k} className="text-xs px-2 py-0.5 bg-white/5 rounded text-gray-300">
                              {k}: <strong className="text-white">{v}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">No decisions with strongly positive net impact.</p>
                )}
              </div>

              <div className="glass p-6 rounded-2xl">
                <h2 className="text-xl font-bold mb-4 text-red-400">Trade-offs & Costs</h2>
                {tradeoffDecisions.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {tradeoffDecisions.map((h: any, i: number) => {
                      const negatives = Object.entries(h.funnelImpact || {}).filter(([, v]: any) => parseFloat(String(v).replace('%', '').replace('+', '')) < 0);
                      return (
                        <div key={i} className="bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                          <span className="text-xs uppercase text-accent tracking-wider block mb-1">{stageLabels[h.stage]}</span>
                          <p className="text-sm text-white font-medium">{h.consequenceTitle || h.decisionAction}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {negatives.map(([k, v]: any) => (
                              <span key={k} className="text-xs px-2 py-0.5 bg-red-500/10 rounded text-red-300">
                                {stageLabels[k]} {v}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">No decisions with significant trade-offs. Strong execution.</p>
                )}
              </div>
            </div>

            {/* Final Reflection */}
            <div className="glass p-6 rounded-2xl mb-8">
              <h2 className="text-xl font-bold mb-3 text-accent">Final Reflection</h2>
              <p className="text-gray-200 leading-relaxed text-base italic">{KOVA_NOVA_PROMPTS.revenue.postConsequence}</p>
            </div>

            <div className="flex justify-end pb-8">
              <button
                onClick={() => { sessionStorage.removeItem('pathfinder_decisions'); router.push('/'); }}
                className="bg-accent text-[#060e17] px-6 py-3 rounded-lg font-bold hover:bg-accent/80 transition-colors"
              >
                Restart Simulation
              </button>
            </div>
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
