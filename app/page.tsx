import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoIWorkWith from "@/components/home/WhoIWorkWith";
import GrowthPhilosophy from "@/components/home/GrowthPhilosophy";
import CaseStudySummaries from "@/components/home/CaseStudySummaries";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/home/CTASection";
import TrustedTools from "@/components/home/TrustedTools";
import SEOServices from "@/components/home/SEOServices";
import CoreServices from "@/components/home/CoreServices";
import SEOProcess from "@/components/home/SEOProcess";
import Footer from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Expert SEO Freelancer in USA | 8+ Yrs Experience | Lakshya Pareek",
    description:
      "Hire Lakshya Pareek, a senior Freelance SEO Consultant in the USA. Specializing in Technical SEO, White-Hat Link Building, and Organic ROI Growth. Get a free audit!",
    keywords: [
      "SEO Freelancer USA",
      "Freelance SEO Services",
      "SEO Consultant USA",
      "Technical SEO Expert",
    ],
    alternates: { canonical: "https://seofreelancerusa.com" },
    openGraph: {
      type: "website",
      url: "https://seofreelancerusa.com",
      title: "Expert SEO Freelancer in USA | 8+ Yrs Experience | Lakshya Pareek",
      description:
        "Hire Lakshya Pareek, a senior Freelance SEO Consultant in the USA. Specializing in Technical SEO, White-Hat Link Building, and Organic ROI Growth. Get a free audit!",
      siteName: "Lakshya Pareek",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Lakshya Pareek – SEO Freelancer USA" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Expert SEO Freelancer in USA | Lakshya Pareek",
      description:
        "Senior Freelance SEO Consultant specializing in Technical SEO & Organic ROI Growth. Get a free audit!",
      images: ["/og-image.jpg"],
    },
  };
}

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TrustedTools />
        <SEOServices />
        <CoreServices />
        <SEOProcess />
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