 export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Login to your account",
      description: "Use the credentials provided by the admin. Secure, fast, and hassle-free.",
    },
    {
      step: "02",
      title: "Access your dashboard",
      description: "Teachers see classes and marks. Students see attendance and results.",
    },
    {
      step: "03",
      title: "Manage effortlessly",
      description: "Update attendance, entry marks, and track academic progress in real-time.",
    },
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            How it works
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Get started in three simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-12 relative">
          
          {steps.map((item, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              
              {/* Connector Line & Arrow (Desktop Only) */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-[2px] z-0">
                  {/* Dashed Line */}
                  <div className="w-[80%] h-full border-t-2 border-dashed border-white/10 group-hover:border-violet-500/30 transition-colors duration-500" />
                  {/* Arrow */}
                  <div className="absolute right-[20%] -top-[7px] text-white/20 group-hover:text-violet-500/50 transition-colors duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              )}

              {/* Step Number Circle */}
              <div className="w-20 h-20 rounded-full bg-[#09090b] border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:border-violet-500/50 group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <span className="text-xl font-bold text-slate-300 group-hover:text-violet-400 transition-colors">
                  {item.step}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[250px]">
                {item.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}