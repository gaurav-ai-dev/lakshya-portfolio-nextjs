"use client"
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileSearch, Wrench, Rocket, BarChart3, RefreshCw, ArrowRight, ChevronDown, Check, Clock, FileText, MessageSquare, Calendar } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/home/CTASection";

const processSteps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Audit",
    duration: "Week 1-2",
    inputs: ['Access to ad accounts', 'Analytics access', 'Historical data', 'Business goals'],
    whatHappens: 'Deep dive into your current marketing stack, performance history, and business objectives. I identify quick wins and systemic issues.',
    outputs: ['Account audit report', 'Opportunity analysis', 'Quick win list', 'Strategic recommendations'],
    tools: ['Ad platform access', 'GA4/Analytics', 'Attribution tools', 'Spreadsheet analysis'],
    gradientIdx: 1,
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Strategy Development",
    duration: "Week 2-3",
    inputs: ['Audit findings', 'Stakeholder input', 'Competitive context', 'Budget parameters'],
    whatHappens: 'Develop a comprehensive growth strategy with clear priorities, timelines, and success metrics. Align with all stakeholders.',
    outputs: ['Growth strategy doc', 'Channel roadmap', '90-day plan', 'KPI framework'],
    tools: ['Strategy templates', 'Roadmapping tools', 'Presentation deck'],
    gradientIdx: 2,
  },
  {
    number: "03",
    icon: Wrench,
    title: "Foundation Building",
    duration: "Week 3-5",
    inputs: ['Strategy approval', 'Engineering support (if needed)', 'Creative assets'],
    whatHappens: 'Implement tracking infrastructure, restructure accounts, build dashboards, and set up testing frameworks.',
    outputs: ['Tracking implementation', 'Account restructure', 'Dashboard setup', 'Testing framework'],
    tools: ['GTM', 'GA4', 'Looker/Tableau', 'Ad platforms'],
    gradientIdx: 3,
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Scale",
    duration: "Week 5+",
    inputs: ['Foundation complete', 'Creative assets ready', 'Budget confirmed'],
    whatHappens: 'Launch optimized campaigns, begin systematic testing, and start scaling what works. Daily monitoring and optimization.',
    outputs: ['Live campaigns', 'Test results', 'Scaling playbook', 'Performance reports'],
    tools: ['Ad platforms', 'Creative tools', 'Automation'],
    gradientIdx: 1,
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Monitor & Report",
    duration: "Ongoing",
    inputs: ['Campaign data', 'Business updates', 'Market changes'],
    whatHappens: 'Continuous monitoring, weekly reporting, and monthly strategic reviews. Surface insights and adjust course as needed.',
    outputs: ['Weekly reports', 'Monthly reviews', 'Insight memos', 'Optimization log'],
    tools: ['Dashboards', 'Reporting tools', 'Communication'],
    gradientIdx: 2,
  },
  {
    number: "06",
    icon: RefreshCw,
    title: "Iterate & Improve",
    duration: "Ongoing",
    inputs: ['Performance data', 'Test results', 'Market intelligence'],
    whatHappens: 'Continuously test new concepts, channels, and strategies. Document learnings and compound wins over time.',
    outputs: ['Test roadmap', 'New initiatives', 'Playbook updates', 'Team training'],
    tools: ['Testing frameworks', 'Analysis tools', 'Documentation'],
    gradientIdx: 3,
  },
];

const deliverables = [
  { icon: FileText, title: 'Audit Report', description: 'Comprehensive analysis of current state with prioritized recommendations', detail: '15-20 page document covering account structure, tracking, creative performance, and competitive positioning.', gradientIdx: 1 },
  { icon: FileSearch, title: 'Tracking Plan', description: 'Complete specification for measurement infrastructure', detail: 'Event taxonomy, implementation specs, QA checklist, and data flow documentation.', gradientIdx: 2 },
  { icon: Wrench, title: 'Creative Testing Board', description: 'System for tracking creative tests and extracting learnings', detail: 'Notion/Airtable board with hypothesis tracking, test results, and winning concept library.', gradientIdx: 3 },
  { icon: BarChart3, title: 'Performance Dashboard', description: 'Custom dashboard with all key metrics in one place', detail: 'Looker/Tableau dashboard connected to all data sources with automated refresh and executive views.', gradientIdx: 1 },
  { icon: MessageSquare, title: 'Weekly Updates', description: 'Consistent communication on progress and insights', detail: 'Written update every week covering performance, tests in progress, and strategic recommendations.', gradientIdx: 2 },
  { icon: Calendar, title: 'Monthly Strategy Review', description: 'Deep-dive session on strategy and planning', detail: '60-90 minute call reviewing the month, adjusting strategy, and planning ahead.', gradientIdx: 3 },
];

