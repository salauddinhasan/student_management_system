"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function TeachersPage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [newTeacher, setNewTeacher] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    designation: "Instructor", 
    phone: "" 
  });

  const fetchTeachers = async () => {
    try {
      const res = await fetch("/api/teachers");
      const data = await res.json();
      if (res.ok) {
        setTeachers(data.teachers);
      }
    } catch (error) {
      toast.error("Failed to load teachers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.email || !newTeacher.password) return;

    try {
      const res = await fetch("/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeacher),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Teacher added successfully!");
        setIsAddModalOpen(false);
        setNewTeacher({ name: "", email: "", password: "", designation: "Instructor", phone: "" });
        fetchTeachers();
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
          <h1 className="text-2xl font-bold text-white">Teachers</h1>
          <p className="text-slate-400 text-sm mt-1">Manage all teachers in the department.</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Add Teacher
        </button>
      </div>

      {/* টেবিল */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/[0.06] text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Designation</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500">Loading teachers...</td>
                </tr>
              ) : teachers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500">No teachers found.</td>
                </tr>
              ) : (
                teachers.map((teacher: any) => (
                  <tr key={teacher._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                        {teacher.name.charAt(0)}
                      </div>
                      <span className="text-slate-200">{teacher.name}</span>
                    </td>
                    <td className="px-6 py-4">{teacher.email}</td>
                    <td className="px-6 py-4">{teacher.teacherDetails?.designation || "N/A"}</td>
                    <td className="px-6 py-4 text-right">
                      {/* View Button */}
                      <button 
                        onClick={() => router.push(`/admin/teachers/${teacher._id}`)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/[0.05] hover:bg-white/[0.1] rounded-md transition-colors ml-auto"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Teacher Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#121214] border border-white/[0.08] rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <h2 className="text-xl font-bold text-white mb-6">Add New Teacher</h2>
            <form onSubmit={handleAddTeacher} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                <input type="text" value={newTeacher.name} onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})} placeholder="Rahim Sir" className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                <input type="email" value={newTeacher.email} onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})} placeholder="rahim@teacher.com" className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                <input type="password" value={newTeacher.password} onChange={(e) => setNewTeacher({...newTeacher, password: e.target.value})} placeholder="••••••••" className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Designation</label>
                <select value={newTeacher.designation} onChange={(e) => setNewTeacher({...newTeacher, designation: e.target.value})} className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500">
                  <option value="Instructor">Instructor</option>
                  <option value="Chief Instructor">Chief Instructor</option>
                  <option value="Junior Instructor">Junior Instructor</option>
                  <option value="Lab Assistant">Lab Assistant</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone Number</label>
                <input type="text" value={newTeacher.phone} onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})} placeholder="017XXXXXXXX" className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500" />
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2.5 text-sm text-slate-300 hover:text-white">Cancel</button>
                <button type="submit" className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium">Save Teacher</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}