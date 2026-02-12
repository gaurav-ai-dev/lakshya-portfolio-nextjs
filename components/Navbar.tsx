"use client"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Services", href: "/services" },
  { name: "Process", href: "/process" },
  { name: "Insights", href: "/insights" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });


  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen
          ? "backdrop-blur-xl border-b border-border/60 shadow-lg bg-[hsl(32_95%_52%/0.14)] dark:bg-[hsl(24_94%_50%/0.12)]"
          : "backdrop-blur-md border-b border-border/40 bg-[hsl(32_95%_52%/0.08)] dark:bg-[hsl(24_94%_50%/0.08)]"
          }`}
      >

        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                MarketPro
              </motion.span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 font-medium transition-all duration-300 rounded-lg ${isActive(item.href)
                    ? "text-primary"
                    : "text-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ background: 'var(--gradient-tab)' }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              <div className="ml-4 flex items-center gap-3">
                <ThemeToggle />
                <Link href="/contact" className="btn-primary text-sm px-5 py-2.5">
                  Get in Touch
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl bg-secondary/80 text-foreground hover:bg-secondary transition-colors border border-border/50"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                {/* Nav Links */}
                <div className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 py-4 px-5 rounded-xl font-medium transition-all duration-300 ${isActive(item.href)
                          ? "text-primary-foreground"
                          : "text-foreground hover:bg-secondary/50"
                          }`}
                        style={isActive(item.href) ? {
                          background: 'var(--gradient-tab)',
                          boxShadow: 'var(--shadow-tab)'
                        } : {}}
                      >
                        <span className={`w-2 h-2 rounded-full ${isActive(item.href) ? 'bg-white' : 'bg-primary/30'}`} />
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="mt-auto"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary w-full text-center py-4 text-base"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
