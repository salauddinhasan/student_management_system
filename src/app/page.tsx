import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import HowItWorksSection from "@/components/HowItWorksSection";
import Navbar from "@/components/Navbar";
 
import StatsSection from "@/components/StatsSection";

export default function Page() {
  return (
    <div>
     <Navbar />
      <HomePage />
      <FeaturesSection />
      <StatsSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
