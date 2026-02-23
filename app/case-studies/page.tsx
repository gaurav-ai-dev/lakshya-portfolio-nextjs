import type { Metadata } from "next";
import CaseStudies_1 from "@/components/CaseStudies_1";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "SEO Case Studies | Proven Organic Growth Results | Lakshya Pareek",
        description:
            "See real SEO results — explore case studies from Lakshya Pareek showing measurable organic traffic growth, improved rankings, and ROI for USA clients.",
        keywords: [
            "SEO Case Studies",
            "Organic Traffic Growth",
            "SEO Results USA",
            "Freelance SEO Success Stories",
            "Ranking Improvement",
        ],
        alternates: { canonical: "https://seofreelancerusa.com/case-studies" },
        openGraph: {
            type: "website",
            url: "https://seofreelancerusa.com/case-studies",
            title: "SEO Case Studies | Proven Organic Growth Results | Lakshya Pareek",
            description:
                "Real SEO results — organic traffic growth, improved rankings, and measurable ROI for USA clients.",
            siteName: "Lakshya Pareek",
            images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SEO Case Studies by Lakshya Pareek" }],
        },
        twitter: {
            card: "summary_large_image",
            title: "SEO Case Studies | Lakshya Pareek",
            description: "Proven organic growth results for USA clients — see the numbers.",
            images: ["/og-image.jpg"],
        },
    };
}

const CaseStudiesPage = () => {
    return (
        <CaseStudies_1 />
    );
};

export default CaseStudiesPage;
