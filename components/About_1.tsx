"use client"
import { motion, AnimatePresence } from "framer-motion";
import { Award, BookOpen, Target, Users, ArrowRight, Briefcase, TrendingUp, Zap, ChevronDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aboutPortrait from "@/assets/about-portrait.jpg";
import ToolkitSection from "@/components/ToolkitSection";
import CTASection from "@/components/home/CTASection";
import Image from "next/image";

const careerTimeline = [
    {
        year: "2016-2018",
        title: "Performance Marketing Manager",
        company: "Agency Side",
        description: "Cut my teeth managing $2M+ annual spend across 15 clients. Learned the fundamentals of attribution, creative testing, and cross-channel optimization.",
        learnings: ["Multi-client portfolio management", "Channel diversification", "Client communication"],
    },
    {
        year: "2018-2020",
        title: "Senior Growth Manager",
        company: "DTC Brand (In-House)",
        description: "Scaled a health & wellness brand from $3M to $18M revenue. Built the entire paid media infrastructure from scratch.",
        learnings: ["Full-funnel ownership", "LTV optimization", "Creative strategy systems"],
    },
    {
        year: "2020-2022",
        title: "Head of Acquisition",
        company: "B2B SaaS Startup",
        description: "Led a 5-person team, managing $8M annual budget. Reduced CAC by 52% while 3x-ing pipeline.",
        learnings: ["Team leadership", "B2B demand gen", "Account-based marketing"],
    },
    {
        year: "2022-Present",
        title: "Independent Consultant",
        company: "MarketPro",
        description: "Partnering with growth-stage companies to build profitable, scalable acquisition systems. $15M+ managed spend to date.",
        learnings: ["Strategic consulting", "Systems thinking", "Cross-industry expertise"],
    },
];

const expertise = [
    { icon: Target, title: "Paid Acquisition", description: "Meta, Google, TikTok, LinkedIn campaign strategy and execution", details: "Full-funnel campaign architecture, audience development, bid strategy optimization, and creative testing systems." },
    { icon: BookOpen, title: "Attribution", description: "Building measurement systems you can trust", details: "Server-side tracking, MMM, incrementality testing, and data warehouse integration for true source-of-truth reporting." },
    { icon: Users, title: "Creative Strategy", description: "Data-driven testing frameworks", details: "Structured creative briefing, concept testing methodologies, and iterative optimization cycles that consistently produce winners." },
    { icon: Award, title: "Growth Strategy", description: "Full-funnel optimization", details: "Holistic growth planning that connects acquisition to retention, maximizing LTV and compounding CAC efficiency." },
];

const teamTabs = [
    { id: 'founder', label: 'Founders', description: 'For founders who need a strategic partner, not just an executor. I help you think through growth architecture, prioritize initiatives, and build systems that scale with your business.', deliverables: ['Weekly strategy calls', 'Channel roadmap', 'Hiring support', 'Investor-ready metrics'] },
    { id: 'marketing', label: 'Marketing Teams', description: 'For in-house teams looking to level up. I work alongside your team, providing strategic direction, training, and hands-on support where needed.', deliverables: ['Process optimization', 'Team training', 'Vendor evaluation', 'Testing frameworks'] },
    { id: 'creative', label: 'Creative Teams', description: 'For creative teams who want data to inform their work without stifling creativity. I translate performance data into actionable creative briefs.', deliverables: ['Creative analysis', 'Concept testing', 'Brief development', 'Performance insights'] },
    { id: 'engineering', label: 'Engineering', description: 'For engineering teams implementing tracking and measurement. I provide specs, QA support, and bridge the gap between marketing needs and technical implementation.', deliverables: ['Tracking specs', 'Data architecture', 'QA protocols', 'Integration support'] },
];

const toolStack = [
    { category: 'Ad Platforms', tools: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 'Pinterest Ads'] },
    { category: 'Analytics', tools: ['GA4', 'Amplitude', 'Mixpanel', 'Heap', 'Segment'] },
    { category: 'Attribution', tools: ['Triple Whale', 'Northbeam', 'Rockerbox', 'Measured'] },
    { category: 'Data & BI', tools: ['Looker', 'Tableau', 'BigQuery', 'Snowflake', 'dbt'] },
    { category: 'Tracking', tools: ['GTM', 'Tealium', 'Segment', 'Stape', 'CAPI'] },
];

const values = [
    { title: "Profit Over Vanity", content: "I optimize for business outcomes, not metrics that look good in reports. ROAS is directional—profit margin is the north star." },
    { title: "Systems Over Tactics", content: "One-off wins don't compound. I build repeatable systems and processes that continue to deliver after our engagement ends." },
    { title: "Transparency Always", content: "No black boxes. You'll understand exactly what I'm doing, why I'm doing it, and how to replicate it with your team." },
    { title: "Long-Term Partnerships", content: "I'm not interested in quick projects. The best results come from deep partnerships where I truly understand your business." },
];


