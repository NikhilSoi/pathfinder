// ─────────────────────────────────────────────────────────────────────────────
// PATHFINDER — Relay Archetype (B2B SaaS Project Management)
// Full AARRR data spec: 5 stages × 1 decision × 4 options × consequence objects
// ─────────────────────────────────────────────────────────────────────────────

export const RELAY_ARCHETYPE = {
  id: 'relay',
  name: 'Relay',
  type: 'B2B SaaS',
  tagline: 'Collaborative project management for dev teams. 18 months live. Sign-ups are strong, but activation is broken.',
  description: 'Relay is a freemium project management tool priced at $29/seat/month. MRR is $184k growing 14% MoM with 12,000 monthly sign-ups. The core problem: 68% of free trial users never invite a teammate — the action that unlocks the product\'s value. Acquisition targets individual developers, but the product only delivers value in teams. EBITDA is -$42k/month.',
  color: '#4A90D9',

  // ─── FUNNEL HEALTH SNAPSHOT ───────────────────────────────────────────────
  // Shown at top of every stage as the animated funnel bar
  funnelHealth: {
    acquisition: { value: 12000, label: 'Monthly sign-ups',    benchmark: 10000, unit: 'sign-ups', sentiment: 'pos' },
    activation:  { value: 11,    label: 'Activation rate',     benchmark: 40,    unit: '%',        sentiment: 'neg' },
    retention:   { value: 92,    label: 'M3 retention (activ.)', benchmark: 85, unit: '%',        sentiment: 'pos' },
    referral:    { value: 0.22,  label: 'Viral coefficient',   benchmark: 0.6,   unit: 'x',        sentiment: 'neg' },
    revenue:     { value: 1.8,   label: 'LTV:CAC',             benchmark: 3.0,   unit: 'x',        sentiment: 'neg' },
  },

  // ─── STAGE 1: ACQUISITION ─────────────────────────────────────────────────
  acquisition: {
    brief: 'Relay spends $62,000/month on acquisition. Sign-ups are strong at 12,000/month — above benchmark. But 78% of sign-ups come from individual developer channels (dev blogs, Hacker News, solo dev ads) while the product requires team adoption. The acquisition engine is attracting the wrong user profile for a collaborative tool. You have $62,000 to reallocate.',

    kpis: [
      { label: 'Monthly sign-ups',     value: '12,000',  delta: 'Benchmark: 10,000', sentiment: 'pos' },
      { label: 'Blended CAC',          value: '$48',     delta: '+$12 in 6 months',  sentiment: 'neg' },
      { label: 'Solo dev sign-ups',    value: '78%',     delta: 'Benchmark: 35%',    sentiment: 'neg' },
      { label: 'Team lead sign-ups',   value: '22%',     delta: 'Benchmark: 65%',    sentiment: 'neg' },
      { label: 'Activation (all)',     value: '11%',     delta: 'Benchmark: 40%',    sentiment: 'neg' },
    ],

    channels: [
      { name: 'Dev blog sponsorships',  spend: 22000, sessions: 4800,  cac: '$38',  roas: '1.4x', signal: 'neu' },
      { name: 'Google Search (brand)',   spend: 8400,  sessions: 1900,  cac: '$28',  roas: '2.6x', signal: 'pos' },
      { name: 'Google Search (generic)', spend: 14200, sessions: 2400,  cac: '$52',  roas: '1.2x', signal: 'neg' },
      { name: 'Hacker News / Reddit',   spend: 6800,  sessions: 1600,  cac: '$18',  roas: '0.9x', signal: 'neg' },
      { name: 'LinkedIn Ads',           spend: 8200,  sessions: 860,   cac: '$72',  roas: '2.2x', signal: 'pos' },
      { name: 'Organic / Product-led',  spend: 2400,  sessions: 440,   cac: '$0',   roas: '—',    signal: 'pos' },
    ],

    dataSummary: 'Monthly sign-ups 12,000 — above the 10,000 benchmark, so top-of-funnel volume is not the problem. Blended CAC $48 — rising because the cheapest channels (HN, Reddit, dev blogs) attract solo developers who activate at 4% vs 34% for team leads. HN/Reddit has the lowest CAC ($18) but the worst ROAS (0.9x) because those users almost never convert to paid. LinkedIn Ads has the highest CAC ($72) but the best downstream economics — team leads from LinkedIn activate at 38% and convert to paid at 3.2x the rate of dev blog sign-ups. Organic/product-led is tiny (440 sign-ups) but those users activate at 52% because they arrive via teammate invites.',

    novaPrompt: 'Your cheapest channel (HN/Reddit at $18 CAC) has a 0.9x ROAS and your most expensive channel (LinkedIn at $72 CAC) has a 2.2x ROAS. Before you touch the sliders — why is the cheapest channel the least profitable, and what does that tell you about whether CAC is the right metric to optimise for?',

    decision: {
      question: 'How should Relay reallocate its $62,000 monthly acquisition budget?',
      mechanic: 'sliders',
      totalBudget: 62000,
      currency: '$',
      threshold: 0.35,
      spreadThinIdx: 3,
      options: [
        {
          label: 'Double down on developer channels — HN, Reddit, dev blogs',
          shortDescription: 'More sign-ups at the lowest cost per sign-up',
          consequence: {
            title: 'Sign-ups surge — activation collapses further',
            description: 'Sign-ups grow 32% to 15,800/month as dev channels scale efficiently. But solo dev sign-ups rise to 84% of total. Activation rate falls from 11% to 8.4% because the marginal sign-up is even less likely to invite a teammate. Activated users actually decline from 1,320 to 1,327 — nearly flat. CAC drops to $36 but effective CAC per activated user rises from $436 to $466. The volume looks great but the business does not improve.',
            funnelImpact: { acquisition: '+32%', activation: '-24%', retention: '-2%', referral: '-6%', revenue: '+3%' },
            kpiDeltas: { signUps: '+3,800', cac: '-$12', activationRate: '-2.6pp', effectiveCAC: '+$30' },
          },
        },
        {
          label: 'Shift budget to LinkedIn — target team leads and engineering managers',
          shortDescription: 'Higher CAC but dramatically better activation and conversion',
          consequence: {
            title: 'Sign-ups drop — activated users increase 68%',
            description: 'Redirecting $18,000 from dev blogs and HN to LinkedIn. Total sign-ups fall 22% to 9,400/month. But team lead share rises from 22% to 48%. Activation rate lifts from 11% to 18.6% because team leads naturally invite colleagues. Activated users grow from 1,320 to 1,748 — a 32% increase despite fewer sign-ups. CAC rises to $58 but effective CAC per activated user falls from $436 to $335. The pipeline shrinks but the business improves.',
            funnelImpact: { acquisition: '-22%', activation: '+69%', retention: '+8%', referral: '+12%', revenue: '+28%' },
            kpiDeltas: { signUps: '-2,600', cac: '+$10', activationRate: '+7.6pp', effectiveCAC: '-$101' },
          },
        },
        {
          label: 'Invest in product-led growth — make the free product shareable',
          shortDescription: 'Build viral loops into the product: shared boards, public roadmaps',
          consequence: {
            title: 'Organic compounds — results take 90 days',
            description: 'Redirecting $14,000 to PLG engineering: public project boards, embeddable roadmaps, "Powered by Relay" badges. In the first 60 days, sign-ups drop 14% as paid channels lose budget. By day 90, organic sign-ups grow from 440 to 1,600/month. PLG users activate at 52% because they arrive via teammate context. Total activated users at 90 days: 1,580 (+20%). At 180 days: projected 2,200 (+67%). Short-term pain for structural improvement.',
            funnelImpact: { acquisition: '-14%', activation: '+22%', retention: '+14%', referral: '+42%', revenue: '+18%' },
            kpiDeltas: { signUps: '-1,700', cac: '-$8', activationRate: '+4.2pp', effectiveCAC: '-$68' },
          },
        },
        {
          label: 'Spread budget evenly across all channels',
          shortDescription: 'Diversify to avoid channel dependency',
          consequence: {
            title: 'No channel reaches critical mass — metrics stagnate',
            description: 'Equal allocation across 6 channels gives each ~$10,300/month. Dev blogs lose frequency needed for brand awareness. LinkedIn cannot optimise without sustained budget. HN/Reddit spend increases beyond the organic reach sweet spot. Google Search loses competitive bid position. Sign-ups drop 8% to 11,040. Activation rate barely moves to 11.6%. No channel improves because none receives sufficient investment to optimise. Blended CAC rises to $52 due to inefficiency.',
            funnelImpact: { acquisition: '-8%', activation: '+5%', retention: '0%', referral: '0%', revenue: '-2%' },
            kpiDeltas: { signUps: '-960', cac: '+$4', activationRate: '+0.6pp', effectiveCAC: '+$8' },
          },
        },
      ],
    },
  },

  // ─── STAGE 2: ACTIVATION ──────────────────────────────────────────────────
  activation: {
    brief: 'Relay defines activation as "create a project + invite at least 1 teammate within 14 days of sign-up." Only 11% of sign-ups activate. The product is collaborative — a single user gets almost no value from Relay. 68% of trial users never invite anyone. The onboarding flow is 7 steps before a user can invite a teammate. Students need to diagnose why activation is so low.',

    kpis: [
      { label: 'Activation rate (14d)',    value: '11%',     delta: 'Benchmark: 40%',      sentiment: 'neg' },
      { label: 'Teammate invite rate',     value: '32%',     delta: 'Benchmark: 72%',      sentiment: 'neg' },
      { label: 'Project creation rate',    value: '44%',     delta: 'Benchmark: 68%',      sentiment: 'neg' },
      { label: 'Time to first invite',     value: '4.8 days', delta: 'Benchmark: 0.5 days', sentiment: 'neg' },
      { label: 'Onboarding completion',    value: '38%',     delta: 'Benchmark: 74%',      sentiment: 'neg' },
    ],

    funnel: [
      { stage: 'Sign-ups',               value: 12000 },
      { stage: 'Onboarding started',     value: 9600  },
      { stage: 'Onboarding completed',   value: 4560  },
      { stage: 'Project created',        value: 5280  },
      { stage: 'Teammate invited',       value: 3840  },
      { stage: 'Activated (both)',       value: 1320  },
    ],

    bySource: [
      { source: 'Dev blog sponsorships',  cvr: '6%',   timeToConvert: '6.2 days', pdpToCart: '14%' },
      { source: 'Google Search (brand)',   cvr: '22%',  timeToConvert: '1.4 days', pdpToCart: '38%' },
      { source: 'Google Search (generic)', cvr: '9%',   timeToConvert: '4.8 days', pdpToCart: '18%' },
      { source: 'HN / Reddit',            cvr: '4%',   timeToConvert: '8.1 days', pdpToCart: '8%' },
      { source: 'LinkedIn Ads',           cvr: '34%',  timeToConvert: '0.8 days', pdpToCart: '52%' },
      { source: 'Organic / Product-led',  cvr: '52%',  timeToConvert: '0.3 days', pdpToCart: '68%' },
    ],

    dataSummary: 'Activation rate 11% vs 40% benchmark. The funnel shows two critical drops: 38% onboarding completion (62% abandon the 7-step onboarding) and only 32% of sign-ups ever invite a teammate. Project creation is 44% — not great but not the bottleneck. The real issue: of users who create a project, only 25% also invite a teammate within 14 days (1,320 / 5,280). The invite step is buried at step 6 of 7 in onboarding. Time to first invite is 4.8 days — by then users have already formed a solo usage pattern. Source data is revealing: organic/PLG users activate at 52% (they arrive via invite), LinkedIn at 34% (team leads invite naturally), HN/Reddit at 4% (solo devs with no team intent).',

    novaPrompt: 'Your onboarding is 7 steps and the teammate invite is step 6. Users who invite a teammate within 24 hours activate at 4x the rate of those who wait. Before you rank your hypotheses — is the activation problem caused by the wrong users signing up, or the right users hitting a broken onboarding flow?',

    decision: {
      question: 'What is the primary reason Relay\'s activation rate is 11% against a 40% benchmark?',
      mechanic: 'ranking',
      options: [
        {
          label: 'Teammate invite is buried — move it to step 1 of onboarding',
          shortDescription: 'The invite is at step 6 of 7; by then users have formed a solo habit',
          consequence: {
            title: 'Invite-first onboarding transforms activation',
            description: 'Rebuilding onboarding to ask "Who do you work with?" as the first step — before project creation, before preferences, before any solo setup. Invite rate lifts from 32% to 58% within 30 days. Time to first invite drops from 4.8 days to 0.4 days. Activation rate lifts from 11% to 26%. Users who invite within 24 hours create 3.2x more projects and reach the "aha moment" (first collaborative task completed) 5x faster. This is the highest-leverage fix because it aligns the onboarding with the product\'s core value proposition.',
            funnelImpact: { acquisition: '0%', activation: '+136%', retention: '+18%', referral: '+32%', revenue: '+48%' },
            kpiDeltas: { activationRate: '+15pp', inviteRate: '+26pp', timeToInvite: '-4.4 days', activatedUsers: '+1,800' },
          },
        },
        {
          label: 'Onboarding is too long — simplify from 7 steps to 3',
          shortDescription: '62% of users abandon the 7-step onboarding before finishing',
          consequence: {
            title: 'Completion improves — activation lifts moderately',
            description: 'Collapsing onboarding from 7 steps to 3: (1) create workspace, (2) create first project, (3) invite team. Onboarding completion lifts from 38% to 64%. But the invite rate only improves from 32% to 41% — shorter onboarding helps completion but the fundamental solo-user problem remains. Many users complete the streamlined flow but still skip the invite step. Activation lifts from 11% to 17%. A real improvement but not the full diagnosis.',
            funnelImpact: { acquisition: '0%', activation: '+55%', retention: '+8%', referral: '+14%', revenue: '+22%' },
            kpiDeltas: { activationRate: '+6pp', inviteRate: '+9pp', timeToInvite: '-1.6 days', activatedUsers: '+720' },
          },
        },
        {
          label: 'Wrong user profile — solo devs have no one to invite',
          shortDescription: '78% of sign-ups are solo developers who do not work in teams',
          consequence: {
            title: 'Diagnosis is partially correct — but fixable at onboarding',
            description: 'Analysis of the 78% "solo dev" sign-ups reveals that 44% of them actually do work in teams of 3+ but signed up individually after reading a blog post. They have teammates to invite — they were just never prompted effectively. Restricting acquisition to team leads only would cut sign-ups by 60% and reduce activated users. The real fix is to surface the invite earlier, not to reject solo sign-ups. Activation lifts only to 14% because the onboarding is not changed.',
            funnelImpact: { acquisition: '-32%', activation: '+27%', retention: '+4%', referral: '+6%', revenue: '+8%' },
            kpiDeltas: { activationRate: '+3pp', inviteRate: '+6pp', timeToInvite: '-0.8 days', activatedUsers: '+360' },
          },
        },
        {
          label: 'Free plan is too limited — users cannot experience value before inviting',
          shortDescription: 'The free plan limits projects to 2 and tasks to 50, blocking the aha moment',
          consequence: {
            title: 'Limits raised — usage increases, conversion does not',
            description: 'Expanding the free plan from 2 projects / 50 tasks to 5 projects / unlimited tasks. Solo usage increases 28% — users create more projects and tasks. But the activation rate only lifts from 11% to 13.2%. The problem was never that the product was too limited for solo use — it was that solo use is not where Relay delivers value. Users now use Relay more as a personal to-do list and are even less likely to invite teammates because the solo experience feels "good enough." Free plan costs increase $8,400/month in infrastructure.',
            funnelImpact: { acquisition: '+6%', activation: '+20%', retention: '-4%', referral: '-8%', revenue: '-6%' },
            kpiDeltas: { activationRate: '+2.2pp', inviteRate: '-3pp', timeToInvite: '+1.2 days', activatedUsers: '+264' },
          },
        },
      ],
    },
  },

  // ─── STAGE 3: RETENTION ───────────────────────────────────────────────────
  retention: {
    brief: 'Relay has a tale of two retention curves. Activated users (those who created a project + invited a teammate within 14 days) retain at 92% M3 — exceptional for B2B SaaS. But only 11% of sign-ups ever activate. The 89% who never activate churn at 96% within 30 days. Blended M1 retention across all sign-ups is 18%. The retention problem is really an activation problem wearing a different hat.',

    kpis: [
      { label: 'M1 retention (all)',        value: '18%',     delta: 'Benchmark: 52%',       sentiment: 'neg' },
      { label: 'M3 retention (activated)',  value: '92%',     delta: 'Benchmark: 85%',       sentiment: 'pos' },
      { label: 'M1 retention (non-activ.)', value: '4%',      delta: 'Benchmark: 22%',       sentiment: 'neg' },
      { label: 'DAU/MAU (activated)',       value: '64%',     delta: 'Benchmark: 42%',       sentiment: 'pos' },
      { label: 'Net revenue retention',     value: '108%',    delta: 'Benchmark: 110%',      sentiment: 'neu' },
    ],

    cohortMonths: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    m1: [20, 19, 18, 17, 18, 19, 18, 18],
    m2: [14, 13, 12, 12, 12, 13, 12, null],
    m3: [11, 10, 10, 10, 10, 11, null, null],
    m4: [10, 9,  9,  9,  9,  null, null, null],
    m5: [9,  9,  8,  8,  null, null, null, null],
    m6: [9,  8,  null, null, null, null, null, null],

    benchmarkM1: 52,

    segments: [
      { name: 'Activated teams (3+ seats)', count: 620,   m1: '96%', ltv: '$2,840', churn: '2.8%/mo' },
      { name: 'Activated pairs (2 seats)',   count: 700,   m1: '88%', ltv: '$1,240', churn: '6.4%/mo' },
      { name: 'Solo active (no invite)',     count: 1480,  m1: '12%', ltv: '$18',    churn: '72%/mo' },
      { name: 'Signed up, never returned',  count: 9200,  m1: '0%',  ltv: '$0',     churn: '100%' },
    ],

    dataSummary: 'Blended M1 retention is 18% vs 52% benchmark — but this masks a bimodal distribution. Activated teams (3+ seats) retain at 96% M1 with $2,840 LTV. Activated pairs retain at 88% M1 with $1,240 LTV. Solo active users retain at 12% M1 with $18 LTV — they are using the free plan as a to-do list, not as a collaboration tool. 76.7% of all sign-ups (9,200) never return after day 1. The retention curve flattens at M3 for activated users — 92% M3 means almost no further churn after 90 days. DAU/MAU of 64% for activated teams is best-in-class. Net revenue retention is 108% — activated teams expand seats over time. The problem is entirely in the activation gate.',

    novaPrompt: 'Your activated teams retain at 96% M1 and your non-activated users retain at 4% M1. Before you choose a retention lever — should you invest in reducing churn among non-activated users, or should you invest in getting more users through the activation gate in the first place?',

    decision: {
      question: 'Which retention lever should Relay invest in first?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Re-engage non-activated users — drip campaign to get them to invite a teammate',
          shortDescription: 'Target the 9,200 who signed up but never activated with an invite-focused sequence',
          consequence: {
            title: 'Reactivation works at the margin — activation is the real fix',
            description: 'A 5-email drip campaign targeting the 9,200 non-activated sign-ups. Subject lines focus on "Your project is waiting for your team." 14% open rate, 3.2% click-through. 296 users return and invite a teammate. Of those, 184 fully activate. Blended M1 retention lifts from 18% to 19.5%. Meaningful but modest — the campaign treats the symptom. The 184 reactivated users retain at 72% M3 (lower than organic activators at 92% M3) because forced reactivation produces weaker engagement than intrinsic activation.',
            funnelImpact: { acquisition: '0%', activation: '+14%', retention: '+8%', referral: '+6%', revenue: '+12%' },
            kpiDeltas: { m1Retention: '+1.5pp', nrr: '+2pp', activatedUsers: '+184', ltvcac: '+0.1x' },
          },
        },
        {
          label: 'Double down on activated users — help teams expand from 2 seats to 5+',
          shortDescription: 'Seat expansion is the fastest path to revenue growth for users who already love the product',
          consequence: {
            title: 'Expansion revenue accelerates — NRR climbs',
            description: 'Building an in-product "Invite your full team" prompt that appears after teams complete their 10th task together. Targeting the 700 activated pairs (2-seat teams). 32% expand to 3+ seats within 60 days — 224 teams. Average expansion: 2.4 additional seats. NRR lifts from 108% to 118%. Monthly expansion MRR: +$15,500. Blended M1 retention does not change significantly (still 18%) because the non-activated pool is untouched. But revenue per activated user increases 28% and LTV:CAC improves from 1.8x to 2.3x.',
            funnelImpact: { acquisition: '+4%', activation: '0%', retention: '+12%', referral: '+18%', revenue: '+34%' },
            kpiDeltas: { m1Retention: '+0pp', nrr: '+10pp', activatedUsers: '+0', ltvcac: '+0.5x' },
          },
        },
        {
          label: 'Build team workspaces — make Relay valuable for solo users until teammates join',
          shortDescription: 'Create a compelling single-player experience that bridges to multiplayer',
          consequence: {
            title: 'Solo engagement rises — conversion to team use remains low',
            description: 'Building personal dashboards, Kanban boards for solo task management, and a "share with your team" prompt at natural moments. Solo active M1 retention lifts from 12% to 24%. But conversion from solo to team use is only 8% — users who form a solo habit rarely transition to collaborative use. The solo product becomes a freemium trap: users stay on the free plan longer but never reach the paid tier. Infrastructure cost increases $12,600/month for solo users who will never pay. Blended M1 retention lifts from 18% to 22% but revenue impact is minimal.',
            funnelImpact: { acquisition: '+8%', activation: '+14%', retention: '+22%', referral: '-4%', revenue: '+4%' },
            kpiDeltas: { m1Retention: '+4pp', nrr: '+1pp', activatedUsers: '+168', ltvcac: '-0.1x' },
          },
        },
        {
          label: 'Introduce usage-based nudges — trigger invite prompts at high-engagement moments',
          shortDescription: 'Prompt users to invite teammates at the moment they hit friction that teams would solve',
          consequence: {
            title: 'Contextual nudges convert — activation rate lifts meaningfully',
            description: 'Identifying 4 high-friction solo moments (assigning a task, requesting feedback, sharing a timeline, setting a deadline for someone) and surfacing "This works better with your team" prompts. 18% of nudged users invite a teammate within 48 hours. Net new activated users: +640/month. Blended M1 retention lifts from 18% to 23%. The nudges work because they trigger at the moment the user experiences the gap between solo and team value. Activated users from nudges retain at 86% M3 — slightly below organic but far above the drip campaign cohort.',
            funnelImpact: { acquisition: '0%', activation: '+48%', retention: '+28%', referral: '+22%', revenue: '+26%' },
            kpiDeltas: { m1Retention: '+5pp', nrr: '+4pp', activatedUsers: '+640', ltvcac: '+0.3x' },
          },
        },
      ],
    },
  },

  // ─── STAGE 4: REFERRAL ────────────────────────────────────────────────────
  referral: {
    brief: 'Relay\'s viral coefficient is 0.22 — each activated team generates 0.22 new sign-ups through word of mouth. The benchmark for B2B SaaS with a collaborative product is 0.6x. The product has natural virality built in (every invite is a referral) but the referral loop is not instrumented. 86% of teammate invites are plain-text emails with no onboarding context. Invited users who land on a generic sign-up page activate at 28% — those who land on a team-context page would activate at 68%.',

    kpis: [
      { label: 'NPS score',             value: '62',     delta: 'Benchmark: 52',      sentiment: 'pos' },
      { label: 'Viral coefficient',     value: '0.22x',  delta: 'Benchmark: 0.6x',   sentiment: 'neg' },
      { label: 'Invite-to-join rate',   value: '34%',    delta: 'Benchmark: 58%',    sentiment: 'neg' },
      { label: 'Org-level expansion',   value: '8%',     delta: 'Benchmark: 22%',    sentiment: 'neg' },
      { label: 'Promoter share',        value: '52%',    delta: 'Benchmark: 45%',    sentiment: 'pos' },
    ],

    npsDistribution: {
      promoters:  { pct: 52, count: 686 },
      passives:   { pct: 32, count: 422 },
      detractors: { pct: 16, count: 211 },
    },

    referralSources: [
      { source: 'Teammate invites',           newCustomers: 412,  pctOfTotal: '18.4%' },
      { source: 'Word of mouth (organic)',     newCustomers: 86,   pctOfTotal: '3.8%' },
      { source: 'Social sharing / blog posts', newCustomers: 34,  pctOfTotal: '1.5%' },
      { source: 'Cross-org referrals',         newCustomers: 18,  pctOfTotal: '0.8%' },
    ],

    dataSummary: 'Viral coefficient 0.22x — well below the 0.6x benchmark for collaborative B2B tools. But the underlying ingredients are strong: NPS is 62 with 52% Promoters — activated users genuinely love the product. The problem is mechanical, not emotional. Teammate invites generate 412 new users/month but the invite-to-join rate is only 34% (benchmark 58%). Diagnosis: invite emails are plain text with no product context, and the invited user lands on a generic sign-up page rather than directly into their team\'s workspace. Cross-org expansion is 8% — teams using Relay rarely trigger adoption in other departments or partner companies. This is a missed opportunity because the product supports cross-org collaboration.',

    novaPrompt: 'Your NPS is 62 and your Promoter share is 52% — both above benchmark. Yet your viral coefficient is 0.22x against a 0.6x benchmark. Before you choose a referral lever — if the problem is not user satisfaction, what is it? What specific data point tells you where the referral loop is breaking?',

    decision: {
      question: 'What is the highest-leverage referral investment for Relay right now?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Fix the invite flow — rich invite emails and team-context landing pages',
          shortDescription: 'The invite email is plain text and the landing page has no team context',
          consequence: {
            title: 'Invite-to-join rate doubles — viral coefficient jumps',
            description: 'Rebuilding the invite email to include the team name, the project they\'re joining, the task assigned to them, and a one-click "Join your team" button. The landing page pre-loads the team workspace so the invited user sees their teammates and tasks immediately. Invite-to-join rate lifts from 34% to 62%. Time to activated from invite drops from 2.4 days to 0.3 days. Viral coefficient lifts from 0.22x to 0.41x. Monthly new users from invites grows from 412 to 748. This is the highest-leverage fix because the invite moment is the single best acquisition channel and it was being wasted on a generic sign-up page.',
            funnelImpact: { acquisition: '+28%', activation: '+34%', retention: '+8%', referral: '+86%', revenue: '+32%' },
            kpiDeltas: { viralCoef: '+0.19x', inviteToJoin: '+28pp', orgExpansion: '+4pp', effectiveCAC: '-$82' },
          },
        },
        {
          label: 'Build cross-org collaboration — let teams share projects with external partners',
          shortDescription: 'Enable agencies, clients, and partners to collaborate on shared boards',
          consequence: {
            title: 'Cross-org expands — new acquisition channel emerges',
            description: 'Launching guest access for external collaborators with "Powered by Relay" branding. Cross-org referrals grow from 18 to 124/month within 90 days. 28% of guest users sign up for their own Relay workspace. A new acquisition channel that costs $0 CAC. But the feature requires 6 weeks of engineering and $38,000 in development cost. Viral coefficient lifts to 0.31x. The cross-org loop is powerful but slower to compound than fixing the existing invite flow.',
            funnelImpact: { acquisition: '+14%', activation: '+12%', retention: '+6%', referral: '+42%', revenue: '+18%' },
            kpiDeltas: { viralCoef: '+0.09x', inviteToJoin: '+4pp', orgExpansion: '+12pp', effectiveCAC: '-$34' },
          },
        },
        {
          label: 'Launch a formal referral programme — reward teams that bring other teams',
          shortDescription: '$50 credit per referred team that activates, for both referrer and referee',
          consequence: {
            title: 'Referral programme generates leads — quality is mixed',
            description: 'Launching a double-sided referral reward: $50 credit for referrer and referee when a new team activates. 14% of activated teams participate. 186 new sign-ups/month from referrals. But 62% of referred users are solo developers invited by friends (not teammates), and their activation rate is only 18%. The programme generates volume but the quality is lower than organic invites. Viral coefficient lifts to 0.28x. Net cost after credits: $4,200/month. CAC for referred users is $22 — cheap but activation-adjusted CAC is $122.',
            funnelImpact: { acquisition: '+16%', activation: '+6%', retention: '+4%', referral: '+28%', revenue: '+10%' },
            kpiDeltas: { viralCoef: '+0.06x', inviteToJoin: '+2pp', orgExpansion: '+2pp', effectiveCAC: '-$18' },
          },
        },
        {
          label: 'Invest in content marketing — case studies and templates from power users',
          shortDescription: 'Turn activated teams into advocates through shareable content',
          consequence: {
            title: 'Content builds brand — compounds over 6+ months',
            description: 'Publishing case studies, project templates, and workflow guides created by Relay\'s most engaged teams. 8 case studies and 14 templates in 60 days. Templates drive 380 new sign-ups/month — users who start from a template activate at 32% (vs 11% baseline) because the template gives them a project and structure immediately. But the content programme takes 90+ days to produce results and requires $6,800/month in content production. Viral coefficient lifts to 0.26x at 90 days, projected 0.38x at 180 days.',
            funnelImpact: { acquisition: '+8%', activation: '+18%', retention: '+6%', referral: '+22%', revenue: '+14%' },
            kpiDeltas: { viralCoef: '+0.04x', inviteToJoin: '+6pp', orgExpansion: '+3pp', effectiveCAC: '-$24' },
          },
        },
      ],
    },
  },

  // ─── STAGE 5: REVENUE ─────────────────────────────────────────────────────
  revenue: {
    brief: 'Relay\'s MRR is $184,000 growing 14% MoM. LTV:CAC is 1.8x — below the 3.0x target for a healthy SaaS business. EBITDA is -$42k/month. The pricing model is $29/seat/month with a freemium tier (3 users, 2 projects). 72% of paying teams are on the minimum plan (3 seats). Expansion revenue is 8% of MRR — well below the 25% benchmark. The business acquires teams but does not expand them.',

    kpis: [
      { label: 'MRR',                   value: '$184,000', delta: '+14% MoM',            sentiment: 'pos' },
      { label: 'Gross margin',           value: '78%',      delta: 'Target: 82%',         sentiment: 'neu' },
      { label: 'EBITDA',                 value: '-$42,000', delta: 'Cash negative',       sentiment: 'neg' },
      { label: 'LTV:CAC',               value: '1.8x',     delta: 'Target: 3.0x',        sentiment: 'neg' },
      { label: 'Expansion revenue %',   value: '8%',       delta: 'Benchmark: 25%',      sentiment: 'neg' },
    ],

    revenueBreakdown: [
      { source: 'New team subscriptions',   revenue: 58400,  pct: '32%', margin: '68%' },
      { source: 'Existing team renewals',   revenue: 96200,  pct: '52%', margin: '84%' },
      { source: 'Seat expansion',           revenue: 14700,  pct: '8%',  margin: '91%' },
      { source: 'Plan upgrades (Pro→Ent)',  revenue: 8200,   pct: '4%',  margin: '88%' },
      { source: 'Annual prepay',            revenue: 6500,   pct: '4%',  margin: '82%' },
    ],

    ltvcacTrend: {
      months: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
      ltvcac: [2.2, 2.1, 2.0, 1.9, 1.9, 1.8, 1.8, 1.8],
      target: 3.0,
    },

    dataSummary: 'MRR $184,000 growing 14% MoM. Gross margin 78% against 82% target — slightly below due to infrastructure costs from the large free user base (9,200 non-activated free users consuming resources). EBITDA -$42k/month — the business is growing revenue but CAC ($48) is only covered 1.8x by LTV ($86 blended). Expansion revenue is 8% of MRR vs 25% benchmark — the biggest revenue gap. 72% of paying teams stay at 3 seats (the minimum paid tier). Seat expansion revenue ($14,700/month) is growing only 4% MoM despite 14% overall MRR growth. Plan upgrade revenue is minimal at 4% — the Enterprise tier ($59/seat) is not differentiated enough. LTV:CAC has declined from 2.2x to 1.8x over 8 months as CAC has risen.',

    novaPrompt: 'Your expansion revenue is 8% of MRR against a 25% benchmark. 72% of paying teams stay at the minimum 3 seats. Before you choose a monetisation lever — what is the difference in LTV between a 3-seat team ($1,044/year) and a 10-seat team ($3,480/year), and what would it take to move the average team size from 3.4 seats to 5.2 seats?',

    decision: {
      question: 'Which monetisation lever should Relay prioritise to reach LTV:CAC of 3.0x?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Build seat expansion triggers — prompt teams to add members at natural moments',
          shortDescription: 'In-product prompts when teams hit capacity limits, assign tasks to non-members, or mention colleagues',
          consequence: {
            title: 'Seat expansion accelerates — NRR transforms',
            description: 'Building contextual expansion triggers: "Add Sarah to this project?" when a team member mentions @sarah in a comment; "Your team has 4 pending invites" dashboard notification; "Unlock unlimited projects by adding 2 more seats" when teams hit the 5-project limit. Average team size grows from 3.4 to 4.8 seats within 90 days. Expansion MRR lifts from $14,700 to $38,200/month. NRR jumps from 108% to 124%. LTV:CAC lifts from 1.8x to 2.6x. This is the highest-leverage monetisation fix because it increases revenue from users who already love the product — zero additional acquisition cost.',
            funnelImpact: { acquisition: '+4%', activation: '+8%', retention: '+6%', referral: '+22%', revenue: '+52%' },
            kpiDeltas: { ltvcac: '+0.8x', mrr: '+$23,500', ebitda: '+$21k', expansionPct: '+13pp' },
          },
        },
        {
          label: 'Differentiate the Enterprise tier — add SSO, audit logs, advanced permissions',
          shortDescription: 'The $59/seat Enterprise plan lacks the features that justify the price premium',
          consequence: {
            title: 'Enterprise upgrades accelerate — but the market is narrow',
            description: 'Adding SSO (SAML), audit logging, advanced role-based permissions, and a 99.9% SLA to the Enterprise tier. 18% of Pro teams with 5+ seats upgrade within 90 days — 42 teams. Average Enterprise deal: 8.2 seats at $59 = $484/month. Plan upgrade MRR grows from $8,200 to $28,500/month. But the engineering investment is significant: $86,000 in development cost over 12 weeks. LTV:CAC lifts to 2.2x. The Enterprise tier is now competitive but only 12% of Relay\'s base qualifies for it. The long tail of 3-seat teams is untouched.',
            funnelImpact: { acquisition: '+6%', activation: '0%', retention: '+8%', referral: '+12%', revenue: '+28%' },
            kpiDeltas: { ltvcac: '+0.4x', mrr: '+$20,300', ebitda: '+$14k', expansionPct: '+6pp' },
          },
        },
        {
          label: 'Introduce annual pricing with a 20% discount — improve cash flow and reduce churn',
          shortDescription: 'Annual prepay at $278/seat/year (vs $348 monthly) to lock in revenue and reduce churn',
          consequence: {
            title: 'Cash flow improves — churn drops, LTV extends',
            description: 'Launching annual pricing at $278/seat/year (20% discount vs monthly). Offering a migration incentive: first 30 days to switch. 28% of monthly subscribers convert to annual within 60 days. Gross churn drops from 5.2% to 3.8% monthly (annual customers churn 1.4%/month vs 5.2% for monthly). Cash collected upfront: $148,000 one-time boost. LTV extends from $86 to $104 blended due to lower churn. LTV:CAC lifts to 2.2x. But the 20% discount compresses near-term MRR by $11,200/month. Payback period improves from 8.4 months to 6.2 months.',
            funnelImpact: { acquisition: '0%', activation: '0%', retention: '+26%', referral: '+4%', revenue: '+12%' },
            kpiDeltas: { ltvcac: '+0.4x', mrr: '-$11,200', ebitda: '+$8k', expansionPct: '+0pp' },
          },
        },
        {
          label: 'Cut the free plan — convert freemium to a 14-day free trial',
          shortDescription: 'Stop subsidising 9,200 non-paying users who consume infrastructure and never convert',
          consequence: {
            title: 'Free users churn — conversion rate lifts, volume drops',
            description: 'Replacing the freemium plan with a 14-day free trial. Non-activated free users (9,200) are sunset with 30 days notice. Infrastructure costs drop $14,800/month immediately. But sign-ups fall 34% — the free plan was driving top-of-funnel volume even if most users never activated. Trial-to-paid conversion is 22% (vs 11% activation rate) because the trial deadline creates urgency. Net new paying teams: similar to before. LTV:CAC lifts to 2.1x primarily from cost reduction, not revenue growth. Risk: PLG loop weakens because free users generated 18% of teammate invites.',
            funnelImpact: { acquisition: '-34%', activation: '+42%', retention: '+4%', referral: '-22%', revenue: '+8%' },
            kpiDeltas: { ltvcac: '+0.3x', mrr: '+$4,200', ebitda: '+$16k', expansionPct: '+2pp' },
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

export const RELAY_NOVA_PROMPTS = {
  acquisition: {
    entry: 'Your cheapest channel (HN/Reddit at $18 CAC) has a 0.9x ROAS and your most expensive channel (LinkedIn at $72 CAC) has a 2.2x ROAS. Before you touch the sliders — why is the cheapest channel the least profitable, and what does that tell you about whether CAC is the right metric to optimise for?',
    decision: 'You\'ve set your allocation. Before you lock in — what is the activation rate for the user profile your chosen strategy will attract, and how does that change the effective CAC per activated user?',
    postConsequence: 'Your acquisition decision changed the sign-up profile. How does the new ratio of solo devs to team leads affect the activation rate downstream, and what does that mean for how much each activated user actually costs you?',
  },
  activation: {
    entry: 'Your onboarding is 7 steps and the teammate invite is step 6. Users who invite a teammate within 24 hours activate at 4x the rate of those who wait. Before you rank your hypotheses — is the activation problem caused by the wrong users signing up, or the right users hitting a broken onboarding flow?',
    decision: 'You\'ve ranked your hypotheses. What specific data point from the funnel most strongly supports your top-ranked hypothesis, and what would you expect to see if you were wrong?',
    postConsequence: 'Your activation rate changed. If the new rate holds, how many additional paying teams does Relay generate per month, and how does that affect MRR trajectory?',
  },
  retention: {
    entry: 'Your activated teams retain at 96% M1 and your non-activated users retain at 4% M1. Before you choose a retention lever — should you invest in reducing churn among non-activated users, or should you invest in getting more users through the activation gate in the first place?',
    decision: 'You\'ve chosen your retention lever. Walk through the maths: if this intervention works as projected, what will the new blended M1 retention be, and how many additional users remain active at 90 days?',
    postConsequence: 'Your retention metric shifted. But did it shift because you improved retention for existing segments or because you changed the mix of segments? What is the difference, and which one is more sustainable?',
  },
  referral: {
    entry: 'Your NPS is 62 and your Promoter share is 52% — both above benchmark. Yet your viral coefficient is 0.22x against a 0.6x benchmark. Before you choose a referral lever — if the problem is not user satisfaction, what is it? What specific data point tells you where the referral loop is breaking?',
    decision: 'You\'ve chosen your referral strategy. If the viral coefficient lifts to your projected level, calculate the new organic sign-up volume and the resulting reduction in paid acquisition spend needed to maintain growth.',
    postConsequence: 'Your viral coefficient changed. Recalculate: at the new coefficient, how many of Relay\'s 12,000 monthly sign-ups could come from organic referrals, and what does that do to blended CAC?',
  },
  revenue: {
    entry: 'Your expansion revenue is 8% of MRR against a 25% benchmark. 72% of paying teams stay at the minimum 3 seats. Before you choose a monetisation lever — what is the difference in LTV between a 3-seat team ($1,044/year) and a 10-seat team ($3,480/year), and what would it take to move the average team size from 3.4 seats to 5.2 seats?',
    decision: 'You\'ve chosen your monetisation lever. Walk through the maths: if it performs as projected, what will the new monthly EBITDA be, and how many months until Relay reaches cash-flow breakeven?',
    postConsequence: 'You\'ve made all five AARRR decisions. Looking back — which single intervention had the biggest impact on LTV:CAC? Was the core problem ever really about acquisition volume, or was it about activation quality? What would you tell Relay\'s board?',
  },
};
