// ─────────────────────────────────────────────────────────────────────────────
// PATHFINDER — Nexus Archetype (Two-Sided Freelancer Marketplace)
// Full AARRR data spec: 5 stages × 1 decision × 4 options × consequence objects
// ─────────────────────────────────────────────────────────────────────────────

export const NEXUS_ARCHETYPE = {
  id: 'nexus',
  name: 'Nexus',
  type: 'Two-Sided Marketplace',
  tagline: 'Freelancer marketplace for design and dev. Two years live. Supply is wide, demand is narrow, and 34% of pairs leave after the first gig.',
  description: 'Nexus connects freelance designers and developers with clients who need project-based work. 15% commission on completed jobs. GMV is $420k/month but only 1,200 of 8,400 listed freelancers are active. 62% of posted jobs get zero qualified applications. After the first engagement, 34% of client-freelancer pairs transact directly — bypassing the platform entirely.',
  color: '#E8553A',

  // ─── FUNNEL HEALTH SNAPSHOT ───────────────────────────────────────────────
  // Shown at top of every stage as the animated funnel bar
  funnelHealth: {
    acquisition: { value: 2800, label: 'Monthly new signups (both sides)', benchmark: 4200, unit: 'users', sentiment: 'neu' },
    activation:  { value: 18,   label: 'First-job completion rate',       benchmark: 35,   unit: '%',     sentiment: 'neg' },
    retention:   { value: 26,   label: 'M3 active rate',                  benchmark: 48,   unit: '%',     sentiment: 'neg' },
    referral:    { value: 0.12, label: 'Viral coefficient',               benchmark: 0.35, unit: 'x',     sentiment: 'neg' },
    revenue:     { value: 63,   label: 'Net revenue',                     benchmark: 110,  unit: '$k',    sentiment: 'neg' },
  },

  // ─── STAGE 1: ACQUISITION ─────────────────────────────────────────────────
  acquisition: {
    brief: 'Nexus adds 2,800 new signups per month — 2,100 freelancers and 700 clients. But the marketplace has a category mismatch: 58% of freelancer signups are generalist web developers, while 44% of client demand is for specialized UI/UX design. Freelancer CAC is $12 (largely organic). Client CAC is $84 (mostly paid). You have $14,000/month to allocate across supply and demand acquisition.',

    kpis: [
      { label: 'Monthly signups',           value: '2,800',  delta: 'Benchmark: 4,200',  sentiment: 'neu' },
      { label: 'Freelancer CAC',            value: '$12',    delta: 'Organic-heavy',      sentiment: 'pos' },
      { label: 'Client CAC',                value: '$84',    delta: 'Benchmark: $55',     sentiment: 'neg' },
      { label: 'Supply/demand match rate',  value: '38%',    delta: 'Benchmark: 65%',     sentiment: 'neg' },
      { label: 'Jobs with 0 applications',  value: '62%',    delta: 'Benchmark: 18%',     sentiment: 'neg' },
    ],

    channels: [
      { name: 'Google Ads (clients)',      spend: 6200,  sessions: 1840, cac: '$92',  roas: '2.1x', signal: 'neg' },
      { name: 'LinkedIn Ads (clients)',    spend: 3100,  sessions: 920,  cac: '$78',  roas: '2.6x', signal: 'neu' },
      { name: 'SEO / content (both)',      spend: 1800,  sessions: 3200, cac: '$6',   roas: '—',    signal: 'pos' },
      { name: 'Community / forums (supply)', spend: 1400, sessions: 2400, cac: '$8',  roas: '—',    signal: 'pos' },
      { name: 'Referral (both)',           spend: 1500,  sessions: 680,  cac: '$22',  roas: '3.8x', signal: 'pos' },
    ],

    dataSummary: 'Monthly signups 2,800 — 75% freelancers, 25% clients. The 3:1 supply-to-demand ratio creates an illusion of plenty, but category analysis reveals severe mismatch: 58% of freelancer supply is generalist web development, while 44% of client demand is specialized UI/UX design. Only 38% of posted jobs match available freelancer skills — well below the 65% benchmark. Client CAC of $84 is 53% above the $55 benchmark, driven by Google Ads at $92 CPA. Meanwhile, freelancer acquisition is cheap ($12 CAC) but undifferentiated — Nexus is acquiring the wrong supply. SEO and community channels generate both-sided traffic at $6-8 CPA but are underfunded at 23% of total budget.',

    novaPrompt: '62% of posted jobs get zero qualified applications. Before you allocate the budget — is this an acquisition volume problem or an acquisition targeting problem? What does the category mismatch data tell you?',

    decision: {
      question: 'How should Nexus allocate its $14,000 monthly acquisition budget across supply and demand?',
      mechanic: 'sliders',
      totalBudget: 14000,
      currency: '$',
      threshold: 0.35,
      spreadThinIdx: 3,
      options: [
        {
          label: 'Scale client acquisition — more demand solves everything',
          shortDescription: 'Double Google and LinkedIn spend to attract more clients posting jobs',
          consequence: {
            title: 'More jobs posted — still no applicants',
            description: 'Client signups grow 42% as paid spend scales. Jobs posted increase from 480 to 680/month. But the freelancer supply mix has not changed — 62% of new jobs still get zero qualified applications. The match rate stays at 38%. Client satisfaction drops because more clients experience the empty-marketplace problem. Client churn rises from 18% to 24%. You have poured water into the demand side without fixing the supply gap.',
            funnelImpact: { acquisition: '+32%', activation: '-6%', retention: '-8%', referral: '-4%', revenue: '+8%' },
            kpiDeltas: { signups: '+840', clientCAC: '+$14', matchRate: '-2pp', jobFillRate: '-4pp' },
          },
        },
        {
          label: 'Target supply in high-demand categories — recruit UI/UX designers specifically',
          shortDescription: 'Category-specific freelancer acquisition in underserved verticals',
          consequence: {
            title: 'Supply matches demand — match rate transforms',
            description: 'Redirecting $5,000 from generalist freelancer channels to targeted outreach in UI/UX design communities (Dribbble, Behance, design Slack groups). Within 90 days, UI/UX designer supply grows from 340 to 820. Match rate lifts from 38% to 54%. Jobs with zero applications fall from 62% to 41%. Client satisfaction improves because the marketplace now has relevant supply. Freelancer CAC rises from $12 to $28 for specialized talent — but each designer generates 3.4x more GMV than a generalist developer.',
            funnelImpact: { acquisition: '+8%', activation: '+28%', retention: '+14%', referral: '+8%', revenue: '+22%' },
            kpiDeltas: { signups: '+220', clientCAC: '-$12', matchRate: '+16pp', jobFillRate: '+21pp' },
          },
        },
        {
          label: 'Invest in SEO and content — build inbound for both sides simultaneously',
          shortDescription: 'Long-term organic growth that attracts supply and demand together',
          consequence: {
            title: 'Organic compounds — both sides grow, slowly',
            description: 'Allocating $6,000 to content marketing: "hire a UI/UX designer" landing pages, freelancer portfolio showcases, and category-specific guides. Organic traffic grows 55% over 90 days. Both-sided signups increase but the category targeting is indirect — content attracts more balanced supply than paid channels. Match rate improves to 44%. SEO is the right long-term channel but the 62% zero-application rate persists for 60+ days while content ranks.',
            funnelImpact: { acquisition: '+14%', activation: '+12%', retention: '+6%', referral: '+10%', revenue: '+10%' },
            kpiDeltas: { signups: '+380', clientCAC: '-$18', matchRate: '+6pp', jobFillRate: '+8pp' },
          },
        },
        {
          label: 'Spread budget evenly across all channels — diversify risk',
          shortDescription: 'Equal allocation across supply-side, demand-side, and organic channels',
          consequence: {
            title: 'Diluted investment — no side reaches critical mass',
            description: 'Even spread across five channels means no channel gets enough budget to optimize. Google Ads needs minimum $4,000/month for algorithmic learning. Targeted freelancer recruitment needs sustained community engagement. SEO content needs consistent publishing cadence. Each channel underperforms its potential. Match rate improves marginally to 40%. The fundamental supply-demand mismatch persists because no intervention reaches the threshold for impact.',
            funnelImpact: { acquisition: '+6%', activation: '+2%', retention: '0%', referral: '+2%', revenue: '+4%' },
            kpiDeltas: { signups: '+160', clientCAC: '-$4', matchRate: '+2pp', jobFillRate: '+3pp' },
          },
        },
      ],
    },
  },

  // ─── STAGE 2: ACTIVATION ──────────────────────────────────────────────────
  activation: {
    brief: 'Only 18% of new signups complete their first job on Nexus. For freelancers, the drop is at profile completion and first application. For clients, the drop is at receiving qualified applications and hiring. The median time from signup to first completed job is 34 days — benchmark is 11 days. Students need to identify the primary activation bottleneck on each side of the marketplace.',

    kpis: [
      { label: 'First-job completion rate',   value: '18%',     delta: 'Benchmark: 35%',      sentiment: 'neg' },
      { label: 'Freelancer profile completion', value: '41%',   delta: 'Benchmark: 72%',      sentiment: 'neg' },
      { label: 'Client first-hire rate',      value: '28%',     delta: 'Benchmark: 52%',      sentiment: 'neg' },
      { label: 'Time to first job',           value: '34 days', delta: 'Benchmark: 11 days',  sentiment: 'neg' },
      { label: 'Application-to-hire ratio',   value: '3.2:1',   delta: 'Benchmark: 6:1',      sentiment: 'neg' },
    ],

    funnel: [
      { stage: 'Total signups',              value: 2800 },
      { stage: 'Profile completed',          value: 1540 },
      { stage: 'First application/post',     value: 890  },
      { stage: 'First match',                value: 580  },
      { stage: 'First job completed',        value: 504  },
    ],

    bySource: [
      { source: 'Referred freelancers',  cvr: '34%', timeToConvert: '8 days',  pdpToCart: '68%' },
      { source: 'Organic freelancers',   cvr: '22%', timeToConvert: '18 days', pdpToCart: '52%' },
      { source: 'Paid freelancers',      cvr: '11%', timeToConvert: '42 days', pdpToCart: '34%' },
      { source: 'Referred clients',      cvr: '48%', timeToConvert: '6 days',  pdpToCart: '72%' },
      { source: 'Paid clients',          cvr: '19%', timeToConvert: '28 days', pdpToCart: '38%' },
    ],

    dataSummary: 'First-job completion rate is 18% vs 35% benchmark. The funnel shows two critical drops: signup to profile completion (55% completion rate, benchmark 72%) and first application/post to first match (65% match rate). Only 41% of freelancers complete their profile — meaning 59% of acquired freelancers never become visible to clients. The 3.2:1 application-to-hire ratio (benchmark 6:1) means each job gets too few qualified applicants. Time to first job is 34 days — 3x the benchmark. Referred users on both sides activate at 2-3x the rate of paid users and convert in one-third the time. The marketplace is failing at the "aha moment" — the first successful match.',

    novaPrompt: 'Freelancer profile completion is 41% and the application-to-hire ratio is 3.2:1. Before you rank your hypotheses — is the activation bottleneck on the supply side (freelancers not ready to be hired) or the demand side (clients not finding what they need)?',

    decision: {
      question: 'What is the primary reason Nexus\'s first-job completion rate is 18% against a 35% benchmark?',
      mechanic: 'ranking',
      options: [
        {
          label: 'Freelancer onboarding is too complex — 59% never complete their profile',
          shortDescription: 'The profile setup flow is too long, portfolio upload is broken, and skills taxonomy is confusing',
          consequence: {
            title: 'Simplified onboarding — supply becomes visible',
            description: 'Reducing profile completion from 14 steps to 5. Auto-import portfolios from Dribbble/GitHub. Smart skill tagging. Profile completion rate lifts from 41% to 68% within 60 days. Applications per job increase from 3.2 to 5.8. First-job completion rate lifts from 18% to 27%. Time to first job drops from 34 to 18 days. The supply was there — it was just invisible. Correct diagnosis: the marketplace had supply but could not surface it.',
            funnelImpact: { acquisition: '0%', activation: '+50%', retention: '+18%', referral: '+12%', revenue: '+28%' },
            kpiDeltas: { firstJobRate: '+9pp', profileCompletion: '+27pp', timeToFirstJob: '-16 days', appToHire: '+2.6' },
          },
        },
        {
          label: 'Matching algorithm is poor — clients see irrelevant freelancers',
          shortDescription: 'The search and recommendation engine does not surface the right talent for the job',
          consequence: {
            title: 'Better matching — moderate activation lift',
            description: 'Rebuilding the matching algorithm with skill-weighted scoring and portfolio relevance. Match quality score improves from 3.1/5 to 4.0/5 (client-rated). First-job completion lifts from 18% to 23%. Meaningful improvement, but the deeper problem remains — with only 41% profile completion, the matching algorithm has an incomplete inventory to work with. Better matching cannot compensate for invisible supply.',
            funnelImpact: { acquisition: '0%', activation: '+28%', retention: '+12%', referral: '+8%', revenue: '+16%' },
            kpiDeltas: { firstJobRate: '+5pp', profileCompletion: '+0pp', timeToFirstJob: '-8 days', appToHire: '+1.4' },
          },
        },
        {
          label: 'Client job posts are too vague — freelancers cannot assess fit',
          shortDescription: 'Job briefs lack scope, budget, and timeline clarity — freelancers skip them',
          consequence: {
            title: 'Structured briefs — application quality improves',
            description: 'Introducing a structured job posting template: scope, deliverables, budget range, timeline, required skills. Application relevance score improves from 42% to 61%. Freelancers apply more confidently when scope is clear. First-job completion lifts from 18% to 22%. Good structural improvement, but the incomplete freelancer profiles remain the larger bottleneck — even well-scoped jobs cannot be filled if the right freelancers have not completed onboarding.',
            funnelImpact: { acquisition: '0%', activation: '+22%', retention: '+8%', referral: '+6%', revenue: '+12%' },
            kpiDeltas: { firstJobRate: '+4pp', profileCompletion: '+0pp', timeToFirstJob: '-6 days', appToHire: '+1.8' },
          },
        },
        {
          label: 'Pricing friction — clients are shocked by freelancer rates during negotiation',
          shortDescription: 'Rate expectations diverge — clients expect $30/hr, freelancers quote $65/hr',
          consequence: {
            title: 'Rate transparency added — negotiation friction falls',
            description: 'Adding upfront rate ranges to freelancer profiles and budget guidance to job posts. Negotiation-stage dropoff falls from 38% to 24%. First-job completion rate lifts from 18% to 21%. Helpful but not the core bottleneck — pricing friction was a symptom of poor matching (wrong freelancers applying to wrong jobs), not the root cause. The supply visibility problem persists underneath.',
            funnelImpact: { acquisition: '+2%', activation: '+17%', retention: '+4%', referral: '+4%', revenue: '+10%' },
            kpiDeltas: { firstJobRate: '+3pp', profileCompletion: '+0pp', timeToFirstJob: '-4 days', appToHire: '+0.8' },
          },
        },
      ],
    },
  },

  // ─── STAGE 3: RETENTION ───────────────────────────────────────────────────
  retention: {
    brief: 'Nexus\'s M3 active rate is 26% — only 26 of every 100 users who completed a first job remain active at 90 days. The category benchmark is 48%. But the headline number hides the real crisis: disintermediation. 34% of client-freelancer pairs who complete a first job on Nexus transact directly for repeat work — bypassing the platform and its 15% commission. The platform is a matchmaker that gets abandoned after the first date.',

    kpis: [
      { label: 'M1 active rate',          value: '48%',   delta: 'Benchmark: 68%',       sentiment: 'neg' },
      { label: 'M3 active rate',          value: '26%',   delta: 'Benchmark: 48%',       sentiment: 'neg' },
      { label: 'Disintermediation rate',  value: '34%',   delta: 'Benchmark: <12%',      sentiment: 'neg' },
      { label: 'Repeat hire rate',        value: '22%',   delta: 'Benchmark: 45%',       sentiment: 'neg' },
      { label: 'Avg. jobs per active freelancer', value: '1.8', delta: 'Benchmark: 3.4', sentiment: 'neg' },
    ],

    cohortMonths: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    m1: [52, 50, 49, 47, 46, 48, 50, 48],
    m2: [36, 34, 33, 31, 29, 31, 33, null],
    m3: [28, 27, 26, 24, 22, 26, null, null],
    m4: [22, 20, 19, 17, 16, null, null, null],
    m5: [18, 16, 14, 12, null, null, null, null],
    m6: [14, 12, null, null, null, null, null, null],

    benchmarkM1: 68,

    segments: [
      { name: 'Platform-loyal (escrow + reviews)', count: 420,  m1: '82%', ltv: '$1,840', churn: '6%/mo' },
      { name: 'Occasional users (1-2 jobs/qtr)',   count: 780,  m1: '54%', ltv: '$620',   churn: '18%/mo' },
      { name: 'Disintermediators',                 count: 1080, m1: '28%', ltv: '$180',    churn: '42%/mo' },
      { name: 'One-job-and-gone',                  count: 1520, m1: '0%',  ltv: '$95',     churn: '100%' },
    ],

    dataSummary: 'M1 active rate 48% vs 68% benchmark, M3 drops to 26%. Disintermediation is the central problem: 34% of successful pairs leave the platform after the first engagement. The segment data tells the story — "Platform-loyal" users who use escrow and leave reviews retain at 82% M1 with $1,840 LTV. "Disintermediators" retain at 28% M1 with $180 LTV — they used Nexus to find the freelancer, then transact directly to avoid the 15% fee. 40% of all users are one-job-and-gone. The platform provides matching value but insufficient ongoing value to justify continuous commission. Average jobs per active freelancer is 1.8 vs 3.4 benchmark — even retained freelancers are underutilized.',

    novaPrompt: 'Your platform-loyal users retain at 82% using escrow and reviews. Your disintermediators leave at 34% after the first job. Before you choose a retention lever — what ongoing value does Nexus provide after the initial match that would justify paying 15% commission on every future transaction?',

    decision: {
      question: 'Which retention lever should Nexus invest in to reduce disintermediation and improve M3 retention?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Build platform-only value — escrow protection, dispute resolution, milestone tracking, and verified reviews',
          shortDescription: 'Make the platform indispensable for project management, not just matchmaking',
          consequence: {
            title: 'Platform value justifies the fee — disintermediation falls',
            description: 'Investing in escrow with milestone-based payments, integrated dispute resolution, time tracking, and a verified review system that builds freelancer reputation. Disintermediation rate falls from 34% to 19% over 90 days. M1 retention lifts from 48% to 58%. Repeat hire rate grows from 22% to 34%. The key insight: users who transacted through escrow disintermediated at only 8% vs 44% for those who used direct payment. Making escrow the default and adding project management tools makes the 15% fee feel like insurance and infrastructure, not a tax.',
            funnelImpact: { acquisition: '0%', activation: '+4%', retention: '+42%', referral: '+18%', revenue: '+34%' },
            kpiDeltas: { m3Active: '+12pp', disintermediation: '-15pp', repeatHire: '+12pp', avgJobs: '+1.2' },
          },
        },
        {
          label: 'Reduce the take rate — lower commission from 15% to 8% to remove the incentive to leave',
          shortDescription: 'If the fee is lower, users will not bother going direct',
          consequence: {
            title: 'Disintermediation falls — but revenue collapses faster',
            description: 'Cutting commission from 15% to 8%. Disintermediation falls from 34% to 22% — meaningful but not dramatic, because 22% still leave even at 8%. M3 retention improves from 26% to 31%. But net revenue drops from $63k to $34k/month immediately. The business now burns $57k/month instead of $28k — runway drops from 14 months to 7.5 months. The lower take rate bought modest retention improvement at catastrophic cost to unit economics. Users who leave at 15% largely still leave at 8% — the commission rate was a rationalization, not the root cause.',
            funnelImpact: { acquisition: '+4%', activation: '+2%', retention: '+19%', referral: '+6%', revenue: '-46%' },
            kpiDeltas: { m3Active: '+5pp', disintermediation: '-12pp', repeatHire: '+8pp', avgJobs: '+0.4' },
          },
        },
        {
          label: 'Lock in relationships — make freelancer profiles and reviews non-portable',
          shortDescription: 'Create switching costs by keeping reputation on-platform',
          consequence: {
            title: 'Walled garden — freelancer resentment grows',
            description: 'Making reviews, work history, and client relationships platform-exclusive. Short-term, disintermediation falls from 34% to 26% as switching costs increase. But freelancer NPS drops from 31 to 18. New freelancer signup rate falls 22% as word spreads that Nexus "traps" freelancers. The retention improvement is real but artificial — and it corrodes supply-side acquisition. Marketplaces that rely on lock-in rather than value creation enter a death spiral: lower supply quality, fewer clients, more pressure to lock in.',
            funnelImpact: { acquisition: '-22%', activation: '-8%', retention: '+12%', referral: '-18%', revenue: '+2%' },
            kpiDeltas: { m3Active: '+3pp', disintermediation: '-8pp', repeatHire: '+4pp', avgJobs: '+0.2' },
          },
        },
        {
          label: 'Launch a managed services tier — Nexus handles project management for a premium fee',
          shortDescription: 'White-glove project management for high-value engagements at 25% commission',
          consequence: {
            title: 'Managed tier works — but only for the top segment',
            description: 'Launching "Nexus Managed" at 25% commission with dedicated project managers, SLA guarantees, and quality assurance. 14% of active clients opt in — primarily enterprise clients with $5k+ projects. Managed clients disintermediate at only 6%. Revenue per managed engagement is 2.4x higher. But the 86% of clients on the standard tier are unchanged — disintermediation stays at 34% for them. Net revenue lifts 12% from the managed tier but the core retention problem is not solved for the majority of users.',
            funnelImpact: { acquisition: '+6%', activation: '+8%', retention: '+14%', referral: '+10%', revenue: '+12%' },
            kpiDeltas: { m3Active: '+4pp', disintermediation: '-4pp', repeatHire: '+6pp', avgJobs: '+0.6' },
          },
        },
      ],
    },
  },

  // ─── STAGE 4: REFERRAL ────────────────────────────────────────────────────
  referral: {
    brief: 'Nexus\'s viral coefficient is 0.12 — each user generates 0.12 new users through referral. The benchmark for marketplaces is 0.35x. The platform has a two-sided referral challenge: freelancers refer other freelancers (supply-side, competitive tension) and clients refer other clients (demand-side, less competitive but low engagement). Current referral programme participation is 3.8%. NPS is 31 for freelancers and 38 for clients.',

    kpis: [
      { label: 'NPS (freelancers)',        value: '31',    delta: 'Benchmark: 50',     sentiment: 'neg' },
      { label: 'NPS (clients)',            value: '38',    delta: 'Benchmark: 55',     sentiment: 'neg' },
      { label: 'Viral coefficient',        value: '0.12x', delta: 'Benchmark: 0.35x', sentiment: 'neg' },
      { label: 'Referral participation',   value: '3.8%',  delta: 'Benchmark: 12%',   sentiment: 'neg' },
      { label: 'Organic acquisition share', value: '14%',  delta: 'Benchmark: 38%',   sentiment: 'neg' },
    ],

    npsDistribution: {
      promoters:  { pct: 22, count: 840 },
      passives:   { pct: 42, count: 1600 },
      detractors: { pct: 36, count: 1370 },
    },

    referralSources: [
      { source: 'Freelancer-to-freelancer (organic)',  newCustomers: 82,  pctOfTotal: '4.2%' },
      { source: 'Client-to-client (organic)',          newCustomers: 54,  pctOfTotal: '2.8%' },
      { source: 'Referral programme (both sides)',     newCustomers: 48,  pctOfTotal: '2.4%' },
      { source: 'Social sharing / portfolio links',    newCustomers: 92,  pctOfTotal: '4.6%' },
    ],

    dataSummary: 'Viral coefficient 0.12x — for every 100 users, Nexus generates 12 new users through referral. Benchmark is 35. NPS is split: freelancers 31, clients 38. Combined: 22% Promoters, 42% Passives, 36% Detractors. The high Detractor rate is driven by freelancers — 42% of freelancer Detractors cite "not enough work" as the reason. Client Detractors (28%) cite "poor applicant quality." The referral programme has 3.8% participation — the incentive ($50 credit) is too small relative to the friction of inviting a competitor (for freelancers) or admitting you use a marketplace (for clients). Social sharing via portfolio links is actually the largest organic channel at 4.6% — freelancers share their Nexus portfolio profiles externally, generating inbound client traffic.',

    novaPrompt: 'Freelancers have NPS 31 and 42% of Detractors cite "not enough work." Clients have NPS 38 and 28% of Detractors cite "poor applicant quality." Before you choose a referral strategy — are these two problems connected, and which one would you need to fix first to make referral viable?',

    decision: {
      question: 'What is the highest-leverage referral investment for Nexus right now?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Fix the match quality first — referral is downstream of product satisfaction',
          shortDescription: 'You cannot ask users to refer when 36% are Detractors because the core product does not work for them',
          consequence: {
            title: 'Match quality improves — NPS lifts, referral follows',
            description: 'Investing in better category matching, proactive job alerts for freelancers, and curated shortlists for clients. Freelancers who receive relevant job alerts have NPS of 58 vs 31 overall. Client NPS lifts from 38 to 48 when they receive curated shortlists instead of open applications. Overall Detractor share falls from 36% to 21%. Viral coefficient lifts from 0.12 to 0.22 organically — no referral programme changes needed. This is the compounding fix: better product drives satisfaction, satisfaction drives referral, referral drives better-matched acquisition.',
            funnelImpact: { acquisition: '+16%', activation: '+10%', retention: '+18%', referral: '+83%', revenue: '+20%' },
            kpiDeltas: { viralCoef: '+0.10x', nps: '+14', organicShare: '+9pp', clientCAC: '-$14' },
          },
        },
        {
          label: 'Amplify portfolio sharing — freelancers are already generating inbound through their profiles',
          shortDescription: 'Portfolio links generate 4.6% of new signups — make them more shareable and trackable',
          consequence: {
            title: 'Portfolio-driven acquisition scales — supply drives demand',
            description: 'Building public portfolio pages with SEO, social previews, and "hire me on Nexus" CTAs. Freelancers share their profiles on social media, personal sites, and in proposals. Portfolio-driven signups grow from 92/month to 240/month. These are high-intent client signups — they convert to first hire at 44% vs 19% for paid clients. Viral coefficient lifts to 0.21x. The insight: freelancers are not competitive about referral when it is their own portfolio — they are marketing themselves, and Nexus benefits as the infrastructure.',
            funnelImpact: { acquisition: '+18%', activation: '+14%', retention: '+8%', referral: '+58%', revenue: '+16%' },
            kpiDeltas: { viralCoef: '+0.09x', nps: '+6', organicShare: '+11pp', clientCAC: '-$18' },
          },
        },
        {
          label: 'Rebuild the referral programme — higher incentives, separate supply and demand tracks',
          shortDescription: 'Current $50 credit is too low — offer commission-free first job for referred clients, bonus for referring freelancers',
          consequence: {
            title: 'Programme improves — moderate lift, capped by NPS',
            description: 'Redesigning referral: clients get their first hire commission-free (worth ~$150 on average job). Freelancers get a $200 bonus when a referred freelancer completes their first job. Participation lifts from 3.8% to 8.4%. Viral coefficient grows to 0.19x. But the 36% Detractor rate limits the ceiling — unhappy users do not refer regardless of incentive. The programme mechanics are better but the product satisfaction gap remains the constraint.',
            funnelImpact: { acquisition: '+10%', activation: '+4%', retention: '+6%', referral: '+42%', revenue: '+8%' },
            kpiDeltas: { viralCoef: '+0.07x', nps: '+4', organicShare: '+5pp', clientCAC: '-$8' },
          },
        },
        {
          label: 'Launch a client community — build a network where clients share freelancer recommendations',
          shortDescription: 'Peer-to-peer recommendations drive trust in marketplace quality',
          consequence: {
            title: 'Community builds slowly — long-term signal, weak short-term ROI',
            description: 'Creating a client community with case studies, freelancer spotlights, and peer recommendations. 180 clients join in 60 days — 6.4% of active client base. Community members hire 2.2x more frequently and disintermediate 60% less. But community growth is slow and the 90-day viral coefficient impact is marginal: 0.14x. Projected 12-month coefficient: 0.28x. The community is the right idea for building long-term network effects but does not solve the immediate acquisition and satisfaction gap.',
            funnelImpact: { acquisition: '+4%', activation: '+6%', retention: '+14%', referral: '+18%', revenue: '+6%' },
            kpiDeltas: { viralCoef: '+0.02x', nps: '+8', organicShare: '+3pp', clientCAC: '-$4' },
          },
        },
      ],
    },
  },

  // ─── STAGE 5: REVENUE ─────────────────────────────────────────────────────
  revenue: {
    brief: 'Nexus generates $420k GMV and $63k net revenue per month on a 15% take rate. EBITDA is -$28k/month. The business has 14 months of runway. Revenue is concentrated: the top 8% of freelancers generate 52% of GMV. The commission model creates a structural incentive for disintermediation. Students must decide how to restructure revenue to align platform value with pricing while closing the $28k monthly gap.',

    kpis: [
      { label: 'Monthly GMV',             value: '$420,000', delta: '+11% MoM',           sentiment: 'pos' },
      { label: 'Net revenue (15% take)',   value: '$63,000',  delta: 'Target: $110k',     sentiment: 'neg' },
      { label: 'EBITDA',                   value: '-$28,000', delta: 'Cash negative',     sentiment: 'neg' },
      { label: 'Take rate',               value: '15%',      delta: 'Category: 10-20%',  sentiment: 'neu' },
      { label: 'Revenue per active freelancer', value: '$52',  delta: 'Benchmark: $94',   sentiment: 'neg' },
    ],

    revenueBreakdown: [
      { source: 'Commission (standard)',    revenue: 48200, pct: '76%', margin: '82%' },
      { source: 'Commission (managed tier)', revenue: 8400, pct: '13%', margin: '48%' },
      { source: 'Featured listings',        revenue: 3800, pct: '6%',  margin: '94%' },
      { source: 'Freelancer subscriptions',  revenue: 2600, pct: '4%', margin: '88%' },
    ],

    ltvcacTrend: {
      months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      ltvcac: [2.4, 2.2, 2.1, 1.9, 1.8, 1.7, 1.6, 1.5],
      target: 3.0,
    },

    dataSummary: 'Monthly GMV $420k with 15% take rate yielding $63k net revenue. EBITDA -$28k/month with 14 months runway. Revenue is 76% standard commission — heavily dependent on a single revenue line. LTV:CAC has declined from 2.4x to 1.5x over 8 months as client CAC rises and disintermediation erodes repeat revenue. The top 8% of freelancers (96 people) generate 52% of GMV — extreme concentration risk. Featured listings and freelancer subscriptions together are only 10% of revenue but carry 88-94% margins vs 82% for standard commission. The managed tier generates 13% of revenue at 48% margin — labor-intensive but high-value. The structural problem: 76% of revenue depends on a commission model that actively incentivizes users to leave the platform.',

    novaPrompt: 'Your commission revenue is 76% of total at 82% margin but drives a 34% disintermediation rate. Your featured listings and subscriptions are 10% of revenue at 90%+ margin with zero disintermediation risk. Before you choose a monetization lever — which revenue model aligns platform incentives with user incentives, and which creates conflict?',

    decision: {
      question: 'Which monetization lever should Nexus prioritise to reach profitability and reduce disintermediation?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Shift to a hybrid model — lower commission to 10% and launch a freelancer subscription tier at $49/month for premium visibility and tools',
          shortDescription: 'Reduce the commission that drives disintermediation, replace it with recurring subscription revenue',
          consequence: {
            title: 'Hybrid model aligns incentives — disintermediation falls, revenue diversifies',
            description: 'Lowering commission from 15% to 10% and introducing "Nexus Pro" at $49/month: priority placement in search, analytics dashboard, proposal templates, and a verified badge. Commission revenue drops from $63k to $42k (lower rate). But 380 freelancers subscribe at $49/month — $18,600 in new recurring revenue at 92% margin. Net revenue: $60,600 — a short-term dip. But disintermediation falls from 34% to 21% at the lower commission rate, which increases repeat GMV. By month 4, GMV reaches $510k and net revenue hits $69,600. Subscription creates predictable revenue and aligns incentives — freelancers pay for tools, not a tax on each job.',
            funnelImpact: { acquisition: '+8%', activation: '+6%', retention: '+28%', referral: '+14%', revenue: '+18%' },
            kpiDeltas: { ltvcac: '+0.8x', netRevenue: '+$6,600', ebitda: '+$19k', disintermediation: '-13pp' },
          },
        },
        {
          label: 'Double down on managed services — expand the 25% commission tier with dedicated project managers',
          shortDescription: 'Grow the highest-revenue segment even though it has lower margin',
          consequence: {
            title: 'Managed tier grows — revenue lifts but operational cost rises',
            description: 'Hiring 3 additional project managers to expand the managed tier. Managed engagements grow from 14% to 28% of active clients. Managed GMV reaches $168k/month at 25% take rate — $42k revenue. Total net revenue lifts to $79k. But the 3 PMs cost $21k/month in salary and overhead, netting only $16k improvement. EBITDA improves to -$12k. The model works but is labor-intensive and does not solve the structural commission problem for the 72% of clients on the standard tier. Disintermediation on the standard tier remains at 34%.',
            funnelImpact: { acquisition: '+4%', activation: '+10%', retention: '+16%', referral: '+8%', revenue: '+25%' },
            kpiDeltas: { ltvcac: '+0.4x', netRevenue: '+$16,000', ebitda: '+$16k', disintermediation: '-6pp' },
          },
        },
        {
          label: 'Raise the take rate to 20% — Nexus is underpriced relative to the value of a successful match',
          shortDescription: 'Increase commission on the current model to close the revenue gap immediately',
          consequence: {
            title: 'Revenue lifts short-term — disintermediation accelerates',
            description: 'Raising take rate from 15% to 20%. Immediate net revenue jumps from $63k to $84k on current GMV. EBITDA turns positive at +$3k/month. But within 60 days, disintermediation accelerates from 34% to 48% — nearly half of pairs leave after the first engagement. GMV begins declining as repeat transactions move off-platform. By month 4, GMV drops to $340k and net revenue falls to $68k. The higher rate creates a temporary sugar rush but worsens the structural problem. Freelancers with established client relationships leave first — and they are the highest-GMV freelancers.',
            funnelImpact: { acquisition: '-6%', activation: '-4%', retention: '-22%', referral: '-12%', revenue: '+8%' },
            kpiDeltas: { ltvcac: '-0.2x', netRevenue: '+$5,000', ebitda: '+$5k', disintermediation: '+14pp' },
          },
        },
        {
          label: 'Launch value-added services — contract templates, payment processing, and insurance for freelancers',
          shortDescription: 'New revenue lines that do not depend on commission — freelancers pay for tools they need',
          consequence: {
            title: 'Services revenue grows — complements but does not replace commission',
            description: 'Launching three paid services: contract templates ($9/use), integrated payment processing (2.5% fee), and professional liability insurance ($29/month). Adoption: 22% of active freelancers use contract templates, 18% opt into payment processing, 8% buy insurance. New services revenue: $8,200/month at 78% blended margin. Net revenue reaches $71,200. EBITDA improves to -$19.8k. Meaningful incremental revenue but insufficient alone to close the $28k gap. The services complement the commission model but do not address the structural disintermediation problem — users still leave to avoid the 15% commission on repeat work.',
            funnelImpact: { acquisition: '+4%', activation: '+4%', retention: '+8%', referral: '+6%', revenue: '+13%' },
            kpiDeltas: { ltvcac: '+0.3x', netRevenue: '+$8,200', ebitda: '+$8k', disintermediation: '-2pp' },
          },
        },
      ],
    },
  },
};

