import type { Metadata } from "next";
import About_1 from "@/components/About_1";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "About Lakshya Pareek | Senior SEO Consultant in USA",
        description:
            "Meet Lakshya Pareek — 8+ years of hands-on SEO experience helping businesses grow organically. Technical SEO, link building, and data-driven strategy.",
        keywords: ["Lakshya Pareek", "SEO Consultant USA", "About SEO Expert", "Freelance SEO Specialist"],
        alternates: { canonical: "https://seofreelancerusa.com/about" },
        openGraph: {
            type: "website",
            url: "https://seofreelancerusa.com/about",
            title: "About Lakshya Pareek | Senior SEO Consultant in USA",
            description:
                "Meet Lakshya Pareek — 8+ years of hands-on SEO experience helping businesses grow organically.",
            siteName: "Lakshya Pareek",
            images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "About Lakshya Pareek" }],
        },
        twitter: {
            card: "summary_large_image",
            title: "About Lakshya Pareek | Senior SEO Consultant in USA",
            description: "8+ years of SEO expertise — Technical SEO, link building & organic growth.",
            images: ["/og-image.jpg"],
        },
    };
}
const AboutPage = () => {


    return (
        <About_1 />
    );
};

export default AboutPage