"use client"
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, TrendingUp, Target, Layers } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import caseStudy1 from "@/assets/case-study-1.jpg";
import caseStudy2 from "@/assets/case-study-2.jpg";
import caseStudy3 from "@/assets/case-study-3.jpg";
import Image from "next/image";

const filterChips = [
  { id: 'all', label: 'All' },
  { id: 'dtc', label: 'DTC' },
  { id: 'saas', label: 'SaaS' },
  { id: 'services', label: 'Services' },
  { id: 'meta', label: 'Meta' },
  { id: 'google', label: 'Google' },
  { id: 'cro', label: 'CRO' },
];

const caseStudies = [
  {
    id: 1,
    category: "E-Commerce",
    tags: ['dtc', 'meta', 'cro'],
    title: "Scaling DTC Brand from $2M to $12M Revenue",
    description: "Restructured the entire paid media strategy, implemented robust attribution, and built a creative testing system.",
    image: caseStudy1,
    featured: true,
    icon: TrendingUp,
    metrics: [
      { label: "Revenue Growth", value: "6x" },
      { label: "ROAS", value: "5.2x" },
      { label: "CAC Reduction", value: "-38%" },
    ],
  },
  {
    id: 2,
    category: "B2B SaaS",
    tags: ['saas', 'google'],
    title: "Reducing CAC by 52% for Series B Startup",
    description: "Rebuilt the entire demand generation engine with focus on intent signals and account-based targeting.",
    image: caseStudy2,
    featured: false,
    icon: Target,
    metrics: [
      { label: "CAC Reduction", value: "52%" },
      { label: "Pipeline Growth", value: "3.8x" },
      { label: "SQL Rate", value: "+127%" },
    ],
  },
  {
    id: 3,
    category: "Health & Wellness",
    tags: ['dtc', 'meta', 'cro'],
    title: "Building a $5M/year Subscription Business",
    description: "Created a full-funnel acquisition strategy focused on LTV and built retention loops into the acquisition model.",
    image: caseStudy3,
    featured: false,
    icon: Layers,
    metrics: [
      { label: "Monthly Revenue", value: "$420K" },
      { label: "LTV:CAC", value: "4.1:1" },
      { label: "Retention", value: "78%" },
    ],
  },
];

const CaseStudySummaries = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredStudies = activeFilter === 'all' 
    ? caseStudies 
    : caseStudies.filter(s => s.tags.includes(activeFilter));

  const featuredStudy = caseStudies.find(s => s.featured);

  return (
    <section className="section-padding section-bg-gradient">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
        >
          <div className="max-w-xl">
            <span className="label-tag mb-3 block">Case Studies</span>
            <h2 className="heading-section mb-2">
              Real results, real businesses
            </h2>
            <p className="text-body-lg">
              A selection of recent client partnerships and the measurable impact we achieved together.
            </p>
          </div>
          <Link href="/case-studies" className="btn-secondary gap-2 whitespace-nowrap">
            View All Case Studies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Premium Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="tabs-glow">
            {filterChips.map(chip => (
              <button
                key={chip.id}
                onClick={() => setActiveFilter(chip.id)}
                className={`tab-glow ${activeFilter === chip.id ? 'tab-glow-active' : ''}`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Case Study */}
        {activeFilter === 'all' && featuredStudy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Link href="/case-studies" className="block group">
              <div className="relative rounded-2xl overflow-hidden bg-background border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                <div className="grid lg:grid-cols-2">
                  <div className="relative aspect-[4/3] lg:aspect-auto">
                    <Image 
                      src={featuredStudy.image} 
                      alt={featuredStudy.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent lg:bg-gradient-to-r" />
                  </div>
                  <div className="p-6 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'var(--gradient-icon-1)' }}
                      >
                        <Star className="w-4 h-4 text-primary fill-primary" />
                      </div>
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">Featured Case Study</span>
                    </div>
                    <span className="text-sm text-muted-foreground mb-2">{featuredStudy.category}</span>
                    <h3 className="heading-subsection mb-3 group-hover:text-primary transition-colors">
                      {featuredStudy.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {featuredStudy.description}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {featuredStudy.metrics.map((metric, idx) => (
                        <div 
                          key={metric.label} 
                          className={`bg-gradient-to-r ${idx === 0 ? 'from-blue-500/10 to-purple-500/10' : idx === 1 ? 'from-emerald-500/10 to-cyan-500/10' : 'from-orange-500/10 to-pink-500/10'} rounded-xl p-3 border border-border/50`}
                        >
                          <p className="stat-number text-xl text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-tab)' }}>{metric.value}</p>
                          <p className="text-xs text-muted-foreground">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      View Full Breakdown
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Case Study Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredStudies.filter(s => activeFilter !== 'all' || !s.featured).map((study, index) => (
              <motion.article
                key={study.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <Link href="/case-studies" className="block">
                  <div className="card-interactive h-full">
                    {/* Image */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                      <Image
                        src={study.image} 
                        alt={study.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur-sm text-xs font-medium border border-border/50">
                          {study.category}
                        </span>
                      </div>
                    </div>

                    {/* Metrics with gradient backgrounds */}
                    <div className="flex gap-2 mb-4">
                      {study.metrics.slice(0, 2).map((metric, idx) => (
                        <div 
                          key={metric.label} 
                          className={`flex-1 text-center bg-gradient-to-r ${idx === 0 ? 'from-blue-500/10 to-indigo-500/10' : 'from-emerald-500/10 to-cyan-500/10'} rounded-lg py-2 border border-border/50`}
                        >
                          <p className="stat-number text-lg text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-tab)' }}>{metric.value}</p>
                          <p className="text-[10px] text-muted-foreground truncate px-1">{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {study.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {study.description}
                    </p>

                    {/* Read More */}
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      Read Case Study
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySummaries;
