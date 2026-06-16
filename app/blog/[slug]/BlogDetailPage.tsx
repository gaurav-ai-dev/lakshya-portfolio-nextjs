"use client"
import { motion } from "framer-motion";
import { Clock, ArrowLeft, Tag, Calendar, Share2, BookOpen, ArrowRight, Lightbulb, Copy, Check, AlertTriangle, Info, ChevronDown, Link2, Search, User } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { NormalizedPost } from "@/lib/wordpress";

interface BlogDetailPageProps {
  post: NormalizedPost;
  relatedPosts: NormalizedPost[];
}

// Redesigned Share buttons component supporting brand colors and vertical tooltips
const ShareButtons = ({ vertical = false }: { vertical?: boolean }) => {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [currentUrl]);

  const shareX = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  return (
    <div className={`flex ${vertical ? 'flex-col gap-4' : 'flex-row gap-3'} items-center`}>
      <button 
        onClick={copyLink} 
        title="Copy Link"
        className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#d3e4fe] text-[#584237] hover:text-[#0b1c30] hover:border-green-300 hover:bg-green-50/50 hover:shadow-[0_4px_12px_rgba(34,197,94,0.15)] transition-all duration-300 active:scale-95"
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />}
        {vertical && (
          <span className="absolute left-14 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#0b1c30] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-md whitespace-nowrap z-50">
            {copied ? 'Link Copied!' : 'Copy Link'}
          </span>
        )}
      </button>
      <button 
        onClick={shareX} 
        title="Share on X"
        className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#d3e4fe] text-[#584237] hover:text-black hover:border-black hover:bg-slate-50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 active:scale-95 text-sm font-bold"
      >
        <span className="transition-transform group-hover:scale-110">𝕏</span>
        {vertical && (
          <span className="absolute left-14 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#0b1c30] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-md whitespace-nowrap z-50">
            Share on X
          </span>
        )}
      </button>
      <button 
        onClick={shareLinkedIn} 
        title="Share on LinkedIn"
        className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#d3e4fe] text-[#584237] hover:text-[#0a66c2] hover:border-[#0a66c2] hover:bg-blue-50/50 hover:shadow-[0_4px_12px_rgba(10,102,194,0.15)] transition-all duration-300 active:scale-95 text-sm font-bold"
      >
        <span className="transition-transform group-hover:scale-110">in</span>
        {vertical && (
          <span className="absolute left-14 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#0b1c30] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-md whitespace-nowrap z-50">
            Share on LinkedIn
          </span>
        )}
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
    <div className="fixed top-0 left-0 right-0 z-[60] h-[5px] bg-[#eff4ff]">
      <div
        className="h-full bg-gradient-to-r from-[#9d4300] to-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

/** Extract headings from HTML content for sidebar strategey elements */
function extractHeadings(html: string): { id: string; text: string }[] {
  const regex = /<h2[^>]*class="[^"]*wp-block-heading[^"]*"[^>]*>(.*?)<\/h2>/gi;
  const headings: { id: string; text: string }[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, '').trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    headings.push({ id, text });
  }
  return headings;
}

