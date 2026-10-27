import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white py-32 px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            About <span className="text-violet-500">StudentMS</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We are on a mission to modernize the CSE department by providing a 
            seamless, digital-first platform for teachers and students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <h2 className="text-xl font-semibold mb-4 text-white">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed text-sm">
              To eliminate the manual, time-consuming processes of managing attendance 
              and marks. We aim to empower teachers with tools that save time, and 
              provide students with instant access to their academic progress.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <h2 className="text-xl font-semibold mb-4 text-white">Why Digital?</h2>
            <p className="text-slate-400 leading-relaxed text-sm">
              No more lost paper sheets or delayed results. Our system ensures data 
              accuracy, transparency, and quick access. It bridges the gap between 
              educators and learners in the most efficient way possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}