// ─────────────────────────────────────────────────────────────────────────────
// PATHFINDER — Grazia Archetype (Fast-Casual Restaurant Chain)
// Full AARRR data spec: 5 stages × 1 decision × 4 options × consequence objects
// ─────────────────────────────────────────────────────────────────────────────

export const GRAZIA_ARCHETYPE = {
  id: 'grazia',
  name: 'Grazia',
  type: 'Fast-Casual Restaurant',
  tagline: 'Mediterranean fast-casual chain. 4 locations. 3 years in. Strong walk-ins, but customers don\'t come back.',
  description: 'Grazia is a 4-location Mediterranean fast-casual restaurant chain. Monthly revenue is £82k across all sites. Walk-in acquisition is healthy but 78% of customers never return after their first visit. Avg ticket is £12 with 22% margin — a customer only becomes profitable on visit 3+. Uber Eats now represents 35% of orders at a 30% commission, cannibalizing dine-in margin. EBITDA is -£8k/month.',
  color: '#D4763A',

  // ─── FUNNEL HEALTH SNAPSHOT ───────────────────────────────────────────────
  // Shown at top of every stage as the animated funnel bar
  funnelHealth: {
    acquisition: { value: 14200, label: 'Monthly traffic',    benchmark: 18000, unit: 'sessions', sentiment: 'neu' },
    activation:  { value: 41,    label: 'Activation rate',    benchmark: 58,    unit: '%',        sentiment: 'neg' },
    retention:   { value: 22,    label: '30-day return rate',  benchmark: 45,    unit: '%',        sentiment: 'neg' },
    referral:    { value: 0.14,  label: 'Viral coefficient',  benchmark: 0.35,  unit: 'x',        sentiment: 'neg' },
    revenue:     { value: 1.2,   label: 'LTV:CAC',            benchmark: 3.0,   unit: 'x',        sentiment: 'neg' },
  },

  // ─── STAGE 1: ACQUISITION ─────────────────────────────────────────────────
  acquisition: {
    brief: 'Grazia generates 14,200 monthly sessions (foot traffic + online discovery + delivery app views) across 4 locations. Walk-in traffic is stable but delivery apps now drive 35% of orders at a 30% commission — cannibalizing dine-in margin. The team has £6,800/month to allocate across acquisition channels.',

    kpis: [
      { label: 'Monthly traffic (all sources)', value: '14,200', delta: 'Benchmark: 18,000', sentiment: 'neu' },
      { label: 'Blended CAC',                   value: '£4.20',  delta: '+£1.80 in 12 months', sentiment: 'neg' },
      { label: 'Delivery app share',             value: '35%',    delta: 'Benchmark: 18%',     sentiment: 'neg' },
      { label: 'Walk-in traffic',                value: '6,800',  delta: '-6% YoY',            sentiment: 'neg' },
      { label: 'Google Maps visibility',         value: '4.1★',   delta: '82 reviews total',   sentiment: 'neu' },
    ],

    channels: [
      { name: 'Walk-in / Foot traffic', spend: 0,    sessions: 6800, cac: '£0',    roas: '—',    signal: 'pos' },
      { name: 'Uber Eats / Deliveroo',  spend: 0,    sessions: 3400, cac: '£0',    roas: '0.7x', signal: 'neg' },
      { name: 'Instagram / Meta',       spend: 3200, sessions: 2100, cac: '£6.80', roas: '1.4x', signal: 'neg' },
      { name: 'Google Maps / Local SEO', spend: 800,  sessions: 1400, cac: '£0.90', roas: '6.2x', signal: 'pos' },
      { name: 'Flyers / Local events',   spend: 2800, sessions: 500,  cac: '£11.20', roas: '0.8x', signal: 'neg' },
    ],

    dataSummary: 'Monthly traffic 14,200 across 4 locations — below the 18,000 benchmark for a chain at this revenue stage. Walk-in foot traffic is the strongest channel at 6,800 sessions with zero marginal cost, but it declined 6% YoY. Delivery apps generate 3,400 sessions with no direct acquisition cost but take 30% commission on every order — effective ROAS is 0.7x, meaning Grazia loses money on delivery orders after food costs. Instagram ads generate 2,100 visits at £6.80 CAC with 1.4x ROAS — below the 1.8x breakeven on a 22% dine-in margin business. Google Maps / local SEO is the highest-ROAS channel at 6.2x but receives only £800/month. Flyers cost £11.20 per acquired customer at 0.8x ROAS.',

    novaPrompt: 'Uber Eats takes 30% commission on orders where your dine-in margin is 22%. Before you touch the sliders — what is Grazia\'s actual margin on a delivery order, and what does that tell you about whether delivery is an acquisition channel or a margin destroyer?',

    decision: {
      question: 'How should Grazia allocate its £6,800 monthly acquisition budget?',
      mechanic: 'sliders',
      totalBudget: 6800,
      currency: '£',
      threshold: 0.35,
      spreadThinIdx: 3,
      options: [
        {
          label: 'Scale Instagram ads — drive awareness and first visits',
          shortDescription: 'Double down on visual social ads showcasing food and ambiance',
          consequence: {
            title: 'Awareness grows — but traffic doesn\'t convert',
            description: 'Instagram sessions grow 42% as reach expands into broader audiences. But the traffic is awareness-stage — followers like the food photos but live 3+ miles from a location. Walk-in conversion from Instagram is 8% vs 22% from Google Maps. CAC rises from £4.20 to £5.90. Sessions grow but the customers who arrive via Instagram have 14% lower ticket size and 60% lower return rate than walk-ins.',
            funnelImpact: { acquisition: '+22%', activation: '-4%', retention: '-6%', referral: '+4%', revenue: '+6%' },
            kpiDeltas: { sessions: '+3,100', cac: '+£1.70', deliveryShare: '+0pp', walkInTraffic: '+200' },
          },
        },
        {
          label: 'Invest in Google Maps and local SEO — own the local search results',
          shortDescription: 'Optimize listings, drive review volume, invest in local search',
          consequence: {
            title: 'Local discovery compounds — highest-intent traffic grows',
            description: 'Investing in Google Business Profile optimization, review generation campaign, and local SEO. Google Maps sessions grow 65% from 1,400 to 2,310. Review count grows from 82 to 240 in 90 days, pushing rating from 4.1 to 4.3★. Walk-in traffic stabilizes as Google Maps drives directions requests. CAC falls from £4.20 to £3.40. These customers arrive with purchase intent — they searched "Mediterranean food near me" — and convert at 3x the rate of social traffic.',
            funnelImpact: { acquisition: '+12%', activation: '+8%', retention: '+6%', referral: '+14%', revenue: '+16%' },
            kpiDeltas: { sessions: '+1,700', cac: '-£0.80', deliveryShare: '-3pp', walkInTraffic: '+680' },
          },
        },
        {
          label: 'Reduce delivery dependency — cap Uber Eats and push direct ordering',
          shortDescription: 'Build a direct ordering channel, reduce 30% commission drain',
          consequence: {
            title: 'Margin recovers — delivery volume drops short-term',
            description: 'Launching a direct ordering website with 10% discount vs delivery app pricing. Delivery app orders drop 22% in 60 days as price-sensitive customers shift to direct. But 38% of delivery customers were incremental — they would not have ordered directly. Net delivery revenue falls 14%, but margin on remaining orders improves from -8% to +14% (direct orders). Total sessions drop 6% but revenue per session improves 18%. The business trades volume for margin.',
            funnelImpact: { acquisition: '-6%', activation: '+4%', retention: '+10%', referral: '+2%', revenue: '+22%' },
            kpiDeltas: { sessions: '-850', cac: '-£1.20', deliveryShare: '-12pp', walkInTraffic: '+0' },
          },
        },
        {
          label: 'Spread budget evenly across all channels — diversify risk',
          shortDescription: 'Equal allocation to avoid dependency on any single channel',
          consequence: {
            title: 'Diluted spend — no channel improves meaningfully',
            description: 'Splitting £6,800 equally means Instagram gets less than its current spend, Google Maps gets a slight bump, flyers remain expensive, and there\'s no budget for direct ordering. No channel reaches the investment threshold needed to improve performance. Instagram loses algorithmic momentum from reduced spend. Google Maps sees marginal improvement. Blended CAC stays at £4.20 and traffic is flat. The fundamental delivery margin problem remains unaddressed.',
            funnelImpact: { acquisition: '+2%', activation: '0%', retention: '0%', referral: '0%', revenue: '+1%' },
            kpiDeltas: { sessions: '+280', cac: '+£0.30', deliveryShare: '+0pp', walkInTraffic: '+80' },
          },
        },
      ],
    },
  },

  // ─── STAGE 2: ACTIVATION ──────────────────────────────────────────────────
  activation: {
    brief: 'Of every 100 people who discover Grazia (walk past, see online, open a delivery app listing), only 41 complete an order. The category benchmark is 58%. Dine-in conversion is 62% for walk-ins but delivery app conversion is only 24%. The menu has 54 items — the average fast-casual chain has 28. Wait time averages 14 minutes for dine-in. Students need to identify where in the first-visit experience Grazia is losing customers.',

    kpis: [
      { label: 'Overall activation rate',    value: '41%',     delta: 'Benchmark: 58%',       sentiment: 'neg' },
      { label: 'Dine-in conversion',         value: '62%',     delta: 'Benchmark: 72%',       sentiment: 'neu' },
      { label: 'Delivery app conversion',    value: '24%',     delta: 'Benchmark: 38%',       sentiment: 'neg' },
      { label: 'Avg wait time (dine-in)',    value: '14 min',  delta: 'Benchmark: 8 min',     sentiment: 'neg' },
      { label: 'Menu items',                 value: '54',      delta: 'Benchmark: 28',        sentiment: 'neg' },
    ],

    funnel: [
      { stage: 'Total impressions',       value: 14200 },
      { stage: 'Menu views / door opens', value: 8940  },
      { stage: 'Order started',           value: 6820  },
      { stage: 'Order completed',         value: 5822  },
      { stage: 'First meal served',       value: 5822  },
    ],

    bySource: [
      { source: 'Walk-in',          cvr: '62%', timeToConvert: '3 min',   pdpToCart: '74%' },
      { source: 'Uber Eats',        cvr: '24%', timeToConvert: '6.8 min', pdpToCart: '31%' },
      { source: 'Deliveroo',        cvr: '22%', timeToConvert: '7.2 min', pdpToCart: '28%' },
      { source: 'Google Maps',      cvr: '56%', timeToConvert: '18 min',  pdpToCart: '68%' },
      { source: 'Instagram',        cvr: '18%', timeToConvert: '2.4 days', pdpToCart: '22%' },
    ],

    dataSummary: 'Overall activation rate 41% vs 58% benchmark. The blended rate is dragged down heavily by delivery app conversion — Uber Eats at 24% and Deliveroo at 22% vs a 38% delivery benchmark. Walk-in dine-in converts at 62% which is below the 72% benchmark but not the primary problem. The menu has 54 items — nearly double the fast-casual benchmark of 28 — creating decision paralysis on delivery apps where customers scroll rather than browse physically. Wait time averages 14 minutes vs 8-minute benchmark, causing 12% of walk-in customers to leave before ordering during peak hours. Google Maps traffic converts at 56% — high intent, but the 18-minute gap between search and arrival means some are lost to competitors en route.',

    novaPrompt: 'Your delivery app conversion is 24% and your dine-in conversion is 62%. Your menu has 54 items. Before you rank your hypotheses — what is the relationship between menu size and conversion on a delivery app where customers see items on a 5-inch screen?',

    decision: {
      question: 'What is the primary reason Grazia\'s activation rate is 41% against a 58% benchmark?',
      mechanic: 'ranking',
      options: [
        {
          label: 'Menu is too large — 54 items creates decision paralysis, especially on delivery apps',
          shortDescription: 'Customers are overwhelmed by choice and abandon before ordering',
          consequence: {
            title: 'Menu streamlined — conversion recovers across all channels',
            description: 'Cutting menu from 54 to 32 items, removing low-margin and slow-moving dishes. Delivery app conversion lifts from 24% to 36% — the simplified menu scans faster on mobile. Dine-in conversion lifts from 62% to 68%. Kitchen throughput improves — wait time drops from 14 to 9 minutes with fewer items to prep. Food waste drops 28%. Overall activation rate lifts from 41% to 52%. This was the highest-leverage fix because it improved every channel simultaneously.',
            funnelImpact: { acquisition: '0%', activation: '+27%', retention: '+12%', referral: '+8%', revenue: '+18%' },
            kpiDeltas: { activationRate: '+11pp', waitTime: '-5 min', deliveryCvr: '+12pp', foodWaste: '-28%' },
          },
        },
        {
          label: 'Wait times too long — 14 minutes drives walk-away during peak hours',
          shortDescription: 'Customers see the queue and leave, or order and get frustrated waiting',
          consequence: {
            title: 'Wait time reduced — dine-in improves, delivery unchanged',
            description: 'Adding a prep station and reorganizing kitchen workflow. Wait time drops from 14 to 10 minutes. Dine-in conversion lifts from 62% to 66% — the walk-away rate during peak hours falls from 12% to 7%. But delivery app conversion is unchanged at 24% because wait time is not visible to delivery customers before ordering. Overall activation lifts from 41% to 45%. Correct diagnosis for dine-in but misses the larger delivery conversion problem.',
            funnelImpact: { acquisition: '0%', activation: '+10%', retention: '+6%', referral: '+4%', revenue: '+8%' },
            kpiDeltas: { activationRate: '+4pp', waitTime: '-4 min', deliveryCvr: '+0pp', foodWaste: '-8%' },
          },
        },
        {
          label: 'Delivery app listings are poorly optimized — bad photos, wrong category tags',
          shortDescription: 'Grazia is losing on delivery platforms due to weak listing quality',
          consequence: {
            title: 'Listings improved — delivery conversion lifts modestly',
            description: 'Professional food photography, optimized descriptions, correct category tags, and a promoted "Most Popular" section on delivery apps. Delivery conversion lifts from 24% to 29%. But the 54-item menu still creates scroll fatigue — even with better photos, customers struggle to choose. Overall activation lifts from 41% to 44%. The listing was part of the problem but the menu complexity was the deeper issue.',
            funnelImpact: { acquisition: '+4%', activation: '+7%', retention: '+2%', referral: '+2%', revenue: '+6%' },
            kpiDeltas: { activationRate: '+3pp', waitTime: '+0 min', deliveryCvr: '+5pp', foodWaste: '-4%' },
          },
        },
        {
          label: 'Pricing is too high — customers compare on delivery apps and choose cheaper options',
          shortDescription: 'Grazia\'s £12 average ticket is above fast-casual delivery norms',
          consequence: {
            title: 'Prices reduced — volume rises, margin collapses',
            description: 'Reducing delivery prices by 15% to match competitors. Delivery conversion lifts from 24% to 32%. Order volume increases 18%. But the 30% delivery commission on already-reduced prices means Grazia now loses £1.40 per delivery order after food costs. Dine-in activation is unchanged — price was not the barrier for walk-in customers. Overall activation lifts from 41% to 47% but EBITDA worsens by £3,200/month. The price cut treated the symptom and worsened the margin problem.',
            funnelImpact: { acquisition: '+6%', activation: '+15%', retention: '-4%', referral: '0%', revenue: '-8%' },
            kpiDeltas: { activationRate: '+6pp', waitTime: '+0 min', deliveryCvr: '+8pp', foodWaste: '-2%' },
          },
        },
      ],
    },
  },

  // ─── STAGE 3: RETENTION ───────────────────────────────────────────────────
  retention: {
    brief: 'Grazia\'s 30-day return rate is 22% — only 22 of every 100 first-time customers come back within a month. The category benchmark is 45%. This is the core business problem: at a £12 average ticket with 22% margin, a single visit generates £2.64 gross profit — well below the £4.20 blended CAC. A customer must visit 3+ times to become profitable. 78% never visit twice. The loyalty card programme has only 6% participation.',

    kpis: [
      { label: '30-day return rate',   value: '22%',     delta: 'Benchmark: 45%',        sentiment: 'neg' },
      { label: '90-day return rate',   value: '11%',     delta: 'Benchmark: 32%',        sentiment: 'neg' },
      { label: 'Loyalty participation', value: '6%',     delta: 'Benchmark: 22%',        sentiment: 'neg' },
      { label: 'Avg visits/customer (yr)', value: '1.4', delta: 'Benchmark: 3.8',        sentiment: 'neg' },
      { label: 'Visits to profitability', value: '3',    delta: 'Only 11% reach visit 3', sentiment: 'neg' },
    ],

    cohortMonths: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    m1: [26, 24, 23, 22, 21, 20, 22, 22],
    m2: [16, 15, 14, 13, 12, 12, 13, null],
    m3: [12, 11, 10, 9,  8,  9,  null, null],
    m4: [9,  8,  7,  6,  6,  null, null, null],
    m5: [7,  6,  5,  5,  null, null, null, null],
    m6: [5,  4,  null, null, null, null, null, null],

    benchmarkM1: 45,

    segments: [
      { name: 'Weekly regulars',     count: 340,  m1: '92%', ltv: '£640', churn: '4%/mo' },
      { name: 'Fortnightly visitors', count: 580,  m1: '68%', ltv: '£186', churn: '18%/mo' },
      { name: 'Monthly visitors',    count: 920,  m1: '41%', ltv: '£72',  churn: '34%/mo' },
      { name: 'One and done',        count: 3980, m1: '0%',  ltv: '£12',  churn: '100%' },
    ],

    dataSummary: '30-day return rate 22% vs 45% benchmark. 90-day drops to 11%. Average customer visits 1.4 times per year vs 3.8 benchmark. A customer needs 3 visits to become profitable (£2.64 margin per visit vs £4.20 CAC). Only 11% of customers reach visit 3. The segment data is critical: weekly regulars (340 customers, 6% of base) retain at 92% with £640 LTV — they are the entire profit centre. But 68% of all customers are "one and done" — visiting once at £12 and never returning. The loyalty card programme exists but only 6% participate — the stamp card mechanic is outdated and most customers forget to bring the card. There is no digital capture of first-time customers — no email, no phone number, no way to bring them back.',

    novaPrompt: 'Your weekly regulars have 92% retention and £640 LTV. Your one-and-done customers have 0% retention and £12 LTV. Before you choose a retention lever — 68% of your customers walk out the door and you have no way to contact them. What does that tell you about whether this is a product problem or a capture problem?',

    decision: {
      question: 'Which retention lever should Grazia invest in first?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Launch a digital loyalty app — capture every customer\'s contact details at first visit',
          shortDescription: 'Replace the stamp card with a digital programme that captures email/phone and enables re-engagement',
          consequence: {
            title: 'Customer capture transforms the model — retention climbs',
            description: 'Launching a simple digital loyalty programme (order at counter → phone number → points). Incentivized with a free side on visit 2. 34% of first-time customers enrol (vs 6% with stamp cards). Grazia now has contact details for 1,980 customers in 90 days. SMS reminder at day 7 post-visit drives 22% click-through, 8% revisit. 30-day return rate lifts from 22% to 31%. The biggest change is structural — Grazia can now communicate with customers who would otherwise have been permanently lost.',
            funnelImpact: { acquisition: '0%', activation: '+4%', retention: '+41%', referral: '+18%', revenue: '+28%' },
            kpiDeltas: { returnRate30d: '+9pp', loyaltyParticipation: '+28pp', avgVisitsYr: '+0.6', ltvcac: '+0.8x' },
          },
        },
        {
          label: 'Improve food consistency — standardize recipes and quality across all 4 locations',
          shortDescription: 'Invest in kitchen training and SOPs to reduce quality variance between visits',
          consequence: {
            title: 'Consistency improves — regulars stay, but one-and-done unchanged',
            description: 'Hiring a head chef consultant, standardizing all 32 recipes with photo specs, implementing quality checks at each location. Food consistency score (from mystery diners) lifts from 72% to 88%. Weekly regulars\' churn drops from 4% to 2%. Fortnightly visitors\' churn drops from 18% to 14%. But the one-and-done segment is unchanged — they did not leave because of quality variance, they left because there was no reason or reminder to return. 30-day return rate lifts modestly from 22% to 25%.',
            funnelImpact: { acquisition: '0%', activation: '+2%', retention: '+14%', referral: '+10%', revenue: '+12%' },
            kpiDeltas: { returnRate30d: '+3pp', loyaltyParticipation: '+0pp', avgVisitsYr: '+0.3', ltvcac: '+0.3x' },
          },
        },
        {
          label: 'Create a weekday lunch offer — £8.50 lunch combo to build a habit loop',
          shortDescription: 'Discounted lunch combo targeting nearby office workers for repeat weekday visits',
          consequence: {
            title: 'Lunch traffic grows — margin compression offsets volume',
            description: 'An £8.50 weekday lunch combo (normally £12+). Lunch traffic increases 32% within 6 weeks. 28% of lunch combo customers return within 30 days — higher than the 22% baseline. But margin on the combo is 14% vs 22% on regular orders. The discounted price trains customers to expect the deal — when they visit at dinner, 18% ask for the lunch price. Monthly revenue grows £4,800 but EBITDA improvement is only £670 because of margin compression. The habit loop works but the economics are thin.',
            funnelImpact: { acquisition: '+8%', activation: '+6%', retention: '+18%', referral: '+4%', revenue: '+6%' },
            kpiDeltas: { returnRate30d: '+6pp', loyaltyParticipation: '+2pp', avgVisitsYr: '+0.4', ltvcac: '+0.2x' },
          },
        },
        {
          label: 'Win-back campaign — flyer drop to nearby homes with a "we miss you" voucher',
          shortDescription: 'Target lapsed customers with a physical mailer offering 20% off their next visit',
          consequence: {
            title: 'Reactivation generates a spike — does not fix the model',
            description: 'A flyer drop to 8,000 homes within 1 mile of each location. Estimated 12% reach existing lapsed customers. Redemption rate: 3.4% of flyers — 272 visits. Short-term revenue bump of £3,260. But without capturing contact details, these reactivated customers lapse again at the same rate. 30-day return rate for the overall business is unchanged for new cohorts. The campaign cost £2,400 in printing and distribution — net contribution £860. A symptom treatment, not a structural fix.',
            funnelImpact: { acquisition: '+4%', activation: '+2%', retention: '+4%', referral: '+2%', revenue: '+4%' },
            kpiDeltas: { returnRate30d: '+0pp', loyaltyParticipation: '+0pp', avgVisitsYr: '+0.1', ltvcac: '+0.1x' },
          },
        },
      ],
    },
  },

  // ─── STAGE 4: REFERRAL ────────────────────────────────────────────────────
  referral: {
    brief: 'Grazia\'s viral coefficient is 0.14 — each existing customer generates 0.14 new customers through word of mouth. The benchmark for fast-casual restaurants is 0.35x. Google reviews average 4.1★ with only 82 total reviews across 4 locations — competitors have 300+. Instagram presence is minimal (1,200 followers). 88% of new customers discover Grazia through physical proximity, not recommendation.',

    kpis: [
      { label: 'Google rating',         value: '4.1★',    delta: '82 reviews (Benchmark: 300+)', sentiment: 'neg' },
      { label: 'Viral coefficient',     value: '0.14x',   delta: 'Benchmark: 0.35x',    sentiment: 'neg' },
      { label: 'NPS score',             value: '28',      delta: 'Benchmark: 48',        sentiment: 'neg' },
      { label: 'Referral share of acq.', value: '7%',     delta: 'Benchmark: 22%',       sentiment: 'neg' },
      { label: 'Instagram followers',   value: '1,200',   delta: 'Benchmark: 8,000+',    sentiment: 'neg' },
    ],

    npsDistribution: {
      promoters:  { pct: 24, count: 1400 },
      passives:   { pct: 42, count: 2440 },
      detractors: { pct: 34, count: 1980 },
    },

    referralSources: [
      { source: 'Word of mouth (organic)',   newCustomers: 52,  pctOfTotal: '4.2%' },
      { source: 'Google reviews / Maps',     newCustomers: 24,  pctOfTotal: '1.9%' },
      { source: 'Social media sharing',      newCustomers: 11,  pctOfTotal: '0.9%' },
    ],

    dataSummary: 'Viral coefficient 0.14x — for every 100 customers, Grazia generates 14 new customers through referral. Fast-casual benchmark is 35. NPS 28 — 24% Promoters, 42% Passives, 34% Detractors. The high Detractor share (34%) points to inconsistent experience across locations. Google reviews: 82 total across 4 locations (avg 20.5 per location) vs 300+ benchmark. Rating is 4.1★ — not bad, but low review volume means the listing ranks below competitors with 4.0★ and 400 reviews. Instagram: 1,200 followers with 2.8% engagement — below the 5,000+ threshold where social drives meaningful foot traffic. Only 7% of new customers cite a recommendation as their reason for visiting.',

    novaPrompt: 'Your NPS is 28 with 34% Detractors — that is 1 in 3 customers actively discouraging others from visiting. You have only 82 Google reviews across 4 locations. Before you choose a referral strategy — what does the Detractor rate tell you about whether your problem is a lack of referral mechanics or a product experience that doesn\'t deserve referral?',

    decision: {
      question: 'What is the highest-leverage referral investment for Grazia right now?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Fix the experience first — reduce Detractors before asking for referrals',
          shortDescription: 'Address the 34% Detractor rate through service quality, consistency, and complaint resolution',
          consequence: {
            title: 'Detractor rate falls — organic word of mouth compounds',
            description: 'Investing in service recovery: complaint handling training for all staff, a "make it right" policy (free replacement for any complaint), and weekly location quality audits. Detractor share falls from 34% to 18% over 90 days. NPS lifts from 28 to 44. Viral coefficient lifts from 0.14 to 0.24 organically — without any referral programme. Google rating improves from 4.1 to 4.3★ as negative reviews decrease. This is the compounding fix — a better experience improves retention, referral, and revenue simultaneously.',
            funnelImpact: { acquisition: '+14%', activation: '+6%', retention: '+18%', referral: '+71%', revenue: '+20%' },
            kpiDeltas: { viralCoef: '+0.10x', nps: '+16', googleRating: '+0.2★', cac: '-£0.60' },
          },
        },
        {
          label: 'Launch a Google review campaign — incentivize reviews to boost listing visibility',
          shortDescription: 'Ask every customer to leave a review, offer a free drink for reviews',
          consequence: {
            title: 'Review volume surges — listing visibility improves',
            description: 'Table cards asking for reviews + a free soft drink incentive. Review volume grows from 82 to 280 in 90 days. Google Maps ranking improves — Grazia appears in the top 3 for "Mediterranean food near me" in all 4 areas. Google Maps traffic grows 38%. But the Detractor experience problem means 22% of new reviews are 1-2 stars — the campaign amplifies both good and bad experiences. Rating stays at 4.1★. Viral coefficient lifts to 0.20x.',
            funnelImpact: { acquisition: '+18%', activation: '+2%', retention: '+4%', referral: '+43%', revenue: '+12%' },
            kpiDeltas: { viralCoef: '+0.06x', nps: '+4', googleRating: '+0.0★', cac: '-£0.40' },
          },
        },
        {
          label: 'Build Instagram presence — hire a content creator, run user-generated content',
          shortDescription: 'Invest in social media to build brand awareness and social proof',
          consequence: {
            title: 'Instagram grows — vanity metrics improve, foot traffic minimal',
            description: 'Hiring a part-time content creator for food photography and Reels. Instagram followers grow from 1,200 to 4,800 in 90 days. Engagement rate lifts to 4.2%. But Instagram followers are geographically dispersed — only 28% live within 3 miles of a location. Incremental foot traffic from Instagram: estimated 180 visits/month. Viral coefficient lifts to 0.17x. Social proof improves brand perception but does not meaningfully drive visits. Cost: £1,800/month for content creation.',
            funnelImpact: { acquisition: '+6%', activation: '+2%', retention: '+2%', referral: '+21%', revenue: '+4%' },
            kpiDeltas: { viralCoef: '+0.03x', nps: '+2', googleRating: '+0.0★', cac: '+£0.20' },
          },
        },
        {
          label: 'Launch a "Bring a Friend" promotion — 2-for-1 main course on Tuesdays',
          shortDescription: 'Direct referral incentive to drive trial from friends of existing customers',
          consequence: {
            title: 'Tuesday traffic spikes — margin diluted, Wednesday empty',
            description: 'A 2-for-1 Tuesday promotion drives a 68% increase in Tuesday covers. 42% of Tuesday guests are genuinely new customers brought by existing ones. But margin on 2-for-1 orders is 6% vs 22% normal. Tuesday becomes Grazia\'s busiest and least profitable day. Wednesday traffic drops 14% as customers shift to the deal night. Viral coefficient lifts to 0.22x during the promotion but the customers acquired on a discount show 40% lower retention than full-price customers. Net contribution is marginal after food cost.',
            funnelImpact: { acquisition: '+12%', activation: '+8%', retention: '-4%', referral: '+36%', revenue: '-2%' },
            kpiDeltas: { viralCoef: '+0.08x', nps: '+6', googleRating: '+0.1★', cac: '-£0.30' },
          },
        },
      ],
    },
  },

  // ─── STAGE 5: REVENUE ─────────────────────────────────────────────────────
  revenue: {
    brief: 'Grazia\'s LTV:CAC is 1.2x. A healthy restaurant business needs 3x minimum. Monthly revenue is £82k across 4 locations — £20.5k per location. EBITDA is -£8k/month. Average ticket is £12 with 22% margin. Delivery orders (35% of volume) carry -8% margin after Uber Eats commission. The business is only profitable on dine-in repeat customers who visit 3+ times. The decisions made in the previous four stages determine whether this model can work.',

    kpis: [
      { label: 'Monthly revenue',        value: '£82,000', delta: '+4% YoY',             sentiment: 'neu' },
      { label: 'Avg ticket',             value: '£12.00',  delta: 'Benchmark: £14.50',   sentiment: 'neg' },
      { label: 'EBITDA',                 value: '-£8,000',  delta: 'Cash negative',       sentiment: 'neg' },
      { label: 'LTV:CAC',               value: '1.2x',    delta: 'Target: 3.0x',         sentiment: 'neg' },
      { label: 'Dine-in vs delivery margin', value: '22% vs -8%', delta: 'Delivery is loss-making', sentiment: 'neg' },
    ],

    revenueBreakdown: [
      { source: 'Dine-in (walk-in)',     revenue: 38500, pct: '47%', margin: '24%' },
      { source: 'Dine-in (Google/other)', revenue: 14800, pct: '18%', margin: '22%' },
      { source: 'Delivery (Uber Eats)',  revenue: 21300, pct: '26%', margin: '-8%' },
      { source: 'Delivery (Deliveroo)',  revenue: 7400,  pct: '9%',  margin: '-6%' },
    ],

    ltvcacTrend: {
      months: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
      ltvcac: [1.8, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2, 1.2],
      target: 3.0,
    },

    dataSummary: 'Monthly revenue £82k growing at only 4% YoY — near stagnant. EBITDA -£8k/month. Average ticket £12 vs £14.50 benchmark — menu pricing is below category. Dine-in margin is 22-24% which is viable, but delivery margin is -8% (30% commission on orders where food cost is 38%). Delivery represents 35% of orders and 35% of revenue but generates -£2,290 in monthly losses. The business is profitable on dine-in repeat customers only. LTV:CAC has declined from 1.8x to 1.2x over 8 months as delivery share has grown. If Grazia eliminated all delivery losses, EBITDA would be +£770/month — near breakeven. The delivery channel is the single largest driver of negative EBITDA.',

    novaPrompt: 'Your dine-in margin is 22% and your delivery margin is -8%. Delivery is 35% of orders. Before you choose a revenue lever — calculate how much EBITDA would change if you moved just 20% of delivery orders to direct/dine-in, and what does that tell you about where the real revenue problem is?',

    decision: {
      question: 'Which revenue lever should Grazia prioritise to reach profitability?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Shift delivery to direct ordering — build own channel, reduce commission dependency',
          shortDescription: 'Launch direct ordering with better pricing for customers, recapturing the 30% commission',
          consequence: {
            title: 'Direct ordering recovers margin — delivery P&L transforms',
            description: 'Building a simple direct ordering website and in-app ordering. Delivery customers get 10% lower prices than Uber Eats (funded by the saved commission). Over 90 days, 40% of delivery orders shift to direct channel. Commission costs drop from £8,610/month to £5,160. Direct delivery margin is +16% vs -8% on platform orders. Monthly EBITDA improves from -£8k to -£1.2k. Total delivery revenue drops 8% as some platform-only customers are lost, but every remaining order is profitable. The business reaches near-breakeven without changing dine-in at all.',
            funnelImpact: { acquisition: '-4%', activation: '+2%', retention: '+12%', referral: '+6%', revenue: '+42%' },
            kpiDeltas: { ltvcac: '+0.8x', avgTicket: '+£0.80', ebitda: '+£6,800', grossMargin: '+6pp' },
          },
        },
        {
          label: 'Increase average ticket — menu engineering, upsells, and premium items',
          shortDescription: 'Redesign the menu with anchoring, combos, and premium add-ons to lift spend per visit',
          consequence: {
            title: 'Ticket size lifts — profitable across all channels',
            description: 'Menu engineering: adding a £16 "Feast Plate" as anchor, designing £2.50 premium add-ons (halloumi, extra protein), training staff on suggestive upselling. Average ticket lifts from £12 to £14.20 over 60 days — a 18% increase. Margin improves because add-ons carry 68% margin. Gross margin lifts from 22% to 26% blended. Monthly revenue grows from £82k to £96.8k. EBITDA improves from -£8k to +£2.4k. The business reaches profitability through revenue per customer rather than volume.',
            funnelImpact: { acquisition: '0%', activation: '-2%', retention: '+6%', referral: '+4%', revenue: '+32%' },
            kpiDeltas: { ltvcac: '+0.6x', avgTicket: '+£2.20', ebitda: '+£10,400', grossMargin: '+4pp' },
          },
        },
        {
          label: 'Cut delivery entirely — exit Uber Eats and Deliveroo, go dine-in only',
          shortDescription: 'Eliminate the loss-making channel and focus all energy on profitable dine-in',
          consequence: {
            title: 'Delivery losses eliminated — but revenue drops sharply',
            description: 'Exiting all delivery platforms immediately. Monthly delivery revenue of £28,700 disappears — but so does £8,610 in commission costs and £10,440 in delivery food costs. Net EBITDA impact: +£2,290 from eliminating delivery losses. But 18% of delivery customers also dined in — losing the delivery touchpoint reduces their visit frequency. Dine-in revenue drops 6% from reduced brand visibility. Monthly revenue falls from £82k to £56.2k. EBITDA improves from -£8k to -£5.7k — better, but still negative. The cut was too aggressive.',
            funnelImpact: { acquisition: '-28%', activation: '+4%', retention: '-8%', referral: '-12%', revenue: '-18%' },
            kpiDeltas: { ltvcac: '+0.3x', avgTicket: '+£0.40', ebitda: '+£2,300', grossMargin: '+8pp' },
          },
        },
        {
          label: 'Open for breakfast — add a daypart to increase revenue per location',
          shortDescription: 'Launch a Mediterranean breakfast menu to utilize idle morning capacity',
          consequence: {
            title: 'Breakfast adds revenue — execution complexity drains the team',
            description: 'Launching a breakfast menu (7-11am) across all 4 locations. Requires earlier staff shifts, new supply chain for breakfast ingredients, and menu development. Breakfast generates £6,200/month in incremental revenue at 28% margin after 90 days. But kitchen prep for breakfast overlaps with lunch prep — lunch quality scores drop 8% and wait times increase 3 minutes. Staff overtime costs £2,800/month. Net EBITDA impact: +£940/month. The marginal revenue does not justify the operational complexity and quality risk to the core lunch/dinner business.',
            funnelImpact: { acquisition: '+8%', activation: '-4%', retention: '-6%', referral: '-4%', revenue: '+8%' },
            kpiDeltas: { ltvcac: '+0.1x', avgTicket: '-£0.60', ebitda: '+£940', grossMargin: '+1pp' },
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

export const GRAZIA_NOVA_PROMPTS = {
  acquisition: {
    entry: 'Uber Eats takes 30% commission on orders where your dine-in margin is 22%. Before you touch the sliders — what is Grazia\'s actual margin on a delivery order, and what does that tell you about whether delivery is an acquisition channel or a margin destroyer?',
    decision: 'You\'ve set your allocation. Before you lock in — look at the ROAS column in the channels table. Which channel has the highest return per pound spent, and is it getting a proportional share of your budget?',
    postConsequence: 'Your acquisition decision changed the channel mix. How does the new delivery share compare to before, and what does that mean for the overall margin of every order Grazia fulfils?',
  },
  activation: {
    entry: 'Your delivery app conversion is 24% and your dine-in conversion is 62%. Your menu has 54 items. Before you rank your hypotheses — what is the relationship between menu size and conversion on a delivery app where customers see items on a 5-inch screen?',
    decision: 'You\'ve ranked your hypotheses. Look at the conversion rates by source — which channel has the biggest gap between current and benchmark, and does your top hypothesis explain that gap?',
    postConsequence: 'Your activation rate changed. If you now convert X% of your 14,200 monthly sessions, how many more orders does Grazia serve per month — and at the current margin, what does that add to EBITDA?',
  },
  retention: {
    entry: 'Your weekly regulars have 92% retention and £640 LTV. Your one-and-done customers have 0% retention and £12 LTV. Before you choose a retention lever — 68% of your customers walk out the door and you have no way to contact them. What does that tell you about whether this is a product problem or a capture problem?',
    decision: 'You\'ve chosen your retention lever. A customer needs 3 visits to become profitable. If your lever works as intended, what percentage of customers will now reach visit 3 — and is that enough to make Grazia\'s unit economics work?',
    postConsequence: 'Your 30-day return rate changed. Using the new rate, estimate how many customers per month now reach the profitability threshold of 3 visits. What does that do to monthly EBITDA?',
  },
  referral: {
    entry: 'Your NPS is 28 with 34% Detractors — that is 1 in 3 customers actively discouraging others from visiting. You have only 82 Google reviews across 4 locations. Before you choose a referral strategy — what does the Detractor rate tell you about whether your problem is a lack of referral mechanics or a product experience that doesn\'t deserve referral?',
    decision: 'You\'ve chosen your referral strategy. If the viral coefficient lifts to your projected level, how many new customers per month come through referral instead of paid channels — and what does that save on acquisition cost?',
    postConsequence: 'Your viral coefficient changed. Restaurants live and die by local reputation. How does your new Google rating and review volume compare to competitors, and what is the compounding effect on local search visibility?',
  },
  revenue: {
    entry: 'Your dine-in margin is 22% and your delivery margin is -8%. Delivery is 35% of orders. Before you choose a revenue lever — calculate how much EBITDA would change if you moved just 20% of delivery orders to direct/dine-in, and what does that tell you about where the real revenue problem is?',
    decision: 'You\'ve chosen your revenue lever. Walk through the maths: if it performs as projected, what will the new monthly EBITDA be — and does Grazia finally reach profitability?',
    postConsequence: 'You\'ve made all five AARRR decisions. Which single intervention had the biggest impact on Grazia\'s path to profitability — and was it a revenue fix, a retention fix, or something upstream? What would you tell the owner to do first thing Monday morning?',
  },
};
