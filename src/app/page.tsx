import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";

<<<<<<< Updated upstream
export default function Page() {
  return (
    <div>
      <HomePage />
      <FeaturesSection />
      <StatsSection/>
      <HowItWorksSection/>
      <FAQSection/>
      <CTASection/>
      <Footer />
    </div>
=======
export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="max-w-xl rounded-2xl bg-white p-8 shadow-lg">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Student Management System
        </p>
        <h1 className="text-3xl font-bold text-slate-800">Welcome</h1>
        <p className="mt-4 text-slate-600">
          The app is running successfully. Use the login page to continue.
        </p>
      </div>
    </main>
>>>>>>> Stashed changes
  );
}
