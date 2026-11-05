"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard-stats");
        const data = await res.json();
        if (res.ok) {
          setStats(data.stats);
        }
      } catch (error) {
        toast.error("Failed to load stats");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Dashboard Overview</h1>
          <p className="text-slate-400 text-base">Welcome back, Admin. Here is what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300 bg-white/[0.03] border border-white/[0.08] px-4 py-2 rounded-xl backdrop-blur-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Stats Cards Grid - আরও বড় ও প্রিমিয়াম */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Students */}
        <div className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/40 transition-all duration-300 group overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <p className="text-base font-medium text-slate-400">Total Students</p>
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/20 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
            </div>
            <h3 className="text-5xl font-extrabold text-white mb-2 tracking-tight">
              {isLoading ? "..." : stats.totalStudents}
            </h3>
            <p className="text-sm text-emerald-400 font-medium flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6"/></svg>
              Active in department
            </p>
          </div>
        </div>

        {/* Card 2: Total Teachers */}
        <div className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-fuchsia-500/40 transition-all duration-300 group overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-3xl group-hover:bg-fuchsia-500/20 transition-all" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <p className="text-base font-medium text-slate-400">Total Teachers</p>
              <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400 border border-fuchsia-500/20 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
            </div>
            <h3 className="text-5xl font-extrabold text-white mb-2 tracking-tight">
              {isLoading ? "..." : stats.totalTeachers}
            </h3>
            <p className="text-sm text-slate-400 font-medium flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Managing all classes
            </p>
          </div>
        </div>

        {/* Card 3: Total Classes */}
        <div className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/40 transition-all duration-300 group overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <p className="text-base font-medium text-slate-400">Total Classes</p>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
            </div>
            <h3 className="text-5xl font-extrabold text-white mb-2 tracking-tight">
              {isLoading ? "..." : stats.totalClasses}
            </h3>
            <p className="text-sm text-slate-400 font-medium flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              Running in CSE dept
            </p>
          </div>
        </div>

      </div>

      {/* Two Column Layout (Activity & Quick Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Activity */}
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <button className="text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors">View All</button>
          </div>
          <div className="flex flex-col gap-6">
            {/* Activity Item 1 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0 border border-violet-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
              </div>
              <div>
                <p className="text-sm text-slate-200 font-medium">New student added to CSE department</p>
                <p className="text-xs text-slate-500 mt-1">2 mins ago by Admin</p>
              </div>
            </div>
            {/* Activity Item 2 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-fuchsia-500/10 flex items-center justify-center shrink-0 border border-fuchsia-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-fuchsia-400"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div>
                <p className="text-sm text-slate-200 font-medium">Teacher assigned to Data Structures</p>
                <p className="text-xs text-slate-500 mt-1">1 hour ago by Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
          <h2 className="text-xl font-bold text-white mb-8">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/students" className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] hover:border-violet-500/30 transition-all group">
              <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
              </div>
              <span className="text-sm font-semibold text-white">Add Student</span>
            </Link>
            <Link href="/admin/classes" className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all group">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              </div>
              <span className="text-sm font-semibold text-white">Assign Class</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}