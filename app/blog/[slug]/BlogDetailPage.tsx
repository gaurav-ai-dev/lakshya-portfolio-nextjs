"use client"
import { motion } from "framer-motion";
import { Clock, ArrowLeft, Tag, Calendar, Share2, BookOpen, ArrowRight, Lightbulb, Copy, Check, AlertTriangle, Info, ChevronDown, Link2 } from "lucide-react";
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
      <button onClick={copyLink} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? 'Copied!' : 'Copy link'}
      </button>
      <button onClick={shareX} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
        𝕏
      </button>
      <button onClick={shareLinkedIn} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
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
    <div className="fixed top-0 left-0 right-0 z-[60] h-1">
      <div
        className="h-full transition-[width] duration-150 ease-out rounded-r-full"
        style={{ width: `${progress}%`, background: 'var(--gradient-tab)' }}
      />
    </div>
  );
};

// Mobile collapsible card
const CollapsibleCard = ({ title, icon: Icon, children, defaultOpen = false }: { title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left">
        <span className="flex items-center gap-2 font-medium text-sm">
          <Icon className="w-4 h-4 text-primary" />
          {title}
        </span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-4 pb-4 border-t border-border pt-3">{children}</div>}
    </div>
  );
};

// Table of contents sidebar item
const TocItem = ({ heading, activeId }: { heading: { id: string; text: string }; activeId: string }) => (
  <button
    onClick={() => {
      const el = document.getElementById(heading.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }}
    className={`block w-full text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-200 ${activeId === heading.id
      ? 'text-primary font-medium bg-primary/8'
      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
      }`}
  >
    {heading.text}
  </button>
);

// Callout block component
const CalloutBlock = ({ type, text }: { type: string; text: string }) => {
  const config = type === 'callout-tip'
    ? { icon: Lightbulb, label: 'Tip', borderClass: 'border-l-primary', bgClass: 'bg-primary/5' }
    : type === 'callout-warning'
      ? { icon: AlertTriangle, label: 'Warning', borderClass: 'border-l-warning', bgClass: 'bg-warning/5' }
      : { icon: Info, label: 'Note', borderClass: 'border-l-muted-foreground', bgClass: 'bg-muted/30' };

  const Icon = config.icon;
  return (
    <div className={`${config.bgClass} border-l-4 ${config.borderClass} rounded-r-xl p-4 md:p-5 my-6`}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-1 block">{config.label}</span>
          <p className="text-sm leading-relaxed text-foreground/85">{text}</p>
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
      <div key={idx}>
        {idx > 0 && (
          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-px bg-border" />
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <div className="flex-1 h-px bg-border" />
          </div>
        )}
        <h2 id={slugify(block.text)} className="heading-subsection mt-2 mb-4 scroll-mt-24">{block.text}</h2>
      </div>
    );
  }
  if (block.type.startsWith('callout-')) {
    return <CalloutBlock key={idx} type={block.type} text={block.text} />;
  }
  return <p key={idx} className="text-foreground/80 text-[1.05rem] mb-5 leading-[1.85]">{block.text}</p>;
};

