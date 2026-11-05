"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

function AttendanceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const classId = searchParams.get("classId");

  const [classData, setClassData] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

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
          const formattedStudents = data.students.map((s: any) => ({
            ...s,
            status: "Present",
          }));
          setStudents(formattedStudents);
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

  const toggleStatus = (id: string) => {
    setStudents(
      students.map((s) =>
        s._id === id
          ? { ...s, status: s.status === "Present" ? "Absent" : "Present" }
          : s
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/teacher-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId,
          date,
          attendanceData: students.map((s) => ({
            studentId: s._id,
            status: s.status,
          })),
        }),
      });

      if (res.ok) {
        toast.success("Attendance submitted successfully!");
        router.push("/teacher");
      } else {
        toast.error("Failed to submit attendance");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-300 text-lg">
        Loading students...
      </div>
    );
  }

  if (!classData) return null;

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02] border border-white/[0.06] p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Take Attendance</h1>
          <div className="flex items-center gap-2 text-sm font-medium text-violet-400 bg-violet-500/10 px-3 py-1.5 rounded-lg w-fit border border-violet-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            {classData.subject} (Sem {classData.semester}, Sec {classData.section})
          </div>
        </div>
        
        {/* Date Picker */}
        <div className="flex items-center gap-3 bg-black/40 border border-white/10 px-4 py-2.5 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent text-white text-base font-medium focus:outline-none [color-scheme:dark]"
          />
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden shadow-xl">
        {students.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-lg">
            No students found for this semester.
          </div>
        ) : (
          <div className="divide-y divide-white/[0.06]">
            {students.map((student) => (
              <div
                key={student._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-white/[0.03] transition-colors gap-4"
              >
                {/* Student Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-lg border border-violet-500/30">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">{student.name}</p>
                    <p className="text-sm text-slate-400 font-medium mt-0.5">Roll: {student.roll}</p>
                  </div>
                </div>

                {/* Status Toggle Button */}
                <button
                  onClick={() => toggleStatus(student._id)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border flex items-center gap-2 ${
                    student.status === "Present"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20"
                  }`}
                >
                  {student.status === "Present" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  )}
                  {student.status}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-2">
        <button
          onClick={handleSubmit}
          disabled={isSaving || students.length === 0}
          className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white px-10 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg shadow-violet-600/30 flex items-center gap-2"
        >
          {isSaving ? (
             "Saving..."
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              Submit Attendance
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function AttendancePage() {
  return (
    <Suspense fallback={<div className="text-center text-slate-400 py-10 text-lg">Loading...</div>}>
      <AttendanceContent />
    </Suspense>
  );
}