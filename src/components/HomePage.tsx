 import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-white relative overflow-hidden flex flex-col justify-center">
      
      {/* Background Glow & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-32 text-center">
        
        {/* Badge */}
        <div className="animate-fade-in-up inline-block mb-8 px-4 py-1.5 text-sm font-medium rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 backdrop-blur-sm">
          CSE Department
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up delay-100 text-6xl md:text-7xl font-bold mb-8 tracking-tight leading-[1.1]">
          Student Management
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            System
          </span>
        </h1>

        {/* Description */}
        <p className="animate-fade-in-up delay-200 text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          A simple digital system for teachers and students. Attendance and
          marks management made easy.
        </p>

        {/* Buttons */}
        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-200 hover:scale-105 transition-all duration-300 text-base shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300 text-base backdrop-blur-sm"
          >
            Learn More
          </Link>
        </div>

      </section>
    </div>
  );
};

export default HomePage;