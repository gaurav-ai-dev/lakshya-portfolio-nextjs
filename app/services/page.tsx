import Services_1 from "@/components/Services_1";
import { generatePageMetadata } from "@/lib/seo.config";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
    title: "Services - Growth Marketing Solutions",
    description: "Comprehensive growth marketing services including performance marketing, creative testing, attribution modeling, and strategic consulting.",
    path: "/services",
});

const ServicesPage = () => {


    return (
        <Services_1 />
    );
};

export default ServicesPage;
