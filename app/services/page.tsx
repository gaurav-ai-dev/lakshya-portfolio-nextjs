import type { Metadata } from "next";
import Services_1 from "@/components/Services_1";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "SEO Services | Technical SEO, Link Building & Audits | Lakshya Pareek",
        description:
            "Explore Lakshya Pareek's freelance SEO services — Technical SEO audits, White-Hat Link Building, On-Page Optimization, and Organic Growth strategies for USA businesses.",
        keywords: [
            "Technical SEO Services",
            "White-Hat Link Building",
            "SEO Audit USA",
            "On-Page SEO",
            "Freelance SEO Services",
        ],
        alternates: { canonical: "https://seofreelancerusa.com/services" },
        openGraph: {
            type: "website",
            url: "https://seofreelancerusa.com/services",
            title: "SEO Services | Technical SEO, Link Building & Audits | Lakshya Pareek",
            description:
                "Technical SEO audits, White-Hat Link Building, On-Page Optimization & Organic Growth strategies.",
            siteName: "Lakshya Pareek",
            images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SEO Services by Lakshya Pareek" }],
        },
        twitter: {
            card: "summary_large_image",
            title: "SEO Services | Lakshya Pareek",
            description: "Technical SEO, Link Building, and On-Page Optimization for USA businesses.",
            images: ["/og-image.jpg"],
        },
    };
}

const ServicesPage = () => {


    return (
        <Services_1 />
    );
};

export default ServicesPage;
