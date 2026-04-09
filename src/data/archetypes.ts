// ─────────────────────────────────────────────────────────────────────────────
// ARCHETYPE REGISTRY — maps archetype IDs to their data and Nova prompts
// ─────────────────────────────────────────────────────────────────────────────

import { KOVA_ARCHETYPE, KOVA_NOVA_PROMPTS } from './pathfinder-kova';

// Lazy imports — these files are large so we load them on demand
const lazyArchetypes: Record<string, () => Promise<{ archetype: any; prompts: any }>> = {
  relay: () => import('./pathfinder-relay').then(m => ({ archetype: m.RELAY_ARCHETYPE, prompts: m.RELAY_NOVA_PROMPTS })),
  grazia: () => import('./pathfinder-grazia').then(m => ({ archetype: m.GRAZIA_ARCHETYPE, prompts: m.GRAZIA_NOVA_PROMPTS })),
  cosmo: () => import('./pathfinder-cosmo').then(m => ({ archetype: m.COSMO_ARCHETYPE, prompts: m.COSMO_NOVA_PROMPTS })),
  nexus: () => import('./pathfinder-nexus').then(m => ({ archetype: m.NEXUS_ARCHETYPE, prompts: m.NEXUS_NOVA_PROMPTS })),
  beacon: () => import('./pathfinder-beacon').then(m => ({ archetype: m.BEACON_ARCHETYPE, prompts: m.BEACON_NOVA_PROMPTS })),
  atlas: () => import('./pathfinder-atlas').then(m => ({ archetype: m.ATLAS_ARCHETYPE, prompts: m.ATLAS_NOVA_PROMPTS })),
};

// Kova is always available (eagerly loaded)
export const archetypeRegistry: Record<string, { archetype: any; prompts: any }> = {
  kova: { archetype: KOVA_ARCHETYPE, prompts: KOVA_NOVA_PROMPTS },
};

export async function getArchetype(id: string): Promise<{ archetype: any; prompts: any } | null> {
  if (archetypeRegistry[id]) return archetypeRegistry[id];
  if (lazyArchetypes[id]) {
    const data = await lazyArchetypes[id]();
    archetypeRegistry[id] = data;
    return data;
  }
  return null;
}

// Summary cards for the home page — lightweight metadata only
export const ARCHETYPE_CARDS = [
  {
    id: 'kova',
    name: KOVA_ARCHETYPE.name,
    type: KOVA_ARCHETYPE.type,
    tagline: KOVA_ARCHETYPE.tagline,
    description: KOVA_ARCHETYPE.description,
    color: KOVA_ARCHETYPE.color,
  },
  {
    id: 'relay',
    name: 'Relay',
    type: 'B2B SaaS',
    tagline: 'Project management tool. 12k sign-ups/month. Only 11% ever activate.',
    description: 'Relay is a collaborative project management tool for dev teams. Sign-ups are strong but 68% of free trial users never invite a teammate — the activation moment that predicts retention. The product works brilliantly for teams; the problem is acquisition brings solo users.',
    color: '#4A90D9',
  },
  {
    id: 'grazia',
    name: 'Grazia',
    type: 'Fast-Casual F&B',
    tagline: '4 locations. Strong footfall. 78% of customers never come back.',
    description: 'Grazia is a Mediterranean fast-casual chain with loyal regulars and one-time visitors. Uber Eats takes 30% commission on 35% of orders — volume grows but margins compress. The business is profitable only on customers who visit 3+ times.',
    color: '#D4763A',
  },
  {
    id: 'cosmo',
    name: 'Cosmo',
    type: 'Mobile Fitness App',
    tagline: '220k downloads/month. Day-7 retention: 8%. The onboarding is killing it.',
    description: 'Cosmo is a freemium fitness app with 840k installs and 38k MAU. Users who complete their first workout within 24 hours retain at 4x the rate — but the 11-screen onboarding flow loses 76% before they get there. Premium conversion is 2.1% against a 6% benchmark.',
    color: '#8B5CF6',
  },
  {
    id: 'nexus',
    name: 'Nexus',
    type: 'Freelancer Marketplace',
    tagline: '8,400 freelancers. 62% of jobs get zero applications. Two-sided pain.',
    description: 'Nexus connects freelance designers and developers with clients. The marketplace has a chicken-and-egg problem: clients post jobs that don\'t match available supply, and freelancers list skills that don\'t match demand. 34% of pairs go direct after first engagement.',
    color: '#E8553A',
  },
  {
    id: 'beacon',
    name: 'Beacon',
    type: 'D2C Skincare',
    tagline: 'Subscription-first. NPS 72. But 14% involuntary churn is bleeding revenue.',
    description: 'Beacon makes premium serums with a subscription-default model. The product is loved (NPS 72) but failed payments cause 14% monthly involuntary churn — more than double voluntary churn. iOS privacy changes have also crushed influencer attribution, inflating wasted ad spend.',
    color: '#E890B0',
  },
  {
    id: 'atlas',
    name: 'Atlas',
    type: 'EdTech (Cohort-Based)',
    tagline: '2,400 on the waitlist. 31% completion rate. Non-completers are toxic.',
    description: 'Atlas runs an 8-week Growth Marketing Masterclass at $499. Demand is strong but only 31% of students complete the course. Completers refer at NPS 82; non-completers actively discourage others at NPS 18. The referral paradox: scaling acquisition before fixing completion amplifies negative word-of-mouth.',
    color: '#F59E0B',
  },
];
