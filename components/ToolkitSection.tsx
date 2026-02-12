"use client"
import { motion } from "framer-motion";
import {
    Facebook,
    Search,
    Video,
    Linkedin,
    PinIcon,
    BarChart3,
    Activity,
    LineChart,
    Database,
    Layers,
    Compass,
    Ship,
    Snowflake,
    Tag,
    Webhook,
    Share2,
    Server,
    Zap,
    type LucideIcon
} from "lucide-react";

type ToolStackItem = { category: string; tools: string[] };

type ToolsMarqueeProps = {
    toolStack: ToolStackItem[];
    speedSeconds?: number;
};

// Tool icon mapping with gradient indices
const toolIcons: Record<string, { icon: LucideIcon; gradientIdx: number }> = {
    // Ad Platforms
    'Meta Ads': { icon: Facebook, gradientIdx: 1 },
    'Google Ads': { icon: Search, gradientIdx: 2 },
    'TikTok Ads': { icon: Video, gradientIdx: 3 },
    'LinkedIn Ads': { icon: Linkedin, gradientIdx: 1 },
    'Pinterest Ads': { icon: PinIcon, gradientIdx: 3 },
    // Analytics
    'GA4': { icon: BarChart3, gradientIdx: 2 },
    'Amplitude': { icon: Activity, gradientIdx: 1 },
    'Mixpanel': { icon: LineChart, gradientIdx: 3 },
    'Heap': { icon: Database, gradientIdx: 2 },
    'Segment': { icon: Share2, gradientIdx: 1 },
    // Attribution
    'Triple Whale': { icon: Ship, gradientIdx: 2 },
    'Northbeam': { icon: Compass, gradientIdx: 3 },
    'Rockerbox': { icon: Layers, gradientIdx: 1 },
    'Measured': { icon: BarChart3, gradientIdx: 2 },
    // Data & BI
    'Looker': { icon: BarChart3, gradientIdx: 1 },
    'Tableau': { icon: LineChart, gradientIdx: 3 },
    'BigQuery': { icon: Database, gradientIdx: 2 },
    'Snowflake': { icon: Snowflake, gradientIdx: 1 },
    'dbt': { icon: Layers, gradientIdx: 3 },
    // Tracking
    'GTM': { icon: Tag, gradientIdx: 2 },
    'Tealium': { icon: Webhook, gradientIdx: 1 },
    'Stape': { icon: Server, gradientIdx: 3 },
    'CAPI': { icon: Zap, gradientIdx: 2 },
};

const getGradientClass = (idx: number) => {
    const gradients: Record<number, string> = {
        1: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20',
        2: 'from-emerald-500/20 via-cyan-500/20 to-blue-500/20',
        3: 'from-orange-500/20 via-pink-500/20 to-purple-500/20',
    };
    return gradients[idx] || gradients[1];
};

const ToolsMarquee = ({ toolStack, speedSeconds = 35 }: ToolsMarqueeProps) => {
    const tools = Array.from(new Set(toolStack.flatMap((c) => c.tools)));
    const items = [...tools, ...tools];

    return (
        <section className="section-padding">
            <style>{`
        @keyframes marqueeLeft {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
      `}</style>

            {/* Centered heading container */}
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-10"
                >
                    <span className="label-tag mb-3 block">Tools & Platforms</span>
                    <h2 className="heading-section">My toolkit</h2>
                </motion.div>
            </div>

            {/* Full-width marquee */}
            <div className="relative w-full overflow-hidden">
                <div className="mx-0 w-full border-y border-border bg-card/50 backdrop-blur-sm py-8">
                    {/* Fade edges */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

                    <div className="overflow-hidden">
                        <div
                            className="flex gap-4 w-max px-4 md:px-10"
                            style={{
                                animation: `marqueeLeft ${speedSeconds}s linear infinite`,
                                willChange: "transform",
                            }}
                        >
                            {items.map((tool, idx) => {
                                const toolData = toolIcons[tool] || { icon: BarChart3, gradientIdx: 1 };
                                const IconComponent = toolData.icon;
                                const gradientClass = getGradientClass(toolData.gradientIdx);

                                return (
                                    <motion.div
                                        key={`${tool}-${idx}`}
                                        whileHover={{ scale: 1.05, y: -3 }}
                                        className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border border-border bg-gradient-to-r ${gradientClass} backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group shadow-sm hover:shadow-lg`}
                                        style={{ flex: "0 0 auto" }}
                                    >
                                        {/* Icon with gradient background */}
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                                            style={{ background: `var(--gradient-icon-${toolData.gradientIdx})` }}
                                        >
                                            <IconComponent className="w-5 h-5 text-primary" />
                                        </div>

                                        {/* Tool name */}
                                        <span className="text-sm font-medium text-foreground whitespace-nowrap">
                                            {tool}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Subtext */}
                    <div className="section-container mt-6">
                        <p className="text-center text-muted-foreground">
                            Always-on toolset — optimized for measurement, creative testing, and scaling.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ToolsMarquee;
