"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminMarksPage() {
  const [marks, setMarks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // সার্চ এবং ফিল্টার স্টেট
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await fetch("/api/marks");
        const data = await res.json();
        if (res.ok) {
          setMarks(data.marks || []);
          
          // ডেটাবেস থেকে সব ইউনিক সাবজেক্ট বের করা
          const uniqueSubjects = Array.from(
            new Set(
              data.marks
                .map((m: any) => m.classDetails?.subject)
                .filter(Boolean)
            )
          );
          setSubjects(uniqueSubjects as string[]);
        }
      } catch (error) {
        toast.error("Failed to load marks");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarks();
  }, []);

  // সার্চ এবং ফিল্টার লজিক
  const filteredMarks = marks.filter((record) => {
    const searchMatch = 
      record.studentDetails?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.studentDetails?.roll?.includes(searchQuery) ||
      record.classDetails?.subject?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const examMatch = selectedExam === "All" || record.examName === selectedExam;
    const subjectMatch = selectedSubject === "All" || record.classDetails?.subject === selectedSubject;
    
    return searchMatch && examMatch && subjectMatch;
  });

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      
      {/* হেডার */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Marks & Results</h1>
          <p className="text-slate-400 text-sm mt-1">View all marks submitted by teachers.</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl">
        
        {/* Search Input */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input
            type="text"
            placeholder="Search by student or roll..."
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

        {/* Exam Filter */}
        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500 text-sm cursor-pointer"
        >
          <option value="All">All Exams</option>
          <option value="Quiz 1">Quiz 1</option>
          <option value="Midterm">Midterm</option>
          <option value="Final">Final</option>
        </select>
      </div>

      {/* টেবিল */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/[0.06] text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Roll</th>
                <th className="px-6 py-4 font-medium">Subject</th>
                <th className="px-6 py-4 font-medium">Exam</th>
                <th className="px-6 py-4 font-medium text-right">Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">Loading marks...</td>
                </tr>
              ) : filteredMarks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                    No marks found matching your search.
                  </td>
                </tr>
              ) : (
                filteredMarks.map((record: any) => (
                  <tr key={record._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-xs">
                        {record.studentDetails?.name?.charAt(0) || "U"}
                      </div>
                      <span className="text-slate-200">{record.studentDetails?.name || "Unknown"}</span>
                    </td>
                    <td className="px-6 py-4">{record.studentDetails?.roll || "N/A"}</td>
                    <td className="px-6 py-4 font-medium text-white">{record.classDetails?.subject || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.1] text-xs font-medium text-slate-300">
                        {record.examName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-lg font-bold text-fuchsia-400">{record.mark}</span>
                      <span className="text-xs text-slate-500">/100</span>
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