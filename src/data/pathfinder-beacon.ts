// ─────────────────────────────────────────────────────────────────────────────
// PATHFINDER — Beacon Archetype (D2C Premium Skincare, Subscription-First)
// Full AARRR data spec: 5 stages × 1 decision × 4 options × consequence objects
// ─────────────────────────────────────────────────────────────────────────────

export const BEACON_ARCHETYPE = {
  id: 'beacon',
  name: 'Beacon',
  type: 'D2C Premium Skincare',
  tagline: 'Subscription-first skincare. 2 years live. NPS 72 — but payments keep failing.',
  description: 'Beacon sells a premium daily serum kit at £38/month via subscription-default checkout. Monthly revenue £142k with 3,800 active subscribers. The product is loved (NPS 72) but involuntary churn — failed payments, expired cards — is 14%/month, dwarfing the 6% voluntary churn. iOS privacy changes have broken influencer attribution, inflating wasted spend and compressing EBITDA to £6k/month.',
  color: '#E890B0',

  // ─── FUNNEL HEALTH SNAPSHOT ───────────────────────────────────────────────
  // Shown at top of every stage as the animated funnel bar
  funnelHealth: {
    acquisition: { value: 11200, label: 'Monthly sessions', benchmark: 14000, unit: 'sessions', sentiment: 'neu' },
    activation:  { value: 48,    label: 'Sub attach rate',  benchmark: 55,    unit: '%',        sentiment: 'neu' },
    retention:   { value: 80,    label: 'Voluntary retention', benchmark: 92, unit: '%',        sentiment: 'neg' },
    referral:    { value: 0.34,  label: 'Viral coefficient',benchmark: 0.5,   unit: 'x',        sentiment: 'neu' },
    revenue:     { value: 2.6,   label: 'LTV:CAC',         benchmark: 4.0,    unit: 'x',        sentiment: 'neg' },
  },

  // ─── STAGE 1: ACQUISITION ─────────────────────────────────────────────────
  acquisition: {
    brief: 'Beacon spends £22,600/month on acquisition, primarily through Instagram influencers. CAC is £52 — up from £34 twelve months ago. The iOS ATT framework broke last-click attribution: Beacon can see that influencer content drives engagement but cannot attribute which creators drive actual subscription sign-ups. 40% of spend may be wasted but the team cannot tell which 40%.',

    kpis: [
      { label: 'Monthly sessions',    value: '11,200', delta: 'Benchmark: 14,000',  sentiment: 'neu' },
      { label: 'Blended CAC',         value: '£52',    delta: '+£18 in 12 months',  sentiment: 'neg' },
      { label: 'Influencer spend',    value: '62%',    delta: 'Of total budget',     sentiment: 'neg' },
      { label: 'Attribution confidence', value: '31%', delta: 'Was 78% pre-ATT',     sentiment: 'neg' },
      { label: 'Organic sessions',    value: '2,680',  delta: '+6% MoM',            sentiment: 'pos' },
    ],

    channels: [
      { name: 'Influencer (Instagram)', spend: 14000, sessions: 4200, cac: '£68',  roas: '1.4x', signal: 'neg' },
      { name: 'Meta Ads',               spend: 4800,  sessions: 2100, cac: '£42',  roas: '2.1x', signal: 'neu' },
      { name: 'Google Search',          spend: 2400,  sessions: 1340, cac: '£28',  roas: '3.2x', signal: 'pos' },
      { name: 'Organic / SEO',          spend: 0,     sessions: 2680, cac: '£0',   roas: '—',    signal: 'pos' },
      { name: 'Email / CRM',            spend: 1400,  sessions: 880,  cac: '£0',   roas: '—',    signal: 'pos' },
    ],

    dataSummary: 'Monthly sessions 11,200 — below the 14,000 benchmark for a brand at £142k MRR. Blended CAC £52, up from £34 twelve months ago. Influencer spend is 62% of total budget at £14,000/month, but attribution confidence is only 31% post-ATT — Beacon cannot reliably tell which influencers drive subscriptions vs which drive vanity engagement. The influencer channel reports a £68 CAC and 1.4x ROAS, but these numbers are unreliable. Google Search at £28 CAC and 3.2x ROAS is the most efficient channel but receives only 11% of budget. Organic sessions are 2,680 (24% of traffic) and growing at 6% MoM — the only channel with reliable attribution and zero marginal cost.',

    novaPrompt: 'Your influencer channel takes 62% of budget at a reported 1.4x ROAS — but attribution confidence is only 31%. Before you touch the sliders, what does 31% attribution confidence actually mean for that ROAS number, and how would you test whether the true ROAS is higher or lower?',

    decision: {
      question: 'How should Beacon reallocate its £22,600 monthly acquisition budget given broken attribution?',
      mechanic: 'sliders',
      totalBudget: 22600,
      currency: '£',
      threshold: 0.35,
      spreadThinIdx: 2,
      options: [
        {
          label: 'Double down on influencers — increase spend and add more creators',
          shortDescription: 'Scale what built the brand, accept attribution uncertainty',
          consequence: {
            title: 'Reach grows — waste compounds invisibly',
            description: 'Influencer spend increases to £18,000/month across 24 creators. Sessions grow 22% as content volume increases. But without attribution, Beacon cannot distinguish high-performing creators from low-performing ones. Post-hoc analysis after 90 days reveals 8 of the 24 creators drove zero trackable conversions — £6,000/month wasted. CAC rises to £61. The brand feels bigger but the economics worsen.',
            funnelImpact: { acquisition: '+22%', activation: '-2%', retention: '0%', referral: '+6%', revenue: '+4%' },
            kpiDeltas: { sessions: '+2,460', cac: '+£9', organicShare: '-6pp', ltvcac: '-0.3x' },
          },
        },
        {
          label: 'Build an attribution system — discount codes, UTMs, post-purchase surveys',
          shortDescription: 'Fix the measurement problem before reallocating budget',
          consequence: {
            title: 'Attribution recovers — spend efficiency revealed',
            description: 'Unique discount codes per influencer, mandatory post-purchase survey ("How did you hear about us?"), and UTM-tagged landing pages. Attribution confidence lifts from 31% to 64% within 60 days. Data reveals 4 creators drive 72% of influencer conversions. Beacon reallocates spend to top performers. Influencer CAC falls from £68 to £44. Blended CAC drops to £41. Sessions hold steady. No new traffic — but every pound works harder.',
            funnelImpact: { acquisition: '+4%', activation: '+3%', retention: '0%', referral: '0%', revenue: '+16%' },
            kpiDeltas: { sessions: '+450', cac: '-£11', organicShare: '+0pp', ltvcac: '+0.5x' },
          },
        },
        {
          label: 'Shift budget to measurable channels — Google Search, SEO, email',
          shortDescription: 'Move spend to channels where attribution is reliable',
          consequence: {
            title: 'Efficient acquisition — but brand awareness drops',
            description: 'Moving £8,000 from influencer to Google Search (£4,000) and SEO content (£4,000). Google CAC is £28 and fully trackable. Blended CAC falls from £52 to £38. But influencer reach drops — Instagram brand mentions fall 44% over 90 days. Top-of-funnel awareness shrinks. Google captures existing demand but does not create new demand. Sessions hold at 11,200 but new subscriber growth slows by 12% as the brand awareness pipeline narrows.',
            funnelImpact: { acquisition: '-6%', activation: '+5%', retention: '0%', referral: '-8%', revenue: '+10%' },
            kpiDeltas: { sessions: '-670', cac: '-£14', organicShare: '+12pp', ltvcac: '+0.4x' },
          },
        },
        {
          label: 'Spread budget evenly — test all channels at equal weight',
          shortDescription: 'Diversify to reduce risk from any single channel',
          consequence: {
            title: 'Diluted execution — attribution stays broken',
            description: 'Equal allocation across influencer, Meta, Google, SEO, and email. No channel receives enough spend to generate statistically significant attribution data. Influencer content volume drops — creators require minimum commitments that equal spend cannot meet. Google Search bids become uncompetitive. SEO content cadence is too low to build topical authority. Blended CAC stays at £52. The attribution problem remains unsolved.',
            funnelImpact: { acquisition: '+1%', activation: '0%', retention: '0%', referral: '-2%', revenue: '+1%' },
            kpiDeltas: { sessions: '+110', cac: '+£2', organicShare: '+2pp', ltvcac: '-0.1x' },
          },
        },
      ],
    },
  },

  // ─── STAGE 2: ACTIVATION ──────────────────────────────────────────────────
  activation: {
    brief: 'Of every 100 visitors who land on the Beacon site, 6.8 start a subscription — but only 48% of total purchasers choose subscription over one-time purchase. The subscription attach rate benchmark for subscription-default brands is 55%. The gap is not at checkout — the checkout default is already subscription. The gap is that 31% of visitors who add to cart actively switch from subscription to one-time before completing purchase.',

    kpis: [
      { label: 'Overall CVR',             value: '6.8%',  delta: 'Benchmark: 7.5%',     sentiment: 'neu' },
      { label: 'Sub attach rate',          value: '48%',   delta: 'Benchmark: 55%',      sentiment: 'neg' },
      { label: 'Cart → sub switch-off',   value: '31%',   delta: 'Benchmark: 18%',      sentiment: 'neg' },
      { label: 'First delivery → use',    value: '72%',   delta: 'Benchmark: 88%',      sentiment: 'neg' },
      { label: 'Day 30 active rate',       value: '61%',   delta: 'Benchmark: 78%',      sentiment: 'neg' },
    ],

    funnel: [
      { stage: 'Sessions',              value: 11200 },
      { stage: 'PDP views',             value: 7840  },
      { stage: 'Add to cart',           value: 1880  },
      { stage: 'Checkout started',      value: 1504  },
      { stage: 'Purchase (any)',        value: 762   },
      { stage: 'Subscription attached', value: 366   },
    ],

    bySource: [
      { source: 'Influencer',    cvr: '5.4%', timeToConvert: '4.8 days', pdpToCart: '21%' },
      { source: 'Meta Ads',      cvr: '4.8%', timeToConvert: '6.2 days', pdpToCart: '17%' },
      { source: 'Google Search', cvr: '9.2%', timeToConvert: '1.4 days', pdpToCart: '34%' },
      { source: 'Organic',       cvr: '10.8%', timeToConvert: '0.9 days', pdpToCart: '38%' },
      { source: 'Email',         cvr: '14.2%', timeToConvert: '0.4 days', pdpToCart: '52%' },
    ],

    dataSummary: 'Overall CVR 6.8% vs 7.5% benchmark — decent but not best-in-class. The critical metric is subscription attach rate: 48% vs 55% benchmark. Checkout is subscription-default (pre-selected) but 31% of customers actively deselect subscription at checkout — nearly double the 18% benchmark switch-off rate. Post-purchase, only 72% of subscribers who receive their first delivery actually use the product within 14 days (vs 88% benchmark). Day 30 active rate is 61% — meaning 39% of subscribers are paying but not using the product, creating a churn time bomb. The activation problem is not "can we get them to buy" — it is "can we get them to commit to and use the subscription."',

    novaPrompt: 'Your subscription is pre-selected at checkout, yet 31% of customers actively switch it off. Before you rank your hypotheses — is the problem that customers do not want a subscription, or that they do not yet trust the product enough to commit monthly? What data point helps you distinguish between those two explanations?',

    decision: {
      question: 'Why are 31% of customers actively deselecting subscription at checkout — and what is the primary activation failure?',
      mechanic: 'ranking',
      options: [
        {
          label: 'Subscription value not communicated — customers see recurring cost, not recurring benefit',
          shortDescription: 'The checkout shows price/month but does not explain why subscription is better',
          consequence: {
            title: 'Value framing shifts behaviour — attach rate lifts',
            description: 'Redesigning the subscription option to lead with benefits: "Your skin renews every 28 days — so should your serum." Adding a cost-per-day breakdown (£1.27/day), showing savings vs one-time (£38 vs £46), and a visible "pause anytime" badge. Sub switch-off rate drops from 31% to 19%. Attach rate lifts from 48% to 57%. Day 30 active rate also improves because expectation-setting at checkout carries through to product use.',
            funnelImpact: { acquisition: '0%', activation: '+19%', retention: '+12%', referral: '+6%', revenue: '+24%' },
            kpiDeltas: { subAttach: '+9pp', switchOff: '-12pp', day30Active: '+8pp', ltvcac: '+0.6x' },
          },
        },
        {
          label: 'First delivery experience fails — product arrives but customers do not build a routine',
          shortDescription: 'Subscribers receive the product but 28% never use it consistently',
          consequence: {
            title: 'Onboarding redesigned — usage rate improves',
            description: 'Adding a "getting started" ritual card in the first box, a 7-day SMS drip with usage reminders, and a day 14 check-in email. First delivery use rate lifts from 72% to 84%. Day 30 active rate improves from 61% to 71%. Voluntary churn in month 2 drops from 6% to 4.2%. But the subscription attach rate at checkout is unchanged — this intervention helps those who subscribe but does not convert more subscribers.',
            funnelImpact: { acquisition: '0%', activation: '+12%', retention: '+18%', referral: '+10%', revenue: '+14%' },
            kpiDeltas: { subAttach: '+0pp', switchOff: '+0pp', day30Active: '+10pp', ltvcac: '+0.4x' },
          },
        },
        {
          label: 'Commitment anxiety — customers fear being locked into a subscription they cannot cancel',
          shortDescription: 'The "subscribe" button triggers loss aversion even when cancellation is easy',
          consequence: {
            title: 'Flexibility messaging reduces anxiety — moderate attach lift',
            description: 'Adding prominent "skip, pause, or cancel anytime — no questions asked" messaging at checkout and in confirmation emails. Including a one-click pause button in the subscription portal. Sub switch-off rate drops from 31% to 25%. Attach rate lifts to 52%. Improvement is real but moderate — flexibility messaging addresses the fear but does not create desire for the subscription.',
            funnelImpact: { acquisition: '0%', activation: '+8%', retention: '+6%', referral: '+4%', revenue: '+10%' },
            kpiDeltas: { subAttach: '+4pp', switchOff: '-6pp', day30Active: '+3pp', ltvcac: '+0.2x' },
          },
        },
        {
          label: 'Price anchoring — £38/month feels expensive without a reference frame',
          shortDescription: 'Customers compare to drugstore alternatives and balk at the monthly commitment',
          consequence: {
            title: 'Price anchoring tested — conversion lifts but margin erodes',
            description: 'Introducing a £29/month "essentials" tier alongside the £38 "complete" kit. The essentials tier captures 34% of new subscribers. Attach rate lifts to 54%. But AOV falls from £38 to £33 blended. Gross margin compresses from 64% to 58% on the essentials tier. Total subscription revenue grows 8% but revenue per subscriber drops 13%. The cheaper tier also has 22% higher voluntary churn — price-sensitive subscribers are less loyal.',
            funnelImpact: { acquisition: '+4%', activation: '+12%', retention: '-4%', referral: '+2%', revenue: '+4%' },
            kpiDeltas: { subAttach: '+6pp', switchOff: '-8pp', day30Active: '+2pp', ltvcac: '-0.1x' },
          },
        },
      ],
    },
  },

  // ─── STAGE 3: RETENTION ───────────────────────────────────────────────────
  retention: {
    brief: 'Beacon\'s total monthly churn is 20% — but the composition matters enormously. Voluntary churn is only 6% (customers who actively cancel). Involuntary churn is 14% — failed payments from expired cards, insufficient funds, and payment processor errors. For every customer who chooses to leave, 2.3 customers are lost to payment infrastructure failures. NPS is 72 — the product is not the problem. The billing system is.',

    kpis: [
      { label: 'Total monthly churn',     value: '20%',    delta: 'Benchmark: 8%',        sentiment: 'neg' },
      { label: 'Voluntary churn',         value: '6%',     delta: 'Benchmark: 5%',        sentiment: 'neu' },
      { label: 'Involuntary churn',       value: '14%',    delta: 'Benchmark: 3%',        sentiment: 'neg' },
      { label: 'Dunning recovery rate',   value: '12%',    delta: 'Benchmark: 45%',       sentiment: 'neg' },
      { label: 'NPS (active subscribers)', value: '72',    delta: 'Strong — product loved', sentiment: 'pos' },
    ],

    cohortMonths: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    m1: [82, 81, 80, 79, 80, 81, 80, 80],
    m2: [68, 66, 64, 63, 65, 66, 65, null],
    m3: [56, 54, 52, 50, 52, 54, null, null],
    m4: [46, 44, 42, 40, 41, null, null, null],
    m5: [38, 36, 34, 32, null, null, null, null],
    m6: [31, 29, 28, null, null, null, null, null],

    benchmarkM1: 92,

    segments: [
      { name: 'Active users (use product regularly)',  count: 2280, m1: '92%', ltv: '£342', churn: '4%/mo' },
      { name: 'Passive subscribers (paying, not using)', count: 760, m1: '71%', ltv: '£186', churn: '11%/mo' },
      { name: 'Payment-failed (involuntary)',          count: 532, m1: '18%', ltv: '£82',  churn: '68%/mo' },
      { name: 'Cancelled (voluntary)',                 count: 228, m1: '0%',  ltv: '£114', churn: '100%' },
    ],

    dataSummary: 'Total monthly churn 20% vs 8% benchmark — 2.5x worse than category. But the breakdown reveals the real story: voluntary churn is 6% (close to 5% benchmark), while involuntary churn is 14% (nearly 5x the 3% benchmark). The dunning recovery rate is catastrophic at 12% — meaning when a payment fails, Beacon recovers only 12 of every 100 subscribers vs the 45% industry benchmark. 532 subscribers are currently in failed-payment limbo. Active users who regularly use the product have 92% M1 retention and £342 LTV — proving the product works. The churn problem is not product quality. It is payment infrastructure. Beacon is losing £20,200/month in subscriber revenue to failed payments alone.',

    novaPrompt: 'Your voluntary churn is 6% and your involuntary churn is 14%. Your NPS is 72. Before you choose a retention lever — if you could wave a magic wand and fix only one of these two churn types completely, which one would have a bigger impact on revenue, and by how much?',

    decision: {
      question: 'Which retention lever should Beacon invest in first?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Fix involuntary churn — implement smart dunning, card updater, and retry logic',
          shortDescription: 'Attack the 14% involuntary churn with payment infrastructure',
          consequence: {
            title: 'Dunning system transforms retention — revenue recovers',
            description: 'Implementing a 3-layer dunning system: (1) automatic card updater via Stripe network tokens — recovers 28% of expired cards silently, (2) intelligent retry logic that retries failed payments at optimal times based on failure reason — recovers another 22%, (3) personalised SMS/email dunning sequence for remaining failures — recovers 18% more. Total dunning recovery lifts from 12% to 54%. Involuntary churn drops from 14% to 6.4%. Total monthly churn falls to 12.4%. Revenue recovered: £14,800/month from retained subscribers. This is the highest-ROI intervention because it saves customers who already want to stay.',
            funnelImpact: { acquisition: '0%', activation: '0%', retention: '+54%', referral: '+8%', revenue: '+34%' },
            kpiDeltas: { totalChurn: '-7.6pp', involuntaryChurn: '-7.6pp', dunningRecovery: '+42pp', ltvcac: '+0.9x' },
          },
        },
        {
          label: 'Reduce voluntary churn — improve product experience, add personalisation',
          shortDescription: 'Make the subscription more valuable so fewer people actively cancel',
          consequence: {
            title: 'Voluntary churn improves — but it was already low',
            description: 'Launching personalised skin assessments, seasonal product adjustments, and a quarterly "skin check-in" video call with a dermatologist. Voluntary churn drops from 6% to 4.2%. NPS lifts from 72 to 78. But involuntary churn remains at 14% — 532 subscribers still churning from failed payments. Total churn improves from 20% to 18.2%. Revenue impact: +£2,400/month from retained voluntary subscribers. The product experience was already good (NPS 72). Improving it further yields diminishing returns while the payment infrastructure hemorrhages revenue.',
            funnelImpact: { acquisition: '+4%', activation: '+6%', retention: '+9%', referral: '+16%', revenue: '+8%' },
            kpiDeltas: { totalChurn: '-1.8pp', voluntaryChurn: '-1.8pp', dunningRecovery: '+0pp', ltvcac: '+0.2x' },
          },
        },
        {
          label: 'Win back churned subscribers — reactivation campaign for lost subscribers',
          shortDescription: 'Email and SMS sequence targeting the 1,840 subscribers lost in the last 6 months',
          consequence: {
            title: 'Reactivation generates a one-time bump — does not fix the leak',
            description: 'Reactivation campaign to 1,840 lapsed subscribers with a "we miss you" offer (first month free on resubscription). 8.4% reactivation rate — 155 subscribers return. Revenue bump of £5,890/month. But without fixing the dunning system, 14% of reactivated subscribers churn again within 60 days from the same payment failures. The campaign treats the symptom. 90-day net retention of reactivated subscribers is only 48%.',
            funnelImpact: { acquisition: '0%', activation: '0%', retention: '+6%', referral: '+4%', revenue: '+10%' },
            kpiDeltas: { totalChurn: '+0pp', involuntaryChurn: '+0pp', dunningRecovery: '+0pp', ltvcac: '+0.2x' },
          },
        },
        {
          label: 'Introduce annual plans — lock in commitment to reduce monthly churn surface area',
          shortDescription: 'Offer £380/year (17% discount) to shift subscribers from monthly to annual',
          consequence: {
            title: 'Annual plans convert — mixed results',
            description: 'Launching an annual plan at £380/year (£31.67/month equivalent, 17% discount vs £38/month). 22% of existing monthly subscribers convert to annual within 90 days — 836 subscribers. Churn for annual subscribers drops to 2%/month (annual = one payment point per year). But gross margin on annual plans is 52% vs 64% on monthly due to the discount. Revenue per subscriber falls. And the involuntary churn problem for remaining monthly subscribers is unchanged at 14%. Total blended churn improves to 16.2% — better, but the core infrastructure problem persists.',
            funnelImpact: { acquisition: '0%', activation: '-4%', retention: '+19%', referral: '+6%', revenue: '+6%' },
            kpiDeltas: { totalChurn: '-3.8pp', involuntaryChurn: '-2.8pp', dunningRecovery: '+0pp', ltvcac: '+0.3x' },
          },
        },
      ],
    },
  },

  // ─── STAGE 4: REFERRAL ────────────────────────────────────────────────────
  referral: {
    brief: 'Beacon\'s viral coefficient is 0.34 — each existing subscriber generates 0.34 new customers through word of mouth. NPS is 72 — meaning the subscriber base is full of Promoters who love the product. But organic referral is underperforming because Beacon has never built the infrastructure to make sharing easy. Before/after skin photos are the highest-converting content type (4.2x average engagement) but only 8% of subscribers have ever shared one.',

    kpis: [
      { label: 'NPS score',              value: '72',    delta: 'Benchmark: 55',      sentiment: 'pos' },
      { label: 'Viral coefficient',      value: '0.34x', delta: 'Benchmark: 0.5x',   sentiment: 'neu' },
      { label: 'UGC submission rate',    value: '8%',    delta: 'Benchmark: 22%',     sentiment: 'neg' },
      { label: 'Referral prog. part.',   value: '11%',   delta: 'Benchmark: 18%',     sentiment: 'neg' },
      { label: 'Before/after share rate', value: '3.2%', delta: 'Benchmark: 12%',     sentiment: 'neg' },
    ],

    npsDistribution: {
      promoters:  { pct: 54, count: 2052 },
      passives:   { pct: 32, count: 1216 },
      detractors: { pct: 14, count: 532 },
    },

    referralSources: [
      { source: 'Word of mouth (organic)',  newCustomers: 142, pctOfTotal: '18.6%' },
      { source: 'Referral programme',       newCustomers: 86,  pctOfTotal: '11.3%' },
      { source: 'UGC / social sharing',     newCustomers: 34,  pctOfTotal: '4.5%' },
    ],

    dataSummary: 'Viral coefficient 0.34x — for every 100 subscribers, Beacon generates 34 new customers through word of mouth. Benchmark is 50. NPS 72 — 54% Promoters, 32% Passives, 14% Detractors. The high Promoter share is unusual in this category and represents untapped referral potential. But UGC submission rate is only 8% vs 22% benchmark — subscribers love the product but are not sharing their experience. Before/after skin photos are the highest-converting content type on Instagram (4.2x average engagement rate) but only 3.2% of subscribers have ever shared one. The referral programme exists but participation is 11% — 89% of subscribers have never referred anyone despite high satisfaction. The gap between NPS and referral is an infrastructure and incentive problem, not a product problem.',

    novaPrompt: 'Your NPS is 72 with 54% Promoters — yet only 8% have ever shared UGC and 11% have used the referral programme. Before you choose a referral lever, what is the difference between a customer who loves your product and a customer who actively tells others about it — and what bridges that gap?',

    decision: {
      question: 'What is the highest-leverage referral investment for Beacon right now?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Build a before/after photo engine — make it effortless to capture and share skin progress',
          shortDescription: 'In-app photo tool with consistent lighting, guided selfie, and one-tap sharing',
          consequence: {
            title: 'Before/after engine activates Promoters — UGC explodes',
            description: 'Building a "Skin Diary" feature: guided selfie at consistent angles and lighting at day 1, 30, 60, 90. Automated side-by-side generation. One-tap share to Instagram Stories with Beacon branding. Before/after share rate lifts from 3.2% to 14.8%. Each shared before/after generates 3.8 site visits on average. UGC submission rate lifts from 8% to 26%. Viral coefficient improves from 0.34 to 0.52. Referred customers from before/after content convert at 2.6x the rate of paid traffic because the social proof is visual and personal.',
            funnelImpact: { acquisition: '+22%', activation: '+8%', retention: '+6%', referral: '+53%', revenue: '+18%' },
            kpiDeltas: { viralCoef: '+0.18x', ugcRate: '+18.8pp', organicShare: '+14pp', cac: '-£9' },
          },
        },
        {
          label: 'Rebuild the referral programme — higher incentive, easier mechanics',
          shortDescription: 'Current programme is functional but uninspiring — double-sided reward, one-click share',
          consequence: {
            title: 'Referral programme participation lifts — meaningful but bounded',
            description: 'Switching to double-sided reward: referrer gets a free month (£38 credit), friend gets 25% off first 3 months. One-click referral link in subscription management portal. Post-delivery email trigger: "Love your serum? Share with a friend." Participation lifts from 11% to 19%. Viral coefficient improves from 0.34 to 0.44. But the programme primarily activates existing Promoters — it does not convert Passives into advocates. The referral quality is high (referred subscribers retain 18% better than paid) but the total volume is capped by the willing-to-refer base.',
            funnelImpact: { acquisition: '+14%', activation: '+4%', retention: '+8%', referral: '+29%', revenue: '+12%' },
            kpiDeltas: { viralCoef: '+0.10x', ugcRate: '+4pp', organicShare: '+8pp', cac: '-£6' },
          },
        },
        {
          label: 'Launch an influencer seeding programme — send free product to micro-influencers',
          shortDescription: 'Seed product to 200 micro-influencers (5k-50k followers) per month for organic content',
          consequence: {
            title: 'Seeding generates content — attribution remains weak',
            description: 'Sending free serum kits to 200 micro-influencers per month. Cost: £3,200/month (product + shipping). 34% post rate — 68 posts per month. Total impressions: 1.8M per month. But the iOS attribution problem means Beacon cannot track how many of those impressions convert to subscribers. Estimated 120 new subscribers per month from seeding but confidence interval is wide (60-220). Viral coefficient lifts to 0.41 — but the measurement is unreliable. The seeding creates a new unattributable spend line that compounds the existing attribution problem.',
            funnelImpact: { acquisition: '+16%', activation: '+2%', retention: '0%', referral: '+21%', revenue: '+8%' },
            kpiDeltas: { viralCoef: '+0.07x', ugcRate: '+6pp', organicShare: '+4pp', cac: '-£2' },
          },
        },
        {
          label: 'Build a subscriber community — private group for skincare routines and support',
          shortDescription: 'Brand-owned community where subscribers share routines and results',
          consequence: {
            title: 'Community builds slowly — deep engagement, narrow reach',
            description: 'Launching a private Instagram Close Friends group and Discord for subscribers. 480 subscribers join in 60 days — 12.6% of active base. Daily active rate 34%. Community members have 96% M1 retention and refer at 4x the rate of non-members. But reach is limited — community content stays inside the community rather than reaching new audiences. Viral coefficient at 90 days: 0.38x. At 12 months: projected 0.48x. The community deepens loyalty for those inside it but does not scale referral broadly.',
            funnelImpact: { acquisition: '+6%', activation: '+6%', retention: '+14%', referral: '+12%', revenue: '+6%' },
            kpiDeltas: { viralCoef: '+0.04x', ugcRate: '+8pp', organicShare: '+3pp', cac: '-£3' },
          },
        },
      ],
    },
  },

  // ─── STAGE 5: REVENUE ─────────────────────────────────────────────────────
  revenue: {
    brief: 'Beacon\'s LTV:CAC is 2.6x — below the 4.0x target for a subscription-first brand. Monthly revenue is £142,000 with EBITDA of £6,000 (4.2% margin). The business was at £18,000 EBITDA twelve months ago — the decline is driven entirely by rising CAC (attribution loss inflated wasted spend) and involuntary churn (payment failures leak subscribers). The subscription model should produce 15-20% EBITDA margins at this scale. The gap between actual and potential is £15,000-£22,000/month.',

    kpis: [
      { label: 'Monthly revenue',       value: '£142,000', delta: '+8% MoM',             sentiment: 'pos' },
      { label: 'Gross margin',          value: '64%',      delta: 'Target: 68%',          sentiment: 'neu' },
      { label: 'EBITDA',                value: '£6,000',   delta: 'Was £18k 12 months ago', sentiment: 'neg' },
      { label: 'LTV:CAC',              value: '2.6x',     delta: 'Target: 4.0x',          sentiment: 'neg' },
      { label: 'Revenue per subscriber', value: '£37.40', delta: 'Benchmark: £42',        sentiment: 'neg' },
    ],

    revenueBreakdown: [
      { source: 'Monthly subscriptions', revenue: 86400,  pct: '61%', margin: '64%' },
      { source: 'Annual subscriptions',  revenue: 19200,  pct: '14%', margin: '58%' },
      { source: 'One-time purchases',    revenue: 24100,  pct: '17%', margin: '52%' },
      { source: 'Add-on products',       revenue: 12300,  pct: '8%',  margin: '72%' },
    ],

    ltvcacTrend: {
      months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      ltvcac: [3.4, 3.2, 3.1, 2.9, 2.8, 2.7, 2.6, 2.6],
      target: 4.0,
    },

    dataSummary: 'Monthly revenue £142,000 growing at 8% MoM. Gross margin 64% against a 68% target. EBITDA £6,000 — 4.2% margin, down from £18,000 twelve months ago. LTV:CAC has declined from 3.4x to 2.6x over 8 months. Monthly subscriptions are the core at 61% of revenue with 64% margin. One-time purchases are 17% of revenue at 52% margin — these are customers who deselected subscription at checkout. Add-on products (eye cream, SPF, cleanser) are only 8% of revenue but carry the highest margin at 72%. Revenue per subscriber is £37.40 against a £42 benchmark — subscribers are under-monetised because cross-sell and upsell are minimal. The £6k EBITDA gap to target is addressable: fixing involuntary churn alone would add £14,800/month in retained revenue.',

    novaPrompt: 'Your EBITDA was £18,000 twelve months ago and is now £6,000. The product has not changed — NPS is still 72. Before you choose a monetisation lever, decompose the £12,000 decline: how much is from rising CAC, how much from involuntary churn, and which lever recovers it faster?',

    decision: {
      question: 'Which monetisation lever should Beacon prioritise to reach LTV:CAC of 4.0x?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Launch a cross-sell engine — personalised add-on recommendations for subscribers',
          shortDescription: 'Email and in-portal upsell for eye cream, SPF, cleanser based on skin profile',
          consequence: {
            title: 'Cross-sell lifts revenue per subscriber — highest margin growth',
            description: 'Building a personalised product recommendation engine based on skin assessment data from onboarding. Post-delivery email at day 7: "Based on your skin type, add our Vitamin C eye cream for £12/month." In-portal "complete your routine" module. 18% of subscribers add at least one product within 60 days. Revenue per subscriber lifts from £37.40 to £44.20. Add-on revenue grows from £12,300 to £28,600/month. Gross margin improves because add-ons carry 72% margin. EBITDA lifts by £11,400/month. LTV:CAC reaches 3.2x.',
            funnelImpact: { acquisition: '0%', activation: '+4%', retention: '+8%', referral: '+6%', revenue: '+28%' },
            kpiDeltas: { ltvcac: '+0.6x', revenuePerSub: '+£6.80', ebitda: '+£11.4k', grossMargin: '+3pp' },
          },
        },
        {
          label: 'Introduce premium tier — £58/month "Clinical" subscription with advanced actives',
          shortDescription: 'Higher-price tier with retinol, peptides, and quarterly dermatologist consultation',
          consequence: {
            title: 'Premium tier captures willingness to pay — but cannibalises core',
            description: 'Launching "Beacon Clinical" at £58/month — premium actives (retinol, peptides), quarterly video dermatologist consultation, and priority customer service. 14% of existing subscribers upgrade within 90 days. 22% of new subscribers choose Clinical. Revenue per subscriber lifts to £42.60 blended. But 8% of upgraders would have stayed on the £38 plan — partial cannibalisation. Net new revenue: £8,200/month. EBITDA lifts by £5,800/month. Premium subscribers have 94% M1 retention. LTV:CAC reaches 3.0x.',
            funnelImpact: { acquisition: '+6%', activation: '-2%', retention: '+12%', referral: '+10%', revenue: '+18%' },
            kpiDeltas: { ltvcac: '+0.4x', revenuePerSub: '+£5.20', ebitda: '+£5.8k', grossMargin: '+2pp' },
          },
        },
        {
          label: 'Push annual plans aggressively — discount and default to annual at checkout',
          shortDescription: 'Make annual the default at £380/year (17% discount) to lock in revenue and reduce churn surface',
          consequence: {
            title: 'Annual plans lock in revenue — but margin compresses',
            description: 'Making annual plan the checkout default at £380/year (£31.67/month, 17% discount). 28% of new subscribers choose annual. 18% of existing monthly subscribers convert. Revenue per annual subscriber is lower (£31.67 vs £38) but churn drops to near zero (only one payment event per year). Cash collected upfront improves working capital by £42,000. But gross margin on annual falls to 54% from 64%. Monthly revenue dips 4% initially before recovering. EBITDA impact is -£1,200/month in the short term but +£8,400/month at 12-month horizon as churn reduction compounds. LTV:CAC reaches 3.1x.',
            funnelImpact: { acquisition: '+2%', activation: '-6%', retention: '+22%', referral: '+4%', revenue: '+4%' },
            kpiDeltas: { ltvcac: '+0.5x', revenuePerSub: '-£4.80', ebitda: '-£1.2k', grossMargin: '-6pp' },
          },
        },
        {
          label: 'Raise the subscription price — £38 to £44/month with enhanced formulation',
          shortDescription: 'Test price elasticity — NPS 72 suggests customers value the product well above current price',
          consequence: {
            title: 'Price increase holds — but voluntary churn ticks up',
            description: 'Raising subscription price from £38 to £44/month with a reformulation story ("new advanced actives"). Existing subscriber retention tested: 91% stay at the new price (vs 94% baseline — 3pp churn lift). New subscriber conversion rate dips 8%. Revenue per subscriber lifts to £43.20. Gross margin improves from 64% to 69% because COGS is unchanged. EBITDA lifts by £9,600/month. But the voluntary churn increase from 6% to 7.8% partially offsets the margin gain over 12 months. LTV:CAC reaches 3.0x but the trajectory flattens as churn compounds.',
            funnelImpact: { acquisition: '-6%', activation: '-8%', retention: '-3%', referral: '-4%', revenue: '+16%' },
            kpiDeltas: { ltvcac: '+0.4x', revenuePerSub: '+£5.80', ebitda: '+£9.6k', grossMargin: '+5pp' },
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

export const BEACON_NOVA_PROMPTS = {
  acquisition: {
    entry: 'Your influencer channel takes 62% of budget at a reported 1.4x ROAS — but attribution confidence is only 31%. Before you touch the sliders, what does 31% attribution confidence actually mean for that ROAS number, and how would you test whether the true ROAS is higher or lower?',
    decision: 'You\'ve set your allocation. Before you lock in — if your attribution confidence is only 31%, how confident are you that the channel-level CAC numbers in the table are accurate? Which channel\'s data do you trust most, and why?',
    postConsequence: 'Your acquisition decision changed the CAC and attribution picture. Given what you now know about Beacon\'s measurement gap — should you optimise for lower CAC or better measurement first? What is the cost of making decisions on unreliable data?',
  },
  activation: {
    entry: 'Your subscription is pre-selected at checkout, yet 31% of customers actively switch it off. Before you rank your hypotheses — is the problem that customers do not want a subscription, or that they do not yet trust the product enough to commit monthly? What data point helps you distinguish between those two explanations?',
    decision: 'You\'ve ranked your hypotheses. Your top choice should explain both the 31% switch-off rate and the 72% first-delivery usage rate. Does it explain both, or only one?',
    postConsequence: 'Your activation rate changed. But consider: if a subscriber signs up and never builds a daily serum routine, how long before they cancel? What is the relationship between activation quality and retention?',
  },
  retention: {
    entry: 'Your voluntary churn is 6% and your involuntary churn is 14%. Your NPS is 72. Before you choose a retention lever — if you could wave a magic wand and fix only one of these two churn types completely, which one would have a bigger impact on revenue, and by how much?',
    decision: 'You\'ve chosen your retention lever. Calculate: if involuntary churn dropped from 14% to the 3% benchmark, how many subscribers per month would Beacon retain that it currently loses — and what is that worth in monthly revenue?',
    postConsequence: 'Your churn rate changed. The NPS is still 72 — the product was never the problem. What does this tell you about the common assumption that churn is always a product quality issue? When should you look at infrastructure before product?',
  },
  referral: {
    entry: 'Your NPS is 72 with 54% Promoters — yet only 8% have ever shared UGC and 11% have used the referral programme. Before you choose a referral lever, what is the difference between a customer who loves your product and a customer who actively tells others about it — and what bridges that gap?',
    decision: 'You\'ve chosen your referral strategy. Skincare is inherently visual — before/after results are the most compelling proof. Does your chosen strategy make visual proof easy to create and share, or does it rely on verbal recommendation?',
    postConsequence: 'Your viral coefficient changed. Compare the acquisition cost of a referred subscriber vs a paid subscriber. If referral becomes 30% of acquisition, how much does blended CAC fall — and what does that do to the EBITDA gap?',
  },
  revenue: {
    entry: 'Your EBITDA was £18,000 twelve months ago and is now £6,000. The product has not changed — NPS is still 72. Before you choose a monetisation lever, decompose the £12,000 decline: how much is from rising CAC, how much from involuntary churn, and which lever recovers it faster?',
    decision: 'You\'ve chosen your monetisation lever. Walk through the maths: if it performs as projected, what will the new monthly EBITDA be — and how many months until you reach the 4.0x LTV:CAC target?',
    postConsequence: 'You\'ve made all five AARRR decisions. Beacon\'s core problem was never the product — NPS 72 proves that. It was payment infrastructure and attribution. What does this teach you about where to look when a loved product underperforms financially?',
  },
};
