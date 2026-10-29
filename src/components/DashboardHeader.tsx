"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// setIsOpen প্রপ্স নিতে হবে
export default function DashboardHeader({ setIsOpen }: { setIsOpen: (val: boolean) => void }) {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-6 sticky top-0 z-30">
      
      {/* Left Side */}
      <div className="flex items-center gap-4 w-1/4">
        {/* হ্যামবার্গার বাটন (শুধু মোবাইলে দেখা যাবে) */}
        <button 
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
        
        <h1 className="text-lg font-semibold text-white tracking-tight hidden sm:block">
         Admin Dashboard
        </h1>
      </div>

      {/* Center (Search) */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-2 px-4 py-2 w-full max-w-md bg-white/[0.03] border border-white/[0.06] rounded-lg text-slate-400 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span className="flex-1 text-left">Search...</span>
        </div>
      </div>

      {/* Right Side (Notification & Profile) - আগের মতোই থাকবে */}
      <div className="flex items-center justify-end gap-5 w-1/4">
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </button>
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3">
             {/* ... প্রোফাইল কোড আগের মতোই ... */}
             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-sm font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}