const BlogDetailPage = ({ slug }: BlogDetailPageProps) => {
  const [activeHeadingId, setActiveHeadingId] = useState('');
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="section-padding">
          <div className="section-container text-center">
            <h1 className="heading-section mb-4">Post not found</h1>
            <Link href="/insights" className="btn-primary">Back to Insights</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Extract headings for TOC
  const headings = useMemo(() => {
    if (!post) return [];
    return post.content
      .filter(b => b.type === 'heading')
      .map(b => ({ id: slugify(b.text), text: b.text }));
  }, [post]);

  // Generate key takeaways from headings
  const takeaways = useMemo(() => {
    if (!post) return [];
    return headings.slice(0, 4).map(h => h.text);
  }, [headings, post]);

  const relatedPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3);
  // Insert key takeaways after the first paragraph
  const firstParaIdx = post.content.findIndex(b => b.type === 'paragraph');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ReadingProgressBar />
      <Navbar />
      <main>
        {/* Header */}
        <section className="pt-28 pb-8 md:pt-36 md:pb-12 section-bg-mesh">
          <div className="section-container max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to Insights
              </Link>

              {/* Category + Tags */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="px-4 py-1.5 rounded-xl text-xs font-semibold text-primary-foreground" style={{ background: 'var(--gradient-tab)' }}>
                  {post.category}
                </span>
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-lg bg-secondary/60 text-xs font-medium text-muted-foreground border border-border/50">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="heading-display mb-5">{post.title}</h1>
              <p className="text-body-lg mb-6 max-w-2xl">{post.excerpt}</p>

              {/* Meta pill row */}
              <div className="inline-flex flex-wrap items-center gap-3 px-4 py-2.5 rounded-2xl bg-card border border-border">
                <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  {post.author}
                </span>
                <span className="w-px h-4 bg-border" />
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="w-px h-4 bg-border" />
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime} read
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hero Image with glow */}
        <div className="section-container max-w-4xl mx-auto mb-10 -mt-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative">
            <div className="absolute inset-0 -m-4 rounded-3xl opacity-30 blur-2xl" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)' }} />
            <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-lg">
              <Image src={post.image} alt={post.title} className="w-full aspect-[2/1] object-cover" />
            </div>
          </motion.div>
        </div>

        {/* 2-Column Layout: Article + Sidebar */}
        <div className="section-container max-w-6xl mx-auto pb-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            {/* Main Article */}
            <article className="flex-1 min-w-0 max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                {post.content.map((block, idx) => (
                  <div key={idx}>
                    {renderBlock(block, idx)}
                    {/* Insert key takeaways after first paragraph */}
                    {idx === firstParaIdx && takeaways.length > 0 && (
                      <div className="my-8 p-5 md:p-6 rounded-2xl bg-primary/5 border border-primary/15">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-icon-1)' }}>
                            <Lightbulb className="w-4 h-4 text-primary" />
                          </div>
                          <h3 className="font-semibold text-sm">Key Takeaways</h3>
                        </div>
                        <ul className="space-y-2">
                          {takeaways.map((t, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                              <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-primary-foreground mt-0.5" style={{ background: 'var(--gradient-tab)' }}>
                                {i + 1}
                              </span>
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* Share / Tags Footer */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    {post.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-lg bg-secondary text-xs font-medium text-secondary-foreground border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ShareButtons />
                </div>
              </div>

              {/* Mobile-only sidebar content */}
              <div className="lg:hidden mt-8 space-y-4">
                <CollapsibleCard title="Table of Contents" icon={Link2}>
                  <div className="space-y-1">
                    {headings.map(h => (
                      <TocItem key={h.id} heading={h} activeId={activeHeadingId} />
                    ))}
                  </div>
                </CollapsibleCard>
                <CollapsibleCard title="Key Takeaways" icon={Lightbulb}>
                  <ul className="space-y-2">
                    {takeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-primary-foreground mt-0.5" style={{ background: 'var(--gradient-tab)' }}>
                          {i + 1}
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </CollapsibleCard>
                <CollapsibleCard title="Share this article" icon={Copy}>
                  <ShareButtons />
                </CollapsibleCard>
              </div>
            </article>

            {/* Desktop Sticky Sidebar */}
            <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
              <div className="sticky top-28 space-y-6">
                {/* Table of Contents */}
                <div className="bg-card rounded-2xl border border-border p-5">
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-primary" />
                    Contents
                  </h4>
                  <div className="space-y-0.5">
                    {headings.map(h => (
                      <TocItem key={h.id} heading={h} activeId={activeHeadingId} />
                    ))}
                  </div>
                </div>

                {/* Key Takeaways */}
                <div className="bg-primary/5 rounded-2xl border border-primary/15 p-5">
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    Key Takeaways
                  </h4>
                  <ul className="space-y-2.5">
                    {takeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground/75 leading-relaxed">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold text-primary-foreground mt-0.5" style={{ background: 'var(--gradient-tab)' }}>
                          {i + 1}
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Share */}
                <div className="bg-card rounded-2xl border border-border p-5">
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Copy className="w-4 h-4 text-primary" />
                    Share
                  </h4>
                  <ShareButtons />
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Read Next / Related Posts */}
        <section className="section-padding section-bg-mesh">
          <div className="section-container max-w-5xl mx-auto">
            <h2 className="heading-subsection mb-8">Read Next</h2>
            <div className="space-y-4">
              {relatedPosts.map((rp, index) => (
                <motion.article
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/insights/${rp.slug}`} className="block group">
                    <div className="card-interactive flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch">
                      <div className="relative w-full sm:w-48 md:w-56 flex-shrink-0 aspect-[16/10] sm:aspect-auto rounded-xl overflow-hidden">
                        <Image src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-2 left-2">
                          <span className="px-2.5 py-1 rounded-lg bg-background/90 backdrop-blur-sm text-[10px] font-medium border border-border/50">{rp.category}</span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center py-1">
                        <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                          <span>{rp.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{rp.readTime}</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">{rp.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{rp.excerpt}</p>
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                          Read article <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
