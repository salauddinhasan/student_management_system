"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import Link from "next/link";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(`/api/teacher-classes`);
        const data = await res.json();
        if (res.ok) {
          setClasses(data.classes);
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
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      
      {/* হেডার */}
      <div>
        <h1 className="text-2xl font-bold text-white">My Classes</h1>
        <p className="text-slate-400 text-sm mt-1">
          Here are the classes assigned to you.
        </p>
      </div>

      {isLoading ? (
        <div className="text-slate-400">Loading classes...</div>
      ) : classes.length === 0 ? (
        <div className="p-8 text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl text-slate-400">
          No classes assigned to you yet. Please contact the admin.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls: any) => (
            <div
              key={cls._id}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{cls.subject}</h2>
                <span className="px-2.5 py-1 rounded-md bg-violet-500/10 text-violet-400 text-xs font-medium border border-violet-500/20">
                  Sec {cls.section}
                </span>
              </div>
              <p className="text-sm text-slate-400 flex items-center gap-2 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
                Semester {cls.semester}
              </p>
              
              {/* বাটনগুলো এখানে */}
              <div className="flex flex-col gap-3">
                <Link
                  href={`/teacher/attendance?classId=${cls._id}`}
                  className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors text-center flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 8"/></svg>
                  Take Attendance
                </Link>

                <Link
                  href={`/teacher/marks?classId=${cls._id}`}
                  className="w-full py-2.5 bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] text-white rounded-lg text-sm font-medium transition-colors text-center flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                  Give Marks
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}