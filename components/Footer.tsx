"use client"
import Link from "next/link";
import { ArrowRight, Mail, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--gradient-dark)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(230 85% 55% / 0.2) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(260 75% 58% / 0.15) 0%, transparent 70%)' }}
        />
      </div>

      {/* Main Footer */}
      <div className="section-container py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/" 
                className="text-2xl font-bold text-white mb-5 block"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                MarketPro
              </Link>
              <p className="text-white/60 max-w-md mb-6 text-base leading-relaxed">
                Senior Performance Marketing Manager helping brands turn ad spend into measurable, profitable growth.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, label: "LinkedIn", href: "#" },
                  { icon: Twitter, label: "Twitter", href: "#" },
                  { icon: Mail, label: "Email", href: "mailto:hello@marketpro.com" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white/80" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 
              className="font-semibold text-white mb-5 text-sm uppercase tracking-wider"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About", href: "/about" },
                { name: "Case Studies", href: "/case-studies" },
                { name: "Services", href: "/services" },
                { name: "Process", href: "/process" },
                { name: "Insights", href: "/insights" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 
              className="font-semibold text-white mb-5 text-sm uppercase tracking-wider"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Contact
            </h3>
            <ul className="space-y-3 text-white/60 text-sm">
              <li>
                <a 
                  href="mailto:hello@marketpro.com" 
                  className="hover:text-white transition-colors duration-300"
                >
                  hello@marketpro.com
                </a>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  Schedule a call 
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </li>
              <li>Based in San Francisco</li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="section-container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} MarketPro. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
