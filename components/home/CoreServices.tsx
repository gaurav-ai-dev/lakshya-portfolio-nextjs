"use client";
import { motion } from "framer-motion";
import { Code2, FileText, Link2, ArrowRight, TrendingUp, Zap, Star, Shield, BarChart3, Globe } from "lucide-react";
import Link from "next/link";

/* ─── Data ─────────────────────────────────────── */
const rows = [
    {
        index: 0,
        icon: Code2,
        tag: "Technical SEO",
        title: "Comprehensive Technical SEO Audits & Infrastructure Optimization",
        body: "I conduct deep-dive audits to eliminate crawl errors, optimize Core Web Vitals, and implement advanced Schema Markup for better search visibility.",
        features: ["JS Rendering Fixes", "Site Speed Optimization", "Sitemap Architecture"],
        href: "/services#technical-seo",
        imageRight: false,
        stats: [
            { icon: Zap, value: "98", label: "PageSpeed Score", color: "#22c55e" },
            { icon: BarChart3, value: "3.2s→0.8s", label: "LCP Improved", color: "hsl(var(--primary))" },
            { icon: Globe, value: "100%", label: "Crawl Coverage", color: "#6366f1" },
        ],
        accentFrom: "hsl(var(--primary)/0.18)",
        accentTo: "hsl(var(--accent)/0.10)",
        darkFrom: "hsl(var(--primary)/0.12)",
        darkTo: "hsl(var(--foreground)/0.04)",
    },
    {
        index: 1,
        icon: FileText,
        tag: "Content Strategy",
        title: "Strategic Content Marketing & Semantic SEO Search Intent",
        body: "I specialize in Topical Authority. By aligning content with US user search intent, I build E-E-A-T that satisfies both users and search engine algorithms.",
        features: ["Keyword Mapping", "Competitor Gap Analysis", "E-E-A-T Strategy"],
        href: "/services#content-seo",
        imageRight: true,
        stats: [
            { icon: TrendingUp, value: "+340%", label: "Organic Traffic", color: "#22c55e" },
            { icon: Star, value: "Top 3", label: "SERP Positions", color: "hsl(var(--primary))" },
            { icon: Globe, value: "50+", label: "Topical Clusters", color: "#6366f1" },
        ],
        accentFrom: "hsl(32 95% 52%/0.15)",
        accentTo: "hsl(18 90% 45%/0.08)",
        darkFrom: "hsl(32 95% 52%/0.10)",
        darkTo: "hsl(var(--foreground)/0.04)",
    },
    {
        index: 2,
        icon: Link2,
        tag: "Link Building",
        title: "White-Hat Link Building & Digital PR for USA Brands",
        body: "My services include manual, White-Hat link acquisition from high-DR, niche-relevant US publications to grow your domain safely without penalty risks.",
        features: ["Manual Outreach", "Guest Posting", "Toxic Link Audits"],
        href: "/services#link-building",
        imageRight: false,
        stats: [
            { icon: Shield, value: "DR 70+", label: "Avg. Link Quality", color: "#22c55e" },
            { icon: TrendingUp, value: "+28", label: "DA Growth", color: "hsl(var(--primary))" },
            { icon: Star, value: "0 Penalty", label: "Clean Profile", color: "#6366f1" },
        ],
        accentFrom: "hsl(var(--primary)/0.14)",
        accentTo: "hsl(150 60% 40%/0.08)",
        darkFrom: "hsl(var(--primary)/0.10)",
        darkTo: "hsl(var(--foreground)/0.04)",
    },
];

