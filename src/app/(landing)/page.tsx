import HomePage from "@/components/HomePage";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

export default function Page() {
  return (
    <div>
      <HomePage />
      <FeaturesSection />
      <StatsSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}