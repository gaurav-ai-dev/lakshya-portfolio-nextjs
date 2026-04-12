"use client"
import { motion } from "framer-motion";
import { Clock, ArrowLeft, Tag, Calendar, Share2, BookOpen, ArrowRight, Lightbulb, Copy, Check, AlertTriangle, Info, ChevronDown, Link2, Search } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { blogPosts, getPostBySlug } from "@/data/blogPosts";
import { useCallback, useEffect, useMemo, useState } from "react";

interface BlogDetailPageProps {
  slug: string;
}

// Share buttons
const ShareButtons = () => {
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const shareX = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={copyLink} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#eff4ff] text-xs font-medium text-[#584237] hover:text-[#0b1c30] hover:bg-[#dce9ff] transition-all">
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? 'Copied!' : 'Copy link'}
      </button>
      <button onClick={shareX} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#eff4ff] text-xs font-medium text-[#584237] hover:text-[#0b1c30] hover:bg-[#dce9ff] transition-all">
        𝕏
      </button>
      <button onClick={shareLinkedIn} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#eff4ff] text-xs font-medium text-[#584237] hover:text-[#0b1c30] hover:bg-[#dce9ff] transition-all">
        in
      </button>
    </div>
  );
};

// Reading progress bar component
const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 shadow-sm">
      <div
        className="h-full bg-[#9d4300] transition-[width] duration-150 ease-out rounded-r-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Callout block component
const CalloutBlock = ({ type, text }: { type: string; text: string }) => {
  const config = type === 'callout-tip'
    ? { icon: Lightbulb, label: 'Tip', borderClass: 'border-l-[#9d4300]', bgClass: 'bg-[#9d4300]/5' }
    : type === 'callout-warning'
      ? { icon: AlertTriangle, label: 'Warning', borderClass: 'border-l-orange-600', bgClass: 'bg-orange-50' }
      : { icon: Info, label: 'Note', borderClass: 'border-l-[#584237]', bgClass: 'bg-slate-50' };

  const Icon = config.icon;
  return (
    <div className={`${config.bgClass} border-l-4 ${config.borderClass} rounded-r-xl p-6 md:p-8 my-10 shadow-sm transition-all hover:shadow-md`}>
      <div className="flex items-start gap-4">
        <Icon className="w-6 h-6 mt-1 flex-shrink-0 text-[#9d4300]" />
        <div>
          <span className="label-tag mb-2 block">{config.label}</span>
          <p className="text-body leading-relaxed text-[#0b1c30] font-medium">{text}</p>
        </div>
      </div>
    </div>
  );
};

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Render content block
const renderBlock = (block: { type: string; text: string }, idx: number) => {
  if (block.type === 'heading') {
    return (
      <div key={idx} className="mt-16 mb-8 group">
        <h2 id={slugify(block.text)} className="heading-section scroll-mt-24 text-[#0b1c30]">
          {block.text}
        </h2>
        <div className="w-16 h-1 bg-[#9d4300] mt-4 rounded-full transition-all group-hover:w-24" />
      </div>
    );
  }
  if (block.type.startsWith('callout-')) {
    return <CalloutBlock key={idx} type={block.type} text={block.text} />;
  }
  return <p key={idx} className="text-body-lg mb-8 leading-[1.8] font-medium opacity-90">{block.text}</p>;
};

