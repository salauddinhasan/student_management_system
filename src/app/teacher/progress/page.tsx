"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ProgressContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialClassId = searchParams.get("classId");

  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState(initialClassId || "");
  const [progressData, setProgressData] = useState<any[]>([]);
  const [classInfo, setClassInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // শিক্ষকের ক্লাসের লিস্ট আনা (ফিল্টার ড্রপডাউনের জন্য)
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("/api/teacher-classes");
        const data = await res.json();
        if (res.ok) {
          setClasses(data.classes || []);
          if (!initialClassId && data.classes.length > 0) {
            setSelectedClass(data.classes[0]._id);
          }
        }
      } catch (error) {
        toast.error("Failed to load classes");
      }
    };
    fetchClasses();
  }, [initialClassId]);

  // ক্লাস সিলেক্ট করলে ডাটা আনা
  useEffect(() => {
    if (!selectedClass) return;

    const fetchProgress = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/teacher-class-progress?classId=${selectedClass}`);
        const data = await res.json();
        if (res.ok) {
          setClassInfo(data.classData);
          setProgressData(data.progressData);
        } else {
          toast.error(data.error);
        }
      } catch (error) {
        toast.error("Failed to load progress data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [selectedClass]);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      
      {/* হেডার ও ফিল্টার */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Student Progress Report</h1>
          <p className="text-slate-400 text-sm mt-1">Track attendance and marks for each student.</p>
        </div>
        
        {/* Class Filter Dropdown */}
        <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] px-4 py-2.5 rounded-xl">
          <span className="text-sm font-medium text-slate-400">Filter by Class:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer"
          >
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id} className="bg-[#121214]">
                {cls.subject} (Sem {cls.semester})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* টেবিল */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400 min-w-[600px]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/[0.06] text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Student Name</th>
                <th className="px-6 py-4 font-medium">Roll Number</th>
                <th className="px-6 py-4 font-medium">Attendance %</th>
                <th className="px-6 py-4 font-medium text-right">Average Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500">Loading data...</td>
                </tr>
              ) : progressData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500">
                    No students found for this class.
                  </td>
                </tr>
              ) : (
                progressData.map((student: any) => (
                  <tr key={student._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-xs">
                        {student.name.charAt(0)}
                      </div>
                      <span className="text-slate-200 font-medium">{student.name}</span>
                    </td>
                    <td className="px-6 py-4">{student.roll}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-white/[0.05] rounded-full h-2 max-w-[80px]">
                          <div 
                            className={`h-2 rounded-full ${student.attendancePercentage >= 75 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                            style={{ width: `${student.attendancePercentage}%` }}
                          ></div>
                        </div>
                        <span className={`font-medium ${student.attendancePercentage >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {student.attendancePercentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {student.avgMarks > 0 ? (
                        <span className="text-lg font-bold text-fuchsia-400">{student.avgMarks} <span className="text-xs text-slate-500 font-normal">/100</span></span>
                      ) : (
                        <span className="text-sm text-slate-500 italic">No marks</span>
                      )}
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

export default function ProgressPage() {
  return (
    <Suspense fallback={<div className="text-center text-slate-400 py-10 text-lg">Loading...</div>}>
      <ProgressContent />
    </Suspense>
  );
}