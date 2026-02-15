import Insights_1 from "@/components/Insights_1";
import { generatePageMetadata } from "@/lib/seo.config";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
    title: "Insights - Growth Marketing Thoughts & Strategies",
    description: "Deep dives into growth marketing strategy, tactics, and the evolving landscape of performance marketing. Learn from real-world experience.",
    path: "/insights",
});
const InsightsPage = () => {

    return (
        <Insights_1 />
    );
};

export default InsightsPage;