// ─── NOVA STAGE PROMPTS ────────────────────────────────────────────────────
// Three Nova prompts per stage:
// entry — fires when student first opens the stage
// decision — fires when student is about to commit
// postConsequence — fires after consequence reveals

export const NEXUS_NOVA_PROMPTS = {
  acquisition: {
    entry: '62% of posted jobs get zero qualified applications. Before you allocate the budget — is this an acquisition volume problem or an acquisition targeting problem? What does the category mismatch data tell you?',
    decision: 'You\'ve set your allocation. Before you lock in — look at the supply/demand match rate. Which single reallocation would move it the most, and why?',
    postConsequence: 'Your acquisition decision changed the match rate and CAC. For a two-sided marketplace, which metric matters more — and how does the new match rate affect activation downstream?',
  },
  activation: {
    entry: 'Freelancer profile completion is 41% and the application-to-hire ratio is 3.2:1. Before you rank your hypotheses — is the activation bottleneck on the supply side (freelancers not ready to be hired) or the demand side (clients not finding what they need)?',
    decision: 'You\'ve ranked your hypotheses. Which data point in the funnel most strongly supports your top-ranked hypothesis? Can you identify a specific step where fixing one side of the marketplace unlocks the other?',
    postConsequence: 'Your activation rate changed. In a marketplace, activation on one side affects the other. How does improving freelancer visibility change the client experience — and does this create a flywheel or a one-time lift?',
  },
  retention: {
    entry: 'Your platform-loyal users retain at 82% using escrow and reviews. Your disintermediators leave at 34% after the first job. Before you choose a retention lever — what ongoing value does Nexus provide after the initial match that would justify paying 15% commission on every future transaction?',
    decision: 'You\'ve chosen your retention lever. If it works as intended, what will the new disintermediation rate be — and how does that change the LTV of a typical client-freelancer pair?',
    postConsequence: 'Your disintermediation rate changed. Calculate: if 34% of pairs were leaving and now X% leave, how much repeat GMV does Nexus recapture — and what does that do to net revenue and EBITDA?',
  },
  referral: {
    entry: 'Freelancers have NPS 31 and 42% of Detractors cite "not enough work." Clients have NPS 38 and 28% of Detractors cite "poor applicant quality." Before you choose a referral strategy — are these two problems connected, and which one would you need to fix first to make referral viable?',
    decision: 'You\'ve chosen your referral strategy. In a two-sided marketplace, which side\'s referrals are more valuable — more freelancers or more clients — and does your strategy target the right side?',
    postConsequence: 'Your viral coefficient changed. For every 0.1x improvement in viral coefficient, estimate how much Nexus can reduce its paid acquisition spend. Is the referral improvement you achieved enough to meaningfully change the acquisition cost structure?',
  },
  revenue: {
    entry: 'Your commission revenue is 76% of total at 82% margin but drives a 34% disintermediation rate. Your featured listings and subscriptions are 10% of revenue at 90%+ margin with zero disintermediation risk. Before you choose a monetization lever — which revenue model aligns platform incentives with user incentives, and which creates conflict?',
    decision: 'You\'ve chosen your monetization lever. Walk through the maths: if it performs as projected, what will the new monthly EBITDA be, and how many months does that add to runway?',
    postConsequence: 'You\'ve made all five AARRR decisions for a two-sided marketplace. Which single intervention had the biggest impact on the chicken-and-egg problem? If you were advising Nexus\'s founders, which stage would you tell them to fix first, and why?',
  },
};
