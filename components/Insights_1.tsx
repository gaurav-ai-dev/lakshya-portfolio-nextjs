"use client"
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, TrendingUp, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import insightsHero from "@/assets/insights-hero.jpg";
import servicesAnalytics from "@/assets/services-analytics.jpg";
import servicesAdvertising from "@/assets/services-advertising.jpg";
import servicesStrategy from "@/assets/services-strategy.jpg";
import caseStudy1 from "@/assets/case-study-1.jpg";
import caseStudy2 from "@/assets/case-study-2.jpg";
import Image from "next/image";

const filterChips = [
    { id: 'all', label: 'All' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'creative', label: 'Creative Testing' },
    { id: 'attribution', label: 'Attribution' },
    { id: 'cro', label: 'CRO' },
    { id: 'scaling', label: 'Scaling' },
    { id: 'b2b', label: 'B2B' },
    { id: 'dtc', label: 'DTC' },
];

const featuredPost = {
    id: 1,
    category: "Attribution",
    tags: ['attribution', 'strategy'],
    title: "The Death of Third-Party Cookies: What It Means for 2024",
    excerpt: "Third-party cookies are finally going away. Here's what marketers need to know about measurement, targeting, and the new landscape of digital advertising.",
    image: insightsHero,
    readTime: "12 min",
    date: "January 2024",
    featured: true,
};

const trendingPosts = [
    { id: 7, title: "iOS 18 Privacy Changes: Early Impact Data", category: "Attribution", readTime: "5 min" },
    { id: 8, title: "Meta's New Advantage+ Shopping Campaigns", category: "Strategy", readTime: "7 min" },
    { id: 9, title: "The Rise of Creative Automation Tools", category: "Creative", readTime: "6 min" },
];

const posts = [
    { id: 2, category: "Creative", tags: ['creative', 'dtc'], title: "Building a Creative Testing System That Scales", excerpt: "How to systematically find winning creative concepts without burning through budget on random tests.", image: servicesAdvertising, readTime: "8 min", date: "December 2023" },
    { id: 3, category: "Strategy", tags: ['strategy', 'scaling'], title: "Why ROAS is a Terrible North Star Metric", excerpt: "ROAS looks good in reports but it's leading you astray. Here's what to optimize for instead.", image: servicesAnalytics, readTime: "6 min", date: "November 2023" },
    { id: 4, category: "Attribution", tags: ['attribution', 'b2b'], title: "MMM vs MTA: When to Use Each", excerpt: "Media Mix Modeling and Multi-Touch Attribution serve different purposes. Here's how to think about them.", image: servicesStrategy, readTime: "10 min", date: "October 2023" },
    { id: 5, category: "CRO", tags: ['cro', 'dtc'], title: "Landing Page Optimization: The 80/20", excerpt: "Most CRO advice is noise. Here are the changes that actually move the needle.", image: caseStudy1, readTime: "7 min", date: "September 2023" },
    { id: 6, category: "Scaling", tags: ['scaling', 'strategy'], title: "When to Go Broad vs. Narrow in Meta", excerpt: "The eternal targeting debate. Here's a framework for deciding based on your stage and goals.", image: caseStudy2, readTime: "9 min", date: "August 2023" },
];

const Insights_1 = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [email, setEmail] = useState('');

    const filteredPosts = activeFilter === 'all'
        ? posts
        : posts.filter(p => p.tags.includes(activeFilter));

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main>
                {/* Hero */}
                <section className="pt-28 pb-12 md:pt-36 md:pb-16 section-bg-mesh">
                    <div className="section-container text-center max-w-3xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <span className="label-tag mb-3 block">Insights</span>
                            <h1 className="heading-display mb-4">
                                Thoughts on{" "}
                                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-tab)' }}>growth marketing</span>
                            </h1>
                            <p className="text-body-lg max-w-xl mx-auto">Deep dives into strategy, tactics, and the evolving landscape of performance marketing.</p>
                        </motion.div>
                    </div>
                </section>

                {/* Featured + Trending */}
                <section className="section-container pb-12">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Featured Post */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <Link href="#" className="block group">
                                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-[16/9]">
                                        <Image
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div
                                                className="w-6 h-6 rounded-md flex items-center justify-center"
                                                style={{ background: 'var(--gradient-icon-1)' }}
                                            >
                                                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                                            </div>
                                            <span className="text-xs font-medium text-primary uppercase tracking-wider">Featured</span>
                                        </div>
                                        <span className="px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-xs font-medium text-white border border-white/20 mb-3 inline-block">{featuredPost.category}</span>
                                        <h2 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-white/80 text-sm mb-4 line-clamp-2">{featuredPost.excerpt}</p>
                                        <div className="flex items-center gap-3 text-xs text-white/60">
                                            <span>{featuredPost.date}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featuredPost.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Trending Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-card rounded-2xl border border-border p-5 shadow-lg"
                        >
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ background: 'var(--gradient-icon-2)' }}
                                >
                                    <TrendingUp className="w-4 h-4 text-primary" />
                                </div>
                                Trending
                            </h3>
                            <div className="space-y-4">
                                {trendingPosts.map((post, idx) => (
                                    <Link
                                        key={post.id}
                                        href="#"
                                        className="block group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <span
                                                className="stat-number text-2xl text-transparent bg-clip-text"
                                                style={{ backgroundImage: 'var(--gradient-tab)', opacity: 0.4 }}
                                            >
                                                {String(idx + 1).padStart(2, '0')}
                                            </span>
                                            <div>
                                                <span className="text-xs text-muted-foreground">{post.category}</span>
                                                <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                                                    {post.title}
                                                </h4>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                                    <Clock className="w-3 h-3" />{post.readTime}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Filter Chips */}
                <section className="section-container pb-6">
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
                </section>

                {/* Posts Grid */}
                <section className="section-padding section-bg-mesh">
                    <div className="section-container">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredPosts.map((post, index) => (
                                    <motion.article
                                        key={post.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="group"
                                    >
                                        <Link href="#">
                                            <div className="card-interactive h-full">
                                                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-3 left-3">
                                                        <span className="px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur-sm text-xs font-medium border border-border/50">{post.category}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                                                    <span>{post.date}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                                                </div>
                                                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                                                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                                                    Read More <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                <section className="section-padding section-bg-accent">
                    <div className="section-container max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-card rounded-2xl border border-border p-8 text-center shadow-xl"
                        >
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                style={{ background: 'var(--gradient-icon-3)' }}
                            >
                                <Mail className="w-7 h-7 text-primary" />
                            </div>
                            <h2 className="heading-subsection mb-2">Get growth insights weekly</h2>
                            <p className="text-muted-foreground mb-6">
                                No spam, just actionable insights on performance marketing delivered every Thursday.
                            </p>
                            <form
                                onSubmit={(e) => { e.preventDefault(); console.log('Subscribe:', email); }}
                                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="flex-1 px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                    required
                                />
                                <button type="submit" className="btn-primary whitespace-nowrap">
                                    Subscribe
                                </button>
                            </form>
                            <p className="text-xs text-muted-foreground mt-4">Join 2,500+ marketers. Unsubscribe anytime.</p>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Insights_1;
