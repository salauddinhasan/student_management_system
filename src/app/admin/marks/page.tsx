"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminMarksPage() {
  const [marks, setMarks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // সার্চ এবং ফিল্টার স্টেট
  const [searchQuery, setSearchQuery] = useState("");
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
                .filter(Boolean),
            ),
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
      record.studentDetails?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      record.studentDetails?.roll?.includes(searchQuery) ||
      record.classDetails?.subject
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const subjectMatch =
      selectedSubject === "All" ||
      record.classDetails?.subject === selectedSubject;

    return searchMatch && subjectMatch;
  });

  // একই স্টুডেন্টের সব নম্বর গ্রুপ করা
  const groupedMarks = filteredMarks.reduce((acc: any, record: any) => {
    const key = `${record.studentDetails?._id}-${record.classDetails?._id}`;
    if (!acc[key]) {
      acc[key] = {
        studentName: record.studentDetails?.name || "Unknown",
        studentRoll: record.studentDetails?.roll || "N/A",
        subject: record.classDetails?.subject || "N/A",
        total: 0,
      };
    }
    acc[key].total += record.mark;
    return acc;
  }, {});

  const groupedArray = Object.values(groupedMarks);

  return (
    <div className="flex flex-col gap-4 md:gap-6 max-w-6xl mx-auto pb-10">
      {/* হেডার */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Marks & Results
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            View total marks submitted by teachers.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 bg-white/[0.02] border border-white/[0.06] p-3 md:p-4 rounded-2xl">
        {/* Search Input */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-500"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by student, roll or subject..."
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
            <option key={idx} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      {/* টেবিল (রেসপন্সিভ) */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400 min-w-[600px]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/[0.06] text-slate-500">
              <tr>
                <th className="px-4 md:px-6 py-4 font-medium">Student</th>
                <th className="px-4 md:px-6 py-4 font-medium">Roll</th>
                <th className="px-4 md:px-6 py-4 font-medium">Subject</th>
                <th className="px-4 md:px-6 py-4 font-medium text-right">
                  Total Marks
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    Loading marks...
                  </td>
                </tr>
              ) : groupedArray.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No marks found matching your search.
                  </td>
                </tr>
              ) : (
                groupedArray.map((record: any, idx: number) => (
                  <tr
                    key={idx}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 md:px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-xs shrink-0">
                        {record.studentName.charAt(0)}
                      </div>
                      <span className="text-slate-200 truncate">
                        {record.studentName}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4">{record.studentRoll}</td>
                    <td className="px-4 md:px-6 py-4 font-medium text-white truncate">
                      {record.subject}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right whitespace-nowrap">
                      <span className="text-lg md:text-xl font-extrabold text-fuchsia-400">
                        {record.total}
                      </span>
                      <span className="text-xs text-slate-500">/110</span>
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