/** Add IDs to h2 elements in the HTML content so sidebar links can jump to them */
function addHeadingIds(html: string): string {
  return html.replace(
    /<h2([^>]*class="[^"]*wp-block-heading[^"]*"[^>]*)>(.*?)<\/h2>/gi,
    (_match, attrs, content) => {
      const text = content.replace(/<[^>]*>/g, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h2${attrs} id="${id}">${content}</h2>`;
    }
  );
}

/** Transform WordPress FAQ paragraphs into interactive <details>/<summary> accordions */
function transformFAQsToAccordion(html: string): string {
  const faqPattern = /<p>\s*<strong>\s*(Q:\s*)(.*?)<\/strong>\s*(?:<br\s*\/?>)\s*([\s\S]*?)<\/p>/gi;
  
  let hasFAQs = false;
  let result = html.replace(faqPattern, (_match, _qPrefix, question, answer) => {
    hasFAQs = true;
    const cleanQuestion = question.replace(/<[^>]*>/g, '').trim();
    const cleanAnswer = answer.trim();
    return `<details class="wp-faq-item"><summary>${cleanQuestion}</summary><div class="wp-faq-answer"><p>${cleanAnswer}</p></div></details>`;
  });

  if (!hasFAQs) return result;

  result = result.replace(
    /(<h2[^>]*>(?:.*?(?:FAQ|Frequently\s+Asked)[^<]*)<\/h2>)\s*((?:<details class="wp-faq-item">[\s\S]*?<\/details>\s*)+)/gi,
    (_match, heading, faqBlock) => {
      const updatedHeading = heading.replace(/\bFAQ\b/g, "Frequently Asked Questions");
      return `<div class="wp-faq-section">${updatedHeading}${faqBlock}</div>`;
    }
  );

  return result;
}

// Redesigned Author Bio block with professional styling, avatar effects, and social links
const AuthorBioCard = ({ author }: { author: string }) => {
  const initials = author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-white to-[#eff4ff] border border-[#d3e4fe]/60 shadow-sm relative overflow-hidden mt-16 group">
      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-[#9d4300]/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700" />
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#9d4300] to-[#f97316] flex items-center justify-center text-white font-bold text-2xl shadow-[0_6px_20px_rgba(249,115,22,0.25)] shrink-0 border-4 border-white transition-transform duration-500 group-hover:scale-105">
          {initials}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div>
              <h4 className="text-xl font-bold text-[#0b1c30]">{author}</h4>
              <p className="text-xs font-bold text-[#9d4300] uppercase tracking-wider mt-0.5">Technical SEO Specialist & Growth Architect</p>
            </div>
            {/* Professional Social Links */}
            <div className="flex items-center justify-center gap-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-[#d3e4fe] text-[#584237]/70 hover:text-[#0a66c2] hover:border-[#0a66c2] hover:bg-blue-50/50 transition-all text-xs font-bold shadow-sm"
              >
                in
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-[#d3e4fe] text-[#584237]/70 hover:text-black hover:border-black hover:bg-slate-50 transition-all text-xs font-bold shadow-sm"
              >
                𝕏
              </a>
            </div>
          </div>
          <p className="text-sm text-[#584237]/95 leading-relaxed">
            {author === "Lakshya Pareek" 
              ? "Lakshya helps brands build high-performance organic growth engines. Combining advanced technical SEO frameworks with authority-led content strategy, he converts search visibility into sustainable organic revenue."
              : `Writer, marketer, and analyst covering strategic developments. Focused on technical excellence and content authority in digital marketing.`}
          </p>
        </div>
      </div>
    </div>
  );
};

// Previous / Next Navigation component
const PrevNextNavigation = ({ relatedPosts }: { relatedPosts: NormalizedPost[] }) => {
  if (!relatedPosts || relatedPosts.length === 0) return null;

  const nextPost = relatedPosts[0];
  const prevPost = relatedPosts.length > 1 ? relatedPosts[1] : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 pt-12 border-t border-[#d3e4fe]">
      {prevPost ? (
        <Link 
          href={`/blog/${prevPost.slug}`}
          className="group flex flex-col p-6 rounded-2xl bg-white border border-[#d3e4fe]/50 hover:border-[#9d4300]/40 hover:shadow-md transition-all text-left"
        >
          <span className="text-[10px] font-bold text-[#584237]/60 tracking-widest uppercase mb-2 inline-flex items-center gap-1.5 group-hover:text-[#9d4300] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            PREVIOUS INSIGHT
          </span>
          <h4 className="text-base font-bold text-[#0b1c30] line-clamp-2 group-hover:text-[#9d4300] transition-colors leading-tight">
            {prevPost.title}
          </h4>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {nextPost && (
        <Link 
          href={`/blog/${nextPost.slug}`}
          className="group flex flex-col p-6 rounded-2xl bg-white border border-[#d3e4fe]/50 hover:border-[#9d4300]/40 hover:shadow-md transition-all text-right items-end w-full"
        >
          <span className="text-[10px] font-bold text-[#584237]/60 tracking-widest uppercase mb-2 inline-flex items-center gap-1.5 group-hover:text-[#9d4300] transition-colors">
            NEXT INSIGHT
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          <h4 className="text-base font-bold text-[#0b1c30] line-clamp-2 group-hover:text-[#9d4300] transition-colors leading-tight">
            {nextPost.title}
          </h4>
        </Link>
      )}
    </div>
  );
};

const BlogDetailPage = ({ post, relatedPosts }: BlogDetailPageProps) => {
  // Extract headings from the HTML for strategic takeaways
  const headings = useMemo(() => extractHeadings(post.content), [post.content]);
  const takeaways = headings.slice(0, 4).map(h => h.text);

  // Inject IDs into h2 headings, then transform FAQs into accordions
  const processedContent = useMemo(() => transformFAQsToAccordion(addHeadingIds(post.content)), [post.content]);

  const authorInitials = post.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] antialiased selection:bg-[#9d4300]/10">
      <ReadingProgressBar />
      <Navbar />
      
      {/* Editorial Hero Header */}
      <header className="pt-32 pb-16 px-6 bg-[#eff4ff] overflow-hidden section-bg-mesh border-b border-[#d3e4fe]/40">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb & Navigation Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[14px] font-bold text-[#9d4300] hover:text-[#0b1c30] transition-colors group tracking-widest uppercase">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Insights</span>
            </Link>
            <nav className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#584237]/60 uppercase">
              <Link href="/" className="hover:text-[#9d4300] transition-colors">HOME</Link>
              <span className="opacity-40">/</span>
              <Link href="/blog" className="hover:text-[#9d4300] transition-colors">BLOG</Link>
              <span className="opacity-40">/</span>
              <span className="text-[#0b1c30] max-w-[150px] truncate">{post.category}</span>
            </nav>
          </div>

          {/* Centered Editorial Header Text */}
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <span className="bg-[#dce9ff] px-4 py-1.5 rounded-full text-[10px] font-bold text-[#584237] tracking-wider uppercase">
                {post.category}
              </span>
              <span className="bg-[#dce9ff] px-4 py-1.5 rounded-full text-[10px] font-bold text-[#584237] tracking-wider uppercase">
                Strategic Analysis
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="heading-display mb-6 text-[#0b1c30] leading-[1.15] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-headline"
            >
              {post.title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-[#584237] leading-relaxed max-w-3xl mx-auto mb-8 font-medium italic opacity-95"
            >
              {post.excerpt}
            </motion.p>

            {/* Premium Author Meta Card */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 py-3.5 rounded-full bg-white/70 backdrop-blur-md border border-[#d3e4fe] shadow-sm text-xs text-[#584237] font-semibold uppercase tracking-wider"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#9d4300] to-[#f97316] flex items-center justify-center text-white font-extrabold text-[9px]">
                  {authorInitials}
                </div>
                <span>By {post.author}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#9d4300]/40" />
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#9d4300]" />
                <span>{post.date}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#9d4300]/40" />
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#9d4300]" />
                <span>{post.readTime} Read</span>
              </div>
            </motion.div>
          </div>

          {/* Centered Large Featured Image Canvas - Uncropped Dual-Layer Setup */}
          <div className="relative max-w-5xl mx-auto mt-12 px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative aspect-[16/10] md:aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(11,28,48,0.15)] border-4 border-white/60 bg-[#eff4ff]"
            >
              {post.featuredImage ? (
                <>
                  {/* Backdrop duplicate blurred image to fill space elegantly without letterbox borders */}
                  <Image
                    src={post.featuredImage}
                    alt=""
                    fill
                    className="object-cover blur-2xl scale-110 opacity-30 select-none pointer-events-none"
                  />
                  {/* Crisp uncropped foreground image */}
                  <Image
                    src={post.featuredImage}
                    alt={post.featuredImageAlt || post.title}
                    fill
                    className="object-contain transition-transform duration-700 hover:scale-[1.01]"
                    priority
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-[#9d4300]/20" />
                </div>
              )}
            </motion.div>
            
            {/* Floating stats overlay sticker */}
            {/* <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-4 left-8 bg-white border border-[#d3e4fe] p-5 rounded-2xl shadow-xl max-w-[220px] hidden sm:block z-10"
            >
              <p className="text-2xl font-bold tracking-tight text-[#9d4300] mb-1 font-headline leading-none">+142%</p>
              <p className="text-[10px] font-extrabold text-[#584237] leading-snug uppercase tracking-widest">
                Organic Traffic Growth Benchmark
              </p>
            </motion.div> */}
          </div>
        </div>
      </header>

      {/* Main Analysis Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Responsive 12-column Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
          
          {/* Left Column: Sticky Share Buttons (Desktop only) */}
          <div className="xl:col-span-1 hidden xl:block relative">
            <div className="sticky top-[40vh] flex flex-col items-center gap-4 py-2 h-fit">
              <div className="text-[#584237]/60" title="Share this article">
                <Share2 className="w-4.5 h-4.5" />
              </div>
              <ShareButtons vertical />
            </div>
          </div>

          {/* Center Column: Main Article Content */}
          <article className="xl:col-span-7 col-span-12">
            <div className="prose prose-slate max-w-none prose-headings:text-[#0b1c30] prose-p:text-[#0b1c30]/85 prose-strong:text-[#0b1c30] prose-a:text-[#9d4300]">
              
              {/* Strategic Takeaways */}
              {takeaways.length > 0 && (
                <div className="mb-14 p-8 md:p-10 rounded-3xl bg-[#eff4ff] border border-[#d3e4fe] shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#dce9ff] rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm border border-[#d3e4fe]/40">
                        <Lightbulb className="w-5 h-5 text-[#9d4300]" />
                      </div>
                      <h3 className="heading-subsection m-0 text-[#0b1c30] font-bold text-lg">Strategic Takeaways</h3>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-6 m-0 p-0 list-none">
                      {takeaways.map((t, i) => (
                        <li key={i} className="flex items-start gap-4 text-[#0b1c30] leading-snug">
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
              
              {/* WordPress HTML Content (DO NOT modify .wp-content styles in globals.css) */}
              <div
                className="stitch-article-content wp-content"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Mobile Share Buttons Row (visible only on mobile) */}
              <div className="xl:hidden flex items-center justify-between gap-4 mt-12 py-4 border-t border-b border-[#d3e4fe]/50">
                <span className="text-xs font-bold text-[#584237]/70 uppercase tracking-widest inline-flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-[#9d4300]" />
                  Share Insight
                </span>
                <ShareButtons />
              </div>

              {/* Redesigned Conversion Block */}
              <div className="relative overflow-hidden rounded-3xl bg-[#0b1c30] p-10 md:p-16 my-20 group border border-white/10 shadow-xl">
                {/* Mesh Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] select-none pointer-events-none" />
                {/* Glow Background Blobs */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#9d4300] opacity-25 rounded-full blur-[100px] -mr-40 -mt-40 transition-transform duration-1000 group-hover:scale-110"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f97316] opacity-10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                  <div className="max-w-xl text-left">
                    <span className="text-[10px] font-bold text-[#f97316] tracking-widest uppercase mb-2 block">Take Action</span>
                    <h3 className="text-white mt-0 mb-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline leading-tight tracking-tight">
                      Unlock Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f97316] to-amber-300">Organic Revenue</span> Potential
                    </h3>
                    <p className="text-slate-300 mb-0 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                      Leverage our high-performance technical SEO frameworks to outpace competition and dominate search results.
                    </p>
                  </div>
                  <Link 
                    href="/contact" 
                    className="group/btn inline-flex items-center gap-3 bg-white text-[#0b1c30] hover:bg-[#eff4ff] px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 active:scale-95 shadow-lg shadow-black/20 hover:shadow-xl whitespace-nowrap select-none decoration-none"
                  >
                    <span className="text-[#0b1c30]">Schedule Audit</span>
                    <ArrowRight className="w-4 h-4 text-[#9d4300] transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Author Biography Section */}
            <AuthorBioCard author={post.author} />

            {/* Previous / Next Article Navigation Links */}
            <PrevNextNavigation relatedPosts={relatedPosts} />
          </article>

          {/* Right Column: Simplified Sticky Editorial Sidebar */}
          <aside className="xl:col-span-4 col-span-12 sticky top-28 space-y-8 h-fit">
            
            {/* Latest Articles Widget (max 4 posts) */}
            <div className="bg-white p-8 rounded-2xl border border-[#d3e4fe]/50 shadow-sm">
              <h4 className="mb-6 border-l-4 border-[#9d4300] pl-4 font-bold text-xs uppercase tracking-widest text-[#0b1c30]">
                Latest Articles
              </h4>
              <div className="space-y-6">
                {relatedPosts.slice(0, 4).map((rp) => (
                  <Link key={rp.id} href={`/blog/${rp.slug}`} className="group flex gap-4 items-start">
                    <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-[#eff4ff] relative border border-[#d3e4fe]/30">
                      {rp.featuredImage ? (
                        <Image src={rp.featuredImage} alt={rp.featuredImageAlt || rp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#9d4300]/10 to-[#0b1c30]/5">
                          <BookOpen className="w-5 h-5 text-[#9d4300]/30" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-bold text-[#9d4300] uppercase tracking-wider mb-1 block">{rp.category}</span>
                      <h5 className="text-xs font-bold leading-snug group-hover:text-[#9d4300] transition-colors line-clamp-2 uppercase tracking-tight text-[#0b1c30]">
                        {rp.title}
                      </h5>
                      <p className="text-[10px] text-[#584237]/60 mt-1 font-bold">{rp.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Redesigned Subscribe Card */}
            <div className="bg-[#0b1c30] p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group border border-white/10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#9d4300] opacity-15 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[#f97316] opacity-10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <span className="text-[9px] font-bold text-[#f97316] tracking-widest uppercase mb-2 block">Newsletter</span>
                <h4 className="font-extrabold text-xl uppercase tracking-widest text-white mb-2 leading-tight">The Authority Ledger</h4>
                <p className="text-xs font-medium mb-6 text-slate-300 leading-relaxed">
                  Join a network of growth leaders. Get technical SEO frameworks and organic strategy teardowns delivered to your terminal.
                </p>
                <div className="space-y-3">
                  <div className="relative">
                    <input 
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-xs placeholder:text-slate-400 focus:bg-white/20 focus:border-[#f97316] text-white font-bold outline-none transition-all focus:ring-1 focus:ring-[#f97316]" 
                      placeholder="analysis@company.com" 
                      type="email"
                    />
                  </div>
                  <button className="w-full bg-[#f97316] text-white py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-widest hover:bg-[#9d4300] transition-all shadow-xl active:scale-95 border-none">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Authority Network Expansion: Bottom Related Posts Grid */}
      <section className="bg-[#f8f9ff] py-24 border-t border-[#d3e4fe] section-bg-mesh">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-16 px-4">
            <div>
              <span className="text-[10px] font-bold text-[#9d4300] tracking-widest uppercase mb-1.5 block">Recommended</span>
              <h2 className="heading-section text-[#0b1c30] mb-0 text-2xl sm:text-3xl font-extrabold font-headline">Authority Explorer</h2>
              <div className="w-16 h-1 bg-[#9d4300] rounded-full mt-3" />
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2.5 text-xs font-bold text-[#9d4300] hover:gap-4 transition-all uppercase tracking-widest group">
              View All Insights <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.slice(0, 3).map((rp) => (
              <Link key={rp.id} href={`/blog/${rp.slug}`} className="group">
                <div className="flex flex-col h-full p-6 rounded-[2rem] bg-white hover:bg-[#eff4ff]/60 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(11,28,48,0.08)] hover:-translate-y-2 border border-[#d3e4fe]/30">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md bg-[#eff4ff]">
                    {rp.featuredImage ? (
                      <Image src={rp.featuredImage} alt={rp.featuredImageAlt || rp.title} fill className="object-cover group-hover:scale-103 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-[#9d4300]/20" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-[9px] font-extrabold text-[#9d4300] shadow-sm uppercase tracking-widest">{rp.category}</span>
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col pt-6 px-1">
                    <div className="flex items-center gap-3 mb-4 text-[9px] font-bold text-[#584237]/70 uppercase tracking-widest">
                      <span>{rp.date}</span>
                      <span className="w-1 h-1 rounded-full bg-[#9d4300]/40" />
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#9d4300]" />{rp.readTime}</span>
                    </div>
                    <h3 className="font-bold text-xl mb-4 group-hover:text-[#9d4300] transition-colors line-clamp-2 leading-snug text-[#0b1c30]">{rp.title}</h3>
                    <p className="text-sm text-[#584237] line-clamp-2 mb-6 leading-relaxed flex-grow opacity-90">{rp.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-[10px] font-extrabold text-[#9d4300] group-hover:gap-3.5 transition-all uppercase tracking-widest">
                      Examine Strategy <ArrowRight className="w-4 h-4" />
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