const About_1 = () => {
    const [activeTimelineStep, setActiveTimelineStep] = useState<number | null>(null);
    const [activeExpertise, setActiveExpertise] = useState<number | null>(null);
    const [activeTeamTab, setActiveTeamTab] = useState('founder');
    const [activeTool, setActiveTool] = useState<string | null>(null);
    const [activeValue, setActiveValue] = useState<number | null>(null);


    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main>
                {/* Hero Section */}
                <section className="pt-28 pb-16 md:pt-36 md:pb-20">
                    <div className="section-container">
                        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative order-2 lg:order-1">
                                <div className="image-container aspect-[5/4] rounded-2xl overflow-hidden">
                                    <Image src={aboutPortrait} alt="Marketing Strategist" className="w-full h-full object-cover" />
                                </div>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="absolute -bottom-4 -right-4 lg:right-4 card-glass p-5">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center"><p className="stat-number text-2xl text-primary">8+</p><p className="text-xs text-muted-foreground">Years</p></div>
                                        <div className="text-center"><p className="stat-number text-2xl text-primary">50+</p><p className="text-xs text-muted-foreground">Brands</p></div>
                                        <div className="text-center"><p className="stat-number text-2xl text-primary">$15M+</p><p className="text-xs text-muted-foreground">Spend</p></div>
                                    </div>
                                </motion.div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="order-1 lg:order-2">
                                <span className="label-tag mb-3 block">About Me</span>
                                <h1 className="heading-display mb-4">I'm a growth-obsessed marketer who believes in profit over vanity metrics</h1>
                                <p className="text-body-lg mb-6">With 8+ years in performance marketing and $15M+ in managed ad spend, I've helped DTC brands, B2B SaaS companies, and service businesses build profitable acquisition systems.</p>
                                <Link href="/contact" className="btn-primary gap-2">Let's Work Together <ArrowRight className="w-4 h-4" /></Link>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Career Timeline - Interactive */}
                {/* Career Timeline - No Expand */}
                <section className="section-padding section-bg-dots relative overflow-hidden">
                    {/* subtle warm blobs */}
                    <div className="pointer-events-none absolute -top-20 -right-24 h-72 w-72 rounded-full bg-[hsl(32_95%_52%/0.10)] blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-[hsl(18_90%_45%/0.08)] blur-3xl" />

                    <div className="section-container relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-2xl mx-auto mb-10"
                        >
                            <span className="label-tag mb-3 block">Career Snapshot</span>
                            <h2 className="heading-section">My journey to here</h2>
                        </motion.div>

                        <div className="relative">
                            {/* Desktop center line */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
                                <div className="h-full w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                                <div className="absolute inset-0 w-px bg-[hsl(32_95%_52%/0.22)] blur-[1px]" />
                            </div>

                            {/* Mobile left line */}
                            <div className="md:hidden absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

                            <div className="space-y-6">
                                {careerTimeline.map((step, index) => (
                                    <motion.div
                                        key={step.year}
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.08 }}
                                        className={`relative md:flex items-stretch gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                            }`}
                                    >
                                        {/* Mobile dot */}
                                        <div className="md:hidden absolute left-[0.35rem] top-7">
                                            <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-sm" />
                                        </div>

                                        <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                                            {/* Card */}
                                            <div className="group text-center relative">
                                                {/* hover glow */}
                                                <div className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-[hsl(32_95%_52%/0.20)]" />

                                                <div className="card-interactive relative bg-background/70 backdrop-blur-sm">
                                                    <div className="flex items-center gap-3 mb-2 justify-center">
                                                        {/* Year pill (less loud than chip-active) */}
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-border bg-card">
                                                            {step.year}
                                                        </span>

                                                        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                                                            <Briefcase className="w-4 h-4" />
                                                            Role
                                                        </span>
                                                    </div>

                                                    <h3 className="font-semibold text-xl mb-1">{step.title}</h3>
                                                    <p className="text-sm text-primary mb-2">{step.company}</p>
                                                    <p className="text-foreground">{step.description}</p>

                                                    {/* Learnings (always visible) */}
                                                    <div className="pt-4 mt-4 border-t border-border">
                                                        <p className="text-xs text-muted-foreground mb-2 font-medium">
                                                            Key Learnings:
                                                        </p>

                                                        <div
                                                            className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-center" : "md:justify-center"
                                                                }`}
                                                        >
                                                            {step.learnings.map((learning) => (
                                                                <span
                                                                    key={learning}
                                                                    className="text-xs px-2.5 py-1 rounded-full border border-border bg-card hover:border-primary/30 transition-colors"
                                                                >
                                                                    {learning}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Center dot (desktop) */}
                                        <div className="hidden md:flex items-center justify-center w-10">
                                            <div className="relative">
                                                <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-sm" />
                                                <div className="absolute inset-0 rounded-full bg-[hsl(32_95%_52%/0.35)] blur-md" />
                                            </div>
                                        </div>

                                        {/* Spacer side */}
                                        <div className="hidden md:block flex-1" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>



                {/* What I'm Known For - Hover Cards */}
                <section className="section-padding">
                    <div className="section-container">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-10">
                            <span className="label-tag mb-3 block">Expertise</span>
                            <h2 className="heading-section">What I'm known for</h2>
                        </motion.div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {expertise.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="card-interactive text-center group"
                                    onMouseEnter={() => setActiveExpertise(index)}
                                    onMouseLeave={() => setActiveExpertise(null)}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                                        <item.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold mb-2 text-xl">{item.title}</h3>
                                    <p className="text-foreground mb-3">{item.description}</p>

                                    {/* <AnimatePresence> */}
                                    {/* {activeExpertise === index && ( */}
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-3 border-t border-border">
                                            <p className="text-sm text-foreground">{item.details}</p>
                                        </div>
                                    </motion.div>
                                    {/* )} */}
                                    {/* </AnimatePresence> */}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How I Work With Teams - Tabs */}
                <section className="section-padding section-bg-mesh">
                    <div className="section-container">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-10">
                            <span className="label-tag mb-3 block">Collaboration</span>
                            <h2 className="heading-section">How I work with teams</h2>
                        </motion.div>

                        {/* Tab buttons - Attractive glow style */}
                        {/* <div className="flex justify-center mb-8">
              <div className="tabs-glow">
                {teamTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTeamTab(tab.id)}
                    className={`tab-glow ${activeTeamTab === tab.id ? 'tab-glow-active' : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div> */}

                        {/* Tab content */}
                        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                            {/* LEFT: Tabs only */}
                            <div className="lg:col-span-4">
                                <div className="bg-background rounded-xl border border-border p-3 h-full">
                                    <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
                                        {teamTabs.map((tab) => {
                                            const isActive = activeTeamTab === tab.id;

                                            return (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveTeamTab(tab.id)}
                                                    className={[
                                                        "flex-shrink-0 lg:flex-shrink w-full",
                                                        "px-4 py-3 rounded-lg border transition-all text-left",
                                                        "min-w-[180px] lg:min-w-0", // mobile horizontal tabs, desktop full width
                                                        isActive
                                                            ? "bg-primary/5 border-primary/30"
                                                            : "bg-background border-border hover:bg-secondary/50",
                                                    ].join(" ")}
                                                >
                                                    <div className="flex items-center justify-between gap-3">
                                                        <span className="font-medium text-foreground">{tab.label}</span>
                                                        <span
                                                            className={[
                                                                "h-2 w-2 rounded-full",
                                                                isActive ? "bg-primary" : "bg-border",
                                                            ].join(" ")}
                                                        />
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: Tab content */}
                            <div className="lg:col-span-8">
                                <div className="bg-background rounded-xl border border-border p-6 md:p-8 h-full">
                                    <AnimatePresence mode="wait">
                                        {teamTabs
                                            .filter((tab) => tab.id === activeTeamTab)
                                            .map((tab) => (
                                                <motion.div
                                                    key={tab.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="h-full"
                                                >
                                                    <div className="mb-6">
                                                        <h3 className="font-semibold text-xl mb-3">
                                                            Working with {tab.label}
                                                        </h3>
                                                        <p className="text-foreground">{tab.description}</p>
                                                    </div>

                                                    <div className="pt-6 border-t border-border">
                                                        <h4 className="font-medium mb-3 text-primary">
                                                            Typical Deliverables
                                                        </h4>
                                                        <div className="grid sm:grid-cols-2 gap-2">
                                                            {tab.deliverables.map((d) => (
                                                                <div key={d} className="flex items-center gap-2 text-sm">
                                                                    <Zap className="w-3 h-3 text-primary" />
                                                                    <span className="text-muted-foreground">{d}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>

                {/* Tool Stack - Clickable Chips */}
                <ToolkitSection toolStack={toolStack} speedSeconds={40} />
                {/* Values - Accordion - Attractive FAQ Style */}
                <section className="section-padding section-bg-mesh">
                    <div className="section-container max-w-3xl">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                            <span className="label-tag mb-3 block">Principles</span>
                            <h2 className="heading-section">How I operate</h2>
                            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
                                These core values guide every engagement and decision I make.
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group"
                                >
                                    <button
                                        onClick={() => setActiveValue(activeValue === index ? null : index)}
                                        className={`
                      w-full flex items-center justify-between gap-4 
                      px-6 py-5 rounded-xl border text-left
                      transition-all duration-300
                      ${activeValue === index
                                                ? 'bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/40 shadow-lg shadow-primary/5'
                                                : 'bg-background/80 border-border hover:border-primary/20 hover:bg-primary/5 hover:shadow-md'
                                            }
                    `}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm
                        transition-all duration-300
                        ${activeValue === index
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                                                }
                      `}>
                                                {String(index + 1).padStart(2, '0')}
                                            </div>
                                            <span className={`font-semibold text-lg ${activeValue === index ? 'text-primary' : 'text-foreground'}`}>
                                                {value.title}
                                            </span>
                                        </div>
                                        <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      transition-all duration-300
                      ${activeValue === index
                                                ? 'bg-primary text-primary-foreground rotate-180'
                                                : 'bg-secondary text-muted-foreground'
                                            }
                    `}>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {activeValue === index && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 py-5 ml-14 mr-2 mt-2 rounded-xl bg-gradient-to-br from-card to-background border border-border/50 text-foreground leading-relaxed">
                                                    {value.content}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Strip */}
                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default About_1;