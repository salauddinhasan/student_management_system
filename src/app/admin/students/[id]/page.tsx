"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id as string;

  const [student, setStudent] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/students/${studentId}`);
        const data = await res.json();
        
        if (res.ok) {
          setStudent(data.student);
        } else {
          toast.error(data.error || "Failed to load student details");
          router.push("/admin/students");
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    if (studentId) fetchDetails();
  }, [studentId, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64 text-slate-400">Loading...</div>;
  }

  if (!student) return null;

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      
      {/* Back Button */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors w-fit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        Back to Students
      </button>

      {/* Profile Header Card */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-24 h-24 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-4xl border border-violet-500/30">
          {student.name.charAt(0)}
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <h1 className="text-3xl font-bold text-white mb-2">{student.name}</h1>
          <p className="text-violet-400 font-medium mb-4">Roll: {student.roll}</p>
          
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2 bg-white/[0.05] px-3 py-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              Semester {student.semester}
            </div>
            <div className="flex items-center gap-2 bg-white/[0.05] px-3 py-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              {student.department}
            </div>
          </div>
        </div>
      </div>

      {/* Attendance & Marks Placeholder (ভবিষ্যতে ডাইনামিক হবে) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        
        {/* Attendance Card */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] relative overflow-hidden group hover:border-violet-500/30 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10 transition-all" />
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h2 className="text-lg font-semibold text-white">Attendance Summary</h2>
            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 8"/></svg>
            </div>
          </div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-full border-4 border-violet-500/30 flex items-center justify-center font-bold text-2xl text-white">
              85%
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-sm text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Present: 102 Days
              </p>
              <p className="text-sm text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> Absent: 18 Days
              </p>
            </div>
          </div>
        </div>

        {/* Marks Card */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] relative overflow-hidden group hover:border-fuchsia-500/30 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 rounded-full blur-2xl group-hover:bg-fuchsia-500/10 transition-all" />
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h2 className="text-lg font-semibold text-white">Recent Marks</h2>
            <div className="p-2 bg-fuchsia-500/10 rounded-lg text-fuchsia-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </div>
          </div>
          <div className="flex items-center justify-center h-20 relative z-10">
            <p className="text-sm text-slate-500 italic">No marks have been added yet.</p>
          </div>
        </div>

      </div>
    </div>
  );
}