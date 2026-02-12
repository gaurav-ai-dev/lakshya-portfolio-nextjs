"use client"
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Check } from "lucide-react";
import Link from "next/link";

const whatHappensNext = [
  "30-minute discovery call to understand your goals",
  "Custom growth assessment within 48 hours",
  "Actionable roadmap with quick wins identified",
  "No-obligation proposal if we're a fit",
];

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'var(--gradient-dark)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(230 85% 55% / 0.3) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(260 75% 58% / 0.25) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, hsl(280 70% 55% / 0.2) 0%, transparent 70%)' }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-3 block">
              Ready to Start?
            </span>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-white" 
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Let's build profitable growth together
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Whether you're looking to scale your paid acquisition or need strategic guidance 
              on measurement and attribution, I'm here to help.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-foreground rounded-xl font-medium transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  href="/case-studies" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/30 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule a Call
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="backdrop-blur-xl rounded-2xl p-6 border"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              borderColor: 'rgba(255,255,255,0.15)'
            }}
          >
            <h3 
              className="font-semibold text-xl mb-5 text-white" 
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              What happens next?
            </h3>
            <ul className="space-y-4">
              {whatHappensNext.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div 
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'var(--gradient-icon-1)' }}
                  >
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-white/80">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
