"use client"
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Target,
  Layers,
  RefreshCw,
  BarChart3,
  Users,
  Info,
} from "lucide-react";
import { useState } from "react";

const principles = [
  {
    id: "profit",
    icon: TrendingUp,
    title: "Profit > ROAS",
    shortDesc: "ROAS is directional, not a north star.",
    fullDesc:
      "ROAS is directional, not a north star. I optimize for actual profit margins by factoring in COGS, shipping, returns, and LTV projections. A 3x ROAS with 60% margins beats 5x ROAS with 20% margins every time.",
    tags: ["attribution", "scaling"],
    gradientIdx: 1,
  },
  {
    id: "measurement",
    icon: Target,
    title: "Measurement First",
    shortDesc: "You can't improve what you can't measure.",
    fullDesc:
      "You can't improve what you can't measure. Tracking infrastructure comes before campaign scaling. This means server-side tracking, proper attribution windows, and incrementality testing frameworks.",
    tags: ["attribution", "cro"],
    gradientIdx: 2,
  },
  {
    id: "creative",
    icon: Layers,
    title: "Creative as a System",
    shortDesc: "Building testing frameworks that work.",
    fullDesc:
      "Building testing frameworks that consistently produce winning creatives. This isn't about one viral ad—it's about systematic concept testing, iteration cycles, and data-informed creative briefs.",
    tags: ["creative", "scaling"],
    gradientIdx: 3,
  },
  {
    id: "retention",
    icon: RefreshCw,
    title: "Retention is Acquisition",
    shortDesc: "LTV improvements compound CAC efficiency.",
    fullDesc:
      "LTV improvements compound your CAC efficiency dramatically. A 10% lift in retention can fund 15%+ more acquisition spend. I build retention signals into acquisition strategy from day one.",
    tags: ["ltv", "retention"],
    gradientIdx: 1,
  },
  {
    id: "data",
    icon: BarChart3,
    title: "Data-Informed",
    shortDesc: "Numbers tell you what. Strategy tells you why.",
    fullDesc:
      "Numbers tell you what. Strategy requires understanding why. I combine quantitative rigor with qualitative insights—customer research, competitive analysis, and market context drive strategic decisions.",
    tags: ["strategy", "attribution"],
    gradientIdx: 2,
  },
  {
    id: "collaboration",
    icon: Users,
    title: "Cross-Team Collaboration",
    shortDesc: "Best results come from tight loops.",
    fullDesc:
      "Best results come from tight loops with product, creative, and engineering. Marketing doesn't live in a silo. I embed with your team to ensure campaigns align with product roadmaps and brand vision.",
    tags: ["strategy", "creative"],
    gradientIdx: 3,
  },
];

const decisionTags = [
  { id: "scaling", label: "Scaling" },
  { id: "attribution", label: "Attribution" },
  { id: "creative", label: "Creative" },
  { id: "ltv", label: "LTV/Retention" },
  { id: "cro", label: "CRO" },
  { id: "strategy", label: "Strategy" },
];

const outcomeStats = [
  {
    value: "156%",
    label: "Average ROI Increase",
    tooltip: "Comparing first 6 months to pre-engagement baseline",
  },
  {
    value: "45%",
    label: "Lower CPA on Average",
    tooltip: "Achieved through better targeting and creative optimization",
  },
  {
    value: "3.2x",
    label: "Revenue Growth",
    tooltip: "Median client revenue growth over 12 months",
  },
  {
    value: "$50M+",
    label: "Revenue Generated",
    tooltip: "Cumulative attributable revenue across all clients",
  },
];

const GrowthPhilosophy = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const filteredPrinciples = activeTag
    ? principles.filter((p) => p.tags.includes(activeTag))
    : principles;

  return (
    <section className="section-padding section-bg-accent relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <span className="label-tag mb-3 block">Philosophy</span>
          <h2 className="heading-section mb-3">How I think about growth</h2>
          <p className="text-body-lg">
            After 8 years and $15M+ in managed ad spend, these principles guide
            every decision.
          </p>
        </motion.div>

        {/* Premium Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <div className="tabs-glow">
            <button
              onClick={() => setActiveTag(null)}
              className={`tab-glow ${!activeTag ? 'tab-glow-active' : ''}`}
            >
              All Principles
            </button>
            {decisionTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setActiveTag(activeTag === tag.id ? null : tag.id)}
                className={`tab-glow ${activeTag === tag.id ? 'tab-glow-active' : ''}`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredPrinciples.map((principle, index) => (
              <motion.div
                key={principle.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -12 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="group relative"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)' }} />

                <div className="relative h-full rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-xl group-hover:-translate-y-1">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-6 right-6 h-px" style={{ background: `var(--gradient-icon-${principle.gradientIdx})` }} />

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
                      style={{ background: `var(--gradient-icon-${principle.gradientIdx})`, boxShadow: 'var(--shadow-icon)' }}
                    >
                      <principle.icon className="w-6 h-6 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-xl mb-1">
                        {principle.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/60">
                    <p className="text-muted-foreground leading-relaxed">
                      {principle.fullDesc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {principle.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 font-medium"
                        >
                          #{decisionTags.find((t) => t.id === tag)?.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Interactive Outcomes Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 p-8 rounded-2xl relative overflow-hidden"
          style={{ background: 'var(--gradient-dark)' }}
        >
          {/* Background glow */}
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {outcomeStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center relative cursor-pointer"
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                whileHover={{ scale: 1.05 }}
              >
                <p className="stat-number text-white">{stat.value}</p>
                <p className="text-xs text-white/70 flex items-center justify-center gap-1">
                  {stat.label}
                  <Info className="w-3 h-3" />
                </p>

                <AnimatePresence>
                  {hoveredStat === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full px-3 py-2 bg-background text-foreground text-xs rounded-lg shadow-xl whitespace-nowrap z-10 border border-border"
                    >
                      {stat.tooltip}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GrowthPhilosophy;
