"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newClass, setNewClass] = useState({ teacherId: "", subject: "", semester: "3rd", section: "A" });

  const fetchData = async () => {
    try {
      const [classesRes, teachersRes] = await Promise.all([
        fetch("/api/classes"),
        fetch("/api/teachers")
      ]);
      
      const classesData = await classesRes.json();
      const teachersData = await teachersRes.json();

      if (classesRes.ok) setClasses(classesData.classes || []);
      if (teachersRes.ok) setTeachers(teachersData.teachers || []);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssignClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.teacherId || !newClass.subject) return;

    try {
      const res = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClass),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Class assigned successfully!");
        setIsModalOpen(false);
        setNewClass({ teacherId: "", subject: "", semester: "3rd", section: "A" });
        fetchData();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      
      {/* হেডার */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Classes & Subjects</h1>
          <p className="text-slate-400 text-sm mt-1">Assign subjects to teachers.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Assign Class
        </button>
      </div>

      {/* টেবিল */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/[0.06] text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Subject</th>
                <th className="px-6 py-4 font-medium">Teacher</th>
                <th className="px-6 py-4 font-medium">Semester</th>
                <th className="px-6 py-4 font-medium">Section</th>
              </tr>
            </thead>
                        <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500">Loading classes...</td>
                </tr>
              ) : classes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500">No classes assigned yet.</td>
                </tr>
              ) : (
                classes.map((cls: any) => (
                  <tr key={cls._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{cls.subject}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                        {cls.teacherDetails?.name?.charAt(0) || "T"}
                      </div>
                      {/* এখানে teacherDetails.name ব্যবহার করছি */}
                      <span className="text-slate-200">{cls.teacherDetails?.name || "Unknown"}</span>
                    </td>
                    <td className="px-6 py-4">{cls.semester}</td>
                    <td className="px-6 py-4">{cls.section}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#121214] border border-white/[0.08] rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <h2 className="text-xl font-bold text-white mb-6">Assign New Class</h2>
            <form onSubmit={handleAssignClass} className="flex flex-col gap-4">
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Select Teacher</label>
                <select value={newClass.teacherId} onChange={(e) => setNewClass({...newClass, teacherId: e.target.value})} className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500" required>
                  <option value="" disabled>Select a teacher</option>
                  {teachers.map((t: any) => (
                    <option key={t._id} value={t._id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Subject Name</label>
                <input type="text" value={newClass.subject} onChange={(e) => setNewClass({...newClass, subject: e.target.value})} placeholder="e.g. Data Structures" className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Semester</label>
                  <select value={newClass.semester} onChange={(e) => setNewClass({...newClass, semester: e.target.value})} className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500">
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Section</label>
                  <select value={newClass.section} onChange={(e) => setNewClass({...newClass, section: e.target.value})} className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 text-sm text-slate-300 hover:text-white">Cancel</button>
                <button type="submit" className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium">Assign Class</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}