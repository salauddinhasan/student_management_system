"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminAttendancePage() {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // সার্চ এবং ফিল্টার স্টেট
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [subjects, setSubjects] = useState<string[]>([]);

  // পেজিনেশন স্টেট
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // এক পেজে ৮টি ডাটা দেখাবে

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch("/api/attendance");
        const data = await res.json();
        if (res.ok) {
          setAttendance(data.attendance || []);
          
          const uniqueSubjects = Array.from(
            new Set(
              data.attendance
                .map((a: any) => a.classDetails?.subject)
                .filter(Boolean)
            )
          );
          setSubjects(uniqueSubjects as string[]);
        }
      } catch (error) {
        toast.error("Failed to load attendance records");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  // সার্চ এবং ফিল্টার লজিক
  const filteredAttendance = attendance.filter((record) => {
    const searchMatch = 
      record.studentDetails?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.studentDetails?.roll?.includes(searchQuery) ||
      record.classDetails?.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.teacherDetails?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const statusMatch = selectedStatus === "All" || record.status === selectedStatus;
    const dateMatch = !selectedDate || record.date === selectedDate;
    const subjectMatch = selectedSubject === "All" || record.classDetails?.subject === selectedSubject;
    
    return searchMatch && statusMatch && dateMatch && subjectMatch;
  });

  // পেজিনেশনের হিসাব
  const totalPages = Math.ceil(filteredAttendance.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAttendance = filteredAttendance.slice(startIndex, startIndex + itemsPerPage);

  // ফিল্টার পরিবর্তন হলে পেজ ১-এ ফিরে যাবে
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, selectedDate, selectedSubject]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      
      {/* হেডার */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Attendance Reports</h1>
          <p className="text-slate-400 text-sm mt-1">Monitor all attendance records submitted by teachers.</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl">
        
        {/* Search Input */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input
            type="text"
            placeholder="Search student, roll, teacher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 text-sm"
          />
        </div>

        {/* Subject Filter */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500 text-sm cursor-pointer"
        >
          <option value="All">All Subjects</option>
          {subjects.map((sub, idx) => (
            <option key={idx} value={sub}>{sub}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500 text-sm cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        {/* Date Filter */}
        <div className="flex items-center gap-2 bg-black/50 border border-white/10 px-4 py-2 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-white text-sm focus:outline-none w-full [color-scheme:dark]"
          />
        </div>
      </div>

      {/* টেবিল */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400 min-w-[800px]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/[0.06] text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Subject</th>
                <th className="px-6 py-4 font-medium">Teacher</th>
                <th className="px-6 py-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">Loading records...</td>
                </tr>
              ) : currentAttendance.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                currentAttendance.map((record: any) => (
                  <tr key={record._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-xs">
                        {record.studentDetails?.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <span className="text-slate-200 block">{record.studentDetails?.name || "Unknown"}</span>
                        <span className="text-xs text-slate-500">Roll: {record.studentDetails?.roll || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{record.classDetails?.subject || "N/A"}</td>
                    <td className="px-6 py-4">{record.teacherDetails?.name || "N/A"}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                        record.status === "Present" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* পেজিনেশন কন্ট্রোলস */}
        {!isLoading && filteredAttendance.length > 0 && (
          <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
            <span className="text-sm text-slate-400">
              Showing <span className="font-medium text-white">{startIndex + 1}</span> to{" "}
              <span className="font-medium text-white">
                {Math.min(startIndex + itemsPerPage, filteredAttendance.length)}
              </span>{" "}
              of <span className="font-medium text-white">{filteredAttendance.length}</span> records
            </span>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-white/[0.08] text-slate-400 hover:bg-white/[0.05] hover:text-white disabled:opacity-50 disabled:pointer-events-none transition-colors text-sm font-medium"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === i + 1
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                      : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-white/[0.08] text-slate-400 hover:bg-white/[0.05] hover:text-white disabled:opacity-50 disabled:pointer-events-none transition-colors text-sm font-medium"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}