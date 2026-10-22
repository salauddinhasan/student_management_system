export default function StatsSection() {
  const stats = [
    { value: "500+", label: "Active Students" },
    { value: "20+", label: "Expert Teachers" },
    { value: "1000+", label: "Classes Managed" },
    { value: "99.9%", label: "System Uptime" },
  ];

  return (
    <section className="py-24 relative z-10">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* নতুন হেডিং সেকশন */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Trusted by the Department
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            See how our system is helping students and teachers manage their daily academic activities.
          </p>
        </div>

        {/* কার্ড গ্রিড */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-violet-500/50 transition-all duration-500 group"
            >
              {/* Inner Card */}
              <div className="h-full bg-white/[0.02] rounded-2xl p-8 md:p-10 flex flex-col items-center justify-center text-center backdrop-blur-md group-hover:bg-white/[0.04] transition-colors duration-500">
                
                {/* Value */}
                <p className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight group-hover:text-violet-400 transition-colors">
                  {stat.value}
                </p>

                {/* Label */}
                <p className="text-sm text-slate-400 font-medium tracking-wide">
                  {stat.label}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}