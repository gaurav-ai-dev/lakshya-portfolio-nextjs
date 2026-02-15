import Process_1 from "@/components/Process_1";
import { generatePageMetadata } from "@/lib/seo.config";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
    title: "Process - Strategic Growth Marketing Approach",
    description: "Learn about my proven process for developing and executing data-driven growth marketing strategies that deliver measurable results.",
    path: "/process",
});

const ProcessPage = () => {


    return (
        <Process_1 />
    );
};

export default ProcessPage;
