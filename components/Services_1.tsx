"use client"
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Target, Lightbulb, ArrowRight, ChevronDown, Check, BarChart3, Layers, RefreshCw, Monitor, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const serviceCategories = [
  { id: 'performance', label: 'Performance Marketing', icon: TrendingUp },
  { id: 'paid-social', label: 'Paid Social (Meta)', icon: Target },
  { id: 'paid-search', label: 'Paid Search (Google)', icon: BarChart3 },
  { id: 'analytics', label: 'Analytics & Attribution', icon: Layers },
  { id: 'cro', label: 'CRO & Landing Pages', icon: Monitor },
  { id: 'creative', label: 'Creative Strategy', icon: Lightbulb },
  { id: 'retention', label: 'Retention / LTV Growth', icon: RefreshCw },
  { id: 'reporting', label: 'Reporting & Dashboards', icon: Zap },
];

const serviceDetails: Record<string, {
  title: string;
  description: string;
  includes: string[];
  whoFor: string;
  timeline: string;
  outcomes: string[];
  mistakes: string[];
  deliverables: string[];
}> = {
  'performance': {
    title: 'Performance Marketing',
    description: 'End-to-end strategy and execution across all paid channels with focus on profitable, scalable growth.',
    includes: ['Channel strategy & budget allocation', 'Campaign architecture & structure', 'Audience development & targeting', 'Bid strategy & automation', 'Cross-channel attribution'],
    whoFor: 'Brands ready to scale with $50K+ monthly ad spend looking for strategic oversight.',
    timeline: '3-6 month engagements typical',
    outcomes: ['35-50% improvement in CAC', 'Clear attribution across channels', 'Scalable campaign structure'],
    mistakes: ['Siloed channel management', 'Over-reliance on platform ROAS', 'No incrementality testing'],
    deliverables: ['Channel strategy doc', 'Weekly performance reports', 'Monthly strategy reviews', 'Creative testing roadmap'],
  },
  'paid-social': {
    title: 'Paid Social (Meta)',
    description: 'Meta Ads strategy, creative testing, and scaling for DTC and B2C brands.',
    includes: ['Account structure optimization', 'Audience strategy & segmentation', 'Creative testing frameworks', 'Scaling playbooks', 'iOS 14.5+ adaptation'],
    whoFor: 'DTC brands where Meta is a primary acquisition channel.',
    timeline: '3+ month engagements',
    outcomes: ['2-3x ROAS improvement', 'Consistent creative winners', 'Predictable scaling'],
    mistakes: ['Too many ad sets', 'No creative testing system', 'Ignoring Advantage+'],
    deliverables: ['Account audit', 'Testing calendar', 'Creative briefs', 'Weekly optimization log'],
  },
  'paid-search': {
    title: 'Paid Search (Google)',
    description: 'Google Ads strategy across Search, Shopping, Performance Max, and YouTube.',
    includes: ['Account restructure', 'Keyword strategy', 'Feed optimization', 'PMAX campaign design', 'Search term analysis'],
    whoFor: 'Brands with proven product-market fit looking to capture demand efficiently.',
    timeline: '3+ month engagements',
    outcomes: ['40%+ CPA reduction', 'Higher quality traffic', 'Improved ROAS'],
    mistakes: ['Broad match without negatives', 'Poor feed quality', 'Ignoring search terms'],
    deliverables: ['Account audit', 'Keyword research', 'Feed optimization plan', 'Bid strategy recommendations'],
  },
  'analytics': {
    title: 'Analytics & Attribution',
    description: 'Building measurement infrastructure that enables confident scaling decisions.',
    includes: ['Tracking audit & implementation', 'Server-side tracking setup', 'Attribution modeling', 'Data warehouse integration', 'Incrementality testing'],
    whoFor: 'Brands struggling to understand true channel performance.',
    timeline: '4-8 weeks for implementation',
    outcomes: ['Trusted source of truth', 'Confident budget allocation', 'Clear incrementality'],
    mistakes: ['Over-relying on platform data', 'No server-side tracking', 'Wrong attribution window'],
    deliverables: ['Tracking plan', 'Implementation specs', 'QA documentation', 'Attribution dashboard'],
  },
  'cro': {
    title: 'CRO & Landing Pages',
    description: 'Conversion rate optimization and landing page strategy to maximize paid traffic value.',
    includes: ['Landing page audits', 'A/B test strategy', 'User journey mapping', 'Page speed optimization', 'Mobile experience'],
    whoFor: 'Brands with traffic but poor conversion rates.',
    timeline: '2-4 months for meaningful results',
    outcomes: ['20-40% CVR improvement', 'Lower CPA', 'Higher AOV'],
    mistakes: ['Testing too many things', 'No statistical significance', 'Ignoring mobile'],
    deliverables: ['CRO audit', 'Test roadmap', 'Landing page wireframes', 'Test results analysis'],
  },
  'creative': {
    title: 'Creative Strategy & Testing',
    description: 'Systematic approaches to finding and scaling winning creative concepts.',
    includes: ['Creative audit & analysis', 'Concept ideation', 'Testing framework design', 'Brief development', 'Performance analysis'],
    whoFor: 'Brands hitting creative fatigue or struggling to find winners.',
    timeline: 'Ongoing, minimum 3 months',
    outcomes: ['3x more winning concepts', 'Longer creative lifespan', 'Lower CPM'],
    mistakes: ['Random testing', 'No concept variation', 'Killing ads too early'],
    deliverables: ['Creative analysis', 'Testing framework', 'Monthly briefs', 'Performance reports'],
  },
  'retention': {
    title: 'Retention / LTV Growth',
    description: 'Retention strategy that compounds acquisition efficiency and funds more growth.',
    includes: ['Cohort analysis', 'Retention journey mapping', 'Email/SMS strategy', 'Loyalty program design', 'LTV modeling'],
    whoFor: 'Subscription or repeat-purchase brands with retention opportunities.',
    timeline: '3-6 months to see LTV impact',
    outcomes: ['15-25% LTV increase', 'Lower payback period', 'Higher budget capacity'],
    mistakes: ['Ignoring post-purchase', 'No cohort tracking', 'Discounting to death'],
    deliverables: ['Retention audit', 'Journey maps', 'Email/SMS calendars', 'LTV dashboard'],
  },
  'reporting': {
    title: 'Reporting & Dashboards',
    description: 'Custom dashboards and reporting systems that surface actionable insights.',
    includes: ['Dashboard design', 'Data pipeline setup', 'Automated reporting', 'Executive summaries', 'Alert systems'],
    whoFor: 'Teams drowning in data without clear insights.',
    timeline: '2-4 weeks for initial setup',
    outcomes: ['Hours saved weekly', 'Faster decisions', 'Aligned stakeholders'],
    mistakes: ['Too many metrics', 'No hierarchy', 'Manual reporting'],
    deliverables: ['Dashboard specs', 'Looker/Tableau build', 'Report templates', 'Documentation'],
  },
};

