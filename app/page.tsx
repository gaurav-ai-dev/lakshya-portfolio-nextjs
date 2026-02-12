import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoIWorkWith from "@/components/home/WhoIWorkWith";
import GrowthPhilosophy from "@/components/home/GrowthPhilosophy";
import CaseStudySummaries from "@/components/home/CaseStudySummaries";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/Footer";

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