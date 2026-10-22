import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";

export default function Page() {
  return (
    <div>
      <HomePage />
      <FeaturesSection />
      <StatsSection/>
      <HowItWorksSection/>
      <CTASection/>
      <Footer />
    </div>
  );
}
