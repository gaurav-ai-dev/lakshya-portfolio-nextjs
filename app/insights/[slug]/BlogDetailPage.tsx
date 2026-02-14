"use client"
import { motion } from "framer-motion";
import { Clock, ArrowLeft, Tag, Calendar, Share2, BookOpen } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { blogPosts, getPostBySlug } from "@/data/blogposts";

interface BlogDetailPageProps {
  slug: string;
}

const BlogDetailPage = ({ slug }: BlogDetailPageProps) => {
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

  const relatedPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Header */}
        <section className="pt-28 pb-8 md:pt-36 md:pb-12 section-bg-mesh">
          <div className="section-container max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Insights
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-lg text-xs font-semibold text-primary-foreground" style={{ background: 'var(--gradient-tab)' }}>
                  {post.category}
                </span>
                {post.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-secondary text-xs font-medium text-muted-foreground border border-border">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="heading-display mb-5">{post.title}</h1>
              <p className="text-body-lg mb-6">{post.excerpt}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-border pt-5">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime} read
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hero Image */}
        <div className="section-container max-w-3xl mx-auto -mt-2 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <Image src={post.image} alt={post.title} className="w-full aspect-[2/1] object-cover" />
          </motion.div>
        </div>

        {/* Article Content */}
        <article className="section-container max-w-3xl mx-auto pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose-custom"
          >
            {post.content.map((block, idx) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={idx} className="heading-subsection mt-10 mb-4">
                    {block.text}
                  </h2>
                );
              }
              return (
                <p key={idx} className="text-body mb-5 leading-[1.8]">
                  {block.text}
                </p>
              );
            })}
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
              <button className="btn-secondary gap-2 text-sm">
                <Share2 className="w-4 h-4" />
                Share Article
              </button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="section-padding section-bg-mesh">
          <div className="section-container max-w-5xl mx-auto">
            <h2 className="heading-subsection mb-8">More Insights</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rp, index) => (
                <motion.article
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/insights/${rp.slug}`} className="block group">
                    <div className="card-interactive h-full">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                        <Image src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur-sm text-xs font-medium border border-border/50">{rp.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                        <span>{rp.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{rp.readTime}</span>
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">{rp.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{rp.excerpt}</p>
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
