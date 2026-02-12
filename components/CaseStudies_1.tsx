"use client";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Target, Layers } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import caseStudy1 from "@/assets/case-study-1.jpg";
import caseStudy2 from "@/assets/case-study-2.jpg";
import caseStudy3 from "@/assets/case-study-3.jpg";
import Image from "next/image";

const caseStudies = [
    {
        id: 1,
        category: "E-commerce",
        title: "Scaling DTC Brand from $2M to $12M Revenue",
        description: "Restructured paid media strategy and built creative testing system.",
        image: caseStudy1,
        icon: TrendingUp,
        metrics: [{ label: "Revenue", value: "6x" }, { label: "ROAS", value: "5.2x" }, { label: "CAC", value: "-38%" }],
        gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20"
    },
    {
        id: 2,
        category: "B2B SaaS",
        title: "Reducing CAC by 52% for Series B Startup",
        description: "Rebuilt demand generation with intent-based targeting.",
        image: caseStudy2,
        icon: Target,
        metrics: [{ label: "CAC", value: "-52%" }, { label: "Pipeline", value: "3.8x" }, { label: "SQL Rate", value: "+127%" }],
        gradient: "from-emerald-500/20 via-cyan-500/20 to-blue-500/20"
    },
    {
        id: 3,
        category: "Health & Wellness",
        title: "Building $5M/Year Subscription Business",
        description: "Full-funnel acquisition strategy focused on LTV.",
        image: caseStudy3,
        icon: Layers,
        metrics: [{ label: "Revenue", value: "$5M" }, { label: "Retention", value: "78%" }, { label: "LTV:CAC", value: "4.1:1" }],
        gradient: "from-orange-500/20 via-pink-500/20 to-purple-500/20"
    },
];

const CaseStudies_1 = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main>
                {/* Hero */}
                <section className="pt-32 pb-20 md:pt-40 md:pb-24 section-bg-mesh">
                    <div className="section-container text-center max-w-4xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <span className="label-tag mb-4 block">Case Studies</span>
                            <h1 className="heading-display mb-6">
                                Real results for{" "}
                                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-tab)' }}>real businesses</span>
                            </h1>
                            <p className="text-body-lg max-w-2xl mx-auto">Deep dives into client partnerships and measurable outcomes.</p>
                        </motion.div>
                    </div>
                </section>

                {/* Case Studies Grid */}
                <section className="section-padding section-bg-gradient">
                    <div className="section-container grid lg:grid-cols-3 gap-8">
                        {caseStudies.map((study, index) => (
                            <motion.article
                                key={study.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group bg-background rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient}`} />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur-sm text-xs font-medium border border-border/50">{study.category}</span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                        {study.metrics.map((m, i) => (
                                            <div key={i} className="flex-1 bg-background/90 backdrop-blur-sm rounded-xl p-3 text-center border border-border/50">
                                                <p
                                                    className="text-sm font-bold text-transparent bg-clip-text"
                                                    style={{ backgroundImage: 'var(--gradient-tab)' }}
                                                >
                                                    {m.value}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground">{m.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{study.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{study.description}</p>
                                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                                        Read Case Study <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </motion.article>
                        ))}
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

                    <div className="section-container text-center relative z-10">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                            style={{ background: 'var(--gradient-icon-1)' }}
                        >
                            <TrendingUp className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="heading-section text-white mb-4">Ready to be the next success story?</h2>
                        <p className="text-white/70 mb-6 max-w-xl mx-auto">Let's discuss how we can achieve similar results for your business.</p>
                        <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-foreground rounded-xl font-medium hover:shadow-xl transition-all duration-300">
                            Start the Conversation <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default CaseStudies_1;
