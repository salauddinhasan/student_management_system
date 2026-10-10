"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

/* ---------- Logo ---------- */

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-700 transition">
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
      <span className="text-base font-bold text-slate-800 tracking-tight">
        Student <span className="text-indigo-600">MS</span>
      </span>
    </Link>
  );
}

/* ---------- Skeleton ---------- */

function AuthSkeleton() {
  return <div className="h-9 w-24 bg-slate-200 rounded-full animate-pulse" />;
}

/* ---------- Profile Dropdown ---------- */

function ProfileDropdown() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
      >
        {user.photo ? (
          <Image
            src={user.photo}
            alt={user.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold">
            {user.name.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="hidden sm:block text-sm font-medium text-slate-700">
          {user.name}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 overflow-hidden"
        >
          <div className="px-4 py-2 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {user.name}
            </p>
            <p className="text-xs text-slate-500 capitalize">{user.role}</p>
          </div>
          <Link
            href={`/${user.role}`}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Mobile Menu ---------- */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  // শুধু pathname পরিবর্তন হলে বন্ধ হবে (প্রথম রেন্ডারে নয়)
  useEffect(() => {
    if (prevPath.current !== pathname) {
      onClose();
      prevPath.current = pathname;
    }
  }, [pathname, onClose]);

  if (!open) return null;

  return (
    <div className="md:hidden border-t border-slate-200 bg-white">
      <div className="px-4 py-3 flex flex-col gap-1">
        <Link
          href="/"
          className="px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition"
        >
          About
        </Link>
        <Link
          href="/success"
          className="px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition"
        >
          Success
        </Link>
        {user ? (
          <Link
            href={`/${user.role}`}
            className="px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/login"
            className="mt-2 bg-indigo-600 text-white text-center px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

/* ---------- Main Navbar ---------- */

export default function Navbar() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/success", label: "Success" },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    active
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="ml-3 pl-3 border-l border-slate-200">
              {loading ? (
                <AuthSkeleton />
              ) : user ? (
                <ProfileDropdown />
              ) : (
                <Link
                  href="/login"
                  className="bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-slate-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </nav>
  );
}
