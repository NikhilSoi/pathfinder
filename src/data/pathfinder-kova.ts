// ─────────────────────────────────────────────────────────────────────────────
// PATHFINDER — Kova Archetype (DTC Wellness Brand)
// Full AARRR data spec: 5 stages × 1 decision × 4 options × consequence objects
// ─────────────────────────────────────────────────────────────────────────────

export const KOVA_ARCHETYPE = {
  id: 'kova',
  name: 'Kova',
  type: 'DTC Wellness',
  tagline: 'Premium supplement brand. 18 months live. Growing fast, but the bucket leaks.',
  description: 'Kova makes high-quality magnesium and adaptogen supplements. Revenue is growing 22% month-on-month but EBITDA is -£28k. The problem is not acquisition — it is that 69% of customers never come back after their first purchase.',
  color: '#3A9E82',

  // ─── FUNNEL HEALTH SNAPSHOT ───────────────────────────────────────────────
  // Shown at top of every stage as the animated funnel bar
  funnelHealth: {
    acquisition: { value: 8400, label: 'Monthly sessions', benchmark: 12000, unit: 'sessions', sentiment: 'neu' },
    activation:  { value: 34,   label: 'Activation rate', benchmark: 52,    unit: '%',        sentiment: 'neg' },
    retention:   { value: 31,   label: 'M1 retention',    benchmark: 55,    unit: '%',        sentiment: 'neg' },
    referral:    { value: 0.18, label: 'Viral coefficient',benchmark: 0.4,  unit: 'x',        sentiment: 'neg' },
    revenue:     { value: 2.1,  label: 'LTV:CAC',         benchmark: 3.0,   unit: 'x',        sentiment: 'neg' },
  },

  // ─── STAGE 1: ACQUISITION ─────────────────────────────────────────────────
  acquisition: {
    brief: 'Kova spends £18,400/month on paid acquisition. Traffic is growing but blended CAC has risen from £22 to £38 in 6 months. The team is debating whether to scale paid or invest in owned channels. You have £18,400 to reallocate.',

    kpis: [
      { label: 'Monthly sessions',    value: '8,400',  delta: 'Benchmark: 12,000',  sentiment: 'neu' },
      { label: 'Blended CAC',         value: '£38',    delta: '+£16 in 6 months',   sentiment: 'neg' },
      { label: 'Paid dependency',     value: '84%',    delta: 'Benchmark: 55%',     sentiment: 'neg' },
      { label: 'Organic sessions',    value: '1,340',  delta: '+4% MoM',            sentiment: 'neu' },
      { label: 'Email list',          value: '4,200',  delta: '12% of customers',   sentiment: 'neg' },
    ],

    channels: [
      { name: 'Meta Ads',          spend: 9200,  sessions: 3800, cac: '£48',  roas: '1.6x', signal: 'neg' },
      { name: 'Google Search',     spend: 5400,  sessions: 2100, cac: '£26',  roas: '2.8x', signal: 'pos' },
      { name: 'Influencer',        spend: 2800,  sessions: 1620, cac: '£34',  roas: '2.1x', signal: 'neu' },
      { name: 'Organic / SEO',     spend: 0,     sessions: 1340, cac: '£0',   roas: '—',    signal: 'pos' },
      { name: 'Email / CRM',       spend: 1000,  sessions: 580,  cac: '£0',   roas: '—',    signal: 'pos' },
    ],

    dataSummary: 'Monthly sessions 8,400 — below the 12,000 benchmark for a brand at this revenue stage. Blended CAC £38, up from £22 six months ago — the paid channels are saturating. Meta Ads takes 50% of budget at 1.6x ROAS, below the 1.8x breakeven for a 52% gross margin business. Google Search is the strongest paid channel at 2.8x ROAS but is underfunded. Organic SEO generates 1,340 sessions at zero marginal cost but has received no investment. Email list only 4,200 subscribers — 12% of total customer base vs 28% benchmark.',

    novaPrompt: 'Your Meta ROAS is 1.6x on a 52% gross margin business. Before you touch the sliders — what is the breakeven ROAS, and what does that tell you about whether Meta is profitable at its current spend level?',

    decision: {
      question: 'How should Kova reallocate its £18,400 monthly acquisition budget?',
      mechanic: 'sliders',
      totalBudget: 18400,
      currency: '£',
      threshold: 0.35,
      spreadThinIdx: 2,
      options: [
        {
          label: 'Scale Meta Ads — increase spend and audience targeting',
          shortDescription: 'Double down on paid social, test new audiences',
          consequence: {
            title: 'Traffic scales — CAC compounds',
            description: 'Sessions grow 28% as Meta reach expands. But frequency caps hit within 6 weeks and CPMs rise 34%. CAC increases from £38 to £52. Revenue grows but EBITDA worsens. The bucket fills faster but still leaks.',
            funnelImpact: { acquisition: '+28%', activation: '-3%', retention: '0%', referral: '0%', revenue: '+8%' },
            kpiDeltas: { sessions: '+2,350', cac: '+£14', organicShare: '-4pp', ltvcac: '-0.2x' },
          },
        },
        {
          label: 'Shift budget toward Google Search — scale the profitable channel',
          shortDescription: 'Fund the 2.8x ROAS channel that is currently underfunded',
          consequence: {
            title: 'Efficient acquisition — CAC falls',
            description: 'Shifting £4,000 from Meta to Google Search improves blended ROAS from 1.8x to 2.3x. CAC falls from £38 to £29. Sessions hold steady. The business becomes more efficient without growing traffic volume — and the improved unit economics give headroom to invest in retention.',
            funnelImpact: { acquisition: '+5%', activation: '+2%', retention: '0%', referral: '0%', revenue: '+14%' },
            kpiDeltas: { sessions: '+400', cac: '-£9', organicShare: '+0pp', ltvcac: '+0.4x' },
          },
        },
        {
          label: 'Invest in organic — SEO content and email list growth',
          shortDescription: 'Build owned channels, reduce paid dependency long-term',
          consequence: {
            title: 'Owned channels compound — short-term traffic dips',
            description: 'Redirecting £5,000 to SEO content and email capture reduces paid sessions in the short term. Organic sessions grow 40% over 90 days. Email list grows from 4,200 to 7,800. Email revenue per subscriber is 3.4x higher than paid traffic. The investment takes 60 days to show in traffic but compounds indefinitely after.',
            funnelImpact: { acquisition: '-8%', activation: '+5%', retention: '+12%', referral: '+8%', revenue: '+6%' },
            kpiDeltas: { sessions: '-670', cac: '-£11', organicShare: '+14pp', ltvcac: '+0.6x' },
          },
        },
        {
          label: 'Spread budget evenly — test all channels at equal weight',
          shortDescription: 'Diversify to reduce dependency on any single channel',
          consequence: {
            title: 'Diluted execution — no channel reaches scale',
            description: 'Equal allocation means no channel receives enough budget to optimise. Meta algorithm requires consistent spend to train the audience model. Google Search needs volume to improve Quality Score. SEO needs sustained content investment. Each channel underperforms its potential and blended CAC remains at £38 with no improvement.',
            funnelImpact: { acquisition: '+2%', activation: '0%', retention: '0%', referral: '0%', revenue: '+2%' },
            kpiDeltas: { sessions: '+170', cac: '+£1', organicShare: '+1pp', ltvcac: '-0.1x' },
          },
        },
      ],
    },
  },

  // ─── STAGE 2: ACTIVATION ──────────────────────────────────────────────────
  activation: {
    brief: 'Of every 100 visitors who land on the Kova site, only 34 complete a first purchase. The category benchmark is 52%. The checkout completes at 61% — so the drop is happening before checkout. Students need to identify where in the pre-checkout funnel Kova is losing users.',

    kpis: [
      { label: 'Overall CVR',       value: '3.4%',  delta: 'Benchmark: 5.2%',     sentiment: 'neg' },
      { label: 'PDP → Add to cart', value: '18%',   delta: 'Benchmark: 28%',      sentiment: 'neg' },
      { label: 'Add to cart → checkout', value: '71%', delta: 'Benchmark: 68%',   sentiment: 'pos' },
      { label: 'Checkout → purchase',    value: '61%', delta: 'Benchmark: 65%',   sentiment: 'neu' },
      { label: 'Time to first purchase', value: '6.2 days', delta: 'Benchmark: 2.1 days', sentiment: 'neg' },
    ],

    funnel: [
      { stage: 'Sessions',          value: 8400  },
      { stage: 'PDP views',         value: 5460  },
      { stage: 'Add to cart',       value: 983   },
      { stage: 'Checkout started',  value: 698   },
      { stage: 'Purchase',          value: 286   },
    ],

    bySource: [
      { source: 'Meta Ads',      cvr: '2.1%', timeToConvert: '8.4 days', pdpToCart: '12%' },
      { source: 'Google Search', cvr: '5.8%', timeToConvert: '1.8 days', pdpToCart: '31%' },
      { source: 'Influencer',    cvr: '3.4%', timeToConvert: '4.2 days', pdpToCart: '19%' },
      { source: 'Organic',       cvr: '6.2%', timeToConvert: '1.4 days', pdpToCart: '34%' },
      { source: 'Email',         cvr: '8.1%', timeToConvert: '0.8 days', pdpToCart: '42%' },
    ],

    dataSummary: 'Overall CVR 3.4% vs 5.2% benchmark. The funnel data shows the primary drop is at PDP (product detail page) to add-to-cart: only 18% of PDP viewers add to cart vs 28% benchmark. Checkout to purchase is 61% — slightly below benchmark but not the primary constraint. Time to first purchase is 6.2 days vs 2.1 days benchmark — suggesting visitors are not convinced on first visit and need multiple touchpoints. Meta traffic converts at 2.1% and takes 8.4 days. Email traffic converts at 8.1% and takes 0.8 days — 4x better conversion, 10x faster decision.',

    novaPrompt: 'The PDP to add-to-cart rate is 18% against a 28% benchmark. Before you rank your hypotheses — what does the time-to-purchase data tell you about whether this is a product clarity problem or a trust problem?',

    decision: {
      question: 'Which is the primary reason Kova\'s PDP to add-to-cart rate is 18% against a 28% benchmark?',
      mechanic: 'ranking',
      options: [
        {
          label: 'Product page lacks social proof — no reviews, no UGC, no trust signals',
          shortDescription: 'Visitors are not convinced the product works',
          consequence: {
            title: 'Social proof added — add-to-cart recovers',
            description: 'Adding 200+ verified reviews, UGC photos, and trust badges to the PDP. Add-to-cart rate improves from 18% to 24% within 6 weeks. CVR lifts from 3.4% to 4.6%. The diagnosis was correct — Kova\'s organic and email traffic converts well because those users already have brand exposure. Cold paid traffic needed the social proof layer.',
            funnelImpact: { acquisition: '0%', activation: '+35%', retention: '+8%', referral: '+12%', revenue: '+22%' },
            kpiDeltas: { cvr: '+1.2pp', addToCart: '+6pp', timeToConvert: '-1.8 days', revenue: '+22%' },
          },
        },
        {
          label: 'Product page is unclear — benefits not communicated, ingredient science buried',
          shortDescription: 'Visitors do not understand what the product does',
          consequence: {
            title: 'Page clarity improved — moderate CVR lift',
            description: 'Rewriting PDP copy to lead with outcomes not ingredients. Above-the-fold benefit statement, simplified ingredient explanation, clear dosage guide. Add-to-cart improves from 18% to 21%. Meaningful improvement but not the full fix — trust signals were also needed.',
            funnelImpact: { acquisition: '0%', activation: '+17%', retention: '+4%', referral: '+5%', revenue: '+10%' },
            kpiDeltas: { cvr: '+0.6pp', addToCart: '+3pp', timeToConvert: '-0.9 days', revenue: '+10%' },
          },
        },
        {
          label: 'Wrong audience being acquired — paid traffic intent does not match product',
          shortDescription: 'Meta is bringing the wrong people to the page',
          consequence: {
            title: 'Audience refined — quality improves, volume drops',
            description: 'Narrowing Meta targeting to wellness-interested, supplement-aware audiences. Add-to-cart rate lifts to 22% but sessions drop 18% as audience narrows. Net CVR improves but total purchases are similar — more efficient but not more volume. The real problem was also the PDP.',
            funnelImpact: { acquisition: '-18%', activation: '+22%', retention: '+6%', referral: '+4%', revenue: '+4%' },
            kpiDeltas: { cvr: '+0.8pp', addToCart: '+4pp', timeToConvert: '-2.1 days', revenue: '+4%' },
          },
        },
        {
          label: 'Price point too high — visitors are price-sensitive and leaving without buying',
          shortDescription: 'The product is too expensive for cold traffic',
          consequence: {
            title: 'Price reduction tested — margin compressed',
            description: 'A/B test: 15% introductory discount for first purchase. Add-to-cart lifts to 26% and CVR hits 4.8%. But gross margin falls from 52% to 44% on discounted orders. LTV:CAC improves slightly because repeat purchase rate is unchanged — the discount did not attract higher-LTV customers. Revenue grows but profitability worsens.',
            funnelImpact: { acquisition: '0%', activation: '+42%', retention: '-3%', referral: '-2%', revenue: '+12%' },
            kpiDeltas: { cvr: '+1.4pp', addToCart: '+8pp', timeToConvert: '-3.2 days', revenue: '+12%' },
          },
        },
      ],
    },
  },

  // ─── STAGE 3: RETENTION ───────────────────────────────────────────────────
  retention: {
    brief: 'Kova\'s M1 retention is 31% — only 31 of every 100 customers buy again within 30 days. The category benchmark is 55%. This is the primary driver of the negative EBITDA — the business is spending £38 to acquire customers who are worth £41 on first purchase and never come back. The payback period is 14.2 months.',

    kpis: [
      { label: 'M1 retention',       value: '31%',     delta: 'Benchmark: 55%',       sentiment: 'neg' },
      { label: 'M3 retention',       value: '14%',     delta: 'Benchmark: 38%',       sentiment: 'neg' },
      { label: 'Repeat purchase rate', value: '19%',   delta: 'Benchmark: 42%',       sentiment: 'neg' },
      { label: 'LTV (12 month)',      value: '£54',     delta: 'CAC is £38 — 1.4x',   sentiment: 'neg' },
      { label: 'Payback period',      value: '14.2 mo', delta: 'Target: under 6 mo',  sentiment: 'neg' },
    ],

    cohortMonths: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    m1: [34, 33, 31, 29, 28, 30, 33, 31],
    m2: [22, 21, 20, 18, 17, 19, 21, null],
    m3: [17, 16, 14, 13, 11, 14, null, null],
    m4: [12, 11, 10, 8,  7,  null, null, null],
    m5: [9,  8,  7,  6,  null, null, null, null],
    m6: [7,  6,  null, null, null, null, null, null],

    benchmarkM1: 55,

    segments: [
      { name: 'Subscribed (monthly)', count: 380,  m1: '89%', ltv: '£218', churn: '8%/mo' },
      { name: 'Bundle buyers',        count: 620,  m1: '58%', ltv: '£94',  churn: '22%/mo' },
      { name: 'Single SKU repeat',    count: 840,  m1: '34%', ltv: '£61',  churn: '44%/mo' },
      { name: 'One and done',         count: 2960, m1: '0%',  ltv: '£34',  churn: '100%' },
    ],

    dataSummary: 'M1 retention 31% vs 55% benchmark. M3 drops to 14% — almost no customers remain active at 90 days. Payback period 14.2 months — Kova is spending more to acquire customers than they will ever return in profit at current retention. The segment data is the most important signal: subscription customers retain at 89% M1 with £218 LTV. Bundle buyers at 58% M1. But 71% of all customers are "one and done" — buying once at £34 AOV and never returning. The subscription model exists but only 9.5% of customers are enrolled.',

    novaPrompt: 'Your subscription customers have 89% M1 retention and £218 LTV. Your one-and-done customers have 0% M1 retention and £34 LTV. Before you choose a retention lever — what is the highest leverage action: improving retention for the one-and-done segment, or converting more customers into subscribers at acquisition?',

    decision: {
      question: 'Which retention lever should Kova invest in first?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Build a subscription onboarding sequence — convert first-time buyers to subscribe',
          shortDescription: 'Email and SMS flow pushing subscription at day 3, 7, and 14 post-purchase',
          consequence: {
            title: 'Subscription converts — LTV transforms',
            description: 'A 3-part post-purchase sequence offering a 10% subscription discount at day 3. 18% of eligible customers convert to subscription within 30 days. Subscription base grows from 380 to 680. M1 retention lifts from 31% to 38% overall. LTV:CAC ratio improves from 1.4x to 2.1x. This is the highest-leverage intervention because it changes the revenue model, not just the retention rate.',
            funnelImpact: { acquisition: '0%', activation: '0%', retention: '+23%', referral: '+14%', revenue: '+38%' },
            kpiDeltas: { m1Retention: '+7pp', ltv: '+£28', payback: '-4.2 mo', ltvcac: '+0.7x' },
          },
        },
        {
          label: 'Launch a loyalty programme — points for purchases, tiered rewards',
          shortDescription: 'Gamified repeat purchase incentive across all customer segments',
          consequence: {
            title: 'Loyalty improves repeat rate — moderate lift',
            description: 'Points-based programme with Silver/Gold/Platinum tiers. Repeat purchase rate improves from 19% to 27%. M1 retention lifts from 31% to 36%. Good improvement but the underlying one-and-done problem is not fully addressed — loyalty programmes work better on customers with moderate natural retention, not on customers who were never planning to return.',
            funnelImpact: { acquisition: '0%', activation: '0%', retention: '+16%', referral: '+8%', revenue: '+18%' },
            kpiDeltas: { m1Retention: '+5pp', ltv: '+£14', payback: '-2.8 mo', ltvcac: '+0.4x' },
          },
        },
        {
          label: 'Improve the post-purchase experience — packaging, unboxing, first-use education',
          shortDescription: 'Invest in the product experience to drive organic repeat',
          consequence: {
            title: 'Brand experience improves — NPS lifts, retention modest',
            description: 'Premium unboxing, usage guide, and a personal note in every order. NPS lifts from 34 to 52. M1 retention improves modestly from 31% to 33%. Referral rate improves more significantly — NPS improvement drives word-of-mouth. The experience investment pays off in acquisition (lower CAC through referral) more than in retention directly.',
            funnelImpact: { acquisition: '+8%', activation: '+4%', retention: '+6%', referral: '+28%', revenue: '+12%' },
            kpiDeltas: { m1Retention: '+2pp', ltv: '+£8', payback: '-1.4 mo', ltvcac: '+0.2x' },
          },
        },
        {
          label: 'Win-back campaign — target the 2,960 one-and-done customers with a reactivation offer',
          shortDescription: 'Reactivation email sequence with a time-limited discount',
          consequence: {
            title: 'Reactivation generates revenue — does not fix the model',
            description: 'Reactivation campaign to 2,960 lapsed customers. 6.2% reactivation rate — 184 customers repurchase. Short-term revenue bump of £6,400. But without fixing the underlying retention model, these customers will lapse again. The campaign treats the symptom, not the cause. M1 retention metric is unchanged for new customer cohorts.',
            funnelImpact: { acquisition: '0%', activation: '0%', retention: '+4%', referral: '+2%', revenue: '+8%' },
            kpiDeltas: { m1Retention: '+0pp', ltv: '+£3', payback: '-0.6 mo', ltvcac: '+0.1x' },
          },
        },
      ],
    },
  },

  // ─── STAGE 4: REFERRAL ────────────────────────────────────────────────────
  referral: {
    brief: 'Kova\'s viral coefficient is 0.18 — each existing customer generates 0.18 new customers through word of mouth. The benchmark is 0.4x. NPS is 34 (Passives majority). 91% of new customer acquisition is paid. A viral coefficient above 1.0 creates self-sustaining growth — Kova is nowhere near it.',

    kpis: [
      { label: 'NPS score',           value: '34',    delta: 'Benchmark: 52',     sentiment: 'neg' },
      { label: 'Viral coefficient',   value: '0.18x', delta: 'Benchmark: 0.4x',  sentiment: 'neg' },
      { label: 'Organic acq share',   value: '9%',    delta: 'Benchmark: 28%',   sentiment: 'neg' },
      { label: 'Referral prog. part.', value: '4.2%', delta: 'Benchmark: 14%',   sentiment: 'neg' },
      { label: 'Promoter share',      value: '28%',   delta: 'Benchmark: 45%',   sentiment: 'neg' },
    ],

    npsDistribution: {
      promoters:  { pct: 28, count: 980 },
      passives:   { pct: 44, count: 1540 },
      detractors: { pct: 28, count: 980 },
    },

    referralSources: [
      { source: 'Word of mouth (organic)',  newCustomers: 68,  pctOfTotal: '5.8%' },
      { source: 'Referral programme',       newCustomers: 38,  pctOfTotal: '3.2%' },
      { source: 'Social sharing',           newCustomers: 12,  pctOfTotal: '1.0%' },
    ],

    dataSummary: 'Viral coefficient 0.18x — for every 100 customers, Kova generates 18 new customers through word of mouth. Benchmark is 40. NPS 34 — 28% Promoters, 44% Passives, 28% Detractors. The high Detractor share is a product experience signal. Referral programme participation is 4.2% — 95.8% of customers have never referred anyone. Organic acquisition share is 9% vs 28% benchmark. If Kova could lift its viral coefficient from 0.18 to 0.4, paid acquisition spend could be reduced by 30% with no traffic impact.',

    novaPrompt: 'Your NPS is 34 with 28% Detractors. You have an existing referral programme with 4.2% participation. Before you decide whether to invest in referral — what does the Detractor percentage tell you about whether a referral programme is the right intervention right now?',

    decision: {
      question: 'What is the highest-leverage referral investment for Kova right now?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Fix the product experience first — reduce Detractors before asking for referrals',
          shortDescription: 'You cannot engineer referrals out of a 28% Detractor base',
          consequence: {
            title: 'Detractor rate falls — referral compounds naturally',
            description: 'Investing in customer success: proactive post-purchase check-in email at day 7, ingredient explanation guide, 1:1 troubleshooting for complainants. NPS lifts from 34 to 51 over 90 days. Detractor share falls from 28% to 14%. Viral coefficient lifts from 0.18 to 0.28 organically — without a formal referral programme. This is the compounding fix because a better product experience also improves retention.',
            funnelImpact: { acquisition: '+18%', activation: '+6%', retention: '+14%', referral: '+56%', revenue: '+22%' },
            kpiDeltas: { viralCoef: '+0.10x', nps: '+17', organicShare: '+8pp', cac: '-£6' },
          },
        },
        {
          label: 'Rebuild the referral programme — better incentive, easier to share',
          shortDescription: 'Current programme has 4.2% participation — mechanics need fixing',
          consequence: {
            title: 'Referral programme lifts — meaningful but capped',
            description: 'Switching from cash discount to double-sided reward (£10 off for referrer and friend). Simplifying the share flow to one click post-purchase. Participation lifts from 4.2% to 9.8%. Viral coefficient improves from 0.18 to 0.27. But the Detractor base limits the ceiling — Passives and Detractors do not refer even with incentives. The programme is better but the NPS problem remains.',
            funnelImpact: { acquisition: '+12%', activation: '0%', retention: '+6%', referral: '+44%', revenue: '+14%' },
            kpiDeltas: { viralCoef: '+0.09x', nps: '+3', organicShare: '+6pp', cac: '-£4' },
          },
        },
        {
          label: 'Activate Promoters — give the 980 Promoters tools to share',
          shortDescription: 'Focus entirely on the 28% who already love the product',
          consequence: {
            title: 'Promoter activation works — narrow but high quality',
            description: 'Identifying the 980 Promoters and giving them early access, exclusive content, and frictionless share tools. Promoter referral rate lifts from 8% to 22%. Net new customers from referral: +140/month. Viral coefficient lifts to 0.30x. Quality of referred customers is high — they convert at 2x the rate of paid traffic. But the programme only works on 28% of the base.',
            funnelImpact: { acquisition: '+14%', activation: '+8%', retention: '+10%', referral: '+38%', revenue: '+16%' },
            kpiDeltas: { viralCoef: '+0.12x', nps: '+8', organicShare: '+7pp', cac: '-£5' },
          },
        },
        {
          label: 'Invest in community — build a brand-owned space for customers to connect',
          shortDescription: 'Long-term brand equity and organic sharing through community',
          consequence: {
            title: 'Community builds — long-term signal, slow start',
            description: 'Launching a private community (Slack or Circle) for Kova customers. 340 customers join in 60 days — 9.5% of active base. Daily active rate 28%. Community members refer at 3x the rate of non-members. But the 90-day ROI is low — community compounds over 12+ months, not quarters. Viral coefficient at 90 days: 0.21x. At 12 months: projected 0.38x.',
            funnelImpact: { acquisition: '+4%', activation: '+4%', retention: '+18%', referral: '+16%', revenue: '+8%' },
            kpiDeltas: { viralCoef: '+0.03x', nps: '+12', organicShare: '+2pp', cac: '-£2' },
          },
        },
      ],
    },
  },

  // ─── STAGE 5: REVENUE ─────────────────────────────────────────────────────
  revenue: {
    brief: 'Kova\'s LTV:CAC is 1.4x. A healthy business needs 3x minimum. Every customer acquired costs £38 and returns £54 over 12 months — a £16 contribution margin before overheads. EBITDA is -£28k/month. The decisions made in the previous four stages determine whether this can be fixed. Now students see the full picture and make the final monetisation call.',

    kpis: [
      { label: 'Monthly revenue',      value: '£68,400', delta: '+22% MoM',          sentiment: 'pos' },
      { label: 'Gross margin',         value: '52%',     delta: 'Target: 58%',       sentiment: 'neg' },
      { label: 'EBITDA',               value: '-£28,000', delta: 'Cash negative',    sentiment: 'neg' },
      { label: 'LTV:CAC',              value: '1.4x',    delta: 'Target: 3.0x',      sentiment: 'neg' },
      { label: 'Revenue concentration', value: '68%',   delta: 'Top 20% customers',  sentiment: 'neg' },
    ],

    revenueBreakdown: [
      { source: 'New customers',      revenue: 39200, pct: '57%', margin: '44%' },
      { source: 'Repeat customers',   revenue: 18600, pct: '27%', margin: '62%' },
      { source: 'Subscription',       revenue: 8300,  pct: '12%', margin: '68%' },
      { source: 'Reactivation',       revenue: 2300,  pct: '4%',  margin: '52%' },
    ],

    ltvcacTrend: {
      months: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
      ltvcac: [1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.4, 1.4],
      target: 3.0,
    },

    dataSummary: 'Monthly revenue £68,400 growing at 22% MoM. Gross margin 52% against a 58% target. EBITDA -£28k — the business is cash negative despite strong revenue growth because CAC (£38) is only 1.4x covered by 12-month LTV (£54). Revenue is heavily concentrated — 68% comes from the top 20% of customers. Subscription revenue has the highest margin at 68% but represents only 12% of total revenue. New customer revenue (57% of total) carries the lowest margin at 44% because of high acquisition cost. The business grows revenue but destroys margin as it does so.',

    novaPrompt: 'Your new customer revenue carries a 44% margin and your subscription revenue carries a 68% margin. You have £28k of monthly losses to close. Before you choose a monetisation lever — how much would LTV need to increase to reach breakeven at the current CAC of £38, and which of the four levers gets you there fastest?',

    decision: {
      question: 'Which monetisation lever should Kova prioritise to reach LTV:CAC of 3.0x?',
      mechanic: 'tiles',
      options: [
        {
          label: 'Make subscription the default — opt-out rather than opt-in at checkout',
          shortDescription: 'Switch the checkout default to subscription, allow customers to switch to one-time',
          consequence: {
            title: 'Subscription default transforms the model',
            description: 'Changing checkout default to subscription (pre-ticked, easy to uncheck). Subscription attach rate lifts from 9.5% to 34% of new customers. Initial churn from customers who did not notice is 12% — manageable. LTV for subscription cohort is £218. Blended LTV lifts from £54 to £89 within 90 days. LTV:CAC ratio reaches 2.3x. Not yet 3x but the trajectory is clear and the model has fundamentally changed.',
            funnelImpact: { acquisition: '-4%', activation: '-6%', retention: '+62%', referral: '+18%', revenue: '+44%' },
            kpiDeltas: { ltvcac: '+0.9x', ltv: '+£35', ebitda: '+£18k', grossMargin: '+4pp' },
          },
        },
        {
          label: 'Launch a bundle — combine 3 SKUs at a 15% discount to increase AOV',
          shortDescription: 'Increase revenue per order and introduce customers to more of the range',
          consequence: {
            title: 'AOV lifts — bundle customers retain better',
            description: 'A three-product starter bundle at £74 (vs £41 single SKU). Bundle accounts for 28% of new orders within 60 days. AOV lifts from £41 to £52 blended. Bundle customers retain at 58% M1 vs 31% single-SKU customers. LTV:CAC lifts to 2.0x. Gross margin compresses slightly from 52% to 49% due to bundle discount but volume increase compensates.',
            funnelImpact: { acquisition: '+4%', activation: '+8%', retention: '+38%', referral: '+12%', revenue: '+28%' },
            kpiDeltas: { ltvcac: '+0.6x', ltv: '+£22', ebitda: '+£11k', grossMargin: '-3pp' },
          },
        },
        {
          label: 'Raise the price — Kova is premium positioned, price should reflect it',
          shortDescription: 'Increase hero SKU price from £34 to £42 — test elasticity',
          consequence: {
            title: 'Price lift holds — margin improves significantly',
            description: 'Raising the hero SKU from £34 to £42 (24% increase). A/B test shows 11% volume decline — demand is relatively inelastic for a premium wellness brand. Net revenue per unit lifts from £17.7 to £21.8 after COGS. Gross margin improves from 52% to 58%. LTV:CAC lifts from 1.4x to 1.9x purely from margin improvement. The price increase also signals quality to new customers.',
            funnelImpact: { acquisition: '-8%', activation: '-4%', retention: '+6%', referral: '+4%', revenue: '+14%' },
            kpiDeltas: { ltvcac: '+0.5x', ltv: '+£18', ebitda: '+£8k', grossMargin: '+6pp' },
          },
        },
        {
          label: 'Launch an upsell programme — personalised product recommendations post-purchase',
          shortDescription: 'Email + SMS upsell sequence for cross-sell into adjacent SKUs',
          consequence: {
            title: 'Upsell generates incremental revenue — LTV compounds over time',
            description: 'Personalised post-purchase upsell sequence based on the first product purchased. 14% of customers buy a second SKU within 30 days when prompted vs 4% without. Revenue per customer in month 1 lifts from £34 to £39. Over 12 months, customers who upsell have LTV of £84 vs £54 for single-SKU customers. LTV:CAC lifts to 1.9x. Good structural improvement but not as fast as subscription default.',
            funnelImpact: { acquisition: '0%', activation: '+6%', retention: '+22%', referral: '+8%', revenue: '+18%' },
            kpiDeltas: { ltvcac: '+0.5x', ltv: '+£16', ebitda: '+£7k', grossMargin: '+2pp' },
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

export const KOVA_NOVA_PROMPTS = {
  acquisition: {
    entry: 'Your Meta ROAS is 1.6x on a 52% gross margin business. Before you touch the sliders — what is the breakeven ROAS, and what does that tell you about whether Meta is profitable at its current spend level?',
    decision: 'You\'ve set your allocation. Before you lock in — which single data point in the channels table most strongly justifies your chosen strategy?',
    postConsequence: 'Your acquisition decision changed the CAC. How does the new CAC compare to the current LTV, and what does that tell you about the next most important stage to fix?',
  },
  activation: {
    entry: 'The PDP to add-to-cart rate is 18% against a 28% benchmark. Before you rank your hypotheses — what does the time-to-purchase data tell you about whether this is a product clarity problem or a trust problem?',
    decision: 'You\'ve ranked your hypotheses. What specific number from the funnel data most strongly supports your top hypothesis?',
    postConsequence: 'Your activation rate changed. Recalculate: if you now convert X% of sessions, how many more monthly purchases does Kova generate, and what does that do to the payback period?',
  },
  retention: {
    entry: 'Your subscription customers have 89% M1 retention and £218 LTV. Your one-and-done customers have 0% M1 retention and £34 LTV. Before you choose a retention lever — what is the highest leverage action: improving retention for the one-and-done segment, or converting more customers into subscribers at acquisition?',
    decision: 'You\'ve chosen your retention lever. If it works as intended, what will the new LTV:CAC ratio be — and is that enough to make Kova profitable?',
    postConsequence: 'Your M1 retention changed. Using the new retention rate, calculate the new 12-month LTV and the new payback period. Are you now above or below the 3x LTV:CAC target?',
  },
  referral: {
    entry: 'Your NPS is 34 with 28% Detractors. You have an existing referral programme with 4.2% participation. Before you decide whether to invest in referral — what does the Detractor percentage tell you about whether a referral programme is the right intervention right now?',
    decision: 'You\'ve chosen your referral strategy. If the viral coefficient lifts to your projected level, by how much does your monthly paid acquisition spend need to fall to maintain the same traffic volume?',
    postConsequence: 'Your viral coefficient changed. Recalculate your blended CAC including the new organic share. How does this change the LTV:CAC ratio relative to what you\'ve built so far?',
  },
  revenue: {
    entry: 'Your new customer revenue carries a 44% margin and your subscription revenue carries a 68% margin. You have £28k of monthly losses to close. Before you choose a monetisation lever — how much would LTV need to increase to reach breakeven at the current CAC of £38, and which of the four levers gets you there fastest?',
    decision: 'You\'ve chosen your monetisation lever. Walk through the maths: if it performs as projected, what will the new monthly EBITDA be?',
    postConsequence: 'You\'ve made all five AARRR decisions. Which single intervention had the biggest impact on LTV:CAC, and why? What would you do differently if you ran Kova from the start?',
  },
};

// ─── PATHFINDER BUILD NOTES ────────────────────────────────────────────────
// Stack: Next.js 14, Supabase, Tailwind, Claude API — same as Fieldwork
// Reuse: NovaChat component, session model, KPI cards, consequence display
// New components needed:
//   - AARRRFunnelBar: horizontal animated funnel showing all 5 stages
//   - StageNav: linear 5-step navigation replacing round nav
//   - SliderDecision: budget allocation sliders (reuse from Fieldwork BudgetSliders)
//   - RankingDecision: drag-to-rank (reuse from Fieldwork HypothesisRanking)
//   - TileDecision: 2x2 tile selector (reuse from Fieldwork TileSelector)
//   - ConsequenceFunnelUpdate: shows funnel bar animating after consequence
//   - CompoundingPath: shows cumulative LTV:CAC improvement across all stages
//
// Route structure: /pathfinder/[archetype]/[stage]
// No session required — self-paced, single player or small group
// Supabase: store progress per student per archetype
