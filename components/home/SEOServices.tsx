"use client";
import { motion, type Variants } from "framer-motion";
import { TrendingUp, Code2, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: TrendingUp,
        gradientVar: "var(--gradient-icon-1)",
        tag: "Strategy & Research",
        title: "Data-Driven SEO Consultant in the USA",
        body: "As a seasoned SEO specialist, I develop custom organic traffic growth strategies that align with your business KPIs. I focus on high-intent keyword research and topical authority.",
        href: "/services#seo-strategy",
        delay: 0.1,
    },
    {
        icon: Code2,
        gradientVar: "var(--gradient-icon-2)",
        tag: "Technical SEO",
        title: "Advanced Technical SEO & Site Audits",
        body: "I provide deep-dive Technical SEO services to optimize your website's infrastructure. From Core Web Vitals to complex schema markup, I ensure your site meets Google's ranking factors.",
        href: "/services#technical-seo",
        delay: 0.2,
        featured: true,          // centre card gets an accent glow border
    },
    {
        icon: Shield,
        gradientVar: "var(--gradient-icon-3)",
        tag: "Link Building",
        title: "White-Hat SEO & Authority Building",
        body: "I implement 100% White-Hat SEO techniques to build your Domain Authority (DA) safely via manual outreach to high-DR US publications.",
        href: "/services#link-building",
        delay: 0.3,
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function SEOServices() {
    return (
        <section className="section-padding section-bg-dots relative overflow-hidden">
            {/* Subtle radial accent blobs */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(at 10% 20%, hsl(var(--primary)/0.06) 0px, transparent 55%), " +
                        "radial-gradient(at 90% 80%, hsl(var(--accent)/0.07) 0px, transparent 55%)",
                }}
            />

            <div className="section-container relative">
                {/* ── Section header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <span className="label-tag mb-3 block">What I Offer</span>
                    <h2 className="heading-section mb-4">
                        Premium Freelance SEO Services{" "}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "var(--gradient-tab)" }}
                        >
                            Tailored for the US Market
                        </span>
                    </h2>
                    <p className="text-body-lg max-w-2xl mx-auto">
                        End-to-end organic growth — from strategy and audits to authority
                        building — all delivered with measurable, data-backed results.
                    </p>
                </motion.div>

                {/* ── Cards ── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="grid md:grid-cols-3 gap-6 lg:gap-8"
                >
                    {services.map((svc) => {
                        const Icon = svc.icon;
                        return (
                            <motion.div
                                key={svc.title}
                                variants={cardVariants}
                                whileHover={{ y: -6, scale: 1.015 }}
                                className={`
                  relative flex flex-col gap-5 p-7 rounded-2xl
                  bg-background border transition-all duration-300
                  hover:shadow-xl group
                  ${svc.featured
                                        ? "border-primary/30 shadow-lg ring-1 ring-primary/10"
                                        : "border-border hover:border-primary/20 shadow-sm"
                                    }
                `}
                            >
                                {/* Featured badge */}
                                {svc.featured && (
                                    <span
                                        className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-semibold text-primary-foreground uppercase tracking-wider"
                                        style={{ background: "var(--gradient-tab)" }}
                                    >
                                        Most Popular
                                    </span>
                                )}

                                {/* Icon */}
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105"
                                    style={{ background: svc.gradientVar }}
                                >
                                    <Icon className="w-5 h-5 text-primary" strokeWidth={2} />
                                </div>

                                {/* Tag */}
                                <span className="label-tag text-[11px]">{svc.tag}</span>

                                {/* Title */}
                                <h3
                                    className="text-lg font-semibold text-foreground leading-snug -mt-3"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    {svc.title}
                                </h3>

                                {/* Body */}
                                <p className="text-body text-sm leading-relaxed -mt-2 flex-1">
                                    {svc.body}
                                </p>

                                {/* CTA link */}
                                <Link
                                    href={svc.href}
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-3 transition-all duration-200 mt-auto"
                                >
                                    Learn more
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                                {/* Hover gradient overlay */}
                                {svc.featured && (
                                    <div
                                        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300"
                                        style={{ background: "var(--gradient-primary)" }}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* ── Bottom CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-10 md:mt-12"
                >
                    <Link href="/services" className="btn-secondary gap-2 px-6 py-3">
                        View All SEO Services
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
