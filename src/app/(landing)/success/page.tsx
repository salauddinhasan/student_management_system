import Link from "next/link";

const stats = [
  { label: "Active Students", value: "1,200+" },
  { label: "Expert Teachers", value: "50+" },
  { label: "Classes Managed", value: "300+" },
  { label: "Time Saved", value: "80%" },
];

const testimonials = [
  {
    quote: "Managing attendance used to take 15 minutes of my class time. Now it takes 2 minutes. I can focus on teaching.",
    name: "Rahim Sir",
    role: "Instructor, CSE",
  },
  {
    quote: "I can check my attendance and marks anytime. No more waiting for notice boards.",
    name: "Rahul Ahmed",
    role: "Student, 3rd Semester",
  }
];

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white py-32 px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Success <span className="text-violet-500">Stories</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            See how StudentMS is making a difference in the CSE department.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <p className="text-3xl font-bold text-violet-400 mb-2">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <p className="text-slate-300 italic mb-6 leading-relaxed">{t.quote}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}