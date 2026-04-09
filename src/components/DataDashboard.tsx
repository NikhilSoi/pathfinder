'use client';

import React from 'react';
import clsx from 'clsx';

const getSentimentColor = (sentiment: string) => {
  if (sentiment === 'pos') return 'text-accent border-accent/30';
  if (sentiment === 'neu') return 'text-amber-400 border-amber-400/30';
  return 'text-red-400 border-red-400/30';
};

const KPICards = ({ kpis }: { kpis: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
    {kpis.map((kpi, idx) => (
      <div key={idx} className={clsx("p-4 rounded-xl border bg-surface flex flex-col justify-between", getSentimentColor(kpi.sentiment))}>
        <div className="text-sm opacity-80 mb-2 font-medium">{kpi.label}</div>
        <div className="text-3xl font-bold mb-1 text-white">{kpi.value}</div>
        <div className="text-xs opacity-70 mt-2 border-t pt-2 border-current/20">{kpi.delta}</div>
      </div>
    ))}
  </div>
);

const renderStageData = (stage: string, data: any, currency: string = '£') => {
  switch (stage) {
    case 'acquisition':
      return (
        <div className="bg-surface rounded-xl border border-white/5 p-4 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4 text-white">Channel Performance</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase text-xs tracking-wider">
                <th className="p-2">Channel</th>
                <th className="p-2">Spend</th>
                <th className="p-2">Sessions</th>
                <th className="p-2">CAC</th>
                <th className="p-2">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {data.channels.map((ch: any, idx: number) => (
                <tr key={idx} className="border-b border-white/5 data-[signal=neg]:text-red-300 data-[signal=pos]:text-accent" data-signal={ch.signal}>
                  <td className="p-2 font-medium text-white">{ch.name}</td>
                  <td className="p-2">{currency}{ch.spend.toLocaleString()}</td>
                  <td className="p-2">{ch.sessions.toLocaleString()}</td>
                  <td className="p-2">{ch.cac}</td>
                  <td className="p-2">{ch.roas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'activation':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface rounded-xl border border-white/5 p-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Funnel Drop-off</h3>
            <div className="flex flex-col gap-2">
              {data.funnel.map((step: any, idx: number) => {
                const max = data.funnel[0].value;
                const width = `${(step.value / max) * 100}%`;
                return (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{step.stage}</span>
                      <span>{step.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-surface rounded-xl border border-white/5 p-4 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4 text-white">By Source</h3>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-gray-400">
                  <th className="py-2">Source</th>
                  <th className="py-2">CVR</th>
                  <th className="py-2">Time to Conv</th>
                </tr>
              </thead>
              <tbody>
                {data.bySource.map((s: any, i: number) => (
                  <tr key={i} className="border-b border-white/5 text-gray-200">
                    <td className="py-2">{s.source}</td>
                    <td className="py-2">{s.cvr}</td>
                    <td className="py-2">{s.timeToConvert}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'retention':
      return (
        <div className="bg-surface rounded-xl border border-white/5 p-4 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4 text-white">Customer Segments</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase text-xs tracking-wider">
                <th className="p-2">Segment</th>
                <th className="p-2">Count</th>
                <th className="p-2">M1 Ret.</th>
                <th className="p-2">LTV</th>
                <th className="p-2">Churn/mo</th>
              </tr>
            </thead>
            <tbody>
              {data.segments.map((s: any, idx: number) => (
                <tr key={idx} className="border-b border-white/5 text-gray-200">
                  <td className="p-2 font-medium">{s.name}</td>
                  <td className="p-2">{s.count.toLocaleString()}</td>
                  <td className="p-2">{s.m1}</td>
                  <td className="p-2">{s.ltv}</td>
                  <td className="p-2">{s.churn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'referral':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface rounded-xl border border-white/5 p-4">
            <h3 className="text-lg font-semibold mb-4 text-white">NPS Distribution</h3>
            <div className="flex w-full h-8 rounded-lg overflow-hidden mb-4">
              <div style={{ width: `${data.npsDistribution.promoters.pct}%` }} className="bg-accent flex items-center justify-center text-xs text-background font-bold">{data.npsDistribution.promoters.pct}%</div>
              <div style={{ width: `${data.npsDistribution.passives.pct}%` }} className="bg-gray-400 flex items-center justify-center text-xs text-background font-bold">{data.npsDistribution.passives.pct}%</div>
              <div style={{ width: `${data.npsDistribution.detractors.pct}%` }} className="bg-red-400 flex items-center justify-center text-xs text-background font-bold">{data.npsDistribution.detractors.pct}%</div>
            </div>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1"><div className="w-3 h-3 bg-accent rounded-full"/> Promoters</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-400 rounded-full"/> Passives</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 rounded-full"/> Detractors</div>
            </div>
          </div>
        </div>
      );
    case 'revenue':
      return (
        <div className="bg-surface rounded-xl border border-white/5 p-4 overflow-x-auto">
           <h3 className="text-lg font-semibold mb-4 text-white">Revenue Breakdown</h3>
           <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase text-xs tracking-wider">
                <th className="p-2">Source</th>
                <th className="p-2">Revenue</th>
                <th className="p-2">% of Total</th>
                <th className="p-2">Margin</th>
              </tr>
            </thead>
            <tbody>
              {data.revenueBreakdown.map((r: any, idx: number) => (
                <tr key={idx} className="border-b border-white/5 text-gray-200">
                  <td className="p-2 font-medium">{r.source}</td>
                  <td className="p-2">{currency}{r.revenue.toLocaleString()}</td>
                  <td className="p-2">{r.pct}</td>
                  <td className="p-2">{r.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
};

export const DataDashboard = ({ stage, archetypeData }: { stage: string; archetypeData: any }) => {
  const stageData = archetypeData?.[stage] as any;

  if (!stageData) return <div>No data available</div>;

  return (
    <div className="flex flex-col gap-8 h-full bg-transparent text-white">
      <div>
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <span className="capitalize">{stage}</span> Data
        </h2>
        <p className="text-sm text-gray-400 max-w-2xl">{stageData.brief || stageData.dataSummary}</p>
      </div>
      
      <KPICards kpis={stageData.kpis} />
      
      {renderStageData(stage, stageData, stageData.decision?.currency || archetypeData?.acquisition?.decision?.currency || '£')}

      <div className="mt-8 bg-surface border border-white/5 p-4 rounded-xl">
        <h3 className="text-lg font-semibold mb-2 text-white">Data Summary</h3>
        <p className="text-sm text-gray-300 leading-relaxed text-balance">{stageData.dataSummary}</p>
      </div>
    </div>
  );
};
