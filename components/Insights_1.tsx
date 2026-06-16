"use client"
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, TrendingUp, Mail, Search, X, BookOpen, AlertTriangle } from "lucide-react";
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

    // Split logic: main featured article vs grid listings
    const showFeaturedHeader = activeFilter === 'all' && !searchQuery.trim() && posts.length > 0;
    const featuredPost = showFeaturedHeader ? posts[0] : null;

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

    // Remaining posts for the grid when showing the featured article header
    const gridPosts = showFeaturedHeader ? filteredPosts.slice(1) : filteredPosts;

    return (
        <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] antialiased selection:bg-[#9d4300]/10">
            <Navbar />
            <main>
                {/* Hero Header */}
                <section className="pt-32 pb-16 px-6 bg-[#eff4ff] overflow-hidden section-bg-mesh border-b border-[#d3e4fe]/40">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center"
                        >
                            <span className="bg-[#dce9ff] px-4 py-1.5 rounded-full text-[10px] font-bold text-[#584237] tracking-wider uppercase mb-4">
                                Insights & Strategy
                            </span>
                            <h1 className="heading-display mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-headline text-[#0b1c30] leading-[1.15]">
                                Thoughts on <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9d4300] to-[#f97316]">Growth Marketing</span>
                            </h1>
                            <p className="text-base sm:text-lg text-[#584237]/95 max-w-2xl mx-auto leading-relaxed font-medium">
                                Deep dives into advanced technical SEO, high-impact organic strategy, and the mechanics of user acquisition.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Filter and Search Bar Section */}
                <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
                    <div className="bg-white/80 backdrop-blur-md border border-[#d3e4fe] p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Search Input */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9d4300]" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles..."
                                className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white border border-[#d3e4fe]/60 focus:outline-none focus:ring-2 focus:ring-[#9d4300] focus:border-transparent text-sm text-[#0b1c30] placeholder:text-[#584237]/45 font-medium"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <X className="w-4 h-4 text-[#584237]/60 hover:text-[#0b1c30]" />
                                </button>
                            )}
                        </div>

                        {/* Category Filter Chips */}
                        {filterChips.length > 1 && (
                            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
                                {filterChips.map(chip => {
                                    const isActive = activeFilter === chip.id;
                                    return (
                                        <button
                                            key={chip.id}
                                            onClick={() => setActiveFilter(chip.id)}
                                            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                                                isActive
                                                    ? 'text-white scale-[1.02] bg-gradient-to-r from-[#9d4300] to-[#f97316] shadow-md shadow-[#9d4300]/25'
                                                    : 'text-[#584237] hover:text-[#0b1c30] bg-[#eff4ff]/40 border border-[#d3e4fe]/50 hover:bg-[#eff4ff] hover:border-[#9d4300]/30'
                                            }`}
                                        >
                                            {chip.label}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Featured Magazine-style Banner (Only shown in 'All' filter default state) */}
                {featuredPost && (
                    <section className="max-w-6xl mx-auto px-6 pt-16 pb-6">
                        <div className="flex items-center gap-2.5 mb-6">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#eff4ff] border border-[#d3e4fe]/50">
                                <TrendingUp className="w-4 h-4 text-[#9d4300]" />
                            </div>
                            <h2 className="font-bold text-xs uppercase tracking-widest text-[#0b1c30]">Featured Article</h2>
                        </div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2.5rem] border border-[#d3e4fe]/40 p-8 shadow-sm hover:shadow-[0_20px_50px_rgba(11,28,48,0.06)] transition-all duration-500 group"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                                {/* Featured Image Canvas (uncropped blur fill) */}
                                <div className="lg:col-span-7 relative aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-md bg-[#eff4ff]">
                                    {featuredPost.featuredImage ? (
                                        <>
                                            <Image
                                                src={featuredPost.featuredImage}
                                                alt=""
                                                fill
                                                className="object-cover blur-2xl scale-110 opacity-30 select-none pointer-events-none"
                                            />
                                            <Image
                                                src={featuredPost.featuredImage}
                                                alt={featuredPost.featuredImageAlt || featuredPost.title}
                                                fill
                                                className="object-contain transition-transform duration-700 group-hover:scale-[1.01]"
                                                priority
                                            />
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <BookOpen className="w-12 h-12 text-[#9d4300]/20" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-[9px] font-extrabold text-[#9d4300] shadow-sm uppercase tracking-widest">{featuredPost.category}</span>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="lg:col-span-5 flex flex-col h-full justify-center">
                                    <div className="flex items-center gap-3 mb-4 text-[9px] font-bold text-[#584237]/70 uppercase tracking-widest">
                                        <span>{featuredPost.date}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#9d4300]/40" />
                                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#9d4300]" />{featuredPost.readTime} Read</span>
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight text-[#0b1c30] group-hover:text-[#9d4300] transition-colors mb-4 font-headline">
                                        {featuredPost.title}
                                    </h3>

                                    <p className="text-sm sm:text-base text-[#584237]/80 mb-6 leading-relaxed line-clamp-4 font-medium">
                                        {featuredPost.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between gap-6 pt-6 border-t border-[#d3e4fe]/50 mt-auto">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9d4300] to-[#f97316] flex items-center justify-center text-white font-extrabold text-[10px]">
                                                {featuredPost.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                            </div>
                                            <span className="text-xs font-bold text-[#0b1c30]">By {featuredPost.author}</span>
                                        </div>
                                        
                                        <Link 
                                            href={`/blog/${featuredPost.slug}`}
                                            className="inline-flex items-center gap-2.5 text-xs font-extrabold text-[#9d4300] uppercase tracking-widest group-hover:gap-4 transition-all"
                                        >
                                            <span>Read Article</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </section>
                )}

                {/* Primary Card Grid Section */}
                <section className="max-w-6xl mx-auto px-6 py-12">
                    {showFeaturedHeader && gridPosts.length > 0 && (
                        <div className="flex items-center gap-2.5 mb-8">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#eff4ff] border border-[#d3e4fe]/50">
                                <BookOpen className="w-4 h-4 text-[#9d4300]" />
                            </div>
                            <h2 className="font-bold text-xs uppercase tracking-widest text-[#0b1c30]">More Articles</h2>
                        </div>
                    )}

                    {gridPosts.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-3xl border border-[#d3e4fe]/40 p-10 max-w-xl mx-auto shadow-sm">
                            <AlertTriangle className="w-10 h-10 text-[#9d4300] mx-auto mb-4" />
                            <p className="text-[#0b1c30] text-lg font-bold mb-1">No articles found</p>
                            <p className="text-sm text-[#584237]/80">Try adjusting your search query or selecting a different filter chip.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {gridPosts.map((post, index) => {
                                    const initials = post.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                                    return (
                                        <motion.article
                                            key={post.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.96 }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            className="group"
                                        >
                                            <Link href={`/blog/${post.slug}`} className="block h-full">
                                                <div className="flex flex-col h-full p-6 rounded-[2rem] bg-white hover:bg-[#eff4ff]/40 hover:shadow-[0_20px_50px_rgba(11,28,48,0.08)] hover:-translate-y-2 border border-[#d3e4fe]/30 transition-all duration-500">
                                                    {/* Card Widescreen Image (uncropped blur fill) */}
                                                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-sm bg-[#eff4ff]">
                                                        {post.featuredImage ? (
                                                            <>
                                                                <Image 
                                                                    src={post.featuredImage} 
                                                                    alt="" 
                                                                    fill 
                                                                    className="object-cover blur-xl scale-110 opacity-30 select-none pointer-events-none" 
                                                                />
                                                                <Image 
                                                                    src={post.featuredImage} 
                                                                    alt={post.featuredImageAlt || post.title} 
                                                                    fill 
                                                                    className="object-contain transition-transform duration-700 group-hover:scale-103" 
                                                                />
                                                            </>
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <BookOpen className="w-8 h-8 text-[#9d4300]/20" />
                                                            </div>
                                                        )}
                                                        <div className="absolute top-4 left-4">
                                                            <span className="px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-[9px] font-extrabold text-[#9d4300] shadow-sm uppercase tracking-widest">{post.category}</span>
                                                        </div>
                                                    </div>

                                                    {/* Details body */}
                                                    <div className="flex-grow flex flex-col pt-5">
                                                        <div className="flex items-center gap-3 mb-3 text-[9px] font-bold text-[#584237]/70 uppercase tracking-widest">
                                                            <span>{post.date}</span>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#9d4300]/40" />
                                                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#9d4300]" />{post.readTime}</span>
                                                        </div>

                                                        <h3 className="font-bold text-lg mb-3 group-hover:text-[#9d4300] transition-colors line-clamp-2 leading-snug text-[#0b1c30]">
                                                            {post.title}
                                                        </h3>

                                                        <p className="text-sm text-[#584237] line-clamp-2 mb-5 leading-relaxed flex-grow opacity-90 font-medium">
                                                            {post.excerpt}
                                                        </p>

                                                        <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#d3e4fe]/40 mt-auto">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#9d4300] to-[#f97316] flex items-center justify-center text-white font-extrabold text-[9px]">
                                                                    {initials}
                                                                </div>
                                                                <span className="text-[10px] font-bold text-[#0b1c30]">{post.author}</span>
                                                            </div>
                                                            <span className="inline-flex items-center gap-2 text-[10px] font-extrabold text-[#9d4300] group-hover:gap-3.5 transition-all uppercase tracking-widest">
                                                                Examine Strategy <ArrowRight className="w-4 h-4" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.article>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </section>

                {/* Redesigned Newsletter Section */}
                <section className="py-24 px-6 bg-[#f8f9ff]">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-[2.5rem] bg-[#0b1c30] p-10 md:p-16 text-center border border-white/10 shadow-2xl group"
                        >
                            {/* Mesh Grid Pattern */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] select-none pointer-events-none" />
                            {/* Glow Background Blobs */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-[#9d4300] opacity-20 rounded-full blur-[100px] -mr-40 -mt-40 transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#f97316] opacity-10 rounded-full blur-[80px] -ml-40 -mb-40" />

                            <div className="relative z-10 max-w-2xl mx-auto">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/10 mx-auto mb-6 border border-white/10">
                                    <Mail className="w-6 h-6 text-[#f97316]" />
                                </div>
                                
                                <span className="text-[10px] font-bold text-[#f97316] tracking-widest uppercase mb-2 block">Newsletter</span>
                                <h2 className="text-white mt-0 mb-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline leading-tight tracking-tight">
                                    Get Growth Insights Weekly
                                </h2>
                                <p className="text-slate-300 mb-8 text-sm sm:text-base leading-relaxed font-medium">
                                    No spam, just actionable insights and high-performance technical SEO frameworks delivered straight to your inbox.
                                </p>

                                <form 
                                    onSubmit={(e) => { e.preventDefault(); console.log('Subscribe:', email); }} 
                                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                                >
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="analysis@company.com"
                                        className="flex-grow px-5 py-4 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 focus:border-[#f97316] text-white placeholder:text-slate-400 font-bold outline-none transition-all text-sm focus:ring-1 focus:ring-[#f97316]"
                                        required
                                    />
                                    <button 
                                        type="submit" 
                                        className="bg-[#f97316] text-white px-8 py-4 rounded-xl font-extrabold text-xs uppercase tracking-widest hover:bg-[#9d4300] transition-all shadow-xl active:scale-95 border-none"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                                
                                <p className="text-[10px] text-slate-400 mt-5 font-medium uppercase tracking-wider">
                                    Join 2,500+ growth leaders. Unsubscribe anytime.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default InsightsPage;