import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0f0a1f] text-white relative overflow-hidden">
      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-8 py-40 text-center">
        <div className="animate-fade-in-up inline-block mb-8 px-4 py-1.5 text-sm font-medium rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
          CSE Department
        </div>

        <h1 className="animate-fade-in-up delay-100 text-6xl md:text-7xl font-bold mb-8 tracking-tight leading-[1.1]">
          Student Management
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            System
          </span>
        </h1>

        <p className="animate-fade-in-up delay-200 text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          A simple digital system for teachers and students. Attendance and
          marks management made easy.
        </p>

        <div className="animate-fade-in-up delay-300">
          <Link
            href="/login"
            className="inline-block px-10 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-200 hover:scale-105 transition-all duration-300 text-base shadow-lg shadow-violet-500/20"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
