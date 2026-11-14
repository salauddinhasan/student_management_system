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
  const [isLoading, setIsLoading] = useState(false);

  // এডিট মডাল স্টেট
  const [editStudent, setEditStudent] = useState<any>(null);
  const [editMarks, setEditMarks] = useState<any>({ "Quiz 1": "", "Quiz 2": "", "Midterm": "", "Final": "" });
  const [isSaving, setIsSaving] = useState(false);

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

  const fetchProgress = async () => {
    if (!selectedClass) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/teacher-class-progress?classId=${selectedClass}`);
      const data = await res.json();
      if (res.ok) {
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

  useEffect(() => {
    fetchProgress();
  }, [selectedClass]);

  // এডিট মডাল ওপেন করা
  const handleEditClick = async (student: any) => {
    setEditStudent(student);
    try {
      const res = await fetch(`/api/update-marks?studentId=${student._id}&classId=${selectedClass}`);
      const data = await res.json();
      if (res.ok) {
        setEditMarks(data.marks);
      } else {
        toast.error("Failed to load marks");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // মার্কস আপডেট সেভ করা
  const handleSaveMarks = async () => {
    if (!editStudent) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/update-marks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: editStudent._id,
          classId: selectedClass,
          marks: editMarks
        }),
      });

      if (res.ok) {
        toast.success("Marks updated successfully!");
        setEditStudent(null); // মডাল বন্ধ
        fetchProgress(); // টেবিল রিফ্রেশ
      } else {
        toast.error("Failed to update marks");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Student Progress Report</h1>
          <p className="text-slate-400 text-sm mt-1">Track attendance and marks for each student.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] px-4 py-2.5 rounded-xl">
          <span className="text-sm font-medium text-slate-400">Filter by Class:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-[#121214] text-white text-sm font-medium focus:outline-none cursor-pointer"
          >
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id} className="bg-[#121214]">
                {cls.subject} (Sem {cls.semester})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400 min-w-[700px]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/[0.06] text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Student Name</th>
                <th className="px-6 py-4 font-medium">Roll Number</th>
                <th className="px-6 py-4 font-medium">Attendance %</th>
                <th className="px-6 py-4 font-medium text-center">Total Marks</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center">Loading data...</td></tr>
              ) : progressData.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center">No students found.</td></tr>
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
                          <div className={`h-2 rounded-full ${student.attendancePercentage >= 75 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${student.attendancePercentage}%` }}></div>
                        </div>
                        <span className={`font-medium ${student.attendancePercentage >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {student.attendancePercentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-fuchsia-400">{student.totalMarks} <span className="text-xs text-slate-500">/ {student.fullMarks}</span></span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleEditClick(student)}
                        className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-white rounded-lg text-xs font-medium transition-colors border border-white/[0.1]"
                      >
                        Edit Marks
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Marks Modal */}
      {editStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#121214] border border-white/[0.08] rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Edit Marks</h2>
            <p className="text-sm text-slate-400 mb-6">{editStudent.name} (Roll: {editStudent.roll})</p>
            
            <div className="flex flex-col gap-4">
              {["Quiz 1", "Quiz 2", "Midterm", "Final"].map((exam) => (
                <div key={exam} className="flex items-center justify-between gap-4">
                  <label className="text-sm font-medium text-slate-300 w-24">{exam}</label>
                  <input
                    type="number"
                    value={editMarks[exam] || ""}
                    onChange={(e) => setEditMarks({ ...editMarks, [exam]: e.target.value })}
                    placeholder="00"
                    className="flex-1 px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500 text-center font-bold"
                    min="0"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button onClick={() => setEditStudent(null)} className="px-4 py-2 text-sm text-slate-300 hover:text-white">Cancel</button>
              <button onClick={handleSaveMarks} disabled={isSaving} className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-bold">
                {isSaving ? "Saving..." : "Save Marks"}
              </button>
            </div>
          </div>
        </div>
      )}

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