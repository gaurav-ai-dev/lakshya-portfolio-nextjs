import insightsHero from "@/assets/insights-hero.jpg";
import servicesAnalytics from "@/assets/services-analytics.jpg";
import servicesAdvertising from "@/assets/services-advertising.jpg";
import servicesStrategy from "@/assets/services-strategy.jpg";
import caseStudy1 from "@/assets/case-study-1.jpg";
import caseStudy2 from "@/assets/case-study-2.jpg";
import { StaticImageData } from "next/image";

export interface BlogPost {
    id: string;
    slug: string;
    category: string;
    tags: string[];
    title: string;
    excerpt: string;
    image: StaticImageData;
    readTime: string;
    date: string;
    author: string;
    content: Array<{
        type: "paragraph" | "heading";
        text: string;
    }>;
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        slug: "death-of-third-party-cookies",
        category: "Attribution",
        tags: ['attribution', 'strategy'],
        title: "The Death of Third-Party Cookies: What It Means for 2024",
        excerpt: "Third-party cookies are finally going away. Here's what marketers need to know about measurement, targeting, and the new landscape of digital advertising.",
        image: insightsHero,
        readTime: "12 min",
        date: "January 2024",
        author: "Alex Morgan",
        content: [
            {
                type: "paragraph",
                text: "The digital advertising landscape is undergoing its most significant transformation in over a decade. With Google's Chrome browser finally phasing out third-party cookies, marketers are being forced to fundamentally rethink how they measure, target, and optimize their campaigns."
            },
            {
                type: "heading",
                text: "What's Actually Changing"
            },
            {
                type: "paragraph",
                text: "Third-party cookies have been the backbone of digital advertising measurement for years. They've enabled cross-site tracking, retargeting, and multi-touch attribution models that marketers have come to rely on. Without them, the traditional approach to digital advertising measurement becomes significantly more challenging."
            },
            {
                type: "heading",
                text: "The Impact on Measurement"
            },
            {
                type: "paragraph",
                text: "The most immediate impact will be felt in attribution. Multi-touch attribution models that rely on cookie-based tracking will become less accurate. Marketers will need to shift toward probabilistic models, media mix modeling (MMM), and incrementality testing to understand the true impact of their campaigns."
            },
            {
                type: "paragraph",
                text: "First-party data strategies become essential. Brands that have invested in building direct relationships with their customers — through email lists, loyalty programs, and authenticated experiences — will have a significant advantage in this new landscape."
            },
            {
                type: "heading",
                text: "What Marketers Should Do Now"
            },
            {
                type: "paragraph",
                text: "Start by auditing your current measurement stack. Identify which reports and dashboards rely on third-party cookie data. Then, begin implementing server-side tracking, enhanced conversions, and first-party data collection strategies. The transition won't happen overnight, but starting now gives you a competitive advantage."
            },
            {
                type: "paragraph",
                text: "Invest in contextual targeting capabilities. While behavioral targeting based on cookies diminishes, contextual targeting — placing ads based on the content a user is viewing rather than their browsing history — is experiencing a renaissance. Modern contextual targeting powered by AI is far more sophisticated than the keyword-based approaches of the past."
            },
            {
                type: "heading",
                text: "Looking Ahead"
            },
            {
                type: "paragraph",
                text: "The post-cookie world isn't something to fear — it's an opportunity to build more sustainable, privacy-respecting marketing practices. The brands that adapt fastest will gain a significant competitive advantage, while those that cling to the old ways will find themselves increasingly left behind."
            }
        ]
    },
    {
        id: "2",
        slug: "creative-testing-system",
        category: "Creative",
        tags: ['creative', 'dtc'],
        title: "Building a Creative Testing System That Scales",
        excerpt: "How to systematically find winning creative concepts without burning through budget on random tests.",
        image: servicesAdvertising,
        readTime: "8 min",
        date: "December 2023",
        author: "Alex Morgan",
        content: [
            { type: "paragraph", text: "Creative is the single biggest lever in paid social advertising. Yet most brands approach creative testing with a spray-and-pray mentality — launching dozens of variations with no clear hypothesis or learning framework." },
            { type: "heading", text: "The Framework" },
            { type: "paragraph", text: "A scalable creative testing system starts with a clear taxonomy. You need to categorize your creative by concept, format, hook, and call-to-action. This allows you to isolate variables and understand what's actually driving performance differences." },
            { type: "heading", text: "Testing Cadence" },
            { type: "paragraph", text: "The best brands test new creative concepts weekly, not monthly. This doesn't mean creating entirely new campaigns every week — it means having a pipeline of new concepts, hooks, and angles ready to test against your proven winners." },
            { type: "paragraph", text: "Set clear success criteria before launching any test. Define what 'winning' looks like in terms of CTR, CPA, or ROAS, and commit to a minimum spend threshold before making decisions. This prevents premature optimization and ensures you're making statistically valid decisions." },
        ]
    },
    {
        id: "3",
        slug: "roas-terrible-north-star",
        category: "Strategy",
        tags: ['strategy', 'scaling'],
        title: "Why ROAS is a Terrible North Star Metric",
        excerpt: "ROAS looks good in reports but it's leading you astray. Here's what to optimize for instead.",
        image: servicesAnalytics,
        readTime: "6 min",
        date: "November 2023",
        author: "Alex Morgan",
        content: [
            { type: "paragraph", text: "Return on ad spend (ROAS) is the most commonly reported metric in performance marketing. It's also one of the most misleading. Here's why optimizing for ROAS alone can actually hurt your business growth." },
            { type: "heading", text: "The ROAS Trap" },
            { type: "paragraph", text: "High ROAS campaigns often target customers who would have converted anyway. Brand search campaigns, retargeting campaigns, and bottom-of-funnel tactics all deliver impressive ROAS numbers — but they're not necessarily driving incremental revenue." },
            { type: "heading", text: "What to Track Instead" },
            { type: "paragraph", text: "Focus on contribution margin and customer lifetime value. A campaign with a 2x ROAS that acquires high-LTV customers is far more valuable than a 6x ROAS campaign that only captures existing demand. The best growth marketers think in terms of portfolio-level efficiency, not individual campaign ROAS." },
        ]
    },
    {
        id: "4",
        slug: "mmm-vs-mta",
        category: "Attribution",
        tags: ['attribution', 'b2b'],
        title: "MMM vs MTA: When to Use Each",
        excerpt: "Media Mix Modeling and Multi-Touch Attribution serve different purposes. Here's how to think about them.",
        image: servicesStrategy,
        readTime: "10 min",
        date: "October 2023",
        author: "Alex Morgan",
        content: [
            { type: "paragraph", text: "The measurement landscape has never been more complex. With the deprecation of third-party cookies and increasing privacy regulations, marketers are turning to two complementary approaches: Media Mix Modeling (MMM) and Multi-Touch Attribution (MTA)." },
            { type: "heading", text: "Media Mix Modeling" },
            { type: "paragraph", text: "MMM uses statistical analysis of historical data to measure the impact of marketing activities on business outcomes. It's privacy-safe, captures offline channels, and provides a top-down view of marketing effectiveness. The trade-off is that it requires significant historical data and provides directional rather than real-time insights." },
            { type: "heading", text: "Multi-Touch Attribution" },
            { type: "paragraph", text: "MTA tracks individual user journeys to assign credit to different touchpoints. It provides granular, real-time insights that are actionable for day-to-day optimization. However, it's increasingly challenged by privacy changes and typically only captures digital touchpoints." },
        ]
    },
    {
        id: "5",
        slug: "landing-page-optimization",
        category: "CRO",
        tags: ['cro', 'dtc'],
        title: "Landing Page Optimization: The 80/20",
        excerpt: "Most CRO advice is noise. Here are the changes that actually move the needle.",
        image: caseStudy1,
        readTime: "7 min",
        date: "September 2023",
        author: "Alex Morgan",
        content: [
            { type: "paragraph", text: "Conversion rate optimization has become an industry unto itself, with thousands of blog posts offering contradictory advice about button colors and headline formulas. Here's what actually matters when optimizing landing pages for performance marketing." },
            { type: "heading", text: "Message Match" },
            { type: "paragraph", text: "The single biggest driver of landing page performance is message match — ensuring that the promise made in your ad is immediately reinforced on the landing page. When a user clicks an ad about a specific offer, they should land on a page that leads with that exact offer. This alone can improve conversion rates by 20-50%." },
            { type: "heading", text: "Speed Matters More Than Design" },
            { type: "paragraph", text: "A fast, simple landing page will almost always outperform a slow, beautiful one. Every second of load time reduces conversion rates. Focus on core web vitals before aesthetic improvements." },
        ]
    },
    {
        id: "6",
        slug: "broad-vs-narrow-meta",
        category: "Scaling",
        tags: ['scaling', 'strategy'],
        title: "When to Go Broad vs. Narrow in Meta",
        excerpt: "The eternal targeting debate. Here's a framework for deciding based on your stage and goals.",
        image: caseStudy2,
        readTime: "9 min",
        date: "August 2023",
        author: "Alex Morgan",
        content: [
            { type: "paragraph", text: "One of the most common questions in Meta advertising is whether to use broad or narrow targeting. The answer, as with most things in marketing, is: it depends. But there's a clear framework for making this decision." },
            { type: "heading", text: "The Spending Threshold" },
            { type: "paragraph", text: "If you're spending less than $5,000/month on Meta, narrow targeting usually wins. You don't have enough data for Meta's algorithm to optimize broad campaigns effectively. As you scale past $10,000-$20,000/month, broad targeting becomes increasingly viable and often outperforms narrow approaches." },
            { type: "heading", text: "Creative is Your Targeting" },
            { type: "paragraph", text: "In the Advantage+ era, creative has become the primary targeting mechanism. Your creative acts as a filter — the right creative will attract the right audience even within a broad targeting setup. This means investing more in creative diversity and less in audience segmentation." },
        ]
    },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug);
}

export function getPostById(id: string): BlogPost | undefined {
    return blogPosts.find(post => post.id === id);
}
