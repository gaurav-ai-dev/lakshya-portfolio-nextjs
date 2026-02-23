"use client";
import { motion } from "framer-motion";
import { Search, Map, Rocket, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Strategic Discovery & Audit",
        body: "Identifying technical gaps and analyzing US market competitors.",
        color: "hsl(32 95% 52%)",
        delay: 0,
    },
    {
        number: "02",
        icon: Map,
        title: "The Strategic Roadmap",
        body: "A custom 6-month blueprint focused on ROI-driven results and scalability.",
        color: "hsl(24 94% 50%)",
        delay: 0.12,
    },
    {
        number: "03",
        icon: Rocket,
        title: "High-Impact Execution",
        body: "Fixing technical debt and launching targeted on-page and content campaigns.",
        color: "hsl(18 90% 46%)",
        delay: 0.24,
    },
    {
        number: "04",
        icon: BarChart3,
        title: "Continuous Analysis & Scaling",
        body: "Data-driven iteration based on real-time GA4 and Search Console insights.",
        color: "hsl(12 88% 44%)",
        delay: 0.36,
    },
];

export default function SEOProcess() {
    return (
        <section
            className="relative overflow-hidden py-20 md:py-28"
            style={{ background: "var(--gradient-dark)" }}
        >
            {/* ── Background glow blobs ── */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div
                    className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
                    style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.6) 0%, transparent 70%)" }}
                />
                <div
                    className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
                    style={{ background: "radial-gradient(circle, hsl(var(--accent)/0.5) 0%, transparent 70%)" }}
                />
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(hsl(var(--foreground)/0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.3) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
            </div>

            <div className="section-container relative z-10">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
                >
                    <span
                        className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                        style={{
                            background: "hsl(var(--primary)/0.15)",
                            border: "1px solid hsl(var(--primary)/0.3)",
                            color: "hsl(var(--primary))",
                        }}
                    >
                        My Process
                    </span>
                    <h2
                        className="heading-section text-white mb-4"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        The SEO Velocity Framework:{" "}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "var(--gradient-tab)" }}
                        >
                            My 4-Step Growth Process
                        </span>
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed">
                        A proven system refined over 8+ years and 50+ US brands — turning
                        organic channels into consistent, compounding revenue engines.
                    </p>
                </motion.div>

                {/* ── Steps Layout ── */}
                <div className="relative">
                    {/* Horizontal connector line (desktop only) */}
                    <div className="hidden lg:block absolute top-[72px] left-[12.5%] right-[12.5%] h-px z-0">
                        {/* Base dashed line */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: "linear-gradient(90deg, hsl(var(--primary)/0.3) 50%, transparent 50%)",
                                backgroundSize: "12px 1px",
                            }}
                        />
                        {/* Animated fill line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                            className="absolute inset-0 origin-left rounded-full"
                            style={{ background: "var(--gradient-tab)", height: "2px", top: "-0.5px" }}
                        />
                    </div>

                    {/* Step cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, y: 36 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.55, delay: step.delay, ease: "easeOut" }}
                                    whileHover={{ y: -6 }}
                                    className="relative group flex flex-col gap-5"
                                >
                                    {/* Step icon circle — sits ON the connector line on desktop */}
                                    <div className="flex justify-center lg:justify-start">
                                        <div className="relative z-10">
                                            {/* Outer ring pulse */}
                                            <motion.div
                                                className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                style={{
                                                    background: `radial-gradient(circle, ${step.color}25 0%, transparent 70%)`,
                                                }}
                                            />
                                            {/* Icon circle */}
                                            <div
                                                className="w-16 h-16 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-300 group-hover:shadow-xl"
                                                style={{
                                                    background: "var(--gradient-dark)",
                                                    borderColor: step.color,
                                                    boxShadow: `0 0 0 4px ${step.color}15`,
                                                }}
                                            >
                                                <Icon
                                                    className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                                                    style={{ color: step.color }}
                                                    strokeWidth={1.8}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card body */}
                                    <div
                                        className="flex-1 relative rounded-2xl p-6 border transition-all duration-300 overflow-hidden"
                                        style={{
                                            background: "hsl(var(--foreground)/0.03)",
                                            borderColor: "hsl(var(--foreground)/0.08)",
                                        }}
                                    >
                                        {/* Hover glow fill */}
                                        <div
                                            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                            style={{
                                                background: `radial-gradient(ellipse at 20% 0%, ${step.color}12 0%, transparent 65%)`,
                                            }}
                                        />

                                        {/* Top accent bar */}
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: step.delay + 0.2 }}
                                            className="absolute top-0 left-6 right-6 h-[2px] origin-left rounded-full"
                                            style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
                                        />

                                        {/* Watermark number */}
                                        <span
                                            className="absolute -top-3 -right-1 text-8xl font-black select-none leading-none"
                                            style={{
                                                color: "transparent",
                                                WebkitTextStroke: `1px ${step.color}20`,
                                                fontFamily: "'DM Sans', sans-serif",
                                            }}
                                            aria-hidden
                                        >
                                            {step.number}
                                        </span>

                                        <div className="relative z-10 flex flex-col gap-3 mt-1">
                                            {/* Step label */}
                                            <span
                                                className="text-[10px] font-bold uppercase tracking-widest"
                                                style={{ color: step.color }}
                                            >
                                                Step {step.number}
                                            </span>

                                            {/* Title */}
                                            <h4
                                                className="text-base font-semibold text-white leading-snug"
                                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                                            >
                                                {step.title}
                                            </h4>

                                            {/* Body */}
                                            <p className="text-white/55 text-sm leading-relaxed">{step.body}</p>
                                        </div>
                                    </div>

                                    {/* Connector arrow (between cards, mobile/tablet vertical) */}
                                    {i < steps.length - 1 && (
                                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 lg:hidden z-10">
                                            <div
                                                className="w-px h-6"
                                                style={{ background: `linear-gradient(180deg, ${step.color}, transparent)` }}
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Bottom CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.5 }}
                    className="text-center mt-14 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/contact" className="btn-primary gap-2 px-7 py-3.5">
                        Start My SEO Journey
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium rounded-xl text-white/70 hover:text-white transition-colors duration-200 border border-white/10 hover:border-white/20"
                    >
                        See Case Studies
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
