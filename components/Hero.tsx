"use client"
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown, Search, Facebook, Video, Linkedin, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import heroImage from "@/assets/hero-marketing.jpg";
import Image from "next/image";

const stats = [
  { value: "$15M+", label: "Ad Spend Managed", tooltip: "Cumulative spend across Meta, Google, TikTok, LinkedIn" },
  { value: "4.7x", label: "Average ROAS", tooltip: "Measured using server-side conversion tracking" },
  { value: "50+", label: "Brands Scaled", tooltip: "DTC, B2B SaaS, and service-based businesses" },
  { value: "8+", label: "Years Experience", tooltip: "Started in 2016, agency → in-house → consulting" },
];

const partnerBadges = [
  { name: "Google Ads Partner", icon: Search, gradient: "from-blue-500/20 via-green-500/20 to-yellow-500/20" },
  { name: "Meta Business Partner", icon: Facebook, gradient: "from-blue-600/20 via-indigo-500/20 to-purple-500/20" },
  { name: "TikTok Partner", icon: Video, gradient: "from-pink-500/20 via-red-500/20 to-orange-500/20" },
  { name: "LinkedIn Partner", icon: Linkedin, gradient: "from-blue-700/20 via-blue-500/20 to-cyan-500/20" },
  { name: "Shopify Plus", icon: ShoppingBag, gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20" },
];

const Hero = () => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage} 
          alt="Marketing Analytics Dashboard" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Status Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--accent) / 0.1) 100%)',
                border: '1px solid hsl(var(--primary) / 0.2)'
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium text-primary">Available for Strategic Partnerships</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="heading-display mb-5 text-balance">
              I help brands turn{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-tab)' }}>ad spend</span> into{" "}
              <span className="italic font-medium">measurable growth</span>
            </h1>

            {/* Subheadline */}
            <p className="text-body-lg max-w-lg mb-8">
              Senior Performance Marketing Manager with 8+ years of experience building 
              profitable acquisition systems for DTC, B2B SaaS, and service brands.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link href="/contact" className="btn-primary gap-2 px-6 py-3">
                Let's Work Together
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/case-studies" className="btn-secondary gap-2 px-6 py-3">
                <Play className="w-4 h-4" />
                View Case Studies
              </Link>
            </div>

            {/* Premium Partner Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider font-medium">Certified Partner</p>
              <div className="flex flex-wrap gap-2">
                {partnerBadges.map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
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
            </motion.div>
          </motion.div>

          {/* Interactive Stats Grid - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="card-glass p-6 text-center relative cursor-pointer group"
                  onMouseEnter={() => setActiveTooltip(index)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <p className="stat-number bg-clip-text text-transparent" style={{ backgroundImage: 'var(--gradient-tab)' }}>{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                  
                  {/* Tooltip on hover */}
                  {activeTooltip === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full tooltip-content whitespace-nowrap z-20"
                    >
                      {stat.tooltip}
                    </motion.div>
                  )}
                  
                  {/* Hover indicator */}
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:hidden grid grid-cols-2 sm:grid-cols-4 gap-3 pb-10"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label} 
              className="card-glass p-4 text-center relative"
              onClick={() => setActiveTooltip(activeTooltip === index ? null : index)}
              whileTap={{ scale: 0.98 }}
            >
              <p className="stat-number text-2xl text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-tab)' }}>{stat.value}</p>
              <p className="stat-label text-xs">{stat.label}</p>
              {activeTooltip === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -bottom-1 left-0 right-0 translate-y-full p-2 bg-foreground text-background text-xs rounded-lg z-10"
                >
                  {stat.tooltip}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
