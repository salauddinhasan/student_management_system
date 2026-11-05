export default function AdminAttendancePage() {
  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Attendance Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Monitor attendance records across the department.</p>
      </div>

      {/* Info Card */}
      <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
        <div className="w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-400">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 8"/>
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Attendance Reports</h2>
        <p className="text-slate-400 max-w-md mx-auto mb-6">
          Teachers take attendance from their own dashboard. The overview and detailed reports will appear here in the future.
        </p>
        <div className="inline-block px-4 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-sm text-slate-300">
          Feature coming soon...
        </div>
      </div>

    </div>
  );
}