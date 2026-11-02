"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function TeacherDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const teacherId = params.id as string;

  const [teacher, setTeacher] = useState<any | null>(null);
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/teachers/${teacherId}`);
        const data = await res.json();
        
        if (res.ok) {
          setTeacher(data.teacher);
          setClasses(data.classes);
        } else {
          toast.error("Failed to load teacher details");
          router.push("/admin/teachers");
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    if (teacherId) fetchDetails();
  }, [teacherId, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64 text-slate-400">Loading...</div>;
  }

  if (!teacher) return null;

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      
      {/* Back Button */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors w-fit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        Back to Teachers
      </button>

      {/* Profile Header Card */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-24 h-24 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-4xl border border-emerald-500/30">
          {teacher.name.charAt(0)}
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <h1 className="text-3xl font-bold text-white mb-2">{teacher.name}</h1>
          <p className="text-emerald-400 font-medium mb-4">{teacher.teacherDetails?.designation || "Teacher"}</p>
          
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2 bg-white/[0.05] px-3 py-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              {teacher.email}
            </div>
            {teacher.teacherDetails?.phone && (
              <div className="flex items-center gap-2 bg-white/[0.05] px-3 py-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {teacher.teacherDetails.phone}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Assigned Classes Section */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Assigned Classes</h2>
          <Link href="/admin/classes" className="text-sm text-violet-400 hover:text-violet-300">
            + Assign New Class
          </Link>
        </div>

        {classes.length === 0 ? (
          <div className="p-8 text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl text-slate-400">
            No classes assigned to this teacher yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((cls: any) => (
              <div key={cls._id} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{cls.subject}</h3>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                    Section {cls.section}
                  </span>
                </div>
                <p className="text-sm text-slate-400 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                  Semester {cls.semester}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}