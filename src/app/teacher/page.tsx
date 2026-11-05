"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // এখানে আমরা শুধু ওই শিক্ষকের ক্লাসগুলো আনব
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
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-fuchsia-500/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{cls.subject}</h2>
                <span className="px-2.5 py-1 rounded-md bg-fuchsia-500/10 text-fuchsia-400 text-xs font-medium border border-fuchsia-500/20">
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
              <div className="flex gap-3">
                <Link
  href={`/teacher/attendance?classId=${cls._id}`}
  className="flex-1 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors text-center block"
>
  Take Attendance
</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
