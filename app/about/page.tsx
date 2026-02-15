import About_1 from "@/components/About_1";
import { generatePageMetadata } from "@/lib/seo.config";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
    title: "About - Growth Marketing Expertise",
    description: "Learn about my approach to growth marketing, performance optimization, and data-driven strategies that help brands scale efficiently.",
    path: "/about",
});
const AboutPage = () => {


    return (
        <About_1 />
    );
};

export default AboutPage