const engagementModels = [
  {
    id: 'consulting',
    title: 'Strategic Consulting',
    description: 'High-level strategy, audits, and roadmaps without hands-on execution.',
    startingFrom: '$5,000/month',
    includes: ['Weekly strategy calls', 'Channel audits', 'Roadmap development', 'Team training', 'Vendor evaluation'],
    bestFor: 'Teams with execution capacity needing strategic direction',
  },
  {
    id: 'management',
    title: 'Hands-on Management',
    description: 'Full ownership of paid media strategy and execution.',
    startingFrom: '$10,000/month',
    includes: ['Daily campaign management', 'Creative strategy', 'Reporting & analysis', 'Testing execution', 'Stakeholder updates'],
    bestFor: 'Brands without in-house expertise or capacity',
  },
  {
    id: 'audit',
    title: 'Audit & Roadmap',
    description: 'One-time deep dive with actionable recommendations.',
    startingFrom: '$3,500 one-time',
    includes: ['Full account audit', 'Tracking review', 'Competitive analysis', '90-day roadmap', 'Prioritized action items'],
    bestFor: 'Brands needing a fresh perspective or second opinion',
  },
];

const faqs = [
  { question: 'What size brands do you work with?', answer: 'I typically work with brands spending $50K+/month on paid media. Smaller brands can benefit from the Audit & Roadmap engagement to get started.' },
  { question: 'Do you work with agencies or in-house teams?', answer: 'Both. I often work alongside agencies to provide strategic oversight, or embed with in-house teams to level up their capabilities.' },
  { question: 'What\'s your typical engagement length?', answer: 'Most engagements are 3-6 months minimum. The best results come from longer partnerships where I deeply understand your business.' },
  { question: 'Do you guarantee results?', answer: 'I don\'t guarantee specific numbers, but I do guarantee a systematic approach, transparent communication, and measurable progress against agreed KPIs.' },
  { question: 'How do you charge?', answer: 'Monthly retainers for ongoing work, project fees for audits/one-time projects. No percentage of spend models—my incentives align with your profitability, not your spend.' },
];

