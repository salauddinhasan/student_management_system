"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
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
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        Loading profile...
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-10">
      
      {/* Back Button */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors w-fit group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
        Back to Students
      </button>

      {/* Profile Header Card (Premium Design) */}
      <div className="relative bg-[#09090b] border border-white/[0.06] rounded-3xl p-8 md:p-10 overflow-hidden shadow-2xl">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-300 flex items-center justify-center font-bold text-6xl border-2 border-violet-500/30 shadow-xl shadow-violet-500/10">
            {student.name.charAt(0)}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-3">
              <h1 className="text-4xl font-bold text-white tracking-tight">{student.name}</h1>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider">
                Active
              </span>
            </div>
            
            <p className="text-lg text-slate-400 mb-6 flex items-center justify-center md:justify-start gap-2">
              <span className="font-medium text-slate-300">Roll:</span> {student.roll}
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.1] px-4 py-2 rounded-xl text-sm text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                Semester {student.semester}
              </div>
              <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.1] px-4 py-2 rounded-xl text-sm text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                {student.department}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Attendance Card */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 hover:border-violet-500/30 transition-all group relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10 transition-all" />
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h2 className="text-lg font-semibold text-white">Attendance</h2>
            <div className="p-2 bg-violet-500/10 rounded-xl text-violet-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 8"/></svg>
            </div>
          </div>
          
          <div className="flex items-end gap-2 relative z-10 mb-4">
            <span className="text-5xl font-bold text-white">85<span className="text-2xl text-slate-400">%</span></span>
            <span className="text-sm text-emerald-400 font-medium mb-1.5 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m18 15-6-6-6 6"/></svg>
              Good
            </span>
          </div>
          <p className="text-sm text-slate-400 relative z-10">Present: 102 days | Absent: 18 days</p>
        </div>

        {/* Marks Card */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 hover:border-fuchsia-500/30 transition-all group relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-fuchsia-500/5 rounded-full blur-2xl group-hover:bg-fuchsia-500/10 transition-all" />
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h2 className="text-lg font-semibold text-white">Average Marks</h2>
            <div className="p-2 bg-fuchsia-500/10 rounded-xl text-fuchsia-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </div>
          </div>
          
          <div className="flex items-end gap-2 relative z-10 mb-4">
            <span className="text-5xl font-bold text-white">78<span className="text-2xl text-slate-400">/100</span></span>
          </div>
          <p className="text-sm text-slate-400 relative z-10">Based on Midterm & Final exams.</p>
        </div>

        {/* Quick Action Card */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h2 className="text-lg font-semibold text-white">Actions</h2>
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 relative z-10">
             <button className="w-full py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-white rounded-xl text-sm font-medium transition-colors border border-white/[0.06]">
               Edit Student Info
             </button>
             <button className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-medium transition-colors border border-red-500/20">
               Delete Student
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}