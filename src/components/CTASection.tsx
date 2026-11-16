import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* CTA Box */}
        <div className="relative overflow-hidden rounded-3xl bg-white/[0.03] border border-white/[0.08] p-12 md:p-20 text-center shadow-sm">

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to upgrade your department?
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
              Join hundreds of students and teachers managing their daily academic tasks effortlessly. Start your journey with StudentMS today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="px-8 py-3.5 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-200 hover:scale-105 transition-all duration-300 text-base shadow-lg"
              >
                Get Started Now
              </Link>
              <Link
                href="/about"
                className="px-8 py-3.5 bg-white/5 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 text-base"
              >
                Learn More
              </Link>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}