/* ─── Visual Panel ──────────────────────────────── */
function VisualPanel({ row }: { row: typeof rows[0] }) {
    const Icon = row.icon;
    return (
        <div className="relative h-full">
            {/* Outer soft glow */}
            <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 50%, ${row.accentFrom}, transparent 70%)` }}
            />

            {/* Main panel */}
            <div
                className="relative h-full rounded-2xl overflow-hidden border border-border/60 shadow-xl"
                style={{
                    background: `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)`,
                }}
            >
                {/* Top gradient band */}
                <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                    style={{ background: "var(--gradient-tab)" }}
                />

                {/* Subtle mesh inside panel */}
                <div
                    className="absolute inset-0 opacity-50 pointer-events-none"
                    style={{
                        background: `radial-gradient(at 20% 0%, ${row.accentFrom} 0px, transparent 50%),
                         radial-gradient(at 80% 100%, ${row.accentTo} 0px, transparent 50%)`,
                    }}
                />

                <div className="relative p-8 flex flex-col gap-7 h-full">
                    {/* Step + Icon row */}
                    <div className="flex items-start justify-between">
                        {/* Step pill */}
                        <span
                            className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-primary-foreground"
                            style={{ background: "var(--gradient-tab)" }}
                        >
                            0{row.index + 1}
                        </span>

                        {/* Icon badge */}
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-tab-glow)" }}
                        >
                            <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                        </div>
                    </div>

                    {/* Mock dashboard cards — stat grid */}
                    <div className="grid grid-cols-1 gap-3">
                        {row.stats.map((stat, i) => {
                            const StatIcon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, x: -12 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                                    className="flex items-center gap-4 px-4 py-3 rounded-xl border border-border/60 bg-background/70 backdrop-blur-sm shadow-sm"
                                >
                                    {/* Icon dot */}
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}30` }}
                                    >
                                        <StatIcon className="w-4 h-4" style={{ color: stat.color }} strokeWidth={2} />
                                    </div>

                                    {/* Value */}
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className="text-sm font-bold text-foreground leading-none"
                                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                                        >
                                            {stat.value}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</p>
                                    </div>

                                    {/* Trend dot */}
                                    <span
                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                        style={{ background: stat.color, boxShadow: `0 0 6px ${stat.color}` }}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Bottom label */}
                    <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground font-medium">Real client results</p>
                        <div className="flex gap-1">
                            {[0, 1, 2].map((d) => (
                                <span
                                    key={d}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                        background: d === 0 ? "hsl(var(--primary))" : "hsl(var(--border))",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Text Block ────────────────────────────────── */
function TextBlock({ row }: { row: typeof rows[0] }) {
    return (
        <div className="flex flex-col justify-center gap-6">
            {/* Tag */}
            <div>
                <span className="label-tag">{row.tag}</span>
            </div>

            {/* Title */}
            <h3
                className="text-2xl sm:text-3xl font-bold text-foreground leading-tight tracking-tight"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
                {row.title}
            </h3>

            {/* Accent bar */}
            <div
                className="w-14 h-1.5 rounded-full"
                style={{ background: "var(--gradient-tab)" }}
            />

            {/* Body */}
            <p className="text-body leading-relaxed text-lg">{row.body}</p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
                {row.features.map((f) => (
                    <span
                        key={f}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
                        style={{
                            background: "linear-gradient(135deg, hsl(var(--primary)/0.08), hsl(var(--accent)/0.06))",
                            borderColor: "hsl(var(--primary)/0.25)",
                            color: "hsl(var(--foreground))",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: "var(--gradient-tab)", minWidth: "6px" }}
                        />
                        {f}
                    </span>
                ))}
            </div>

            {/* CTA */}
            <Link
                href={row.href}
                className="inline-flex items-center gap-2 text-sm font-semibold w-fit group"
                style={{ color: "hsl(var(--primary))" }}
            >
                Explore this service
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
        </div>
    );
}

/* ─── Section ───────────────────────────────────── */
export default function CoreServices() {
    return (
        <section className="section-padding section-bg-mesh relative overflow-hidden">
            <div className="section-container relative">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="label-tag mb-3 block">Core Services</span>
                    <h2 className="heading-section mb-5">
                        Comprehensive SEO Solutions{" "}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "var(--gradient-tab)" }}
                        >
                            for the US Market
                        </span>
                    </h2>
                    <p className="text-body-lg max-w-2xl mx-auto">
                        End-to-end organic growth — from infrastructure fixes to content strategy
                        and authority building — with measurable outcomes at every step.
                    </p>
                </motion.div>

                {/* ── Alternating Rows ── */}
                <div className="flex flex-col gap-24 md:gap-32">
                    {rows.map((row) => (
                        <motion.div
                            key={row.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.65, ease: "easeOut" }}
                            className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center`}
                        >
                            {row.imageRight ? (
                                <>
                                    <TextBlock row={row} />
                                    <VisualPanel row={row} />
                                </>
                            ) : (
                                <>
                                    {/* On mobile, text always comes first */}
                                    <div className="order-2 md:order-1">
                                        <VisualPanel row={row} />
                                    </div>
                                    <div className="order-1 md:order-2">
                                        <TextBlock row={row} />
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* ── Divider CTA banner ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.2 }}
                    className="relative mt-24 rounded-2xl overflow-hidden p-10 md:p-14 text-center"
                    style={{ background: "var(--gradient-dark)" }}
                >
                    {/* Inner glow */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-20"
                        style={{
                            background:
                                "radial-gradient(ellipse at 30% 50%, hsl(var(--primary)/0.5) 0px, transparent 60%)," +
                                "radial-gradient(ellipse at 70% 50%, hsl(var(--accent)/0.4) 0px, transparent 60%)",
                        }}
                    />

                    <div className="relative z-10">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
                            Ready to grow?
                        </p>
                        <h3
                            className="text-2xl md:text-3xl font-bold text-white mb-6 max-w-xl mx-auto leading-snug"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Let's build an SEO strategy that drives real revenue
                        </h3>
                        <Link href="/contact" className="btn-primary gap-2 px-7 py-3.5 text-sm">
                            Get a Free SEO Strategy Call
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