const Services_1 = () => {
  const [activeService, setActiveService] = useState('performance');
  const [activeEngagement, setActiveEngagement] = useState('management');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);


  const currentService = serviceDetails[activeService];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-28 pb-12 md:pt-36 md:pb-36 section-bg-mesh">
          <div className="section-container text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="label-tag mb-3 block">Services</span>
              <h1 className="heading-display mb-4">
                Strategic services for{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-tab)' }}>profitable growth</span>
              </h1>
              <p className="text-body-lg max-w-xl mx-auto mb-8">From full-service paid media management to strategic consulting and one-time audits.</p>
              <Link href="/contact" className="btn-primary gap-2">Discuss Your Needs <ArrowRight className="w-4 h-4" /></Link>
            </motion.div>

            {/* Animated Service Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-14 max-w-4xl mx-auto"
            >
              <div className="relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 md:p-8 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.15), transparent 70%)' }} />
                
                {/* Funnel Flow */}
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Growth Engine</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
                  </div>

                  {/* Channel Icons Row */}
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-8">
                    {serviceCategories.map((cat, i) => (
                      <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.08, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.1, y: -4 }}
                        className="flex flex-col items-center gap-2 cursor-default"
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center border border-border/50 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                          style={{ background: `var(--gradient-icon-${(i % 3) + 1})` }}
                        >
                          <cat.icon className="w-5 h-5 text-foreground" />
                        </div>
                        <span className="text-[10px] text-muted-foreground font-medium text-center leading-tight hidden md:block">{cat.label.split(' ')[0]}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Animated Flow Arrows */}
                  <div className="flex items-center justify-center gap-3 md:gap-6 mb-8">
                    {['Strategy', 'Execute', 'Measure', 'Scale'].map((step, i) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + i * 0.15 }}
                        className="flex items-center gap-2 md:gap-4"
                      >
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{
                              background: `var(--gradient-icon-${(i % 3) + 1})`,
                              boxShadow: '0 4px 15px hsl(var(--primary) / 0.15)',
                            }}
                          >
                            {i + 1}
                          </motion.div>
                          <span className="text-xs md:text-sm font-semibold text-foreground">{step}</span>
                        </div>
                        {i < 3 && (
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                          >
                            <ArrowRight className="w-4 h-4 text-primary/50" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Results Bar */}
                  <div className="rounded-xl border border-border/50 bg-background/50 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary flex items-center justify-center"
                      >
                        <TrendingUp className="w-3.5 h-3.5 text-primary" />
                      </motion.div>
                      <span className="text-sm text-muted-foreground">Continuous optimization loop</span>
                    </div>
                    <div className="flex items-center gap-4">
                      {[{ label: 'Avg ROAS', value: '4.7x' }, { label: 'CAC Reduction', value: '35%+' }, { label: 'Brands', value: '50+' }].map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.8 + i * 0.2 }}
                          className="text-center"
                        >
                          <p className="text-sm md:text-base font-bold text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-tab)' }}>{stat.value}</p>
                          <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services — Left/Right Layout */}
        <section id="services-nav" className="section-padding section-bg-gradient">
          <div className="section-container">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Left: Service Tabs */}
              <div className="lg:w-72 xl:w-80 flex-shrink-0">
                <div className="lg:sticky lg:top-24 space-y-2 p-3 rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-lg">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 pt-1 pb-2" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>Services</p>
                  {serviceCategories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveService(cat.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-left ${
                        activeService === cat.id
                          ? 'text-primary-foreground shadow-lg'
                          : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
                      }`}
                      style={activeService === cat.id ? {
                        background: 'var(--gradient-tab)',
                        boxShadow: 'var(--shadow-tab-glow)',
                      } : {}}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          activeService === cat.id ? 'bg-white/20' : ''
                        }`}
                        style={activeService !== cat.id ? { background: 'var(--gradient-icon-1)' } : {}}
                      >
                        <cat.icon className={`w-4 h-4 ${activeService === cat.id ? 'text-primary-foreground' : 'text-primary'}`} />
                      </div>
                      {cat.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Right: Service Content */}
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Header */}
                    <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-sm p-6 md:p-8 shadow-sm">
                      <h2 className="heading-subsection mb-2">{currentService.title}</h2>
                      <p className="text-body">{currentService.description}</p>
                      <div className="flex flex-wrap gap-4 mt-5 pt-5 border-t border-border/60">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Best For</p>
                          <p className="text-sm text-foreground">{currentService.whoFor}</p>
                        </div>
                        <div className="hidden sm:block w-px bg-border" />
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Timeline</p>
                          <p className="text-sm text-foreground">{currentService.timeline}</p>
                        </div>
                      </div>
                    </div>

                    {/* Two-column grid: Included + Outcomes */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-icon-1)' }}>
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                          What's Included
                        </h3>
                        <ul className="space-y-2.5">
                          {currentService.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground">
                              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--gradient-primary)' }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-icon-2)' }}>
                            <TrendingUp className="w-4 h-4 text-primary" />
                          </div>
                          Typical Outcomes
                        </h3>
                        <div className="space-y-3">
                          {currentService.outcomes.map((outcome, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl p-3 border border-border/50 text-sm font-medium text-primary"
                              style={{ background: `var(--gradient-icon-${(idx % 3) + 1})` }}
                            >
                              {outcome}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Mistakes + Deliverables */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-sm p-6 shadow-sm">
                        <h3 className="font-semibold text-lg mb-4">Common Mistakes I Fix</h3>
                        <div className="flex flex-wrap gap-2">
                          {currentService.mistakes.map((mistake, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-destructive/10 to-orange-500/10 text-destructive border border-destructive/20"
                            >
                              {mistake}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-sm p-6 shadow-sm">
                        <h3 className="font-semibold text-lg mb-4">Deliverables</h3>
                        <div className="flex flex-wrap gap-2">
                          {currentService.deliverables.map((d, idx) => (
                            <span
                              key={idx}
                              className="text-sm px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Link href="/contact" className="btn-primary gap-2 inline-flex">
                      Discuss This Service <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement Models */}
        <section className="section-padding section-bg-mesh">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-10">
              <span className="label-tag mb-3 block">Engagement Models</span>
              <h2 className="heading-section">How we can work together</h2>
            </motion.div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="tabs-glow">
                {engagementModels.map(model => (
                  <button
                    key={model.id}
                    onClick={() => setActiveEngagement(model.id)}
                    className={`tab-glow ${activeEngagement === model.id ? 'tab-glow-active' : ''}`}
                  >
                    {model.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {engagementModels.map(model => model.id === activeEngagement && (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-background rounded-2xl border border-border p-6 md:p-8 shadow-lg"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-xl mb-2">{model.title}</h3>
                      <p className="text-lg text-muted-foreground mb-4">{model.description}</p>
                      <p className="text-lg text-foreground mb-1">Best for:</p>
                      <p className="text-lg text-muted-foreground mb-4">{model.bestFor}</p>
                      <div className="flex items-baseline gap-2">
                        <span 
                          className="stat-number text-transparent bg-clip-text"
                          style={{ backgroundImage: 'var(--gradient-tab)' }}
                        >
                          {model.startingFrom}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-3 text-primary">What's Included</h4>
                      <ul className="space-y-2">
                        {model.includes.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <div 
                              className="w-5 h-5 rounded-md flex items-center justify-center"
                              style={{ background: 'var(--gradient-icon-2)' }}
                            >
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Link href="/contact" className="btn-primary gap-2">
                      Book a Call <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-padding section-bg-accent">
          <div className="section-container max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <span className="label-tag mb-3 block">FAQs</span>
              <h2 className="heading-section">Common questions</h2>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className={`w-full flex items-center justify-between gap-4 px-6 py-5 rounded-xl border text-left transition-all duration-300 ${
                      activeFaq === index 
                        ? 'bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/40 shadow-lg' 
                        : 'bg-background/80 border-border hover:border-primary/20 hover:shadow-md'
                    }`}
                  >
                    <span className={`font-medium ${activeFaq === index ? 'text-primary' : 'text-foreground'}`}>{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeFaq === index ? 'bg-primary text-primary-foreground rotate-180' : 'bg-secondary text-muted-foreground'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-5 ml-4 mr-2 mt-2 rounded-xl bg-gradient-to-br from-card to-background border border-border/50 text-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services_1;
