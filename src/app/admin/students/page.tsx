"use client";

import { useState } from "react";

// টাইপ ডিফাইন করা
type Student = {
  id: string;
  name: string;
  semester: string;
  status: "Active" | "Inactive";
};

export default function StudentsPage() {
  // ডাইনামিক স্টেট (পরে এটা ডেটাবেস থেকে আসবে)
  const [students, setStudents] = useState<Student[]>([
    { id: "S-101", name: "Rahim Ahmed", semester: "3rd", status: "Active" },
    { id: "S-102", name: "Sara Khan", semester: "3rd", status: "Active" },
  ]);

  // মডাল (Popup) ওপেন/ক্লোজ স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // নতুন স্টুডেন্টের ফর্ম স্টেট
  const [newStudent, setNewStudent] = useState({ name: "", semester: "1st" });

  // স্টুডেন্ট অ্যাড করার ফাংশন
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name) return;

    const student: Student = {
      id: `S-${Math.floor(100 + Math.random() * 900)}`, // র‍্যান্ডম আইডি
      name: newStudent.name,
      semester: newStudent.semester,
      status: "Active",
    };

    setStudents([student, ...students]); // নতুন স্টুডেন্ট লিস্টের উপরে যোগ হবে
    setIsModalOpen(false); // মডাল বন্ধ হবে
    setNewStudent({ name: "", semester: "1st" }); // ফর্ম রিসেট
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      
      {/* Page Header & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Students</h1>
          <p className="text-slate-400 text-sm mt-1">Manage all students in the department.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Add Student
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 px-3 py-2 w-full max-w-sm bg-white/[0.03] border border-white/[0.06] rounded-lg text-slate-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" placeholder="Search students..." className="bg-transparent border-none outline-none w-full text-white placeholder-slate-500" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/[0.06] text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Student ID</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Semester</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                    No students found. Click Add Student to create one.
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-medium text-white">{student.id}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-xs">
                        {student.name.charAt(0)}
                      </div>
                      <span className="text-slate-200">{student.name}</span>
                    </td>
                    <td className="px-6 py-4">{student.semester}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        student.status === "Active" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-500 hover:text-white transition-colors p-1 rounded-md hover:bg-white/[0.05]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal (Popup) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#121214] border border-white/[0.08] rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add New Student</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  placeholder="e.g. Rahim Ahmed"
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Semester</label>
                <select 
                  value={newStudent.semester}
                  onChange={(e) => setNewStudent({...newStudent, semester: e.target.value})}
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                >
                  <option value="1st">1st Semester</option>
                  <option value="2nd">2nd Semester</option>
                  <option value="3rd">3rd Semester</option>
                  <option value="4th">4th Semester</option>
                </select>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Save Student
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}