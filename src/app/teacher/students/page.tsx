"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

function StudentsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const classId = searchParams.get("classId");

  const [classData, setClassData] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!classId) {
      toast.error("No class selected");
      router.push("/teacher");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/teacher-attendance?classId=${classId}`);
        const data = await res.json();

        if (res.ok) {
          setClassData(data.classData);
          setStudents(data.students);
        } else {
          toast.error(data.error || "Failed to load data");
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [classId, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-300 text-lg">
        Loading students...
      </div>
    );
  }

  if (!classData) return null;

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
      
      {/* হেডার */}
      <div className="bg-white/[0.02] border border-white/[0.06] p-6 rounded-2xl">
        <h1 className="text-2xl font-bold text-white mb-2">My Students</h1>
        <div className="flex items-center gap-2 text-sm font-medium text-violet-400 bg-violet-500/10 px-3 py-1.5 rounded-lg w-fit border border-violet-500/20">
          {classData.subject} (Sem {classData.semester}, Sec {classData.section})
        </div>
      </div>

      {/* স্টুডেন্ট লিস্ট (অ্যাডমিনের মতো ডিজাইন) */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400 min-w-[600px]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/[0.06] text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Roll Number</th>
                <th className="px-6 py-4 font-medium">Semester</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500">
                    No students found in this semester.
                  </td>
                </tr>
              ) : (
                students.map((student: any) => (
                  <tr key={student._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-xs">
                        {student.name.charAt(0)}
                      </div>
                      <span className="text-white font-medium">{student.name}</span>
                    </td>
                    <td className="px-6 py-4">{student.roll}</td>
                    <td className="px-6 py-4">{student.semester}</td>
                    <td className="px-6 py-4 text-right">
                      
                      {/* View Profile বাটন - অ্যাডমিনের পেজে নিয়ে যাবে */}
                      <button 
                        onClick={() => router.push(`/admin/students/${student._id}`)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/[0.05] hover:bg-white/[0.1] rounded-md transition-colors ml-auto"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        View Profile
                      </button>
                      
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function StudentsPage() {
  return (
    <Suspense fallback={<div className="text-center text-slate-400 py-10 text-lg">Loading...</div>}>
      <StudentsContent />
    </Suspense>
  );
}