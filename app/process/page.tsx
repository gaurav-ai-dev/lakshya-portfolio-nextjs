import type { Metadata } from "next";
import Process_1 from "@/components/Process_1";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "My SEO Process | How I Deliver Organic ROI | Lakshya Pareek",
        description:
            "Discover the proven SEO process Lakshya Pareek uses to audit, strategize, and execute campaigns that deliver measurable organic ROI for USA businesses.",
        keywords: [
            "SEO Process",
            "SEO Strategy USA",
            "Organic ROI Growth",
            "SEO Campaign Management",
            "Freelance SEO Workflow",
        ],
        alternates: { canonical: "https://seofreelancerusa.com/process" },
        openGraph: {
            type: "website",
            url: "https://seofreelancerusa.com/process",
            title: "My SEO Process | Lakshya Pareek",
            description:
                "A proven SEO process: audit → strategy → execution → reporting for measurable organic growth.",
            siteName: "Lakshya Pareek",
            images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SEO Process by Lakshya Pareek" }],
        },
        twitter: {
            card: "summary_large_image",
            title: "My SEO Process | Lakshya Pareek",
            description: "How Lakshya Pareek audits, strategizes, and delivers organic ROI for USA businesses.",
            images: ["/og-image.jpg"],
        },
    };
}

const ProcessPage = () => {


    return (
        <Process_1 />
    );
};

export default ProcessPage;