const BlogDetailPage = ({ slug }: BlogDetailPageProps) => {
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-40 text-center">
          <h1 className="heading-display mb-6">Insight not found</h1>
          <p className="text-body-lg mb-10">The strategy you're looking for might have been archived or moved.</p>
          <Link href="/blog" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Strategy
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Extract headings for sidebar strategy map
  const headings = post.content
    .filter(b => b.type === 'heading')
    .map(b => ({ id: slugify(b.text), text: b.text }));

  const takeaways = headings.slice(0, 4).map(h => h.text);
  const relatedPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3);
  const firstParaIdx = post.content.findIndex(b => b.type === 'paragraph');

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] antialiased selection:bg-[#9d4300]/10">
      <ReadingProgressBar />
      <Navbar />
      
      {/* Editorial Hero Header */}
      <header className="pt-32 pb-16 px-6 bg-[#eff4ff] overflow-hidden section-bg-mesh">
        <div className="section-container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex gap-2 mb-6">
                  <span className="bg-[#dce9ff] px-4 py-1.5 rounded-full text-[10px] font-bold text-[#584237] tracking-wider uppercase">
                    {post.category}
                  </span>
                  <span className="bg-[#dce9ff] px-4 py-1.5 rounded-full text-[10px] font-bold text-[#584237] tracking-wider uppercase">
                    STRATEGIC ANALYSIS
                  </span>
                </div>
                <h1 className="heading-display mb-8 text-[#0b1c30]">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-[#584237] font-semibold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#9d4300]" />
                    <span className="text-xs">By {post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#9d4300]" />
                    <span className="text-xs">{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#9d4300]" />
                    <span className="text-xs">{post.readTime} read</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-5 relative mt-10 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-0"
              >
                <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 glass-card-stitch p-6 rounded-xl shadow-2xl max-w-[240px] z-10"
              >
                <p className="stat-number tabular-nums text-[#9d4300]">+142%</p>
                <p className="stat-label leading-relaxed">
                  Organic Traffic Growth Benchmark for Authority Sites
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Analysis Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Insight Column */}
          <article className="lg:col-span-8">
            <div className="prose prose-slate max-w-none prose-headings:text-[#0b1c30] prose-p:text-[#0b1c30]/85 prose-strong:text-[#0b1c30] prose-a:text-[#9d4300]">
              <p className="text-body-lg mb-12 font-bold opacity-90 border-l-4 border-[#d3e4fe] pl-6 italic leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="stitch-article-content">
                {post.content.map((block, idx) => (
                  <div key={idx}>
                    {renderBlock(block, idx)}
                    {/* Insert Key Strategy Takeaways after first paragraph */}
                    {idx === firstParaIdx && takeaways.length > 0 && (
                      <div className="my-14 p-8 md:p-10 rounded-2xl bg-[#eff4ff] border border-[#d3e4fe] shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#dce9ff] rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm">
                              <Lightbulb className="w-6 h-6 text-[#9d4300]" />
                            </div>
                            <h3 className="heading-subsection m-0 text-[#0b1c30]">Strategic Takeaways</h3>
                          </div>
                          <ul className="grid sm:grid-cols-2 gap-6 m-0 p-0 list-none">
                            {takeaways.map((t, i) => (
                              <li key={i} className="flex items-start gap-4 text-[#0b1c30] font-bold leading-snug">
                                <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold bg-[#9d4300] text-white mt-0.5 shadow-sm">
                                  {i + 1}
                                </span>
                                <span className="text-sm font-medium">{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Conversion Block */}
              <div className="relative overflow-hidden rounded-3xl bg-[#0b1c30] p-10 md:p-16 my-20 group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#9d4300] opacity-20 rounded-full blur-[100px] -mr-40 -mt-40 transition-transform duration-1000 group-hover:scale-125"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="max-w-md">
                    <h2 className="text-white mt-0 mb-4 text-3xl font-bold font-headline leading-tight">
                      Unlock Your Organic Revenue Potential
                    </h2>
                    <p className="text-slate-400 mb-0 font-medium text-lg leading-relaxed">Leverage our high-performance technical SEO frameworks to outpace competition.</p>
                  </div>
                  <button className="bg-[#f97316] text-white px-10 py-5 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-2xl shadow-[#9d4300]/30 whitespace-nowrap active:scale-95 border-none">
                    SCHEDULE AUDIT
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Meta */}
            <div className="mt-16 pt-10 border-t border-[#d3e4fe]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Tag className="w-5 h-5 text-[#9d4300]" />
                  {post.tags.map(tag => (
                    <span key={tag} className="px-5 py-2 rounded-full bg-[#eff4ff] text-[10px] font-bold text-[#584237] hover:bg-[#0b1c30] hover:text-white transition-all cursor-pointer shadow-sm uppercase tracking-widest border border-transparent">
                      {tag}
                    </span>
                  ))}
                </div>
                <ShareButtons />
              </div>
            </div>
          </article>

          {/* Editorial Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Strategy Search */}
            <div className="bg-[#eff4ff] p-8 rounded-2xl shadow-sm border border-[#d3e4fe]/50">
              <h4 className="label-tag mb-5 block opacity-60">KNOWLEDGE EXPLORER</h4>
              <div className="relative">
                <input 
                  className="w-full bg-white border-none rounded-xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#9d4300] shadow-sm placeholder:text-[#584237]/40" 
                  placeholder="Analyze core strategy..." 
                  type="text"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9d4300]" />
              </div>
            </div>

            {/* Recent Analysis Feed */}
            <div className="bg-white p-8 rounded-2xl border border-[#d3e4fe]/40">
              <h4 className="label-tag mb-8 block border-l-4 border-[#9d4300] pl-5">LATEST ANALYTICS</h4>
              <div className="space-y-8">
                {blogPosts.filter(p => p.slug !== post.slug).slice(0, 3).map((rp) => (
                  <Link key={rp.id} href={`/blog/${rp.slug}`} className="group flex gap-5 items-start">
                    <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[#eff4ff] relative">
                      <Image src={rp.image} alt={rp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-[13px] font-bold leading-tight group-hover:text-[#9d4300] transition-colors line-clamp-2 uppercase tracking-tight">
                        {rp.title}
                      </h5>
                      <p className="text-[10px] text-[#584237] mt-2 font-bold">{rp.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Taxonomy Pillars */}
            <div className="bg-[#eff4ff] p-8 rounded-2xl shadow-sm">
              <h4 className="label-tag mb-6 block">PILLARS</h4>
              <div className="flex flex-wrap gap-2.5">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-[#dce9ff] hover:bg-[#9d4300] hover:text-white px-5 py-2.5 rounded-full text-[10px] font-bold text-[#584237] transition-all cursor-pointer shadow-sm uppercase tracking-widest border border-transparent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter Sticky Engine */}
            <div className="sticky top-28 bg-[#f97316] p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10">
                <h4 className="heading-subsection m-0 text-white mb-3 leading-tight">THE AUTHORITY LEDGER</h4>
                <p className="text-sm font-medium mb-8 opacity-95 leading-relaxed italic">High-impact SEO frameworks delivered to your terminal every week.</p>
                <div className="space-y-4">
                  <input 
                    className="w-full bg-white/20 border-none rounded-xl px-5 py-4 text-sm placeholder:text-white/60 focus:ring-2 focus:ring-white text-white font-bold" 
                    placeholder="analysis@company.com" 
                    type="email"
                  />
                  <button className="w-full bg-[#0b1c30] text-white py-4 rounded-xl font-extrabold text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95 border-none">
                    JOIN THE NETWORK
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Authority Network Expansion */}
      <section className="bg-[#f8f9ff] py-32 border-t border-[#d3e4fe] section-bg-mesh">
        <div className="section-container max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16 px-4">
            <div>
              <h2 className="heading-section text-[#0b1c30] mb-2">AUTHORITY EXPLORER</h2>
              <div className="w-24 h-1.5 bg-[#9d4300] rounded-full" />
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-3 text-sm font-bold text-[#9d4300] hover:gap-5 transition-all uppercase tracking-[0.2em] group">
              View All Insights <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {relatedPosts.map((rp) => (
              <Link key={rp.id} href={`/blog/${rp.slug}`} className="group">
                <div className="flex flex-col gap-8 p-10 rounded-[2.5rem] bg-white hover:bg-[#eff4ff] transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(11,28,48,0.1)] hover:-translate-y-3 border border-[#d3e4fe]/30">
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
                    <Image src={rp.image} alt={rp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-5 left-5">
                      <span className="px-5 py-2 rounded-xl bg-white/95 backdrop-blur-md text-[10px] font-extrabold text-[#9d4300] shadow-xl uppercase tracking-widest">{rp.category}</span>
                    </div>
                  </div>
                  <div className="flex-1 px-2">
                    <div className="flex items-center gap-4 mb-5 text-[10px] font-bold text-[#584237] uppercase tracking-[0.15em]">
                      <span>{rp.date}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9d4300]" />
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{rp.readTime}</span>
                    </div>
                    <h3 className="font-extrabold text-2xl mb-5 group-hover:text-[#9d4300] transition-colors line-clamp-2 leading-[1.3]">{rp.title}</h3>
                    <p className="text-body-lg line-clamp-2 mb-8 opacity-85">{rp.excerpt}</p>
                    <span className="inline-flex items-center gap-3 text-xs font-extrabold text-[#9d4300] group-hover:gap-5 transition-all uppercase tracking-[0.2em]">
                      EXAMINE STRATEGY <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;
