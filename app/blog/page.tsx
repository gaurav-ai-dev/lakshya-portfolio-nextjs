import type { Metadata } from "next";
import Insights_1 from "@/components/Insights_1";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "SEO Blog & Insights | Tips from a Freelance SEO Expert | Lakshya Pareek",
        description:
            "Read expert SEO insights, technical guides, and organic growth strategies from Lakshya Pareek — a senior freelance SEO consultant with 8+ years of experience in the USA.",
        keywords: [
            "SEO Blog",
            "SEO Tips USA",
            "Technical SEO Guide",
            "Organic Growth Strategies",
            "Freelance SEO Insights",
        ],
        alternates: { canonical: "https://seofreelancerusa.com/blog" },
        openGraph: {
            type: "website",
            url: "https://seofreelancerusa.com/blog",
            title: "SEO Blog & Insights | Lakshya Pareek",
            description:
                "Expert SEO guides, technical tips, and organic growth strategies from a senior SEO consultant.",
            siteName: "Lakshya Pareek",
            images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SEO Blog by Lakshya Pareek" }],
        },
        twitter: {
            card: "summary_large_image",
            title: "SEO Blog & Insights | Lakshya Pareek",
            description: "Expert SEO tips and organic growth strategies from Lakshya Pareek.",
            images: ["/og-image.jpg"],
        },
    };
}
const InsightsPage = () => {

    return (
        <Insights_1 />
    );
};

export default InsightsPage;
