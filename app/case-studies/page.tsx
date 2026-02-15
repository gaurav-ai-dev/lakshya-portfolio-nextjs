import CaseStudies_1 from "@/components/CaseStudies_1";
import { generatePageMetadata } from "@/lib/seo.config";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
    title: "Case Studies - Proven Growth Marketing Results",
    description: "Explore real-world case studies showcasing data-driven growth marketing strategies and measurable results for DTC and B2B brands.",
    path: "/case-studies",
});

const CaseStudiesPage = () => {
    return (
        <CaseStudies_1 />
    );
};

export default CaseStudiesPage;
