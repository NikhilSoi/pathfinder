// ─────────────────────────────────────────────────────────────────────────────
// PATHFINDER — Cosmo Archetype (Consumer Mobile Fitness App)
// Full AARRR data spec: 5 stages × 1 decision × 4 options × consequence objects
// ─────────────────────────────────────────────────────────────────────────────

export const COSMO_ARCHETYPE = {
  id: 'cosmo',
  name: 'Cosmo',
  type: 'Mobile Fitness App',
  tagline: 'Consumer fitness app. 14 months live. Downloads growing, but users vanish after day one.',
  description: 'Cosmo is a freemium mobile fitness app on iOS and Android. Ad-supported free tier plus a $14.99/month premium subscription. 220k downloads/month with 840k total installs — but only 38k MAU. Day-1 retention is 24% and day-7 is 8%. Users who complete their first workout within 24 hours retain at 4x the rate, but the 11-screen onboarding flow buries the workout experience.',
  color: '#8B5CF6',

  // ─── FUNNEL HEALTH SNAPSHOT ───────────────────────────────────────────────
  // Shown at top of every stage as the animated funnel bar
  funnelHealth: {
    acquisition: { value: 220000, label: 'Monthly installs',    benchmark: 280000, unit: 'installs', sentiment: 'neu' },
    activation:  { value: 14,     label: 'Onboarding completion', benchmark: 40,   unit: '%',        sentiment: 'neg' },
    retention:   { value: 24,     label: 'Day-1 retention',      benchmark: 42,    unit: '%',        sentiment: 'neg' },
    referral:    { value: 0.06,   label: 'Viral coefficient',    benchmark: 0.25,  unit: 'x',        sentiment: 'neg' },
    revenue:     { value: 0.9,    label: 'LTV:CAC',              benchmark: 3.0,   unit: 'x',        sentiment: 'neg' },
  },

  // ─── STAGE 1: ACQUISITION ─────────────────────────────────────────────────
  acquisition: {
    brief: 'Cosmo spends $396k/month on user acquisition across paid and organic channels. CPI is $2.40 via paid UA, but only 22% of installs are organic. Total installs are 220k/month — solid volume, but CAC payback is negative at current retention. The team is debating whether to scale spend, shift channels, or invest in organic growth. You have $396,000 to reallocate.',

    kpis: [
      { label: 'Monthly installs',    value: '220k',    delta: 'Benchmark: 280k',      sentiment: 'neu' },
      { label: 'Blended CPI',         value: '$2.40',   delta: 'Paid only: $3.08',     sentiment: 'neg' },
      { label: 'Paid dependency',     value: '78%',     delta: 'Benchmark: 50%',       sentiment: 'neg' },
      { label: 'Organic installs',    value: '48.4k',   delta: '22% of total',         sentiment: 'neg' },
      { label: 'Total installs (LTD)', value: '840k',   delta: '38k MAU — 4.5% active', sentiment: 'neg' },
    ],

    channels: [
      { name: 'Meta (Facebook/IG)',  spend: 168000, sessions: 72000,  cac: '$2.33', roas: '0.8x', signal: 'neg' },
      { name: 'Google UAC',         spend: 112000, sessions: 48000,  cac: '$2.33', roas: '1.2x', signal: 'neu' },
      { name: 'TikTok Ads',         spend: 64000,  sessions: 28000,  cac: '$2.29', roas: '0.6x', signal: 'neg' },
      { name: 'Apple Search Ads',   spend: 52000,  sessions: 23600,  cac: '$2.20', roas: '1.8x', signal: 'pos' },
      { name: 'Organic / ASO',      spend: 0,      sessions: 48400,  cac: '$0',    roas: '—',    signal: 'pos' },
    ],

    dataSummary: 'Monthly installs 220k — below 280k benchmark for an app at this MRR stage. Blended CPI $2.40, but with LTV of only $2.16, Cosmo loses money on every paid install. 78% paid dependency vs 50% benchmark — the app has almost no organic discovery engine. Meta takes 42% of spend at 0.8x ROAS — below breakeven. TikTok drives volume at $2.29 CPI but 0.6x ROAS because TikTok users retain even worse than average. Apple Search Ads is the most efficient paid channel at $2.20 CPI and 1.8x ROAS — high-intent users from App Store search — but receives only 13% of budget. Organic/ASO generates 48.4k installs at zero marginal cost but app store listing has not been optimised in 8 months.',

    novaPrompt: 'Your blended CPI is $2.40 and your 12-month LTV is $2.16. Before you touch the sliders — what does it mean when CPI exceeds LTV, and does it make sense to scale any paid channel before fixing that ratio?',

    decision: {
      question: 'How should Cosmo reallocate its $396,000 monthly acquisition budget?',
      mechanic: 'sliders',
      totalBudget: 396000,
      currency: '$',
      threshold: 0.35,
      spreadThinIdx: 2,
      options: [
        {
          label: 'Scale Meta & TikTok — increase creative volume and audience reach',
          shortDescription: 'Double down on social UA to drive install volume',
          consequence: {
            title: 'Installs surge — unit economics worsen',
            description: 'Installs grow 32% to 290k/month as Meta and TikTok reach expands. But CPIs rise as audiences saturate — Meta CPI hits $2.80, TikTok $2.65. Blended CPI rises to $2.72. With LTV at $2.16, every paid install now loses $0.56. Monthly UA burn increases by $94k. MAU grows but EBITDA gap widens from -$62k to -$118k. The app is scaling its losses.',
            funnelImpact: { acquisition: '+32%', activation: '-4%', retention: '-2%', referral: '0%', revenue: '+6%' },
            kpiDeltas: { sessions: '+70,000', cac: '+$0.32', organicShare: '-6pp', ltvcac: '-0.2x' },
          },
        },
        {
          label: 'Shift budget to Apple Search Ads — scale the highest-ROAS channel',
          shortDescription: 'Fund the 1.8x ROAS channel that captures high-intent users',
          consequence: {
            title: 'Efficient installs — volume plateaus',
            description: 'Shifting $80k from Meta/TikTok to Apple Search Ads improves blended ROAS from 0.9x to 1.3x. CPI falls from $2.40 to $2.12. Apple Search Ads users retain at 1.6x the rate of social users because they searched for fitness apps — intent matters. Total installs dip to 198k as ASA inventory is limited, but quality improves. LTV:CAC approaches breakeven at 1.0x.',
            funnelImpact: { acquisition: '-10%', activation: '+8%', retention: '+12%', referral: '+4%', revenue: '+18%' },
            kpiDeltas: { sessions: '-22,000', cac: '-$0.28', organicShare: '+2pp', ltvcac: '+0.3x' },
          },
        },
        {
          label: 'Invest in ASO and organic — app store optimisation, content, and community',
          shortDescription: 'Build organic discovery to reduce paid dependency long-term',
          consequence: {
            title: 'Organic installs compound — paid volume drops short-term',
            description: 'Redirecting $120k to ASO optimisation (screenshots, keywords, A/B tests), fitness content marketing, and community building. Paid installs drop 22% in month 1. But ASO improvements lift organic conversion rate from 28% to 38% — organic installs grow from 48.4k to 74k over 90 days. Organic users retain at 1.8x the rate of paid users. Blended CPI falls to $1.94. The investment takes 60 days to show but compounds — every ASO improvement is permanent.',
            funnelImpact: { acquisition: '-14%', activation: '+6%', retention: '+16%', referral: '+12%', revenue: '+10%' },
            kpiDeltas: { sessions: '-30,800', cac: '-$0.46', organicShare: '+18pp', ltvcac: '+0.5x' },
          },
        },
        {
          label: 'Spread budget evenly — test all channels at equal weight',
          shortDescription: 'Diversify across all channels to reduce single-channel risk',
          consequence: {
            title: 'Diluted execution — no channel optimises',
            description: 'Equal allocation means Meta loses algorithmic optimisation (requires sustained spend to train), Apple Search Ads gets more budget than available inventory, and ASO investment is too thin to move keyword rankings. Each channel underperforms its potential. Blended CPI stays at $2.38 — no meaningful improvement. Installs hold flat at 222k. The business stays in the same position but burned a month of runway.',
            funnelImpact: { acquisition: '+1%', activation: '0%', retention: '0%', referral: '0%', revenue: '+1%' },
            kpiDeltas: { sessions: '+2,000', cac: '-$0.02', organicShare: '+1pp', ltvcac: '0x' },
          },
        },
      ],
    },
  },

  // ─── STAGE 2: ACTIVATION ──────────────────────────────────────────────────
  activation: {
    brief: 'Of every 100 users who install Cosmo, only 14 complete the onboarding flow and reach the home screen. The benchmark is 40%. The onboarding is 11 screens long — permissions, profile setup, goal setting, body metrics, fitness assessment, and a paywall. Users who complete their first workout within 24 hours retain at 4x the rate of those who do not. But only 9% of installers ever start a workout on day one.',

    kpis: [
      { label: 'Onboarding completion',     value: '14%',    delta: 'Benchmark: 40%',       sentiment: 'neg' },
      { label: 'First workout within 24h',  value: '9%',     delta: 'Benchmark: 28%',       sentiment: 'neg' },
      { label: 'Time to first workout',     value: '4.8 days', delta: 'Benchmark: 0.5 days', sentiment: 'neg' },
      { label: 'Onboarding screens',        value: '11',     delta: 'Benchmark: 4–5',       sentiment: 'neg' },
      { label: 'Paywall show rate',         value: '100%',   delta: 'Benchmark: after value', sentiment: 'neg' },
    ],

    funnel: [
      { stage: 'Installs',              value: 220000 },
      { stage: 'App opened',            value: 187000 },
      { stage: 'Onboarding started',    value: 158000 },
      { stage: 'Onboarding completed',  value: 30800  },
      { stage: 'First workout started', value: 19800  },
    ],

    bySource: [
      { source: 'Meta (Facebook/IG)',  cvr: '10%',  timeToConvert: '6.2 days', pdpToCart: '7%'  },
      { source: 'Google UAC',          cvr: '14%',  timeToConvert: '4.4 days', pdpToCart: '9%'  },
      { source: 'TikTok Ads',          cvr: '8%',   timeToConvert: '7.8 days', pdpToCart: '5%'  },
      { source: 'Apple Search Ads',    cvr: '22%',  timeToConvert: '1.6 days', pdpToCart: '18%' },
      { source: 'Organic / ASO',       cvr: '24%',  timeToConvert: '1.2 days', pdpToCart: '21%' },
    ],

    dataSummary: 'Onboarding completion 14% vs 40% benchmark — Cosmo loses 86% of installers before they ever see the product. The 11-screen onboarding is the primary blocker. Screen-by-screen drop: 15% drop at permissions, 22% at body metrics, 31% at the paywall (screen 9 of 11). Users who reach the home screen and start a workout within 24h retain at 4x the rate — D7 retention is 32% for first-day exercisers vs 8% overall. But only 9% of installers start a workout on day one. Time to first workout is 4.8 days — users who wait that long almost never become active. Apple Search and Organic users complete onboarding at 22-24% — 2x the rate of social UA users — because they install with intent. TikTok users complete at just 8%.',

    novaPrompt: 'Users who complete their first workout within 24 hours retain at 4x the rate. But only 9% of installers start a workout on day one. Before you rank your hypotheses — is the problem that onboarding takes too long, or that the paywall blocks users before they experience value?',

    decision: {
      question: 'What is the primary reason only 14% of Cosmo installers complete onboarding against a 40% benchmark?',
      mechanic: 'ranking',
      options: [
        {
          label: 'Onboarding is too long — 11 screens creates friction and fatigue before the user sees value',
          shortDescription: 'Reduce onboarding to 3–4 screens, get users to a workout fast',
          consequence: {
            title: 'Shortened onboarding — activation triples',
            description: 'Cutting onboarding from 11 screens to 4 (name, goal, one permission, straight to workout). Onboarding completion jumps from 14% to 42%. First workout within 24h lifts from 9% to 31%. The data collected on the removed screens (body metrics, fitness assessment) can be gathered progressively over the first week. D7 retention for the new cohort lifts from 8% to 18% because more users reach the activation moment. This was the highest-leverage fix — every downstream metric improves because more users experience the product.',
            funnelImpact: { acquisition: '0%', activation: '+200%', retention: '+125%', referral: '+40%', revenue: '+86%' },
            kpiDeltas: { cvr: '+28pp', addToCart: '+22pp', timeToConvert: '-3.6 days', revenue: '+86%' },
          },
        },
        {
          label: 'Paywall is shown too early — users hit a subscription prompt before experiencing value',
          shortDescription: 'Move paywall to after the first completed workout',
          consequence: {
            title: 'Paywall delayed — completion lifts, conversion shifts',
            description: 'Moving the paywall from screen 9 (pre-value) to after the first completed workout. Onboarding completion lifts from 14% to 28%. First workout rate lifts from 9% to 24%. Premium conversion rate drops from 2.1% to 1.4% on the paywall screen — but 3x more users see it, so total premium subscribers increase by 68%. The diagnosis was partially correct — the paywall was blocking activation, but the onboarding length was also a problem.',
            funnelImpact: { acquisition: '0%', activation: '+100%', retention: '+62%', referral: '+22%', revenue: '+68%' },
            kpiDeltas: { cvr: '+14pp', addToCart: '+15pp', timeToConvert: '-2.4 days', revenue: '+68%' },
          },
        },
        {
          label: 'Permissions friction — notification and health app permissions cause early drops',
          shortDescription: 'Defer permissions to contextual moments after first session',
          consequence: {
            title: 'Permission deferral helps — moderate lift',
            description: 'Deferring notification and HealthKit permissions to contextual moments (ask for notifications after first workout, HealthKit when user first views stats). Onboarding completion lifts from 14% to 20%. The 15% permission drop is eliminated but the remaining 9 screens still cause fatigue. First workout rate improves modestly to 13%. The fix is real but partial — permissions were a contributor, not the root cause.',
            funnelImpact: { acquisition: '0%', activation: '+43%', retention: '+28%', referral: '+10%', revenue: '+22%' },
            kpiDeltas: { cvr: '+6pp', addToCart: '+4pp', timeToConvert: '-1.1 days', revenue: '+22%' },
          },
        },
        {
          label: 'Low-quality installs — paid UA is bringing users with no fitness intent',
          shortDescription: 'The users are wrong, not the onboarding',
          consequence: {
            title: 'Audience narrowed — quality up, volume down',
            description: 'Tightening UA targeting to fitness-interested audiences only. Onboarding completion lifts from 14% to 18% as user quality improves. But installs drop 24% as the addressable audience shrinks. Net activated users are similar — marginally more efficient but not transformative. The onboarding data shows even high-intent organic users complete at only 24% — meaning the onboarding itself is broken regardless of user quality.',
            funnelImpact: { acquisition: '-24%', activation: '+29%', retention: '+14%', referral: '+4%', revenue: '+2%' },
            kpiDeltas: { cvr: '+4pp', addToCart: '+2pp', timeToConvert: '-0.8 days', revenue: '+2%' },
          },
        },
      ],
    },
  },

  // ─── STAGE 3: RETENTION ───────────────────────────────────────────────────
  retention: {
    brief: 'Cosmo\'s Day-1 retention is 24% — only 24 of every 100 installers open the app the next day. By Day 7, it is 8%. By Day 30, 2.4%. The benchmark D1/D7/D30 curve for fitness apps is 42%/18%/10%. Of 840k lifetime installs, only 38k are monthly active — a 4.5% reactivation rate. Users who complete 3+ workouts in their first week retain at 6x the Day-30 rate. The core loop is not engaging users fast enough.',

    kpis: [
      { label: 'Day-1 retention',     value: '24%',     delta: 'Benchmark: 42%',       sentiment: 'neg' },
      { label: 'Day-7 retention',     value: '8%',      delta: 'Benchmark: 18%',       sentiment: 'neg' },
      { label: 'Day-30 retention',    value: '2.4%',    delta: 'Benchmark: 10%',       sentiment: 'neg' },
      { label: 'MAU / total installs', value: '4.5%',   delta: 'Benchmark: 14%',       sentiment: 'neg' },
      { label: 'Workouts per MAU/wk', value: '1.2',     delta: 'Benchmark: 3.4',       sentiment: 'neg' },
    ],

    cohortMonths: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    m1: [26, 25, 24, 23, 22, 23, 24, 24],
    m2: [10, 9, 9, 8, 7, 8, 9, null],
    m3: [5, 5, 4, 4, 3, 4, null, null],
    m4: [3, 3, 3, 2, 2, null, null, null],
    m5: [2, 2, 2, 1, null, null, null, null],
    m6: [2, 1, null, null, null, null, null, null],

    benchmarkM1: 42,

    segments: [
      { name: 'Premium subscribers',    count: 2680,  m1: '82%', ltv: '$94',  churn: '6%/mo' },
      { name: '3+ workouts/week',       count: 4200,  m1: '68%', ltv: '$12',  churn: '14%/mo' },
      { name: 'Casual (1–2 workouts/wk)', count: 8800, m1: '28%', ltv: '$4.80', churn: '48%/mo' },
      { name: 'Installed, never worked out', count: 22320, m1: '0%', ltv: '$0.40', churn: '100%' },
    ],

    dataSummary: 'D1 retention 24% vs 42% benchmark. D7 drops to 8% — Cosmo loses three-quarters of remaining users between day 1 and day 7. D30 is 2.4% vs 10% benchmark — almost no users become monthly actives. The segment data reveals the retention secret: premium subscribers retain at 82% D30 with $94 LTV. Users who complete 3+ workouts per week retain at 68%. But 59% of all new users never complete a single workout — they install, open once, and disappear. Workouts per active user per week is 1.2 vs 3.4 benchmark — the app is not creating a habit loop. The D1-to-D7 cliff is the critical window: users who return on day 2 and day 3 are 6x more likely to be active at day 30.',

    novaPrompt: 'Users who complete 3+ workouts in their first week retain at 6x the Day-30 rate. But your average user completes 1.2 workouts per week. Before you choose a retention lever — is this a product engagement problem (the workouts are not compelling enough) or a trigger problem (the app does not bring users back)?',

    decision: {
      question: 'Which retention lever should Cosmo invest in first?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Build a smart push notification system — personalised triggers at optimal times',
          shortDescription: 'Re-engagement notifications based on user behaviour, time-of-day, and workout patterns',
          consequence: {
            title: 'Push triggers work — D1 and D7 lift meaningfully',
            description: 'Implementing ML-driven push notifications: workout reminders at the user\'s preferred time, streak nudges, and social triggers ("your friend just completed a workout"). D1 retention lifts from 24% to 34%. D7 lifts from 8% to 14%. Users who opt in to notifications retain at 2.4x the rate of those who don\'t. The trigger system brings users back — but only works for the 62% who grant notification permission. The core loop still needs to be more engaging to sustain beyond the first week.',
            funnelImpact: { acquisition: '0%', activation: '+8%', retention: '+75%', referral: '+18%', revenue: '+42%' },
            kpiDeltas: { m1Retention: '+10pp', ltv: '+$0.82', payback: '-2.8 mo', ltvcac: '+0.4x' },
          },
        },
        {
          label: 'Create a 7-day challenge — guided first-week experience with daily workouts',
          shortDescription: 'Structured first-week programme that builds the habit loop from day 1',
          consequence: {
            title: '7-day challenge transforms early retention',
            description: 'A structured "7-Day Kickstart" challenge surfaces immediately after the first workout. Each day has a specific 15-minute workout and a completion reward. 44% of users who start a workout opt into the challenge. Challenge completers (28% of starters) have D30 retention of 38% — vs 2.4% for non-participants. D1 lifts from 24% to 36%. D7 lifts from 8% to 19%. The challenge creates the habit loop the app was missing — it gives users a reason to come back each of the critical first 7 days.',
            funnelImpact: { acquisition: '0%', activation: '+12%', retention: '+138%', referral: '+32%', revenue: '+68%' },
            kpiDeltas: { m1Retention: '+12pp', ltv: '+$1.24', payback: '-3.6 mo', ltvcac: '+0.6x' },
          },
        },
        {
          label: 'Add social features — friends, leaderboards, shared workouts',
          shortDescription: 'Social accountability to create external motivation for returning',
          consequence: {
            title: 'Social features engage power users — limited reach',
            description: 'Adding friend connections, weekly leaderboards, and the ability to share workout results. Users with 3+ friends in the app retain at 4.2x the rate of solo users. But only 12% of new users connect with a friend in the first week — the social graph is too thin. D1 retention lifts marginally from 24% to 27%. D7 lifts from 8% to 11%. For the 12% who connect socially, D30 is 22%. Social features compound over time as the network grows, but the short-term retention impact is narrow.',
            funnelImpact: { acquisition: '+6%', activation: '+4%', retention: '+38%', referral: '+48%', revenue: '+22%' },
            kpiDeltas: { m1Retention: '+3pp', ltv: '+$0.44', payback: '-1.2 mo', ltvcac: '+0.2x' },
          },
        },
        {
          label: 'Improve workout content — more variety, shorter sessions, personalised difficulty',
          shortDescription: 'The core product is not engaging enough to create a habit',
          consequence: {
            title: 'Better content helps engaged users — does not fix the activation cliff',
            description: 'Adding 200+ new workouts, 10-minute express sessions, and adaptive difficulty. Users who were already active increase workouts/week from 1.2 to 2.1. D30 retention for active users improves from 2.4% to 3.8%. But the users who never started a workout (59% of installs) are unaffected — content quality does not matter if users never reach the content. The improvement is real but addresses the middle of the funnel, not the critical D1-D7 drop.',
            funnelImpact: { acquisition: '0%', activation: '+2%', retention: '+58%', referral: '+14%', revenue: '+28%' },
            kpiDeltas: { m1Retention: '+4pp', ltv: '+$0.56', payback: '-1.6 mo', ltvcac: '+0.3x' },
          },
        },
      ],
    },
  },

  // ─── STAGE 4: REFERRAL ────────────────────────────────────────────────────
  referral: {
    brief: 'Cosmo\'s viral coefficient is 0.06 — each existing user generates 0.06 new users through word of mouth. The benchmark for fitness apps is 0.25x. There is no formal referral programme. The share button is buried in settings. 91% of installs come from paid UA or App Store browse. Users who work out with a friend have 3.2x higher D30 retention, but only 4% of users have ever invited someone.',

    kpis: [
      { label: 'Viral coefficient',    value: '0.06x', delta: 'Benchmark: 0.25x',  sentiment: 'neg' },
      { label: 'Share rate',            value: '1.8%',  delta: 'Benchmark: 8%',     sentiment: 'neg' },
      { label: 'Invite send rate',      value: '4%',    delta: 'Benchmark: 16%',    sentiment: 'neg' },
      { label: 'Invite accept rate',    value: '18%',   delta: 'Benchmark: 32%',    sentiment: 'neg' },
      { label: 'App Store rating',      value: '3.8',   delta: 'Benchmark: 4.5',    sentiment: 'neg' },
    ],

    npsDistribution: {
      promoters:  { pct: 22, count: 8360 },
      passives:   { pct: 38, count: 14440 },
      detractors: { pct: 40, count: 15200 },
    },

    referralSources: [
      { source: 'Word of mouth (organic)',  newCustomers: 4800,  pctOfTotal: '2.2%' },
      { source: 'Social media shares',      newCustomers: 3200,  pctOfTotal: '1.5%' },
      { source: 'App Store reviews',        newCustomers: 1400,  pctOfTotal: '0.6%' },
    ],

    dataSummary: 'Viral coefficient 0.06x — for every 100 users, Cosmo generates 6 new installs through organic sharing. Benchmark is 25. NPS is -18 (22% Promoters vs 40% Detractors) — the product has more unhappy users than happy ones, driven by the frustrating onboarding and lack of habit formation. Share rate is 1.8% — the share button is buried three taps deep in settings. Invite send rate is 4% with an 18% accept rate. App Store rating is 3.8 stars — dragged down by onboarding complaints and subscription pricing criticism. Users who work out with a friend retain at 3.2x the D30 rate — social fitness is the product\'s strongest retention mechanism but almost no one discovers it.',

    novaPrompt: 'Your NPS is -18 with 40% Detractors. Your share button is buried in settings. Before you invest in referral mechanics — is the problem that users cannot share, or that users do not want to share because the product experience is not share-worthy?',

    decision: {
      question: 'What is the highest-leverage referral investment for Cosmo right now?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Fix the product experience first — reduce Detractors before engineering virality',
          shortDescription: 'Address the 40% Detractor rate through better onboarding, first-session experience, and support',
          consequence: {
            title: 'Detractor rate falls — organic sharing increases naturally',
            description: 'Investing in the moments that create Detractors: simplified onboarding, first-workout coaching, responsive in-app support, and addressing the top App Store complaints. NPS lifts from -18 to +12 over 90 days. Detractor share falls from 40% to 22%. App Store rating climbs from 3.8 to 4.3. Viral coefficient lifts organically from 0.06 to 0.14 — users who have a good experience share without being asked. This also improves retention because the same fixes that reduce Detractors increase activation.',
            funnelImpact: { acquisition: '+22%', activation: '+14%', retention: '+28%', referral: '+133%', revenue: '+34%' },
            kpiDeltas: { viralCoef: '+0.08x', nps: '+30', organicShare: '+8pp', cac: '-$0.42' },
          },
        },
        {
          label: 'Build social workout features — "workout with a friend" as the core viral loop',
          shortDescription: 'Make fitness social: partner workouts, challenges, shared progress',
          consequence: {
            title: 'Social workouts drive retention and sharing — growth compounds',
            description: 'Launching "Workout Together" — invite a friend to a synced live workout. Post-workout comparison cards auto-generated for sharing. 18% of active users try a partner workout in the first month. Those who do invite an average of 2.4 friends. Partner workout users have D30 retention of 34% vs 2.4% baseline. Viral coefficient lifts from 0.06 to 0.18. The feature creates a natural viral loop — every social workout is both retention and acquisition. But reach is limited by current MAU — only active users can invite.',
            funnelImpact: { acquisition: '+16%', activation: '+8%', retention: '+42%', referral: '+200%', revenue: '+28%' },
            kpiDeltas: { viralCoef: '+0.12x', nps: '+14', organicShare: '+10pp', cac: '-$0.34' },
          },
        },
        {
          label: 'Launch a referral programme — give both referrer and friend premium trial time',
          shortDescription: 'Double-sided incentive: 1 week free premium for both parties',
          consequence: {
            title: 'Referral programme activates — conversion moderate',
            description: 'Launching "Give a Week, Get a Week" — referrers and friends each get 7 days of free premium. Share flow is now one tap from the post-workout screen. Invite send rate lifts from 4% to 11%. Accept rate stays at 18%. Viral coefficient improves from 0.06 to 0.12. But the Detractor base limits the ceiling — 40% of users will not refer regardless of incentive. Referred users convert to premium at 4.8% vs 2.1% baseline because the premium trial surfaces value. Net positive but capped by product satisfaction.',
            funnelImpact: { acquisition: '+14%', activation: '+4%', retention: '+12%', referral: '+100%', revenue: '+18%' },
            kpiDeltas: { viralCoef: '+0.06x', nps: '+4', organicShare: '+6pp', cac: '-$0.22' },
          },
        },
        {
          label: 'Invest in App Store optimisation — improve ratings, respond to reviews, drive organic discovery',
          shortDescription: 'Fix the 3.8 rating and turn the App Store into an acquisition channel',
          consequence: {
            title: 'App Store presence improves — slow but compounding',
            description: 'Systematic review response, in-app review prompt timing optimisation (ask after third completed workout, not after install), and keyword optimisation. App Store rating improves from 3.8 to 4.2 over 90 days. Organic install rate lifts 18% as higher rating improves browse conversion. But the viral coefficient only improves to 0.08 — App Store is a discovery channel, not a referral mechanism. The investment compounds over time as every rating improvement is permanent, but it does not create user-to-user sharing.',
            funnelImpact: { acquisition: '+18%', activation: '+2%', retention: '+4%', referral: '+33%', revenue: '+12%' },
            kpiDeltas: { viralCoef: '+0.02x', nps: '+6', organicShare: '+12pp', cac: '-$0.18' },
          },
        },
      ],
    },
  },

  // ─── STAGE 5: REVENUE ─────────────────────────────────────────────────────
  revenue: {
    brief: 'Cosmo\'s MRR is $152k — $118k from premium subscriptions (2,680 subscribers at $14.99/month less platform fees) and $34k from ad revenue. EBITDA is -$62k/month. LTV:CAC is 0.9x — the business loses money on every cohort. Premium conversion is 2.1% vs a 6% benchmark. Ad revenue per DAU is $0.12, declining 18% QoQ as eCPMs fall. The decisions made in the previous four stages determine whether the unit economics can be fixed. Now students see the full picture.',

    kpis: [
      { label: 'Monthly revenue',       value: '$152k',   delta: 'Subs $118k + Ads $34k',  sentiment: 'neu' },
      { label: 'EBITDA',                value: '-$62k',    delta: 'Cash negative',           sentiment: 'neg' },
      { label: 'LTV:CAC',              value: '0.9x',     delta: 'Target: 3.0x',            sentiment: 'neg' },
      { label: 'Premium conversion',    value: '2.1%',     delta: 'Benchmark: 6%',           sentiment: 'neg' },
      { label: 'ARPDAU (blended)',      value: '$0.18',    delta: 'Benchmark: $0.42',        sentiment: 'neg' },
    ],

    revenueBreakdown: [
      { source: 'Premium subscriptions', revenue: 118000, pct: '78%', margin: '72%' },
      { source: 'Ad revenue (free tier)', revenue: 34000, pct: '22%', margin: '94%' },
      { source: 'In-app purchases',      revenue: 0,      pct: '0%',  margin: '—'   },
      { source: 'Brand partnerships',    revenue: 0,      pct: '0%',  margin: '—'   },
    ],

    ltvcacTrend: {
      months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      ltvcac: [1.3, 1.2, 1.1, 1.0, 0.9, 0.9, 0.9, 0.9],
      target: 3.0,
    },

    dataSummary: 'MRR $152k — subscriptions $118k (78%), ads $34k (22%). EBITDA -$62k/month driven by $396k UA spend against $152k revenue. LTV:CAC 0.9x and declining — the trend has fallen from 1.3x six months ago as CPI rises and eCPMs fall. Premium conversion 2.1% vs 6% benchmark — 97.9% of users never subscribe. Premium subscribers have 72% gross margin and $94 LTV. Free users generate $0.12 ARPDAU from ads — declining 18% QoQ as programmatic eCPMs compress. At current trajectory, ad revenue will fall below $28k within two quarters. The business has two revenue streams and both are underperforming: not enough users convert to premium, and ad monetisation of free users is deteriorating.',

    novaPrompt: 'Your premium conversion is 2.1% and your ad ARPDAU is declining 18% QoQ. You have $62k of monthly losses to close. Before you choose a monetisation lever — if premium conversion doubled to 4.2%, what would MRR become, and would the business be profitable? What if ad eCPMs continue falling — which revenue stream should you bet on?',

    decision: {
      question: 'Which monetisation lever should Cosmo prioritise to reach LTV:CAC of 3.0x?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Redesign the premium conversion funnel — trial-first model with soft paywall',
          shortDescription: 'Give all users a 7-day premium trial, then convert with a soft paywall after demonstrated value',
          consequence: {
            title: 'Trial-first model transforms conversion',
            description: 'Every new user gets 7 days of full premium access. Soft paywall appears after the trial with a personalised summary of workouts completed and calories burned. Premium conversion lifts from 2.1% to 5.8% — nearly tripling. Subscription revenue grows from $118k to $312k within 90 days as the new cohorts convert. LTV:CAC lifts from 0.9x to 2.2x. EBITDA swings from -$62k to +$38k. The trial-first model works because users who experience premium features — personalised plans, advanced analytics, no ads — convert at high rates when they see what they would lose.',
            funnelImpact: { acquisition: '-2%', activation: '+14%', retention: '+34%', referral: '+22%', revenue: '+106%' },
            kpiDeltas: { ltvcac: '+1.3x', ltv: '+$3.12', ebitda: '+$100k', grossMargin: '+8pp' },
          },
        },
        {
          label: 'Launch a mid-tier plan — $4.99/month "Plus" with limited premium features',
          shortDescription: 'Capture the 97.9% who will not pay $14.99 with a lower price point',
          consequence: {
            title: 'Mid-tier captures price-sensitive users — cannibalisation risk',
            description: 'Launching "Cosmo Plus" at $4.99/month: ad-free experience, basic analytics, and 5 premium workouts/month. 6.2% of free users convert to Plus within 60 days. But 22% of existing $14.99 subscribers downgrade to Plus — cannibalisation costs $38k/month in subscription downgrades. Net new revenue is +$42k/month after cannibalisation. EBITDA improves from -$62k to -$20k. LTV:CAC lifts to 1.4x. The mid-tier helps but does not solve the fundamental problem — and it adds product complexity.',
            funnelImpact: { acquisition: '0%', activation: '+6%', retention: '+18%', referral: '+8%', revenue: '+28%' },
            kpiDeltas: { ltvcac: '+0.5x', ltv: '+$0.94', ebitda: '+$42k', grossMargin: '+2pp' },
          },
        },
        {
          label: 'Maximise ad revenue — add rewarded video ads and branded workout sponsorships',
          shortDescription: 'Monetise free users more aggressively with higher-eCPM ad formats',
          consequence: {
            title: 'Ad revenue lifts — user experience degrades',
            description: 'Adding rewarded video ads ("watch an ad to unlock a premium workout"), interstitial ads between workouts, and branded fitness challenges sponsored by athletic brands. Ad ARPDAU lifts from $0.12 to $0.28. Ad revenue grows from $34k to $78k/month. But D7 retention for free users drops from 8% to 5.4% as ad load increases. App Store rating drops from 3.8 to 3.4 — reviews cite "too many ads." Premium conversion improves slightly to 2.6% as users pay to remove ads. EBITDA improves from -$62k to -$26k. Revenue up, but user experience down — and the eCPM decline trend continues.',
            funnelImpact: { acquisition: '-8%', activation: '-6%', retention: '-32%', referral: '-18%', revenue: '+24%' },
            kpiDeltas: { ltvcac: '+0.3x', ltv: '+$0.48', ebitda: '+$36k', grossMargin: '+4pp' },
          },
        },
        {
          label: 'Add in-app purchases — premium workout packs, nutrition plans, coaching sessions',
          shortDescription: 'Create one-time purchase revenue stream alongside subscriptions',
          consequence: {
            title: 'IAPs generate incremental revenue — small but high-margin',
            description: 'Launching premium workout packs ($2.99–$9.99), personalised nutrition plans ($6.99), and live coaching sessions ($19.99). 3.4% of MAU make at least one IAP in the first 60 days. Average IAP revenue per buyer is $8.40/month. Total IAP revenue: $10.8k/month. EBITDA improves from -$62k to -$51k. LTV:CAC lifts marginally to 1.0x. The IAP model generates high-margin incremental revenue but the total addressable volume is small — only engaged users buy, and engaged users are the ones most likely to subscribe anyway.',
            funnelImpact: { acquisition: '0%', activation: '+4%', retention: '+8%', referral: '+6%', revenue: '+7%' },
            kpiDeltas: { ltvcac: '+0.1x', ltv: '+$0.24', ebitda: '+$11k', grossMargin: '+1pp' },
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

export const COSMO_NOVA_PROMPTS = {
  acquisition: {
    entry: 'Your blended CPI is $2.40 and your 12-month LTV is $2.16. Before you touch the sliders — what does it mean when CPI exceeds LTV, and does it make sense to scale any paid channel before fixing that ratio?',
    decision: 'You\'ve set your allocation. Before you lock in — which channel in the table has the highest ROAS, and why is it currently receiving the smallest share of budget?',
    postConsequence: 'Your acquisition decision changed the CPI. How does the new CPI compare to the current LTV, and which downstream stage — activation, retention, or revenue — would have the biggest impact on closing that gap?',
  },
  activation: {
    entry: 'Users who complete their first workout within 24 hours retain at 4x the rate. But only 9% of installers start a workout on day one. Before you rank your hypotheses — is the problem that onboarding takes too long, or that the paywall blocks users before they experience value?',
    decision: 'You\'ve ranked your hypotheses. What specific drop-off in the onboarding funnel most strongly supports your top-ranked hypothesis?',
    postConsequence: 'Your onboarding completion rate changed. Recalculate: if X% of 220k monthly installs now complete onboarding, how many more users reach the first workout, and what does that mean for DAU?',
  },
  retention: {
    entry: 'Users who complete 3+ workouts in their first week retain at 6x the Day-30 rate. But your average user completes 1.2 workouts per week. Before you choose a retention lever — is this a product engagement problem (the workouts are not compelling enough) or a trigger problem (the app does not bring users back)?',
    decision: 'You\'ve chosen your retention lever. If D7 retention lifts to your projected level, how many additional MAU does Cosmo gain per month — and what does each additional MAU contribute in revenue?',
    postConsequence: 'Your retention curve changed. Using the new D1/D7/D30 rates, recalculate MAU. How does the new MAU affect ad revenue and the pool of users who could convert to premium?',
  },
  referral: {
    entry: 'Your NPS is -18 with 40% Detractors. Your share button is buried in settings. Before you invest in referral mechanics — is the problem that users cannot share, or that users do not want to share because the product experience is not share-worthy?',
    decision: 'You\'ve chosen your referral strategy. If the viral coefficient lifts to your projected level, how many organic installs per month does that generate — and by how much can you reduce paid UA spend?',
    postConsequence: 'Your viral coefficient changed. Recalculate the blended CPI including the new organic install share. How does this change the LTV:CAC ratio?',
  },
  revenue: {
    entry: 'Your premium conversion is 2.1% and your ad ARPDAU is declining 18% QoQ. You have $62k of monthly losses to close. Before you choose a monetisation lever — if premium conversion doubled to 4.2%, what would MRR become, and would the business be profitable? What if ad eCPMs continue falling — which revenue stream should you bet on?',
    decision: 'You\'ve chosen your monetisation lever. Walk through the maths: if it performs as projected, what will the new monthly EBITDA be, and how many months of runway does Cosmo have at that burn rate?',
    postConsequence: 'You\'ve made all five AARRR decisions. Which single intervention had the biggest impact on LTV:CAC, and why? If you were advising Cosmo\'s CEO, which two stages would you tell them to fix first and in what order?',
  },
};
