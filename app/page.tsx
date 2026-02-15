import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoIWorkWith from "@/components/home/WhoIWorkWith";
import GrowthPhilosophy from "@/components/home/GrowthPhilosophy";
import CaseStudySummaries from "@/components/home/CaseStudySummaries";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/Footer";
import { generatePageMetadata } from "@/lib/seo.config";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Lakshya - Growth Marketing Strategist",
  description: "Expert growth marketing strategist specializing in performance marketing, creative testing, and data-driven strategies for scaling DTC and B2B brands.",
  path: "/",
});

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <WhoIWorkWith />
        <GrowthPhilosophy />
        <CaseStudySummaries />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;