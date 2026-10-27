"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d0d12] text-white">
      {/* সাইডবার */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* মেইন কন্টেন্ট (ডেস্কটপে সাইডবারের জন্য ২৬০px জায়গা ছাড়বে) */}
      <div className="md:ml-[260px] flex flex-col min-h-screen">
        <DashboardHeader setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}