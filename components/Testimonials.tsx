"use client"
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Search, Facebook, Video, Linkedin, Briefcase } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content:
      "Working with MarketPro transformed our entire approach to paid acquisition. The strategic thinking and data-driven methodology resulted in a 340% increase in ROAS within 6 months.",
    fullContent:
      "Working with MarketPro transformed our entire approach to paid acquisition. The strategic thinking and data-driven methodology resulted in a 340% increase in ROAS within 6 months. What impressed me most was the focus on building systems, not just running campaigns. We now have a creative testing framework and attribution model that will serve us for years. The weekly strategy calls were invaluable—always prepared, always insightful.",
    author: "Sarah Chen",
    role: "CEO",
    company: "Vitality Labs",
    avatar: "SC",
    rating: 5,
    featured: false,
  },
  {
    id: 2,
    content:
      "The level of strategic insight was beyond what we expected. Our CAC dropped by 45% while maintaining quality, and we finally have attribution we can trust.",
    fullContent:
      "The level of strategic insight was beyond what we expected. Our CAC dropped by 45% while maintaining quality, and we finally have attribution we can trust. The measurement infrastructure built during our engagement has become critical to every growth decision we make. Worth every penny and then some.",
    author: "Michael Torres",
    role: "VP of Growth",
    company: "ScaleStack",
    avatar: "MT",
    rating: 5,
    featured: false,
  },
  {
    id: 3,
    content:
      "Not just a consultant, but a true strategic partner. The creative testing system alone has generated millions in additional revenue for our DTC brand.",
    fullContent:
      "Not just a consultant, but a true strategic partner. The creative testing system alone has generated millions in additional revenue for our DTC brand. The iterative testing approach and structured creative briefs have fundamentally changed how we think about ad creative. Our in-house team learned as much as we got in direct results.",
    author: "Emma Richardson",
    role: "Founder",
    company: "Bloom Beauty",
    avatar: "ER",
    rating: 5,
    featured: false,
  },
];

const partnerBadges = [
  { name: "Google Ads Partner", icon: Search, gradient: "from-blue-500/20 via-green-500/20 to-yellow-500/20" },
  { name: "Meta Business Partner", icon: Facebook, gradient: "from-blue-600/20 via-indigo-500/20 to-purple-500/20" },
  { name: "TikTok Partner", icon: Video, gradient: "from-pink-500/20 via-red-500/20 to-orange-500/20" },
  { name: "LinkedIn Partner", icon: Linkedin, gradient: "from-blue-700/20 via-blue-500/20 to-cyan-500/20" },
  { name: "Microsoft Ads", icon: Briefcase, gradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20" },
];

const Testimonials = () => {
  const items = [...testimonials, ...testimonials];

  return (
    <section className="section-padding section-bg-dots relative overflow-hidden">
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
      `}</style>

      {/* Heading */}
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="label-tag mb-3 block">Testimonials</span>
          <h2 className="heading-section mb-3">What clients say</h2>
          <p className="text-body-lg">
            Don't just take my word for it. Here's what partners have to say about working together.
          </p>
        </motion.div>
      </div>

      {/* Full-width marquee */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="relative w-full overflow-hidden"
      >
        <div className="mx-0 w-full bg-card/50 backdrop-blur-sm py-10">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="overflow-hidden">
            <div
              className="flex gap-6 w-max px-4 md:px-10"
              style={{
                animation: "marqueeLeft 55s linear infinite",
                willChange: "transform",
              }}
            >
              {items.map((t, idx) => (
                <motion.div
                  key={`${t.id}-${idx}`}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="bg-background/90 border border-border rounded-2xl p-7 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    width: "520px",
                    maxWidth: "88vw",
                    flex: "0 0 auto",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'var(--gradient-icon-1)' }}
                    >
                      <Quote className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <p className="text-foreground leading-relaxed">
                    "{t.fullContent}"
                  </p>

                  <div className="flex items-center gap-3 pt-5 mt-6 border-t border-border">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-semibold"
                      style={{ 
                        background: 'var(--gradient-tab)',
                        color: 'white'
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{t.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Premium Partner Badges */}
          <div className="section-container mt-10">
            <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-wider font-medium">
              Trusted by innovative brands across industries
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3">
              {partnerBadges.map((badge, index) => (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r ${badge.gradient} backdrop-blur-sm border border-border/50 cursor-default transition-all duration-300 hover:shadow-lg hover:border-primary/30`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                    <badge.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-foreground">{badge.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
