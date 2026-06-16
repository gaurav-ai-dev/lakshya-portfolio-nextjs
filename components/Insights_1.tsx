"use client"
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, TrendingUp, Mail, Search, X } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import type { NormalizedPost } from "@/lib/wordpress";

interface InsightsPageProps {
    posts: NormalizedPost[];
}

const InsightsPage = ({ posts }: InsightsPageProps) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [email, setEmail] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Build filter chips dynamically from post categories and tags
    const filterChips = useMemo(() => {
        const categorySet = new Set<string>();
        posts.forEach(p => {
            p.categories.forEach(c => {
                if (c.toLowerCase() !== 'uncategorized') categorySet.add(c);
            });
            p.tags.forEach(t => categorySet.add(t));
        });
        const chips = [{ id: 'all', label: 'All' }];
        categorySet.forEach(name => {
            chips.push({ id: name.toLowerCase(), label: name });
        });
        return chips;
    }, [posts]);

    // Use the first 3 posts as featured
    const featuredPosts = posts.slice(0, 3);

    const filteredPosts = useMemo(() => {
        let result = posts;
        if (activeFilter !== 'all') {
            const f = activeFilter.toLowerCase();
            result = result.filter(p =>
                p.categories.some(c => c.toLowerCase() === f) ||
                p.tags.some(t => t.toLowerCase() === f)
            );
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.excerpt.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q))
            );
        }
        return result;
    }, [posts, activeFilter, searchQuery]);

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

                    <div className="section-container my-10">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-5">
                            <div className="relative w-full sm:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search articles..."
                                    className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                                    </button>
                                )}
                            </div>
                        </div>
                        {filterChips.length > 1 && (
                            <div className="flex flex-wrap gap-2 justify-center">
                                {filterChips.map(chip => (
                                    <button
                                        key={chip.id}
                                        onClick={() => setActiveFilter(chip.id)}
                                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${activeFilter === chip.id
                                            ? 'text-primary-foreground scale-[1.02]'
                                            : 'text-muted-foreground hover:text-foreground bg-card border border-border hover:bg-secondary/50'
                                            }`}
                                        style={activeFilter === chip.id ? { background: 'var(--gradient-tab)', boxShadow: 'var(--shadow-tab-glow)' } : undefined}
                                    >
                                        {chip.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Featured Posts - 3 cards */}
                    {featuredPosts.length > 0 && (
                        <div className="section-container pb-12">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-semibold text-lg flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-icon-1)' }}>
                                        <TrendingUp className="w-4 h-4 text-primary" />
                                    </div>
                                    Featured
                                </h2>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredPosts.map((fp, idx) => (
                                    <motion.div
                                        key={fp.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Link href={`/blog/${fp.slug}`} className="block group">
                                            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                                                <div className="aspect-[16/10]">
                                                    {fp.featuredImage ? (
                                                        <Image
                                                            src={fp.featuredImage}
                                                            alt={fp.featuredImageAlt || fp.title}
                                                            width={640}
                                                            height={400}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                                            <span className="text-muted-foreground text-sm">No image</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                                                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                                                    <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-sm text-[10px] font-medium text-white border border-white/20 mb-2 inline-block">{fp.category}</span>
                                                    <h3 className="text-lg font-semibold text-white mb-1.5 group-hover:text-primary transition-colors line-clamp-2">{fp.title}</h3>
                                                    <p className="text-white/70 text-xs mb-3 line-clamp-2">{fp.excerpt}</p>
                                                    <div className="flex items-center gap-3 text-[10px] text-white/50">
                                                        <span>{fp.date}</span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{fp.readTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Posts Grid */}
                <section className="section-padding section-bg-dots">
                    <div className="section-container">
                        {filteredPosts.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground text-lg mb-2">No articles found</p>
                                <p className="text-sm text-muted-foreground">Try adjusting your search or filter.</p>
                            </div>
                        ) : (
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
                                            <Link href={`/blog/${post.slug}`}>
                                                <div className="card-interactive h-full">
                                                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                                                        {post.featuredImage ? (
                                                            <Image
                                                                src={post.featuredImage}
                                                                alt={post.featuredImageAlt || post.title}
                                                                width={640}
                                                                height={400}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                                                <span className="text-muted-foreground text-sm">No image</span>
                                                            </div>
                                                        )}
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
                        )}
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
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--gradient-icon-3)' }}>
                                <Mail className="w-7 h-7 text-primary" />
                            </div>
                            <h2 className="heading-subsection mb-2">Get growth insights weekly</h2>
                            <p className="text-muted-foreground mb-6">No spam, just actionable insights on performance marketing delivered every Thursday.</p>
                            <form onSubmit={(e) => { e.preventDefault(); console.log('Subscribe:', email); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="flex-1 px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                    required
                                />
                                <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
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

export default InsightsPage;