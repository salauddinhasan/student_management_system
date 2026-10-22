import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import StatsSection from "@/components/StatsSection";

export default function Page() {
  return (
    <div>
      <HomePage />
      <FeaturesSection />
      <StatsSection/>
      <Footer />
    </div>
  );
}
