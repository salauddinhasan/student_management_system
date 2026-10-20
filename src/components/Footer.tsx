 import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0d0d12] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section (2 Columns) */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 inline-flex">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                StudentMS
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              A modern digital management system for the CSE department. 
              Built to make attendance and marks management effortless for 
              both teachers and students.
            </p>
          </div>

          {/* Links Section 1 */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">
              Platform
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/success" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Success
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Section 2 */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">
              Account
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} StudentMS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}