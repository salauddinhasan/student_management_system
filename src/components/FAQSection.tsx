 "use client";

import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I get an account?",
      answer: "There is no public registration. Only the department admin can create accounts for teachers and students. Once created, you will receive your login credentials.",
    },
    {
      question: "Can students edit their marks or attendance?",
      answer: "No. Students have view-only access. They can check their attendance percentage and marks, but only teachers have the permission to edit them.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use secure authentication and role-based access control to ensure that only authorized personnel can access sensitive data.",
    },
    {
      question: "What should I do if I forget my password?",
      answer: "Please contact your department admin. They can reset your password from their dashboard and provide you with a new temporary one.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-3xl mx-auto px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need to know about the system.
          </p>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen ? "bg-white/[0.04] border-violet-500/30" : "bg-white/[0.02] border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-white pr-4">
                    {faq.question}
                  </span>
                  <span className={`text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                
                {/* Answer (Animated Height) */}
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}