const communicationTabs = [
  { id: 'weekly', label: 'Weekly Update', content: 'Every week you receive a written update covering: performance vs. targets, tests launched/completed, key insights, and priorities for the coming week. Async-first to respect your time.' },
  { id: 'monthly', label: 'Monthly Strategy', content: 'Monthly 60-90 minute call to review performance trends, discuss strategic adjustments, plan upcoming initiatives, and ensure alignment with business goals.' },
  { id: 'dashboard', label: 'Dashboard Access', content: '24/7 access to a custom dashboard showing real-time performance. No more waiting for reports—you can see exactly how campaigns are performing anytime.' },
];

const Process_1 = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activeDeliverable, setActiveDeliverable] = useState<number | null>(null);
  const [activeCommunication, setActiveCommunication] = useState('weekly');

  const scrollToSteps = () => {
    document.getElementById('process-steps')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-28 pb-12 md:pt-36 md:pb-16 relative overflow-hidden section-bg-mesh">
          <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="label-tag mb-3 block">Process</span>
              <h1 className="heading-display mb-4">
                A proven process for{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-tab)' }}>predictable growth</span>
              </h1>
              <p className="text-body-lg max-w-xl mx-auto mb-8">No guesswork, no black boxes. A systematic approach refined across 50+ engagements.</p>
              <button onClick={scrollToSteps} className="btn-primary gap-2">
                Start the Process <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Animated Process Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-14 max-w-4xl mx-auto"
            >
              <div className="relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 md:p-8 overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 50% 100%, hsl(var(--primary) / 0.12), transparent 70%)' }} />

                <div className="relative z-10">
                  {/* Process Timeline */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
                    {processSteps.slice(0, 6).map((step, i) => (
                      <motion.div
                        key={step.number}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.12, type: "spring", stiffness: 150 }}
                        className="flex md:flex-col items-center gap-3 md:gap-2 flex-1 relative"
                      >
                        {/* Connector line (desktop) */}
                        {i < 5 && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                            className="hidden md:block absolute top-5 left-[calc(50%+20px)] right-[-50%] h-px origin-left"
                            style={{ background: 'linear-gradient(90deg, hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.1))' }}
                          />
                        )}

                        {/* Step circle */}
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          animate={i === 0 ? { boxShadow: ['0 0 0 0 hsl(var(--primary) / 0)', '0 0 0 8px hsl(var(--primary) / 0.1)', '0 0 0 0 hsl(var(--primary) / 0)'] } : {}}
                          transition={i === 0 ? { duration: 2, repeat: Infinity } : {}}
                          className="w-10 h-10 rounded-full flex items-center justify-center border border-border/50 shadow-lg flex-shrink-0 cursor-default"
                          style={{ background: `var(--gradient-icon-${(i % 3) + 1})` }}
                        >
                          <step.icon className="w-4 h-4 text-foreground" />
                        </motion.div>

                        {/* Label */}
                        <div className="md:text-center">
                          <p className="text-xs font-bold text-foreground">{step.title}</p>
                          <p className="text-[10px] text-muted-foreground">{step.duration}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom progress indicator */}
                  <div className="mt-8 rounded-xl border border-border/50 bg-background/50 p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Typical Timeline</span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <div className="relative h-3 rounded-full bg-muted/50 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1.5, duration: 2, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: 'var(--gradient-primary)' }}
                      />
                      {/* Milestone dots */}
                      {[15, 30, 50, 75, 90].map((pos, i) => (
                        <motion.div
                          key={pos}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.8 + i * 0.3 }}
                          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-background border border-primary shadow-sm"
                          style={{ left: `${pos}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] text-muted-foreground">Week 1</span>
                      <span className="text-[10px] text-muted-foreground">Week 3</span>
                      <span className="text-[10px] text-muted-foreground">Week 5+</span>
                      <span className="text-[10px] text-muted-foreground font-semibold text-primary">Ongoing Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Steps */}
        <section id="process-steps" className="section-padding section-bg-gradient">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-10">
              <span className="label-tag mb-3 block">The Journey</span>
              <h2 className="heading-section">How we get from here to growth</h2>
            </motion.div>

            {/* Timeline-style process steps */}
            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden md:block" />

              <div className="space-y-5">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="relative group"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 md:left-8 top-7 w-3 h-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background z-10 hidden md:block transition-all duration-300 group-hover:scale-150 group-hover:border-accent" />

                    <div className="md:pl-16">
                      <button
                        onClick={() => setActiveStep(activeStep === index ? null : index)}
                        className={`w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden ${
                          activeStep === index
                            ? 'border-primary/40 shadow-xl'
                            : 'border-border bg-card/80 hover:border-primary/20 hover:shadow-lg'
                        }`}
                      >
                        {/* Card top gradient accent */}
                        {activeStep === index && (
                          <div className="h-1 w-full" style={{ background: 'var(--gradient-primary)' }} />
                        )}

                        <div className="p-5 md:p-6">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                              <span
                                className="text-2xl font-bold text-transparent bg-clip-text"
                                style={{ backgroundImage: 'var(--gradient-tab)', fontFamily: "'DM Sans', system-ui, sans-serif" }}
                              >
                                {step.number}
                              </span>
                              <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                                style={{ background: `var(--gradient-icon-${step.gradientIdx})`, boxShadow: 'var(--shadow-icon)' }}
                              >
                                <step.icon className="w-5 h-5 text-primary" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg">{step.title}</h3>
                              <p className="text-sm text-muted-foreground mt-0.5 hidden sm:block">{step.whatHappens.slice(0, 80)}…</p>
                            </div>
                            <span className="hidden sm:inline-flex px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20">
                              {step.duration}
                            </span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                              activeStep === index ? 'bg-primary text-primary-foreground rotate-180' : 'bg-secondary text-muted-foreground'
                            }`}>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {activeStep === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 md:p-8 -mt-2 pt-8 rounded-b-2xl border border-t-0 border-border bg-gradient-to-b from-card/90 to-background">
                              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                  { label: 'Inputs Needed', items: step.inputs, icon: Clock, gIdx: 1 },
                                  { label: 'What Happens', items: [step.whatHappens], icon: Wrench, gIdx: 2, isText: true },
                                  { label: 'Outputs', items: step.outputs, icon: Check, gIdx: 3 },
                                  { label: 'Tools Used', items: step.tools, icon: BarChart3, gIdx: 1, isTags: true },
                                ].map((col) => (
                                  <div key={col.label}>
                                    <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `var(--gradient-icon-${col.gIdx})` }}>
                                        <col.icon className="w-3.5 h-3.5 text-primary" />
                                      </div>
                                      {col.label}
                                    </h4>
                                    {col.isTags ? (
                                      <div className="flex flex-wrap gap-1.5">
                                        {col.items.map((item, idx) => (
                                          <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 font-medium">
                                            {item}
                                          </span>
                                        ))}
                                      </div>
                                    ) : col.isText ? (
                                      <p className="text-sm text-muted-foreground leading-relaxed">{col.items[0]}</p>
                                    ) : (
                                      <ul className="space-y-1.5">
                                        {col.items.map((item, idx) => (
                                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--gradient-primary)' }} />
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="section-padding section-bg-dots">
          <div className="section-container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-10"
            >
              <span className="label-tag mb-3 block">Deliverables</span>
              <h2 className="heading-section">What you get</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {deliverables.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  {/* subtle hover glow */}
                  <div className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-[hsl(32_95%_52%/0.16)]" />

                  <div className="relative h-full rounded-2xl border border-border bg-background/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `var(--gradient-icon-${item.gradientIdx})` }}
                      >
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Styled detail box (this removes “messy” look) */}
                    <div className="mt-5 rounded-xl border border-border/70 bg-[hsl(32_95%_52%/0.06)] dark:bg-[hsl(24_94%_50%/0.08)] p-4">
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        Included
                      </p>
                      <p className="text-foreground leading-relaxed">
                        {item.detail}
                      </p>
                    </div>

                    {/* tiny footer line for structure */}
                    <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[hsl(32_95%_52%/0.75)]" />
                        Delivered as a system
                      </span>
                      <span className="opacity-70">Reusable</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>



        {/* Communication & Reporting */}
        <section className="section-padding section-bg-accent">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 max-w-2xl mx-auto"
            >
              <span className="label-tag mb-3 block">Communication</span>
              <h2 className="heading-section">How we stay aligned</h2>
            </motion.div>

            {/* Simple Grid (no tabs) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
              {communicationTabs.map((tab, index) => (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="h-full"
                >
                  <div className="h-full rounded-2xl border border-border bg-background/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                    <h3 className="font-semibold text-xl mb-3 text-foreground">
                      {tab.label}
                    </h3>

                    <div className="rounded-xl border border-border/70 bg-[hsl(32_95%_52%/0.06)] dark:bg-[hsl(24_94%_50%/0.08)] p-4 flex-1">
                      <p className="text-muted-foreground leading-relaxed">
                        {tab.content}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-border/60 text-xs text-muted-foreground">
                      Clear expectations. No surprises.
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="section-padding relative overflow-hidden" style={{ background: 'var(--gradient-dark)' }}>
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full blur-3xl -translate-y-1/2"
              style={{ background: 'radial-gradient(circle, hsl(230 85% 55% / 0.3) 0%, transparent 70%)' }}
            />
            <div
              className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full blur-3xl -translate-y-1/2"
              style={{ background: 'radial-gradient(circle, hsl(260 75% 58% / 0.25) 0%, transparent 70%)' }}
            />
          </div>

          <CTASection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Process_1;
