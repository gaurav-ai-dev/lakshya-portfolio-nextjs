"use client";
import { motion, type Variants } from "framer-motion";

/* ─────────────────────────────────────────────
   Inline SVG logos — actual brand paths/colors
   ───────────────────────────────────────────── */

const AhrefsLogo = () => (
    <svg viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
        {/* Orange "a" mark */}
        <path
            d="M10.5 2 L2 22 H5.8 L7.3 18.3 H13.7 L15.2 22 H19 L10.5 2Z M10.5 7.5 L12.6 13.5 H8.4 Z"
            fill="#FF6914"
        />
        {/* Wordmark */}
        <text x="22" y="18" fontFamily="DM Sans, Arial, sans-serif" fontWeight="700" fontSize="13" fill="currentColor" letterSpacing="-0.3">
            hrefs
        </text>
    </svg>
);

const SemrushLogo = () => (
    <svg viewBox="0 0 110 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
        {/* SEMrush arc/semicircle mark */}
        <path
            d="M14 4 C7.4 4 2 9.4 2 16 C2 22.6 7.4 28 14 28 C17.8 28 21.2 26.2 23.4 23.4 L19.6 20.4 C18.2 22.2 16.2 23.4 14 23.4 C9.9 23.4 6.6 20.1 6.6 16 C6.6 11.9 9.9 8.6 14 8.6 C16.4 8.6 18.5 9.8 19.9 11.7 L23.6 8.6 C21.4 5.8 18 4 14 4Z"
            fill="#FF642D"
        />
        <path
            d="M22 16 C22 12.8 20.2 10 17.6 8.4 L14 11.5 C15.6 12 16.8 13.3 16.8 16 C16.8 18.7 15.6 20 14 20.5 L17.6 23.6 C20.2 22 22 19.2 22 16Z"
            fill="#FF8C5A"
        />
        <text x="28" y="22" fontFamily="DM Sans, Arial, sans-serif" fontWeight="700" fontSize="14" fill="currentColor" letterSpacing="-0.3">
            SEMrush
        </text>
    </svg>
);

const GSCLogo = () => (
    <svg viewBox="0 0 180 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
        {/* Magnifying glass with Google colors */}
        <circle cx="13" cy="12" r="8" stroke="#4285F4" strokeWidth="3" fill="none" />
        <circle cx="13" cy="12" r="8" stroke="url(#gsc-grad)" strokeWidth="3" fill="none" />
        <line x1="19" y1="18" x2="27" y2="26" stroke="#34A853" strokeWidth="3" strokeLinecap="round" />
        <defs>
            <linearGradient id="gsc-grad" x1="5" y1="5" x2="21" y2="21">
                <stop offset="0%" stopColor="#EA4335" />
                <stop offset="33%" stopColor="#FBBC05" />
                <stop offset="66%" stopColor="#4285F4" />
                <stop offset="100%" stopColor="#34A853" />
            </linearGradient>
        </defs>
        <text x="34" y="21" fontFamily="DM Sans, Arial, sans-serif" fontWeight="600" fontSize="12" fill="currentColor">
            Search Console
        </text>
    </svg>
);

const GA4Logo = () => (
    <svg viewBox="0 0 90 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
        {/* GA4 bar-chart icon */}
        <rect x="2" y="20" width="7" height="10" rx="2" fill="#E37400" />
        <rect x="12" y="12" width="7" height="18" rx="2" fill="#FBBC04" />
        <rect x="22" y="4" width="7" height="26" rx="2" fill="#E37400" />
        <text x="35" y="22" fontFamily="DM Sans, Arial, sans-serif" fontWeight="700" fontSize="14" fill="currentColor" letterSpacing="-0.3">
            GA4
        </text>
    </svg>
);

const ScreamingFrogLogo = () => (
    <svg viewBox="0 0 200 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        {/* Frog body */}
        <ellipse cx="20" cy="25" rx="14" ry="11" fill="#6CC24A" />
        {/* Head */}
        <ellipse cx="20" cy="14" rx="10" ry="9" fill="#6CC24A" />
        {/* Eyes */}
        <ellipse cx="15" cy="9" rx="4" ry="4.5" fill="white" />
        <ellipse cx="25" cy="9" rx="4" ry="4.5" fill="white" />
        <circle cx="15.5" cy="9.5" r="2" fill="#1a1a1a" />
        <circle cx="25.5" cy="9.5" r="2" fill="#1a1a1a" />
        {/* Mouth */}
        <path d="M14 18 Q20 22 26 18" stroke="#3a7a1a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Legs */}
        <path d="M7 32 Q3 36 1 38" stroke="#6CC24A" strokeWidth="4" strokeLinecap="round" />
        <path d="M33 32 Q37 36 39 38" stroke="#6CC24A" strokeWidth="4" strokeLinecap="round" />
        {/* Text */}
        <text x="46" y="18" fontFamily="DM Sans, Arial, sans-serif" fontWeight="700" fontSize="12" fill="currentColor">Screaming</text>
        <text x="46" y="33" fontFamily="DM Sans, Arial, sans-serif" fontWeight="700" fontSize="12" fill="#6CC24A">Frog SEO Spider</text>
    </svg>
);

const tools = [
    { name: "Ahrefs", Logo: AhrefsLogo },
    { name: "SEMrush", Logo: SemrushLogo },
    { name: "Google Search Console", Logo: GSCLogo },
    { name: "GA4", Logo: GA4Logo },
    { name: "Screaming Frog", Logo: ScreamingFrogLogo },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
};
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function TrustedTools() {
    return (
        <section className="section-bg-gradient py-10 md:py-14 border-y border-border/50">
            <div className="section-container">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 md:mb-10"
                >
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                        Trusted SEO Expert Utilizing
                    </p>
                    <h2
                        className="text-xl md:text-2xl font-semibold text-foreground"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        Industry-Leading{" "}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "var(--gradient-tab)" }}
                        >
                            Tools &amp; Platforms
                        </span>
                    </h2>
                </motion.div>

                {/* Logo Bar */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
                >
                    {tools.map(({ name, Logo }) => (
                        <motion.div
                            key={name}
                            variants={itemVariants}
                            whileHover={{ scale: 1.07, y: -2 }}
                            title={name}
                            className="flex items-center justify-center cursor-default transition-all duration-300"
                        >
                            <Logo />
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
