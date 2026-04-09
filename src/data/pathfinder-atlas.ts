// ─────────────────────────────────────────────────────────────────────────────
// PATHFINDER — Atlas Archetype (EdTech Cohort-Based Course Platform)
// Full AARRR data spec: 5 stages × 1 decision × 4 options × consequence objects
// ─────────────────────────────────────────────────────────────────────────────

export const ATLAS_ARCHETYPE = {
  id: 'atlas',
  name: 'Atlas',
  type: 'EdTech Cohort-Based',
  tagline: 'Cohort-based professional courses. 18 months live. Waitlist demand is strong, but the completion cliff is killing growth.',
  description: 'Atlas runs premium cohort-based professional courses. The flagship "Growth Marketing Masterclass" is an 8-week programme at $499 with a waitlist of 2,400. Monthly revenue is $86k. The core problem: only 31% of enrolled students complete the course. Completers get promoted or receive a raise within 6 months at 3x the rate of non-completers, and their NPS is 82. Non-completers actively discourage others (NPS 18). The drop-off cliff hits at Week 3 of 8. No recurring revenue — each sale is one-time.',
  color: '#F59E0B',

  // ─── FUNNEL HEALTH SNAPSHOT ───────────────────────────────────────────────
  // Shown at top of every stage as the animated funnel bar
  funnelHealth: {
    acquisition: { value: 2400,  label: 'Waitlist size',       benchmark: 1200, unit: 'people',  sentiment: 'pos' },
    activation:  { value: 68,    label: 'Enrollment rate',     benchmark: 74,   unit: '%',       sentiment: 'neu' },
    retention:   { value: 31,    label: 'Completion rate',     benchmark: 65,   unit: '%',       sentiment: 'neg' },
    referral:    { value: 0.22,  label: 'Viral coefficient',   benchmark: 0.6,  unit: 'x',       sentiment: 'neg' },
    revenue:     { value: 1.8,   label: 'LTV:CAC',             benchmark: 3.0,  unit: 'x',       sentiment: 'neg' },
  },

  // ─── STAGE 1: ACQUISITION ─────────────────────────────────────────────────
  acquisition: {
    brief: 'Atlas spends $14,200/month on acquisition and has a waitlist of 2,400 — demand is not the problem. The challenge is that the waitlist converts at different rates depending on the source, and not all sources produce students who actually complete the course. You have $14,200 to reallocate across channels.',

    kpis: [
      { label: 'Waitlist size',         value: '2,400',  delta: 'Growing +180/mo',     sentiment: 'pos' },
      { label: 'Blended CAC',           value: '$128',   delta: 'Benchmark: $95',      sentiment: 'neg' },
      { label: 'Waitlist → enrolled',   value: '68%',    delta: 'Benchmark: 74%',      sentiment: 'neu' },
      { label: 'Alumni referral share', value: '11%',    delta: 'Benchmark: 30%',      sentiment: 'neg' },
      { label: 'Content marketing leads', value: '340/mo', delta: '+12% MoM',          sentiment: 'pos' },
    ],

    channels: [
      { name: 'Paid Ads (Meta + LinkedIn)', spend: 7200,  sessions: 4800,  cac: '$168', roas: '1.2x', signal: 'neg' },
      { name: 'Content Marketing',          spend: 2800,  sessions: 3200,  cac: '$42',  roas: '3.8x', signal: 'pos' },
      { name: 'Alumni Referral',            spend: 1200,  sessions: 820,   cac: '$28',  roas: '5.6x', signal: 'pos' },
      { name: 'Webinar Funnel',             spend: 2000,  sessions: 1600,  cac: '$62',  roas: '2.6x', signal: 'pos' },
      { name: 'Organic / SEO',              spend: 1000,  sessions: 1480,  cac: '$8',   roas: '—',    signal: 'pos' },
    ],

    dataSummary: 'Waitlist of 2,400 — demand exceeds supply (max 60 students per cohort, 3 cohorts/month = 180 seats). Blended CAC $128 vs $95 benchmark. Paid ads consume 51% of budget at 1.2x ROAS — below the 1.6x breakeven for a $499 one-time purchase with $4,200 fixed instructor cost per cohort. Alumni referral has the best unit economics ($28 CAC, 5.6x ROAS) but represents only 11% of acquisition vs 30% benchmark. Content marketing is strong at $42 CAC and 3.8x ROAS but is underfunded. The hidden problem: paid ad students complete the course at 22% vs 41% for alumni-referred students — acquisition source predicts completion.',

    novaPrompt: 'Your paid ads deliver students at $168 CAC who complete at 22%. Your alumni referrals deliver students at $28 CAC who complete at 41%. Before you touch the sliders — what is the true cost of a "completer" from each channel, and what does that tell you about where to invest?',

    decision: {
      question: 'How should Atlas reallocate its $14,200 monthly acquisition budget?',
      mechanic: 'sliders',
      totalBudget: 14200,
      currency: '$',
      threshold: 0.35,
      spreadThinIdx: 3,
      options: [
        {
          label: 'Scale paid ads — fill cohorts faster with LinkedIn and Meta',
          shortDescription: 'Increase paid spend to shorten waitlist conversion time',
          consequence: {
            title: 'Cohorts fill faster — completion rate drops further',
            description: 'Paid ads scale to fill cohorts in 8 days instead of 14. But paid-sourced students complete at 22% — well below the 31% blended average. Completion rate drops to 26%. Non-completer word-of-mouth accelerates. NPS among non-completers is 18 — every additional non-completer generates negative referrals. Waitlist grows 15% but the quality of the waitlist degrades.',
            funnelImpact: { acquisition: '+22%', activation: '-4%', retention: '-16%', referral: '-12%', revenue: '+6%' },
            kpiDeltas: { waitlist: '+360', cac: '+$22', completionRate: '-5pp', ltvcac: '-0.3x' },
          },
        },
        {
          label: 'Invest in content marketing — build authority and attract intent-driven students',
          shortDescription: 'Fund blog, podcast, and free resources to attract high-intent leads',
          consequence: {
            title: 'Higher-intent students — completion rate stabilises',
            description: 'Shifting $3,000 from paid ads to content marketing. Content-sourced leads take longer to convert (28 days vs 12 days for paid) but complete at 38%. Blended CAC falls from $128 to $94. Waitlist growth slows by 8% in the short term but quality improves. Over 90 days, content compounds: organic traffic grows 32% and blended completion rate lifts from 31% to 34%.',
            funnelImpact: { acquisition: '-8%', activation: '+6%', retention: '+10%', referral: '+14%', revenue: '+8%' },
            kpiDeltas: { waitlist: '-60', cac: '-$34', completionRate: '+3pp', ltvcac: '+0.4x' },
          },
        },
        {
          label: 'Double down on alumni referral — give completers tools and incentives to refer',
          shortDescription: 'Invest in the highest-ROAS channel with the best completion correlation',
          consequence: {
            title: 'Referral scales — but only as fast as completion allows',
            description: 'Increasing alumni referral budget from $1,200 to $3,600. Referral share grows from 11% to 19%. Alumni-referred students complete at 41% and have NPS 74 post-completion. But the referral pool is constrained — only 31% of students complete, and only completers refer. With 56 completers/month, even at 34% referral participation, that is 19 referrals/month. The channel is excellent but structurally capped by the completion problem.',
            funnelImpact: { acquisition: '+4%', activation: '+8%', retention: '+6%', referral: '+32%', revenue: '+12%' },
            kpiDeltas: { waitlist: '+80', cac: '-$18', completionRate: '+2pp', ltvcac: '+0.3x' },
          },
        },
        {
          label: 'Spread budget evenly across all five channels',
          shortDescription: 'Diversify to reduce risk across all acquisition sources',
          consequence: {
            title: 'Diluted execution — no channel reaches critical mass',
            description: 'Equal allocation of $2,840 per channel. Paid ads lose algorithmic momentum at reduced spend. Content marketing cannot produce at scale with reduced budget. Alumni referral programme gets more budget than needed for its current small pool. Webinar funnel is adequately funded but unchanged. Blended CAC stays at $128 with no improvement. Each channel underperforms its potential.',
            funnelImpact: { acquisition: '+1%', activation: '0%', retention: '0%', referral: '+2%', revenue: '+1%' },
            kpiDeltas: { waitlist: '+30', cac: '+$2', completionRate: '0pp', ltvcac: '-0.1x' },
          },
        },
      ],
    },
  },

  // ─── STAGE 2: ACTIVATION ──────────────────────────────────────────────────
  activation: {
    brief: 'Activation for Atlas is the journey from waitlist to completing Week 1 — the commitment point. 68% of waitlisted students enrol when offered a seat, but only 74% of enrolled students complete Week 1. That means only 50% of the waitlist becomes an "activated" student. The Week 1 drop-off is the first signal of the completion cliff to come.',

    kpis: [
      { label: 'Waitlist → enrolled',     value: '68%',    delta: 'Benchmark: 74%',       sentiment: 'neu' },
      { label: 'Enrolled → Week 1 done',  value: '74%',    delta: 'Benchmark: 88%',       sentiment: 'neg' },
      { label: 'Full activation rate',     value: '50%',    delta: 'Benchmark: 65%',       sentiment: 'neg' },
      { label: 'Time to first login',      value: '3.8 days', delta: 'Benchmark: 0.5 days', sentiment: 'neg' },
      { label: 'Week 1 assignment submit', value: '61%',    delta: 'Benchmark: 82%',       sentiment: 'neg' },
    ],

    funnel: [
      { stage: 'Waitlist offered seat',   value: 180 },
      { stage: 'Enrolled (paid)',         value: 122 },
      { stage: 'First login',            value: 104 },
      { stage: 'Week 1 content started', value: 96  },
      { stage: 'Week 1 completed',       value: 90  },
    ],

    bySource: [
      { source: 'Paid Ads',         cvr: '62%', timeToConvert: '4.8 days', pdpToCart: '54%' },
      { source: 'Content Marketing', cvr: '71%', timeToConvert: '1.2 days', pdpToCart: '78%' },
      { source: 'Alumni Referral',   cvr: '84%', timeToConvert: '0.4 days', pdpToCart: '88%' },
      { source: 'Webinar Funnel',    cvr: '76%', timeToConvert: '0.8 days', pdpToCart: '82%' },
      { source: 'Organic',           cvr: '73%', timeToConvert: '1.6 days', pdpToCart: '76%' },
    ],

    dataSummary: 'Full activation rate (waitlist to Week 1 complete) is 50% vs 65% benchmark. The critical metric is time to first login: 3.8 days vs 0.5 days benchmark. Students who log in within 24 hours of enrolment complete Week 1 at 91%. Students who wait 3+ days complete Week 1 at 48%. The enrolment-to-login gap is the activation killer. By source: alumni-referred students log in within 0.4 days and activate at 88%. Paid ad students take 4.8 days and activate at 54%. Week 1 assignment submission is 61% — students who submit the Week 1 assignment complete the full course at 52% vs 18% for those who skip it.',

    novaPrompt: 'Students who log in within 24 hours complete Week 1 at 91%. Students who wait 3+ days complete at 48%. Before you rank your hypotheses — is the activation problem about the product experience after enrolment, or about student intent at the moment of purchase?',

    decision: {
      question: 'What is the primary reason Atlas loses 26% of enrolled students before Week 1 completion?',
      mechanic: 'ranking',
      options: [
        {
          label: 'No onboarding sequence — students enrol and receive no guidance until Day 1 of cohort',
          shortDescription: 'The gap between payment and cohort start creates disengagement',
          consequence: {
            title: 'Onboarding sequence closes the activation gap',
            description: 'Building a 5-touchpoint pre-cohort sequence: welcome video within 1 hour of payment, platform walkthrough on Day 1, peer introduction thread on Day 2, prep assignment on Day 3, live orientation call on Day 4. Time to first login drops from 3.8 days to 0.6 days. Week 1 completion lifts from 74% to 86%. Full activation rate reaches 59%. The diagnosis was correct — the product was silent during the highest-intent window.',
            funnelImpact: { acquisition: '0%', activation: '+36%', retention: '+18%', referral: '+10%', revenue: '+14%' },
            kpiDeltas: { activationRate: '+9pp', timeToLogin: '-3.2 days', week1Complete: '+12pp', completionRate: '+6pp' },
          },
        },
        {
          label: 'Week 1 content is too theoretical — no quick wins, no immediate value delivery',
          shortDescription: 'Students do not experience the value of the course fast enough',
          consequence: {
            title: 'Week 1 redesigned — moderate activation improvement',
            description: 'Restructuring Week 1 to deliver a concrete quick win: students create a real growth experiment by end of Week 1 instead of covering theory. Assignment submission rate lifts from 61% to 72%. Week 1 completion improves from 74% to 80%. Meaningful improvement, but the time-to-login problem was not addressed — students who never log in do not benefit from better content.',
            funnelImpact: { acquisition: '0%', activation: '+16%', retention: '+12%', referral: '+6%', revenue: '+8%' },
            kpiDeltas: { activationRate: '+5pp', timeToLogin: '-0.4 days', week1Complete: '+6pp', completionRate: '+4pp' },
          },
        },
        {
          label: 'Price friction — $499 causes buyer remorse, students reconsider before starting',
          shortDescription: 'High price creates a post-purchase anxiety window',
          consequence: {
            title: 'Payment plan reduces friction — activation lifts modestly',
            description: 'Introducing a 3-instalment option ($179 x 3). 42% of new students choose instalments. Refund requests drop from 8% to 4%. Week 1 completion improves from 74% to 78%. But the core activation gap — 3.8 days to first login — only drops to 3.1 days. Price friction was a secondary factor, not the primary cause. Students on instalments complete the course at similar rates to full-pay students.',
            funnelImpact: { acquisition: '+6%', activation: '+11%', retention: '+4%', referral: '+2%', revenue: '+2%' },
            kpiDeltas: { activationRate: '+4pp', timeToLogin: '-0.7 days', week1Complete: '+4pp', completionRate: '+2pp' },
          },
        },
        {
          label: 'Cohort timing mismatch — students enrol weeks before their cohort starts and lose momentum',
          shortDescription: 'The wait between payment and cohort start kills engagement',
          consequence: {
            title: 'Shorter wait window improves activation — but constrains capacity',
            description: 'Reducing the maximum wait between payment and cohort start from 21 days to 7 days. Students who start within 7 days activate at 82% vs 64% for those who wait 14+ days. But shorter windows mean smaller cohort sizes (average drops from 48 to 36) and higher instructor cost per student ($117 vs $88). Activation improves but economics worsen. The real fix needed both timing and an onboarding sequence to fill the gap.',
            funnelImpact: { acquisition: '-12%', activation: '+22%', retention: '+8%', referral: '+4%', revenue: '-6%' },
            kpiDeltas: { activationRate: '+6pp', timeToLogin: '-1.6 days', week1Complete: '+8pp', completionRate: '+3pp' },
          },
        },
      ],
    },
  },

  // ─── STAGE 3: RETENTION ───────────────────────────────────────────────────
  retention: {
    brief: 'Atlas\'s overall course completion rate is 31% — only 31 of every 100 enrolled students finish the 8-week programme. The benchmark for premium cohort courses is 65%. The drop-off is not gradual — there is a cliff at Week 3. Week 1 to Week 2 retention is 88%. Week 2 to Week 3 is 82%. But Week 3 to Week 4 plummets to 51%. Students who survive Week 4 complete at 89%. The Week 3 cliff is the single biggest constraint on the business.',

    kpis: [
      { label: 'Completion rate',        value: '31%',    delta: 'Benchmark: 65%',       sentiment: 'neg' },
      { label: 'Week 3→4 retention',     value: '51%',    delta: 'Benchmark: 84%',       sentiment: 'neg' },
      { label: 'Avg weeks completed',    value: '3.4',    delta: 'Benchmark: 6.8',       sentiment: 'neg' },
      { label: 'Completer NPS',          value: '82',     delta: 'Exceptional',           sentiment: 'pos' },
      { label: 'Non-completer NPS',      value: '18',     delta: 'Detractor territory',  sentiment: 'neg' },
    ],

    cohortMonths: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    m1: [34, 32, 30, 28, 31, 33, 30, 31],
    m2: [null, null, null, null, null, null, null, null],
    m3: [null, null, null, null, null, null, null, null],
    m4: [null, null, null, null, null, null, null, null],
    m5: [null, null, null, null, null, null, null, null],
    m6: [null, null, null, null, null, null, null, null],

    benchmarkM1: 65,

    segments: [
      { name: 'Week 1-2 completers only', count: 380,  m1: '0%',  ltv: '$499', churn: 'Week 3 cliff' },
      { name: 'Week 3-4 completers only', count: 142,  m1: '0%',  ltv: '$499', churn: 'Week 5 drop' },
      { name: 'Full completers',           count: 188,  m1: '0%',  ltv: '$499', churn: 'Completed' },
      { name: 'Never started',            count: 58,   m1: '0%',  ltv: '$499', churn: 'Week 0' },
    ],

    dataSummary: 'Completion rate 31% vs 65% benchmark. Week-over-week retention: W1→W2 88%, W2→W3 82%, W3→W4 51%, W4→W5 86%, W5→W6 91%, W6→W7 93%, W7→W8 96%. The cliff is isolated to Week 3. Week 3 content is "Growth Experimentation Frameworks" — the most technical module requiring students to design and run a live experiment. Students report feeling overwhelmed (62% of Week 3 dropouts cite "fell behind" and 28% cite "too complex"). Completers achieve career outcomes at 3x the rate of non-completers: 47% receive a promotion or raise within 6 months vs 16% of non-completers. Every student pays $499 regardless of completion — revenue per student is identical, but the downstream referral and brand impact diverge dramatically.',

    novaPrompt: 'Week 3 to Week 4 retention is 51% while every other weekly transition is above 82%. Before you choose a retention lever — is this a content design problem (Week 3 is too hard) or an engagement design problem (students lose momentum before Week 3 content even matters)?',

    decision: {
      question: 'Which retention lever should Atlas invest in to fix the Week 3 completion cliff?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Redesign Week 3 — break the technical module into scaffolded milestones with peer checkpoints',
          shortDescription: 'The content is the bottleneck — restructure it to reduce cognitive overload',
          consequence: {
            title: 'Week 3 redesigned — completion rate transforms',
            description: 'Breaking Week 3 into 4 micro-milestones (Mon/Tue/Thu/Fri) instead of one large assignment. Adding a peer review checkpoint at mid-week where students share work-in-progress. Adding a 20-minute live "office hours" on Wednesday. Week 3→4 retention lifts from 51% to 76%. Overall completion rate lifts from 31% to 48%. Completer NPS remains 82 and the completer pool nearly doubles — from 56 to 86 students/month. Non-completer NPS rises from 18 to 28 as fewer students feel "left behind."',
            funnelImpact: { acquisition: '+4%', activation: '0%', retention: '+55%', referral: '+42%', revenue: '+4%' },
            kpiDeltas: { completionRate: '+17pp', week3Retention: '+25pp', npsBlended: '+22', completersPerMonth: '+30' },
          },
        },
        {
          label: 'Add accountability partners — pair students for mutual commitment through Week 3',
          shortDescription: 'Peer accountability reduces the isolation that causes drop-off',
          consequence: {
            title: 'Accountability pairs help — meaningful but partial fix',
            description: 'Pairing students at Week 1 and requiring weekly check-ins. Pairs who both engage complete at 58%. But 34% of pairs have mismatched commitment levels — when one partner drops off, the other follows 72% of the time. Week 3→4 retention lifts from 51% to 64%. Overall completion rate improves from 31% to 39%. The intervention helps engaged students but does not address the content design problem that causes the initial stumble.',
            funnelImpact: { acquisition: '0%', activation: '+4%', retention: '+26%', referral: '+18%', revenue: '+2%' },
            kpiDeltas: { completionRate: '+8pp', week3Retention: '+13pp', npsBlended: '+11', completersPerMonth: '+14' },
          },
        },
        {
          label: 'Introduce a completion incentive — certificate, LinkedIn badge, and employer verification',
          shortDescription: 'Make the outcome of completion more tangible and career-relevant',
          consequence: {
            title: 'Incentive motivates — but does not remove the obstacle',
            description: 'Adding a verified digital certificate, LinkedIn skill badge, and employer-verifiable completion record. Students who are aware of the certificate complete at 36% vs 31% baseline. The incentive works best on students who were already close to completing — it does not help students who are overwhelmed by Week 3 content. Week 3→4 retention lifts from 51% to 56%. Overall completion rate reaches 35%. The carrot helps but the wall is still there.',
            funnelImpact: { acquisition: '+6%', activation: '+2%', retention: '+13%', referral: '+8%', revenue: '+2%' },
            kpiDeltas: { completionRate: '+4pp', week3Retention: '+5pp', npsBlended: '+6', completersPerMonth: '+7' },
          },
        },
        {
          label: 'Shorten the course — compress 8 weeks to 5 weeks by removing non-essential modules',
          shortDescription: 'Students drop off because the course is too long — make it shorter',
          consequence: {
            title: 'Shorter course increases completion — but dilutes the outcome',
            description: 'Compressing from 8 weeks to 5 weeks by cutting advanced modules (Weeks 6-8 content merged into Weeks 4-5). Completion rate lifts from 31% to 52%. But completer career outcomes decline — the 3x promotion/raise advantage drops to 1.8x because the advanced content was the differentiator. Completer NPS drops from 82 to 64. The completion rate improves but the product that made completers exceptional is diluted. Alumni referral quality degrades as the outcome story weakens.',
            funnelImpact: { acquisition: '-6%', activation: '+4%', retention: '+68%', referral: '-18%', revenue: '-4%' },
            kpiDeltas: { completionRate: '+21pp', week3Retention: '+18pp', npsBlended: '+8', completersPerMonth: '+38' },
          },
        },
      ],
    },
  },

  // ─── STAGE 4: REFERRAL ────────────────────────────────────────────────────
  referral: {
    brief: 'Atlas has a referral paradox: completers are exceptional promoters (NPS 82) who refer at high rates, while non-completers are active detractors (NPS 18) who discourage enrolment. With a 31% completion rate, the business generates roughly 2 detractors for every 1 promoter. The viral coefficient is 0.22 — but it is the net of strong positive referral from completers and active negative word-of-mouth from non-completers.',

    kpis: [
      { label: 'Completer NPS',           value: '82',     delta: 'Exceptional',          sentiment: 'pos' },
      { label: 'Non-completer NPS',        value: '18',     delta: 'Detractor territory',  sentiment: 'neg' },
      { label: 'Viral coefficient',        value: '0.22x',  delta: 'Benchmark: 0.6x',     sentiment: 'neg' },
      { label: 'Completer referral rate',  value: '34%',    delta: 'Benchmark: 28%',      sentiment: 'pos' },
      { label: 'Non-completer discouragement rate', value: '41%', delta: 'Active detraction', sentiment: 'neg' },
    ],

    npsDistribution: {
      promoters:  { pct: 24, count: 184 },
      passives:   { pct: 18, count: 138 },
      detractors: { pct: 58, count: 446 },
    },

    referralSources: [
      { source: 'Completer word of mouth',    newCustomers: 42,  pctOfTotal: '8.4%' },
      { source: 'Formal referral programme',  newCustomers: 18,  pctOfTotal: '3.6%' },
      { source: 'Social sharing (LinkedIn)',  newCustomers: 14,  pctOfTotal: '2.8%' },
    ],

    dataSummary: 'Viral coefficient 0.22x — for every 100 students, Atlas generates 22 new students through referral. Benchmark is 60. The paradox: completers refer at 34% (above the 28% benchmark), but only 31% of students complete. Non-completers actively discourage at 41% — meaning roughly 283 students/month are telling colleagues not to enrol. NPS distribution: 24% Promoters (almost entirely completers), 18% Passives, 58% Detractors (almost entirely non-completers). The referral programme exists but only 3.6% of total acquisition comes through it. Investing in referral before fixing completion will amplify negative word-of-mouth — the detractor base is 2.4x larger than the promoter base.',

    novaPrompt: 'Your completers refer at 34% — above benchmark. Your non-completers discourage at 41%. You have 184 promoters and 446 detractors. Before you choose a referral strategy — if you invest in amplifying referral without first fixing completion, what happens to the ratio of positive to negative word-of-mouth?',

    decision: {
      question: 'What is the highest-leverage referral investment for Atlas right now?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Fix completion first — referral is downstream of the product problem',
          shortDescription: 'Reduce detractors by fixing the Week 3 cliff before investing in referral mechanics',
          consequence: {
            title: 'Completion drives referral — the flywheel starts spinning',
            description: 'Investing in completion (Week 3 redesign from the retention stage) lifts completion from 31% to 48%. Detractor share drops from 58% to 36%. Promoter share rises from 24% to 39%. The viral coefficient lifts from 0.22 to 0.41 — nearly doubling — without any referral programme investment. The promoter-to-detractor ratio flips from 1:2.4 to 1:0.9. More critically, the negative word-of-mouth drag on acquisition decreases, lowering blended CAC by $18.',
            funnelImpact: { acquisition: '+22%', activation: '+4%', retention: '+55%', referral: '+86%', revenue: '+28%' },
            kpiDeltas: { viralCoef: '+0.19x', npsBlended: '+26', detractorShare: '-22pp', cac: '-$18' },
          },
        },
        {
          label: 'Build an alumni ambassador programme — give completers tools and status to refer',
          shortDescription: 'Focus on the 184 promoters and give them frictionless sharing',
          consequence: {
            title: 'Ambassador programme works — but the ceiling is low',
            description: 'Creating an "Atlas Alumni" badge, LinkedIn content templates, and a referral bonus ($50 credit toward future courses). Completer referral rate lifts from 34% to 48%. Net new referrals increase from 42 to 62/month. Viral coefficient lifts from 0.22 to 0.31. But the programme is structurally capped: 56 completers/month x 48% referral = 27 referrals from the new cohort. Meanwhile, 126 non-completers/month are still discouraging at 41% — the negative word-of-mouth remains dominant.',
            funnelImpact: { acquisition: '+10%', activation: '+6%', retention: '0%', referral: '+38%', revenue: '+10%' },
            kpiDeltas: { viralCoef: '+0.09x', npsBlended: '+4', detractorShare: '-2pp', cac: '-$8' },
          },
        },
        {
          label: 'Launch a non-completer recovery campaign — turn detractors into neutrals',
          shortDescription: 'Offer non-completers a free re-enrolment or partial course access',
          consequence: {
            title: 'Recovery softens detraction — does not create promotion',
            description: 'Offering non-completers a free re-enrolment in the next cohort. 14% of non-completers take the offer (72 students). Of those, 38% complete on the second attempt. NPS among recovered students lifts from 18 to 52. Detractor share drops from 58% to 49%. But the cost is significant: 72 free seats/month at $88 instructor cost per student = $6,336 in added instructor expense. Viral coefficient lifts modestly to 0.28. The intervention treats the symptom (detraction) rather than the cause (Week 3 cliff).',
            funnelImpact: { acquisition: '+6%', activation: '+2%', retention: '+8%', referral: '+22%', revenue: '-8%' },
            kpiDeltas: { viralCoef: '+0.06x', npsBlended: '+12', detractorShare: '-9pp', cac: '-$4' },
          },
        },
        {
          label: 'Invest in LinkedIn social proof — showcase completer outcomes publicly',
          shortDescription: 'Use career outcome data (3x promotion rate) to overcome negative word-of-mouth',
          consequence: {
            title: 'Social proof generates leads — does not fix the referral engine',
            description: 'Publishing case studies of the 47% of completers who received promotions or raises. LinkedIn content featuring alumni outcomes. Paid promotion of testimonials. Waitlist grows 12%. But this is acquisition marketing, not referral — it does not change the viral coefficient or NPS distribution. New students attracted by outcome stories have higher expectations and are more disappointed when they do not complete — non-completer NPS drops from 18 to 14. The strategy works as an ad, not as a referral flywheel.',
            funnelImpact: { acquisition: '+12%', activation: '-2%', retention: '-4%', referral: '+6%', revenue: '+4%' },
            kpiDeltas: { viralCoef: '+0.02x', npsBlended: '-3', detractorShare: '+2pp', cac: '-$6' },
          },
        },
      ],
    },
  },

  // ─── STAGE 5: REVENUE ─────────────────────────────────────────────────────
  revenue: {
    brief: 'Atlas generates $86k/month from cohort enrolments at $499 per student. EBITDA is +$12k/month but growth is slowing as negative word-of-mouth from non-completers spreads. Instructor cost is fixed at $4,200 per cohort (max 60 students). There is no recurring revenue — each sale is one-time. Students who complete achieve 3x career outcomes but Atlas captures none of that downstream value. The business model is structurally fragile: it depends on continuously acquiring new $499 customers with no revenue from existing ones.',

    kpis: [
      { label: 'Monthly revenue',      value: '$86,000',  delta: 'Growth slowing',           sentiment: 'neu' },
      { label: 'Gross margin',         value: '61%',      delta: 'Target: 72%',              sentiment: 'neg' },
      { label: 'EBITDA',               value: '+$12,000', delta: 'Positive but thin',         sentiment: 'neu' },
      { label: 'LTV:CAC',              value: '1.8x',     delta: 'Target: 3.0x',             sentiment: 'neg' },
      { label: 'Revenue per completer', value: '$499',    delta: 'Same as non-completer',    sentiment: 'neg' },
    ],

    revenueBreakdown: [
      { source: 'Flagship course (Growth Marketing)', revenue: 72400, pct: '84%', margin: '62%' },
      { source: 'Workshop add-ons',                    revenue: 6200,  pct: '7%',  margin: '78%' },
      { source: 'Corporate cohorts',                   revenue: 5800,  pct: '7%',  margin: '54%' },
      { source: 'Alumni events / community',           revenue: 1600,  pct: '2%',  margin: '82%' },
    ],

    ltvcacTrend: {
      months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
      ltvcac: [2.4, 2.2, 2.1, 1.9, 1.8, 1.8, 1.8, 1.8],
      target: 3.0,
    },

    dataSummary: 'Monthly revenue $86,000 with EBITDA of $12,000. LTV:CAC is 1.8x and declining — it was 2.4x six months ago as non-completer word-of-mouth has increased blended CAC. Instructor cost is $4,200/cohort with max 60 students, meaning the cost per student is $70-88 depending on cohort fill rate (average 48 students/cohort). Gross margin is 61% vs 72% target. Revenue is 84% concentrated on the single flagship course — no second product. Revenue per completer ($499) equals revenue per non-completer ($499) despite completers generating 3x the downstream value. There is no recurring revenue mechanism. If growth stalls due to negative word-of-mouth, EBITDA turns negative within 3 months at current cost structure.',

    novaPrompt: 'Your completers generate 3x career outcomes and have NPS 82, but they pay the same $499 as non-completers who have NPS 18. You have no recurring revenue. Before you choose a monetisation lever — what is the lifetime value of a completer including their referral contribution, and how does that compare to a non-completer who actively discourages enrolment?',

    decision: {
      question: 'Which monetisation lever should Atlas prioritise to reach LTV:CAC of 3.0x and build recurring revenue?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Launch a second course — "Advanced Growth Strategy" for completers at $699',
          shortDescription: 'Monetise the completer relationship with an advanced offering',
          consequence: {
            title: 'Second course creates LTV expansion — the model shifts',
            description: 'Launching a 6-week advanced course exclusively for completers at $699. 38% of completers enrol (21 students/month from the current 56 completers). Revenue adds $14,700/month. Instructor cost is $3,400 per advanced cohort. The advanced course completers achieve even stronger career outcomes — and their NPS is 88. Blended LTV per student rises from $499 to $632 for completers. LTV:CAC lifts from 1.8x to 2.4x. More importantly, this creates a revenue incentive to fix completion — every additional completer is now worth $499 + (38% x $699) = $765.',
            funnelImpact: { acquisition: '+8%', activation: '+4%', retention: '+6%', referral: '+22%', revenue: '+34%' },
            kpiDeltas: { ltvcac: '+0.6x', ltv: '+$133', ebitda: '+$9.8k', grossMargin: '+3pp' },
          },
        },
        {
          label: 'Launch a membership — $49/month alumni community with ongoing content and networking',
          shortDescription: 'Build recurring revenue from the completer base',
          consequence: {
            title: 'Membership creates recurring revenue — small but compounding',
            description: 'Launching an "Atlas Network" membership at $49/month for course completers. 28% of completers subscribe (16 students/month joining). Churn is 6%/month. After 12 months, membership base projects to 148 active members generating $7,252/month in recurring revenue. Gross margin on membership is 88% (content is community-driven). LTV per completer rises from $499 to $499 + ($49 x 8.2 average months) = $901. LTV:CAC lifts to 2.6x. The recurring revenue stabilises the business model but takes 6+ months to reach meaningful scale.',
            funnelImpact: { acquisition: '+4%', activation: '0%', retention: '+12%', referral: '+28%', revenue: '+18%' },
            kpiDeltas: { ltvcac: '+0.8x', ltv: '+$402', ebitda: '+$6.4k', grossMargin: '+4pp' },
          },
        },
        {
          label: 'Raise the price to $749 — the waitlist of 2,400 proves demand exceeds supply',
          shortDescription: 'Price reflects the premium outcome — test demand elasticity',
          consequence: {
            title: 'Price increase holds — revenue per student jumps, volume dips slightly',
            description: 'Raising the flagship price from $499 to $749 (50% increase). Waitlist conversion drops from 68% to 58% — moderate elasticity. Net enrolments drop from 122 to 104/month. But revenue per student increases by $250. Monthly revenue lifts from $86k to $96k. Gross margin improves from 61% to 71% as instructor cost is unchanged. LTV:CAC lifts from 1.8x to 2.6x purely from margin improvement. However, higher price raises student expectations — non-completer dissatisfaction intensifies, NPS drops from 18 to 12. The price increase works financially but amplifies the completion problem culturally.',
            funnelImpact: { acquisition: '-15%', activation: '-6%', retention: '-4%', referral: '-8%', revenue: '+22%' },
            kpiDeltas: { ltvcac: '+0.8x', ltv: '+$250', ebitda: '+$14k', grossMargin: '+10pp' },
          },
        },
        {
          label: 'Add corporate B2B packages — sell team enrolments at $2,400 for cohorts of 5',
          shortDescription: 'B2B revenue with higher ACV and lower acquisition cost',
          consequence: {
            title: 'Corporate revenue diversifies — but completion drops further',
            description: 'Launching corporate packages at $2,400 for 5-seat cohorts ($480/seat). 6 corporate cohorts sold in the first quarter — $14,400/month in new revenue. Corporate teams fill seats but individual motivation is lower — completion rate for corporate students is 24% vs 31% for individual enrolments. Corporate students who are "sent" by their employer lack the intrinsic motivation of those who paid personally. LTV:CAC lifts to 2.2x (corporate CAC is $340 per 5-seat deal = $68/student). Revenue diversifies but the completion problem worsens for the corporate segment, creating a new detractor pool.',
            funnelImpact: { acquisition: '+14%', activation: '-2%', retention: '-8%', referral: '-4%', revenue: '+26%' },
            kpiDeltas: { ltvcac: '+0.4x', ltv: '+$48', ebitda: '+$8.2k', grossMargin: '-2pp' },
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

export const ATLAS_NOVA_PROMPTS = {
  acquisition: {
    entry: 'Your paid ads deliver students at $168 CAC who complete at 22%. Your alumni referrals deliver students at $28 CAC who complete at 41%. Before you touch the sliders — what is the true cost of a "completer" from each channel, and what does that tell you about where to invest?',
    decision: 'You\'ve set your allocation. Before you lock in — which single data point in the channels table most strongly justifies your chosen strategy? Can you calculate the cost per completer for your highest-funded channel?',
    postConsequence: 'Your acquisition decision changed the CAC and the mix of student sources. How does the new source mix affect the expected completion rate, and what does that mean for the referral stage downstream?',
  },
  activation: {
    entry: 'Students who log in within 24 hours complete Week 1 at 91%. Students who wait 3+ days complete at 48%. Before you rank your hypotheses — is the activation problem about the product experience after enrolment, or about student intent at the moment of purchase?',
    decision: 'You\'ve ranked your hypotheses. What specific number from the funnel data most strongly supports your top hypothesis? Walk through the math from enrolled to Week 1 complete.',
    postConsequence: 'Your activation rate changed. If you now activate X% of enrolled students, how many more students enter the Week 3 cliff — and does that make the retention stage more or less urgent?',
  },
  retention: {
    entry: 'Week 3 to Week 4 retention is 51% while every other weekly transition is above 82%. Before you choose a retention lever — is this a content design problem (Week 3 is too hard) or an engagement design problem (students lose momentum before Week 3 content even matters)?',
    decision: 'You\'ve chosen your retention lever. If completion rate lifts from 31% to your projected level, how many additional completers per month does that create — and what does each additional completer mean for the referral flywheel?',
    postConsequence: 'Your completion rate changed. Calculate the new promoter-to-detractor ratio. At the new completion rate, does investing in referral become viable — or does the detractor base still dominate?',
  },
  referral: {
    entry: 'Your completers refer at 34% — above benchmark. Your non-completers discourage at 41%. You have 184 promoters and 446 detractors. Before you choose a referral strategy — if you invest in amplifying referral without first fixing completion, what happens to the ratio of positive to negative word-of-mouth?',
    decision: 'You\'ve chosen your referral strategy. If the viral coefficient lifts to your projected level, by how much does your monthly paid acquisition spend need to fall to maintain the same enrolment volume — and is that saving enough to offset EBITDA pressure?',
    postConsequence: 'Your viral coefficient changed and the promoter-to-detractor ratio shifted. Recalculate your blended CAC including the new organic share. How does this change the LTV:CAC ratio relative to what you\'ve built so far across all stages?',
  },
  revenue: {
    entry: 'Your completers generate 3x career outcomes and have NPS 82, but they pay the same $499 as non-completers who have NPS 18. You have no recurring revenue. Before you choose a monetisation lever — what is the lifetime value of a completer including their referral contribution, and how does that compare to a non-completer who actively discourages enrolment?',
    decision: 'You\'ve chosen your monetisation lever. Walk through the maths: if it performs as projected, what will the new monthly EBITDA be — and does it create a structural incentive to fix completion?',
    postConsequence: 'You\'ve made all five AARRR decisions. Which single intervention had the biggest impact on LTV:CAC, and why? Looking back — if you had fixed the completion cliff first, how would your referral and revenue decisions have been different?',
  },
};
