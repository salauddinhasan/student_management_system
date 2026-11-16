"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(`/api/teacher-classes`);
        const data = await res.json();
        if (res.ok) {
          setClasses(data.classes || []);
        }
      } catch (error) {
        toast.error("Failed to load classes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-10">
      
      {/* ================= ১. প্রোফাইল হেডার ================= */}
      <div className="p-8 md:p-10 gap-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.16] transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 w-24 h-24 rounded-full bg-white/[0.08] text-slate-200 flex items-center justify-center font-bold text-4xl border-2 border-white/[0.12] shrink-0">
          {user?.name?.charAt(0) || "T"}
        </div>

        <div className="relative z-10 text-center md:text-left mt-2 flex-1">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Welcome back, {user?.name || "Teacher"}!
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto md:mx-0 mb-6">
            Manage your classes, take attendance, and update marks seamlessly. 
            You have <span className="font-bold text-violet-400">{classes.length} classes</span> assigned this semester.
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.1] px-4 py-2 rounded-xl text-sm text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.1] px-4 py-2 rounded-xl text-sm text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              CSE Department
            </div>
          </div>
        </div>
      </div>

      {/* ================= ২. কুইক অ্যাকশনস (৩টি কার্ড) ================= */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Attendance Action with Dropdown */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.16] transition-all group relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-all" />
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center mb-4 border border-violet-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Take Attendance</h3>
            <select 
              onChange={(e) => {
                if(e.target.value) router.push(`/teacher/attendance?classId=${e.target.value}`);
              }}
              className="w-full px-3 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500 cursor-pointer"
            >
              <option value="">Select a class...</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.subject} (Sem {cls.semester})
                </option>
              ))}
            </select>
          </div>

          {/* Marks Action with Dropdown */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.16] transition-all group relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl group-hover:bg-fuchsia-500/20 transition-all" />
            <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center mb-4 border border-fuchsia-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Submit Marks</h3>
            <select 
              onChange={(e) => {
                if(e.target.value) router.push(`/teacher/marks?classId=${e.target.value}`);
              }}
              className="w-full px-3 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-fuchsia-500 cursor-pointer"
            >
              <option value="">Select a class...</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.subject} (Sem {cls.semester})
                </option>
              ))}
            </select>
          </div>

          {/* Progress Report (এটা আগের মতোই কাজ করবে) */}
          <div 
            onClick={() => router.push('/teacher/progress')}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.16] transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Progress Report</h3>
            <p className="text-sm text-slate-400">View attendance & marks summary</p>
          </div>

        </div>
      </div>

      {/* ================= ৩. ক্লাসের লিস্ট ================= */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Your Assigned Classes</h2>
        </div>

        {isLoading ? (
          <div className="text-slate-400 p-6">Loading classes...</div>
        ) : classes.length === 0 ? (
          <div className="p-8 text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl text-slate-400">
            No classes assigned to you yet. Please contact the admin.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls: any) => (
              <div
                key={cls._id}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300 group relative overflow-hidden flex flex-col"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10 transition-all" />

                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">{cls.subject}</h2>
                    <p className="text-sm text-slate-400 flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                      Semester {cls.semester}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-violet-500/10 text-violet-400 text-xs font-bold border border-violet-500/20">
                    Sec {cls.section}
                  </span>
                </div>
                
                <div className="relative z-10 flex flex-col gap-3 mt-auto pt-6">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => router.push(`/teacher/attendance?classId=${cls._id}`)}
                      className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2"
                    >
                      Attendance
                    </button>
                    <button
                      onClick={() => router.push(`/teacher/marks?classId=${cls._id}`)}
                      className="w-full py-2.5 bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      Marks
                    </button>
                  </div>
                  <button
                    onClick={() => router.push(`/teacher/students?classId=${cls._id}`)}
                    className="w-full py-2.5 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] text-slate-300 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    View Students
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}